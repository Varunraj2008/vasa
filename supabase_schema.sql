-- Supabase Database Schema for VaSa

-- Create enums
CREATE TYPE user_role AS ENUM ('worker', 'recruiter', 'admin');
CREATE TYPE job_status AS ENUM ('open', 'completed', 'cancelled');
CREATE TYPE app_status AS ENUM ('pending', 'accepted', 'rejected');

-- Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role user_role DEFAULT 'worker',
  rating NUMERIC DEFAULT 0,
  pan_verified BOOLEAN DEFAULT FALSE,
  pan_url TEXT,
  aadhaar_verified BOOLEAN DEFAULT FALSE,
  aadhaar_url TEXT,
  job_type TEXT,
  location_pref TEXT,
  industry_pref TEXT,
  skills TEXT[],
  balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Jobs
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recruiter_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  logo_url TEXT,
  from_date DATE,
  to_date DATE,
  from_time TIME,
  to_time TIME,
  location TEXT,
  job_type TEXT,
  salary_range TEXT,
  industry TEXT,
  workers_needed INTEGER DEFAULT 1,
  description TEXT,
  skills_required TEXT[],
  status job_status DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Job Applications
CREATE TABLE job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status app_status DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(job_id, worker_id)
);

-- Teams
CREATE TABLE teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Team Members
CREATE TABLE team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(team_id, user_id)
);

-- Notifications
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT,
  title TEXT NOT NULL,
  message TEXT,
  related_id UUID,
  read BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Transactions (Wallet)
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  type TEXT NOT NULL, -- 'credit', 'debit'
  status TEXT DEFAULT 'completed',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT TRUE
);

-- Skills Reference
CREATE TABLE skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Videos (Learning Hub)
CREATE TABLE videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  language TEXT,
  duration TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Earnings History
CREATE TABLE earnings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Safety Contacts
CREATE TABLE safety_contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  relation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);


-- Row Level Security (RLS)

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_contacts ENABLE ROW LEVEL SECURITY;

-- Basic Policies (can be refined based on specific needs)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Jobs are viewable by everyone" ON jobs FOR SELECT USING (true);
CREATE POLICY "Recruiters can insert jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = recruiter_id);
CREATE POLICY "Recruiters can update own jobs" ON jobs FOR UPDATE USING (auth.uid() = recruiter_id);

CREATE POLICY "Workers can view their applications" ON job_applications FOR SELECT USING (auth.uid() = worker_id);
CREATE POLICY "Recruiters can view applications for their jobs" ON job_applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM jobs WHERE id = job_applications.job_id AND recruiter_id = auth.uid())
);
CREATE POLICY "Workers can apply" ON job_applications FOR INSERT WITH CHECK (auth.uid() = worker_id);

CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

--- Triggers
-- Enable uuid-ossp extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Auto create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Setup Storage for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true) ON CONFLICT DO NOTHING;

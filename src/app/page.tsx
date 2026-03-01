"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Key, Eye, EyeOff, Navigation } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        // If we get a 403 error (user not found in DB but JWT exists), clear the session
        if (userError && userError.status === 403) {
          console.warn("Stale session detected, signing out...");
          await supabase.auth.signOut();
          setError("Your session has expired. Please log in again.");
          return;
        }

        if (user) {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Error checking user:", err);
      }
    };
    checkUser();

    const params = new URLSearchParams(window.location.search);
    const urlError = params.get('error');
    if (urlError) {
      setError(urlError);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh(); // Refresh to catch new auth state
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback`;
    console.log("Initiating Google login with redirectTo:", redirectTo);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-brand-100 flex flex-col mx-4">
      <div className="flex justify-center mb-6">
        <span className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent italic tracking-tighter">VaSa</span>
      </div>

      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back to VaSa</h1>
      <p className="text-sm text-gray-500 text-center mb-8">
        Please enter your credentials to access your account.
      </p>

      {error && <div className="mb-4 text-sm text-red-500 text-center bg-red-50 py-2 rounded">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="input-field pl-10"
            required
          />
        </div>

        <div className="relative">
          <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex justify-end">
          <Link href="#" className="text-sm text-brand-600 hover:underline font-medium">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-base flex justify-center items-center h-12"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-2">
        <div className="h-px bg-gray-200 w-full" />
        <span className="text-xs text-gray-400 font-medium tracking-wider whitespace-nowrap px-2">
          OR CONTINUE WITH
        </span>
        <div className="h-px bg-gray-200 w-full" />
      </div>

      <div className="mt-8 space-y-3">
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-brand-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Google login</span>
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          type="button"
          className="w-full flex items-center justify-center space-x-2 py-2.5 border border-brand-200 text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 focus:ring-2 focus:ring-brand-200 transition-colors"
        >
          <Navigation className="w-5 h-5" />
          <span className="text-sm font-medium">Onsite Member Login</span>
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-brand-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

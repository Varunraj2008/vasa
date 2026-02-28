import Link from "next/link";
import { Search, BookOpen, Users, Bell, AlertCircle, ArrowRight } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import VerificationModal from "@/components/VerificationModal";

export default async function DashboardPage() {
    const supabase = createServerSupabaseClient();

    // Check if user is logged in
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect('/');
    }

    // Fetch user profile data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    const username = profile?.full_name || user?.user_metadata?.full_name || "User"; // Fallback to User
    const isVerified = (profile?.pan_verified && profile?.aadhaar_verified) || false;

    const cards = [
        {
            title: "Find Your Next Job",
            description: "Browse AI-matched opportunities tailored to your skills.",
            icon: Search,
            href: "/jobs/search",
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Grow Your Skills",
            description: "Access training modules and certifications in the Learning Hub.",
            icon: BookOpen,
            href: "/learning",
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Build Your Team",
            description: "Hire reliable workers or form your own crew for big projects.",
            icon: Users,
            href: "/hire",
            color: "bg-purple-50 text-purple-600",
        },
        {
            title: "Notifications",
            description: "Check your latest alerts, messages, and application updates.",
            icon: Bell,
            href: "/notifications",
            color: "bg-orange-50 text-orange-600",
        },
    ];

    return (
        <>
            {!isVerified && (
                <VerificationModal
                    initialPan={profile?.pan_verified || false}
                    initialAadhaar={profile?.aadhaar_verified || false}
                    userId={user.id}
                />
            )}
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {username}!</h1>
                    <p className="text-gray-500 mt-1">Here is what&apos;s happening with your account today.</p>
                </div>

                {/* Alert Banner */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-yellow-800">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-sm">Action Required: Verify Your Profile</h3>
                            <p className="text-sm mt-0.5 opacity-90">Please complete your PAN and Aadhaar verification to unlock all features.</p>
                        </div>
                    </div>
                    <Link
                        href="/profile"
                        className="whitespace-nowrap bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-yellow-300"
                    >
                        Go to Verification
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {cards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <Link key={idx} href={card.href} className="card hover:shadow-md transition-shadow group flex flex-col h-full">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-500 flex-1">
                                    {card.description}
                                </p>
                                <div className="mt-4 flex items-center text-sm font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Get started <ArrowRight className="ml-1 h-4 w-4" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

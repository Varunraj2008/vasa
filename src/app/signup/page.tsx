"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Key, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function SignUpPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const supabase = createClient();

        // First sign up the user
        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                }
            }
        });

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        // Success - user is created
        // Note: Due to RLS and triggers from schema, the profile is created automatically!
        setLoading(false);
        router.push("/dashboard");
        router.refresh();
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-brand-100 flex flex-col mx-4">
            <div className="flex justify-center mb-6">
                <span className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent italic tracking-tighter">VaSa</span>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Create an Account</h1>
            <p className="text-sm text-gray-500 text-center mb-8">
                Join the VaSa platform to find your next opportunity.
            </p>

            {error && <div className="mb-4 text-sm text-red-500 text-center bg-red-50 py-2 rounded">{error}</div>}

            <form onSubmit={handleSignUp} className="space-y-4">

                <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="input-field pl-10"
                        required
                    />
                </div>

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
                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 text-base flex justify-center items-center h-12 mt-4"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/" className="text-brand-600 font-medium hover:underline">
                    Log In
                </Link>
            </p>
        </div>
    );
}

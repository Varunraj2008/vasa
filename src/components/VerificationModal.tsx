"use client";

import { useState } from "react";
import { Shield, CheckCircle2, AlertCircle, Upload, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface VerificationModalProps {
    initialPan: boolean;
    initialAadhaar: boolean;
    userId: string;
}

export default function VerificationModal({ initialPan, initialAadhaar, userId }: VerificationModalProps) {
    const [panVerified, setPanVerified] = useState(initialPan);
    const [aadhaarVerified, setAadhaarVerified] = useState(initialAadhaar);
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleVerify = async (type: "pan" | "aadhaar") => {
        setLoading(type);
        const supabase = createClient();

        // In a real app, this would involve uploading a file to storage
        // For this demo, we simulate a successful verification update
        const updateData = type === "pan" ? { pan_verified: true } : { aadhaar_verified: true };

        const { error } = await supabase
            .from("profiles")
            .update(updateData)
            .eq("id", userId);

        if (!error) {
            if (type === "pan") setPanVerified(true);
            if (type === "aadhaar") setAadhaarVerified(true);

            // If both are now verified, refresh the page to clear the modal
            if ((type === "pan" && aadhaarVerified) || (type === "aadhaar" && panVerified)) {
                setTimeout(() => {
                    router.refresh();
                }, 1000);
            }
        }
        setLoading(null);
    };

    if (panVerified && aadhaarVerified) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-brand-100 flex flex-col">
                {/* Header */}
                <div className="bg-gradient-brand p-8 text-white relative">
                    <Shield className="h-16 w-16 absolute -right-4 -bottom-4 opacity-10 rotate-12" />
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="h-6 w-6" /> Identity Verification
                    </h2>
                    <p className="mt-2 text-brand-50 opacity-90 text-sm leading-relaxed">
                        For security and compliance, you must verify your identity before accessing the dashboard.
                    </p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        {/* PAN Verification */}
                        <div className={`p-5 rounded-2xl border-2 transition-all ${panVerified ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${panVerified ? 'bg-green-100 text-green-600' : 'bg-brand-50 text-brand-600'}`}>
                                        {panVerified ? <CheckCircle2 className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">PAN Card</h3>
                                        <p className={`text-xs ${panVerified ? 'text-green-600' : 'text-gray-500'}`}>
                                            {panVerified ? 'Verification Complete' : 'Verification Required'}
                                        </p>
                                    </div>
                                </div>
                                {!panVerified && (
                                    <button
                                        onClick={() => handleVerify("pan")}
                                        disabled={loading !== null}
                                        className="btn-primary py-2 px-4 text-xs h-10 flex items-center gap-2 group"
                                    >
                                        {loading === "pan" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />}
                                        Upload PAN
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Aadhaar Verification */}
                        <div className={`p-5 rounded-2xl border-2 transition-all ${aadhaarVerified ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${aadhaarVerified ? 'bg-green-100 text-green-600' : 'bg-brand-50 text-brand-600'}`}>
                                        {aadhaarVerified ? <CheckCircle2 className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Aadhaar Card</h3>
                                        <p className={`text-xs ${aadhaarVerified ? 'text-green-600' : 'text-gray-500'}`}>
                                            {aadhaarVerified ? 'Verification Complete' : 'Verification Required'}
                                        </p>
                                    </div>
                                </div>
                                {!aadhaarVerified && (
                                    <button
                                        onClick={() => handleVerify("aadhaar")}
                                        disabled={loading !== null}
                                        className="btn-primary py-2 px-4 text-xs h-10 flex items-center gap-2 group"
                                    >
                                        {loading === "aadhaar" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />}
                                        Upload Aadhaar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-yellow-800 leading-normal">
                            Note: Verification usually takes up to 24 hours. For this demo, clicking "Upload" will instantly verify your account so you can see the dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

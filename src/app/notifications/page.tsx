"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, MapPin, Briefcase } from "lucide-react";

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState<'workers' | 'recruiters'>('workers');

    const workerNotifications = [
        {
            id: 1,
            jobTitle: "Event Photographer",
            recruiter: "Creative Events Inc.",
            location: "Indiranagar, Bangalore",
            pay: "₹2,500/day",
            schedule: "Oct 24, 2023 | 10:00 AM - 6:00 PM",
            question: "Do you have your own DSLR and lenses?",
            response: "Yes, I have a Sony A7III with 24-70mm lens.",
            status: "pending_confirmation"
        },
        {
            id: 2,
            jobTitle: "Data Entry Operator",
            recruiter: "Tech Solutions",
            location: "Remote",
            pay: "₹1,200/day",
            schedule: "Nov 01 - Nov 05, 2023",
            question: "Can you guarantee minimum 500 entries per day?",
            response: "Yes, easily achievable.",
            status: "confirmed"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-500 mt-1">Stay updated on your job applications, messages, and alerts.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-brand-200">
                <button
                    onClick={() => setActiveTab('workers')}
                    className={`flex-1 text-center py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'workers' ? 'border-brand-600 text-brand-600 bg-brand-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    For Workers
                </button>
                <button
                    onClick={() => setActiveTab('recruiters')}
                    className={`flex-1 text-center py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'recruiters' ? 'border-brand-600 text-brand-600 bg-brand-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    For Recruiters
                </button>
            </div>

            {/* Notification List (Worker View as Primary for Clone) */}
            <div className="space-y-4 pt-2">
                {activeTab === 'workers' ? (
                    workerNotifications.map(notification => (
                        <div key={notification.id} className="card p-5 border-l-4 border-l-brand-500 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        {notification.jobTitle}
                                        {notification.status === 'pending_confirmation' && <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Action Needed</span>}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1 text-brand-600 font-medium text-sm">
                                        {notification.recruiter}
                                    </div>
                                </div>

                                <div className="text-right text-sm">
                                    <div className="font-bold text-green-600">{notification.pay}</div>
                                    <div className="text-gray-500 font-medium">{notification.schedule}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gray-400" /> {notification.location}</div>
                                <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-gray-400" /> Contract Job</div>
                            </div>

                            {/* Q&A Section */}
                            <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 space-y-3 mb-5">
                                <div>
                                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">Recruiter&apos;s Question</div>
                                    <div className="text-gray-900 text-sm font-medium">{notification.question}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your Response</div>
                                    <div className="text-gray-700 text-sm italic border-l-2 border-brand-200 pl-3 py-1">{notification.response}</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end pt-3 border-t border-gray-100 gap-3">
                                {notification.status === 'pending_confirmation' ? (
                                    <button className="btn-primary flex items-center gap-2 px-6">
                                        <CheckCircle className="h-4 w-4" /> Confirm Availability
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg text-sm border border-green-200">
                                        <CheckCircle className="h-4 w-4" /> Availability Confirmed
                                    </div>
                                )}
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        <AlertCircle className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                        <p>No notifications for recruiters right now.</p>
                    </div>
                )}
            </div>

        </div>
    );
}

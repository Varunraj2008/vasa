"use client";

import { useState } from "react";
import { UsersRound, Plus, MoreVertical, Shield } from "lucide-react";

export default function MyTeamPage() {
    const [showCreate, setShowCreate] = useState(false);

    const myTeams = [
        {
            id: 1,
            name: "Bangalore Elite Tech",
            description: "A group of top-rated developers and designers in Bangalore.",
            members: [
                { name: "Rahul S", avatar: "RS" },
                { name: "Priya P", avatar: "PP" },
                { name: "Amit K", avatar: "AK" },
            ],
            role: "Owner"
        },
        {
            id: 2,
            name: "Remote Creatives",
            description: "Freelance designers and video editors taking global gigs.",
            members: [
                { name: "Sita R", avatar: "SR" },
                { name: "Me", avatar: "ME" },
                { name: "John D", avatar: "JD" },
                { name: "Alex B", avatar: "AB" },
            ],
            role: "Member"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Team</h1>
                    <p className="text-gray-500 mt-1">Manage your teams and collaborate on projects.</p>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    {showCreate ? "Cancel" : "Create New Team"}
                </button>
            </div>

            {/* Create Team Form */}
            {showCreate && (
                <div className="card shadow-md border-brand-300 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <UsersRound className="h-6 w-6 text-brand-600" />
                        Create a Team
                    </h2>

                    <form className="space-y-5 max-w-2xl">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Team Name</label>
                            <input type="text" className="input-field" placeholder="e.g. Frontend Masters" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea rows={3} className="input-field resize-none" placeholder="What does this team specialize in?" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Add Members (Email)</label>
                            <div className="flex gap-2">
                                <input type="email" className="input-field" placeholder="worker@example.com" />
                                <button type="button" className="btn-primary bg-white !text-brand-600 border border-brand-200 hover:border-brand-600 hover:bg-brand-50 shadow-sm whitespace-nowrap">
                                    Invite Member
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas.</p>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-brand-100">
                            <button className="btn-primary px-8">Save Team</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Teams List */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Teams you belong to</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myTeams.map((team) => (
                        <div key={team.id} className="card hover:shadow-md transition-shadow flex flex-col h-full border-t-4 border-t-brand-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${team.role === 'Owner' ? 'bg-brand-100 text-brand-700 border border-brand-200' : 'bg-gray-100 text-gray-700'}`}>
                                            {team.role === 'Owner' && <Shield className="h-3 w-3" />}
                                            {team.role}
                                        </span>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 flex-1 mb-6">
                                {team.description}
                            </p>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                                    Members ({team.members.length})
                                </p>
                                <div className="flex -space-x-3 overflow-hidden">
                                    {team.members.map((member, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-sm font-bold text-brand-700 shadow-sm"
                                            title={member.name}
                                        >
                                            {member.avatar}
                                        </div>
                                    ))}
                                    <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-500 shadow-sm border border-gray-200 border-dashed">
                                        <Plus className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

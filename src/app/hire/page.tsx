"use client";

import { useState } from "react";
import { Search, MapPin, Wrench, Star, ShieldCheck } from "lucide-react";

export default function HireTalentPage() {
    const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);

    const workers = [
        {
            id: 1,
            name: "Rahul Sharma",
            skills: ["React", "Node.js", "MongoDB"],
            location: "Bangalore",
            rating: 4.8,
            verified: true
        },
        {
            id: 2,
            name: "Priya Patel",
            skills: ["UI/UX Design", "Figma", "Webflow"],
            location: "Mumbai",
            rating: 4.9,
            verified: true
        },
        {
            id: 3,
            name: "Amit Kumar",
            skills: ["Data Entry", "Excel", "Tally"],
            location: "Delhi",
            rating: 4.5,
            verified: false
        }
    ];

    const handleSelect = (id: number) => {
        setSelectedWorkers(prev =>
            prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
        );
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Hire Top Talent</h1>
                <p className="text-gray-500 mt-1">Search, filter, and invite verified professionals to your team.</p>
            </div>

            {/* Filters Form */}
            <div className="card shadow-sm border border-brand-200 p-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="input-field pl-10 h-11"
                        />
                    </div>
                    <div className="relative">
                        <Wrench className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select className="input-field pl-10 h-11 text-gray-700 appearance-none bg-white">
                            <option value="">Filter by skill</option>
                            <option value="development">Development</option>
                            <option value="design">Design</option>
                            <option value="admin">Administration</option>
                        </select>
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select className="input-field pl-10 h-11 text-gray-700 appearance-none bg-white">
                            <option value="">Filter by location</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Action Bar (When selected) */}
            {selectedWorkers.length > 0 && (
                <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-4">
                    <span className="text-brand-800 font-medium">
                        {selectedWorkers.length} worker{selectedWorkers.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex gap-3">
                        <button className="btn-primary bg-white !text-brand-600 border border-brand-600 hover:bg-brand-50 shadow-none px-4 py-2 text-sm">
                            Add to Team
                        </button>
                        <button className="btn-primary px-4 py-2 text-sm shadow-sm">
                            Invite to Job
                        </button>
                    </div>
                </div>
            )}

            {/* Worker Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {workers.map((worker) => (
                    <div
                        key={worker.id}
                        className={`card hover:shadow-md transition-shadow relative ${selectedWorkers.includes(worker.id) ? 'ring-2 ring-brand-500 bg-brand-50/10' : ''}`}
                    >
                        {/* Checkbox */}
                        <div className="absolute top-4 right-4">
                            <input
                                type="checkbox"
                                checked={selectedWorkers.includes(worker.id)}
                                onChange={() => handleSelect(worker.id)}
                                className="w-5 h-5 text-brand-600 bg-white border-gray-300 rounded focus:ring-brand-500 cursor-pointer"
                            />
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl flex-shrink-0">
                                {worker.name.charAt(0)}
                            </div>
                            <div className="pt-1">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                                    {worker.name}
                                    {worker.verified && <span title="Verified Worker"><ShieldCheck className="h-4 w-4 text-green-500" /></span>}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-yellow-500 font-medium mt-0.5">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span>{worker.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                {worker.location}
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Top Skills</div>
                                <div className="flex flex-wrap gap-2">
                                    {worker.skills.map(skill => (
                                        <span key={skill} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full btn-primary bg-white !text-brand-600 border border-brand-200 hover:border-brand-600 hover:bg-brand-50 shadow-sm text-sm"
                            onClick={() => { }}
                        >
                            View Full Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

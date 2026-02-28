import { Clock, Calendar, CheckCircle, Eye, Upload } from "lucide-react";

export default function JobPostPage() {
    const postedJobs = [
        {
            id: "JOB-1082",
            title: "Frontend Developer",
            status: "open",
            applicants: 12,
        },
        {
            id: "JOB-1083",
            title: "Data Analyst",
            status: "completed",
            applicants: 5,
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
                <p className="text-gray-500 mt-1">Fill out the details below to hire the right talent.</p>
            </div>

            {/* Post Job Form (Exact order and fields) */}
            <div className="card shadow-sm border border-brand-200">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Job Title</label>
                            <input type="text" className="input-field" placeholder="e.g. Graphic Designer" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Company Name</label>
                            <input type="text" className="input-field" placeholder="Your company name" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Company Logo</label>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400">
                                    <Upload size={16} />
                                </div>
                                <input type="file" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">From Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input type="date" className="input-field pl-10 uppercase text-sm" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">From Time</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input type="time" className="input-field pl-10" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">To Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input type="date" className="input-field pl-10 uppercase text-sm" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">To Time</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <input type="time" className="input-field pl-10" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input type="text" className="input-field" placeholder="e.g. Bangalore or Remote" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Job Type</label>
                            <select className="input-field bg-white">
                                <option value="">Select type</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Salary Range</label>
                            <input type="text" className="input-field" placeholder="e.g. ₹5L - ₹10L per annum" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Industry</label>
                            <select className="input-field bg-white">
                                <option value="">Select industry</option>
                                <option value="it">IT & Tech</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                            </select>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Number of Workers Needed</label>
                            <input type="number" min="1" className="input-field max-w-[200px]" defaultValue="1" />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Job Description</label>
                            <textarea rows={4} className="input-field resize-none" placeholder="Describe the responsibilities and requirements..." />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Skills Required</label>
                            <input type="text" className="input-field" placeholder="e.g. React, Nextjs, Tailwind (comma separated)" />
                        </div>

                    </div>

                    <div className="pt-4 flex justify-end border-t border-brand-100">
                        <button className="btn-primary flex items-center gap-2 px-8">
                            Post Job
                        </button>
                    </div>
                </form>
            </div>

            {/* Jobs Posted List */}
            <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Jobs Posted</h2>
                <div className="space-y-4">
                    {postedJobs.map((job) => (
                        <div key={job.id} className="card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-brand-500">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                                <p className="text-sm text-gray-500">ID: {job.id} • {job.applicants} Applicants</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">

                                {job.status === 'open' ? (
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                                        OPEN
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                        COMPLETED
                                    </span>
                                )}

                                <button className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-md">
                                    <Eye className="w-4 h-4" /> View Details
                                </button>

                                {job.status === 'open' && (
                                    <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors border border-gray-200 hover:border-green-300 hover:bg-green-50 px-3 py-1.5 rounded-md">
                                        <CheckCircle className="w-4 h-4" /> Mark as Completed
                                    </button>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

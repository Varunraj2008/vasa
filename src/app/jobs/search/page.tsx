import { Search as SearchIcon, MapPin, Briefcase, Building, Filter, Sparkles } from "lucide-react";

export default function JobSearchPage() {
    const jobs = [
        {
            id: 1,
            title: "Senior React Developer",
            company: "Tech Corp",
            type: "Full-time",
            location: "Bangalore",
            salary: "₹15L - ₹25L",
            tags: ["React", "TypeScript", "Next.js"],
        },
        {
            id: 2,
            title: "UI/UX Designer",
            company: "Design Studio",
            type: "Contract",
            location: "Remote",
            salary: "₹50k/month",
            tags: ["Figma", "UI/UX", "Prototyping"],
        },
        {
            id: 3,
            title: "Backend Engineer",
            company: "Startup Inc",
            type: "Part-time",
            location: "Mumbai",
            salary: "₹8L - ₹12L",
            tags: ["Node.js", "Postgres", "Redis"],
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Banner */}
            <div className="bg-gradient-brand text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
                        AI-Powered Job Matching <Sparkles className="h-6 w-6 text-yellow-300" />
                    </h1>
                    <p className="opacity-90 max-w-xl">
                        Our smart algorithm analyzes your skills and preferences to find the perfect role for you.
                        Update your profile for better recommendations.
                    </p>
                </div>
            </div>

            {/* Filters Form */}
            <div className="card shadow-sm border border-brand-200 p-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative col-span-1 md:col-span-2">
                        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or skill"
                            className="input-field pl-10 h-11"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select className="input-field pl-10 h-11 text-gray-700 appearance-none bg-white">
                            <option value="">Location</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select className="input-field pl-10 h-11 text-gray-700 appearance-none bg-white">
                            <option value="">Job Type</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div className="relative md:col-span-1">
                        <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select className="input-field pl-10 h-11 text-gray-700 appearance-none bg-white">
                            <option value="">Industry</option>
                            <option value="it">IT & Tech</option>
                            <option value="design">Design</option>
                            <option value="finance">Finance</option>
                        </select>
                    </div>
                    <div className="md:col-span-3 flex justify-end">
                        <button className="btn-primary flex items-center gap-2">
                            <Filter className="h-4 w-4" /> Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 gap-4 mt-6">
                {jobs.map((job) => (
                    <div key={job.id} className="card hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">

                        <div className="space-y-3 flex-1">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                                <div className="flex items-center gap-2 text-brand-600 font-medium mt-1">
                                    <Building className="h-4 w-4" /> {job.company}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</div>
                                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</div>
                                <div className="flex items-center gap-1.5 font-medium text-green-600">₹ {job.salary}</div>
                            </div>

                            <div className="flex gap-2 text-xs">
                                {job.tags.map(tag => (
                                    <span key={tag} className="bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-medium border border-brand-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex sm:flex-col gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none btn-primary bg-white !text-brand-600 border border-brand-600 hover:bg-brand-50 shadow-none">
                                View Details
                            </button>
                            <button className="flex-1 sm:flex-none btn-primary shadow-sm hover:shadow-brand-300">
                                Apply Now
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

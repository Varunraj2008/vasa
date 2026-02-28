import { Star, Upload, CheckCircle2, History, Briefcase, MapPin, Building, Award, Shield, AlertCircle } from "lucide-react";

export default function MyProfilePage() {
    const profile = {
        name: "Rahul Sharma",
        email: "rahul.s@example.com",
        rating: 4.8,
        avatar: "RS",
        panVerified: false,
        aadhaarVerified: true,
        expSummary: "5+ years of experience in full-stack web development specializing in React and Node.js. Successfully delivered 20+ freelance projects.",
        desiredJob: "Full-time / Contract",
        locationPref: "Bangalore or Remote",
        industryPref: "IT & Software",
        skills: ["React", "Next.js", "Node.js", "TailwindCSS", "PostgreSQL"],
        history: [
            { id: 1, job: "Frontend Re-architecture", date: "Oct 12, 2023", earned: "₹45,000" },
            { id: 2, job: "API Development", date: "Sep 05, 2023", earned: "₹30,000" },
            { id: 3, job: "UI/UX Consultation", date: "Aug 18, 2023", earned: "₹15,000" },
        ]
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-500 mt-1">Manage your personal information, verifications, and professional details.</p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Left Column: Card & Verifications */}
                <div className="md:col-span-1 space-y-6">

                    {/* Profile Card */}
                    <div className="card text-center relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-brand opacity-20"></div>
                        <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-3xl mb-4 relative z-10 border-4 border-white shadow-md mt-6">
                            {profile.avatar}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="text-sm text-gray-500 mb-3">{profile.email}</p>

                        <div className="flex items-center justify-center gap-1 text-yellow-500 font-medium bg-yellow-50 px-3 py-1 rounded-full mb-4">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{profile.rating} / 5.0</span>
                        </div>

                        <button className="w-full btn-primary bg-white !text-brand-600 border border-brand-200 hover:border-brand-600 hover:bg-brand-50 shadow-sm text-sm py-2 group">
                            Edit Profile
                        </button>
                    </div>

                    {/* Verification Uploads */}
                    <div className="card space-y-5">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-brand-100 pb-2">
                            <Shield className="h-5 w-5 text-brand-600" />
                            Identity Verification
                        </h3>

                        <div className="space-y-4">
                            {/* PAN */}
                            <div className="flex items-center justify-between p-3 border border-brand-100 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-full ${profile.panVerified ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                        {profile.panVerified ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">PAN Card</p>
                                        <p className="text-xs text-gray-500">{profile.panVerified ? 'Verified' : 'Pending Upload'}</p>
                                    </div>
                                </div>
                                {!profile.panVerified && (
                                    <label className="cursor-pointer text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 p-2 rounded-lg transition-colors">
                                        <Upload className="h-4 w-4" />
                                        <input type="file" className="hidden" />
                                    </label>
                                )}
                            </div>

                            {/* Aadhaar */}
                            <div className="flex items-center justify-between p-3 border border-brand-100 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-full ${profile.aadhaarVerified ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                        {profile.aadhaarVerified ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Aadhaar Card</p>
                                        <p className="text-xs text-gray-500">{profile.aadhaarVerified ? 'Verified' : 'Pending Upload'}</p>
                                    </div>
                                </div>
                                {!profile.aadhaarVerified && (
                                    <label className="cursor-pointer text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 p-2 rounded-lg transition-colors">
                                        <Upload className="h-4 w-4" />
                                        <input type="file" className="hidden" />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details & History */}
                <div className="md:col-span-2 space-y-6">

                    {/* Professional Details */}
                    <div className="card space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-brand-100 pb-3 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-brand-600" /> Professional Details
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-1">Experience Summary</h4>
                                <p className="text-sm text-gray-600 leading-relaxed bg-brand-50 p-4 rounded-lg border border-brand-100">
                                    {profile.expSummary}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <Briefcase className="h-3.5 w-3.5" /> Desired Job Type
                                    </span>
                                    <p className="text-sm font-medium text-gray-900">{profile.desiredJob}</p>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" /> Location Preferences
                                    </span>
                                    <p className="text-sm font-medium text-gray-900">{profile.locationPref}</p>
                                </div>

                                <div className="space-y-1 sm:col-span-2">
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <Building className="h-3.5 w-3.5" /> Industry Preferences
                                    </span>
                                    <p className="text-sm font-medium text-gray-900">{profile.industryPref}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                                    <Award className="h-4 w-4 text-brand-600" /> Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills.map((skill, idx) => (
                                        <span key={idx} className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-brand-100 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Job History */}
                    <div className="card space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-brand-100 pb-3 flex items-center gap-2">
                            <History className="h-5 w-5 text-brand-600" /> Job History
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-brand-100">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Job Name</th>
                                        <th className="px-4 py-3 font-semibold">Completion Date</th>
                                        <th className="px-4 py-3 font-semibold text-right">Amount Earned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.history.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-100 hover:bg-brand-50/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-900">{item.job}</td>
                                            <td className="px-4 py-3 text-gray-600">{item.date}</td>
                                            <td className="px-4 py-3 text-green-600 font-semibold text-right">{item.earned}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

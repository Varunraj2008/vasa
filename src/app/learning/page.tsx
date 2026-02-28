import { Play, RotateCcw, Clock, Globe } from "lucide-react";

export default function LearningHubPage() {
    const courses = [
        {
            id: 1,
            title: "Advanced React Patterns",
            description: "Master complex state management and performance optimization in React applications.",
            language: "English",
            duration: "4h 30m",
            progress: 65,
            thumbnail: "bg-blue-100 text-blue-500" // Placeholder for thumbnail
        },
        {
            id: 2,
            title: "Introduction to Figma Design",
            description: "Learn the basics of UI/UX design, wireframing, and prototyping using Figma.",
            language: "Hindi",
            duration: "2h 15m",
            progress: 0,
            thumbnail: "bg-pink-100 text-pink-500"
        },
        {
            id: 3,
            title: "Node.js Backend Architecture",
            description: "Build scalable and secure APIs with Express and Postgres database.",
            language: "English",
            duration: "5h 45m",
            progress: 100,
            thumbnail: "bg-green-100 text-green-500"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Hub</h1>
                <p className="text-gray-500 mt-1">Upgrade your skills with our curated video courses.</p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {courses.map((course) => (
                    <div key={course.id} className="card p-0 overflow-hidden flex flex-col h-full hover:shadow-lg transition-all group">

                        {/* Thumbnail Placeholder */}
                        {/* The prompt requests a 'video thumbnail'. Using a colored block with Play icon as a sleek placeholder. */}
                        <div className={`h-48 w-full ${course.thumbnail} flex items-center justify-center relative group-hover:opacity-90 transition-opacity`}>
                            <button className="h-12 w-12 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform text-brand-600">
                                <Play className="h-6 w-6 ml-1" />
                            </button>

                            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 flex items-center gap-1 rounded uppercase tracking-wider">
                                <Globe className="h-3 w-3" />
                                {course.language}
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-2 group-hover:text-brand-600 transition-colors">
                                {course.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">
                                {course.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-600 font-medium mb-4">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {course.duration}
                                </div>
                                <div>{course.progress}% Completed</div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
                                <div
                                    className="bg-brand-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-auto">
                                <button
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm transition-colors ${course.progress > 0 && course.progress < 100
                                            ? "bg-brand-50 text-brand-700 hover:bg-brand-100"
                                            : course.progress === 100
                                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                : "bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                                        }`}
                                >
                                    <Play className="h-4 w-4" />
                                    {course.progress === 0 ? "Start Course" : course.progress === 100 ? "Watch Again" : "Resume"}
                                </button>

                                {course.progress > 0 && (
                                    <button className="flex items-center justify-center px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors group-hover:border-brand-200">
                                        <RotateCcw className="h-4 w-4" />
                                        <span className="sr-only">Rewind</span>
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

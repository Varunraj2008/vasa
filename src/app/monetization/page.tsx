"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { IndianRupee, Briefcase, TrendingUp } from 'lucide-react';

export default function MonetizationPage() {
    const totalAmount = "1,45,000";
    const totalJobs = 24;

    const data = [
        { name: 'Jan', earnings: 4000 },
        { name: 'Feb', earnings: 3000 },
        { name: 'Mar', earnings: 5000 },
        { name: 'Apr', earnings: 9000 },
        { name: 'May', earnings: 12000 },
        { name: 'Jun', earnings: 18000 },
        { name: 'Jul', earnings: 25000 },
        { name: 'Aug', earnings: 22000 },
        { name: 'Sep', earnings: 30000 },
        { name: 'Oct', earnings: 45000 },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Monetization</h1>
                <p className="text-gray-500 mt-1">Track your earnings and job history on VaSa.</p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="card p-6 flex items-center gap-6 border-l-4 border-l-green-500">
                    <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <IndianRupee className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Amount Benefited</p>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            ₹{totalAmount}
                            <span className="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold border border-green-100">
                                <TrendingUp className="h-3 w-3" /> +12%
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="card p-6 flex items-center gap-6 border-l-4 border-l-brand-600">
                    <div className="h-14 w-14 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                        <Briefcase className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Jobs Completed</p>
                        <h2 className="text-3xl font-bold text-gray-900">{totalJobs}</h2>
                    </div>
                </div>

            </div>

            {/* Bar Chart Section */}
            <div className="card p-6 h-[400px]">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Earnings</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => `₹${value >= 1000 ? value / 1000 + 'K' : value}`}
                            dx={-10}
                        />
                        <Tooltip
                            cursor={{ fill: '#f5f3ff' }}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #ddd6fe', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number | undefined) => [`₹${value || 0}`, 'Earnings']}
                        />
                        <Bar
                            dataKey="earnings"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

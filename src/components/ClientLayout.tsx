"use client";

import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { usePathname } from 'next/navigation';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/signup';

    if (isAuthPage) {
        return <main className="min-h-screen bg-brand-50 flex items-center justify-center">{children}</main>;
    }

    return (
        <>
            <Navbar />
            <div className="flex min-h-[calc(100vh-64px)]">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </>
    );
}

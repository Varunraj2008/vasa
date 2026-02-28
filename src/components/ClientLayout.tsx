"use client";

import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/signup';

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (isAuthPage) {
        return <main className="min-h-screen bg-brand-50 flex items-center justify-center">{children}</main>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <div className="flex h-[calc(100vh-64px)] overflow-hidden">
                <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}

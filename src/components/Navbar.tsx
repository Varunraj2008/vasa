import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh(); // Force a re-evaluation of Server Components
    };

    // Don't show navbar on login/signup pages
    if (pathname === '/' || pathname === '/login' || pathname === '/signup') return null;

    return (
        <header className="bg-white border-b border-brand-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-2">
                <Link href="/dashboard" className="flex items-center">
                    <span className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent italic tracking-tighter">VaSa</span>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold overflow-hidden">
                        <User size={16} />
                    </div>
                </div>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors" title="Sign Out">
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home, Search, PlusCircle, Users, BookOpen,
    UsersRound, User, Bell, Wallet, Star, IndianRupee, ShieldCheck
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Job Search', href: '/jobs/search', icon: Search },
    { name: 'Job Post', href: '/jobs/post', icon: PlusCircle },
    { name: 'Hire Talent', href: '/hire', icon: Users },
    { name: 'Learning Hub', href: '/learning', icon: BookOpen },
    { name: 'My Team', href: '/team', icon: UsersRound },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Vasa Wallet', href: '/wallet', icon: Wallet },
    { name: 'Membership', href: '/membership', icon: Star },
    { name: 'Monetization', href: '/monetization', icon: IndianRupee },
    { name: 'Safety Settings', href: '/safety', icon: ShieldCheck },
];

import { X } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    // Don't show sidebar on login/signup pages
    if (pathname === '/' || pathname === '/login' || pathname === '/signup') return null;

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-brand-200 transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col pb-6 shadow-xl
            md:relative md:translate-x-0 md:shadow-sm md:h-full md:z-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex items-center justify-between px-6 mb-6 md:hidden">
                <span className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent italic italic tracking-tighter">VaSa</span>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-brand-600 transition-colors">
                    <X size={20} />
                </button>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-brand-50 text-brand-600'
                                : 'text-gray-700 hover:bg-brand-50 hover:text-brand-600'
                                }`}
                        >
                            <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-brand-600'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter,usePathname  } from 'next/navigation';

const Navbar = () => {

    const router = useRouter()
    const pathname = usePathname();
    const isAuthPage = pathname === "/";

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.push("/");
    };

    const navLinks = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        // {
        //     label: "My Tasks",
        //     href: "/tasks",
        // },
        // {
        //     label: "Create Task",
        //     href: "/tasks/create",
        // },
    ];

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-sm font-bold text-white">
                        T
                    </div>

                    <span className="text-lg font-semibold text-slate-900">
                        TaskFlow
                    </span>
                </Link>

                {/* Nav Links */}
                <nav className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-purple-600transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600">
                        Sumit Kumar
                    </span>

                    {!isAuthPage && <button
                        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 flex items-center justify-center gap-2 cursor-pointer"
                        onClick={handleLogout}
                        disabled={loading}
                    >
                        <h2>{loading ? "Logging out..." : "Logout"}</h2>
                        <span><LogOut /></span>

                    </button>}
                </div>
            </div>
        </header>
    )
}

export default Navbar

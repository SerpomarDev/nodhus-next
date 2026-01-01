"use client";

import { useState, useEffect } from 'react';
import { Menu, LogOut, User, Clock, Moon, Sun } from 'lucide-react';
import { useSession } from '@/hooks/useSession';
import { UserProfile } from '@/types/dashboard';
import { useTheme } from "next-themes";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
    const { timeLeft, handleLogout } = useSession();
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');
            const userId = localStorage.getItem('userId');
            if (!token || !userId) return;
            try {
                const res = await fetch(`https://esenttiapp-production.up.railway.app/api/usuario/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) setUser(await res.json());
            } catch (e) { console.error(e); }
        };
        fetchUser();
    }, []);

    return (
        // CAMBIO: 'sticky top-0' en lugar de 'fixed'.
        // Se pega arriba pero respeta el ancho de su contenedor padre.
        // Añadido z-40 para estar sobre el contenido pero bajo el sidebar (z-50).
        <header className="sticky top-0 z-40 w-full h-14 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-300">

            <div className="flex items-center justify-between h-full px-4">

                {/* Lado Izquierdo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        aria-label="Toggle Menu"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="hidden md:flex flex-col">
                        <h1 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">Nodhus</h1>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Panel de Control</span>
                    </div>
                </div>

                {/* Lado Derecho */}
                <div className="flex items-center gap-2 md:gap-4">

                    {/* Botón Tema */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-500 dark:text-yellow-400 transition-colors focus:outline-none"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Timer */}
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-mono border border-blue-100 dark:border-blue-800">
                        <Clock size={12} />
                        <span>{timeLeft}</span>
                    </div>

                    {/* Separador */}
                    <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 hidden md:block"></div>

                    {/* Perfil */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-2 focus:outline-none group"
                        >
                            <div className="text-right hidden md:block">
                                <p className="text-xs font-bold text-slate-700 dark:text-white group-hover:text-blue-600 transition-colors">{user ? user.primer_nombre : '...'}</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{user?.cargo || 'Usuario'}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md ring-2 ring-transparent group-hover:ring-blue-200 dark:group-hover:ring-blue-900 transition-all">
                                <User size={16} />
                            </div>
                        </button>

                        {/* Menú Desplegable Mejorado */}
                        {showProfileMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-1">

                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 md:hidden">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">{user?.primer_nombre} {user?.primer_apellido}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                                    </div>

                                    <button className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors focus:outline-none">
                                        <User size={15} className="text-slate-400 dark:text-slate-500" /> Mi Perfil
                                    </button>

                                    <div className="my-1 border-t border-gray-100 dark:border-slate-800"></div>

                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors focus:outline-none">
                                        <LogOut size={15} /> Cerrar Sesión
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
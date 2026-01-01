"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { ChevronDown, LayoutDashboard, Circle, LogOut } from 'lucide-react';
import { Role, MenuItem } from '@/types/dashboard';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
    const pathname = usePathname();
    const [menuGroups, setMenuGroups] = useState<Record<string, MenuItem[]>>({});
    const [loading, setLoading] = useState(true);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    useEffect(() => {
        async function fetchMenu() {
            const token = localStorage.getItem('authToken');
            const rolId = Cookies.get('rol_Id');
            if (!token || !rolId) return;
            try {
                const [rolesRes, menuRes] = await Promise.all([
                    fetch('https://esenttiapp-production.up.railway.app/api/uploadroles', { headers: { Authorization: `Bearer ${token}` } }),
                    fetch('https://esenttiapp-production.up.railway.app/api/createmenu', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                if (!rolesRes.ok || !menuRes.ok) return;
                const roles: Role[] = await rolesRes.json();
                const menuItems: MenuItem[] = await menuRes.json();
                const userRole = roles.find(r => r.id == Number(rolId));
                if (!userRole) return;

                const allowedItems = new Set(userRole.menu_item.split(',').map(Number));
                const allowedSubItems = new Set(userRole.menu_subitem.split(',').map(Number));
                const groups: Record<string, MenuItem[]> = {};

                menuItems.forEach(item => {
                    if (allowedItems.has(item.id_propio) && allowedSubItems.has(item.id_subitem)) {
                        if (!groups[item.nombre]) groups[item.nombre] = [];
                        groups[item.nombre].push(item);
                    }
                });
                setMenuGroups(groups);
            } catch (error) { console.error(error); } finally { setLoading(false); }
        }
        fetchMenu();
    }, []);

    const handleGroupClick = (groupName: string) => {
        if (!isOpen) {
            setIsOpen(true);
            setOpenGroups({ [groupName]: true });
        } else {
            setOpenGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
        }
    };

    return (
        <aside
            className={`
                fixed left-0 top-0 z-50 h-screen 
                bg-white dark:bg-slate-950 
                border-r border-gray-200 dark:border-slate-800 
                shadow-xl dark:shadow-2xl
                transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-16'} 
            `}
        >
            {/* Header del Sidebar */}
            <div className="h-14 flex items-center justify-center border-b border-gray-100 dark:border-slate-800/50 relative">
                <div className={`flex items-center gap-2 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute'}`}>
                    <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">N</div>
                    <span className="font-bold text-lg tracking-wide text-slate-800 dark:text-white whitespace-nowrap">NODHUS</span>
                </div>

                <div className={`absolute transition-all duration-300 ${!isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">N</div>
                </div>
            </div>

            {/* Cuerpo del Sidebar */}
            <div className="h-[calc(100vh-112px)] overflow-y-auto custom-scrollbar py-4 px-2 space-y-1">

                <Link
                    href="/dashboard"
                    className={`
                        group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-[13px]
                        ${pathname === '/dashboard'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-600 dark:text-white shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}
                    `}
                >
                    <div className={`${!isOpen && 'mx-auto'}`}>
                        <LayoutDashboard size={18} className="shrink-0" />
                    </div>
                    <span className={`font-medium whitespace-nowrap transition-all duration-300 ${!isOpen ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-auto opacity-100 block'}`}>
                        Inicio
                    </span>
                </Link>

                <div className="my-2 border-t border-gray-100 dark:border-slate-800/50 mx-2"></div>

                {loading ? (
                    <div className="flex justify-center mt-4"><div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                    Object.entries(menuGroups).map(([groupName, items]) => {
                        const isActiveGroup = openGroups[groupName];
                        const hasActiveChild = items.some(i => pathname === i.ruta.replace('.html', ''));

                        return (
                            <div key={groupName} className="mb-0.5">
                                <button
                                    onClick={() => handleGroupClick(groupName)}
                                    className={`
                                        group w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-[13px] focus:outline-none
                                        ${(isActiveGroup || hasActiveChild)
                                            ? 'bg-blue-50/50 text-blue-600 dark:bg-slate-800/50 dark:text-blue-400 font-medium'
                                            : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-blue-300'}
                                    `}
                                >
                                    <div className={`flex items-center gap-3 ${!isOpen && 'mx-auto'}`}>
                                        <div className="text-lg w-5 text-center flex justify-center shrink-0" dangerouslySetInnerHTML={{ __html: items[0].icono_mi }} />
                                        <span className={`whitespace-nowrap transition-all duration-300 ${!isOpen ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-auto opacity-100 block'}`}>
                                            {groupName}
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${isActiveGroup ? 'rotate-180' : ''}`} />
                                    )}
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${(isActiveGroup && isOpen) ? 'max-h-96 opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
                                    <div className="ml-3 pl-3 border-l border-gray-200 dark:border-slate-800 space-y-0.5 py-1">
                                        {items.map((item, index) => {
                                            const itemPath = item.ruta.replace('.html', '');
                                            const isActive = pathname === itemPath;
                                            return (
                                                <Link
                                                    key={`${item.id}-${index}`}
                                                    href={itemPath}
                                                    className={`
                                                        flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] transition-all
                                                        ${isActive
                                                            ? 'text-blue-600 bg-blue-50 dark:text-white dark:bg-blue-600/20 font-medium'
                                                            : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/30'}
                                                    `}
                                                >
                                                    <Circle size={4} className={`shrink-0 ${isActive ? 'fill-blue-500 text-blue-500' : 'text-slate-300'}`} />
                                                    <span className="truncate">{item.descripcion}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            {/* Footer Sidebar */}
            <div className="absolute bottom-0 w-full p-2 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <button className={`w-full flex items-center px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 transition-all group focus:outline-none ${!isOpen && 'justify-center'}`}>
                    <LogOut size={18} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
                    <span className={`text-[13px] font-medium ml-3 whitespace-nowrap transition-all duration-300 ${!isOpen ? 'w-0 opacity-0 overflow-hidden hidden' : 'w-auto opacity-100 block'}`}>
                        Cerrar Sesión
                    </span>
                </button>
            </div>
        </aside>
    );
}
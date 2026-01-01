"use client";

import { useState } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import Header from "@/features/dashboard/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        // Usamos flex para organizar el layout horizontalmente
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 flex">

            {/* Sidebar fijo a la izquierda */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Contenedor principal.
                - 'flex-1': Ocupa todo el espacio restante.
                - 'md:ml-...' : Aplica el margen para no quedar debajo del sidebar.
                - 'flex flex-col': Organiza el header y el main verticalmente.
                - ¡SIN 'w-full'! Esto arregla el scroll horizontal.
            */}
            <div
                className={`
                    flex-1 flex flex-col min-h-screen
                    transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}
                `}
            >
                {/* Header: ahora es 'sticky' y vive dentro de este flujo */}
                <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

                {/* Contenido de la página */}
                <main className="flex-1 p-6 w-full max-w-[1920px] mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
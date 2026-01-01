"use client";
import { useTheme } from "next-themes";
import Image from "next/image"; // Si tienes las imágenes en public

export default function DashboardHome() {
    const { theme } = useTheme();

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">

            {/* Hero Section / Banner de Bienvenida */}
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl group">
                {/* Imagen de Fondo con efecto Parallax simple */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: "url('/images/FOTO-30.jpg')" }} // Asegúrate de mover tus imágenes a /public/images/
                ></div>

                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
                        BIENVENIDO A <span className="text-blue-300">NODHUS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-xl font-light">
                        Tu nodo digital centralizado. Gestiona operaciones, tickets y logística en un solo lugar.
                    </p>

                    <div className="mt-6 flex gap-3">
                        <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-blue-50 transition-colors">
                            Ver Novedades
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid de Accesos Rápidos (Ejemplo Moderno) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Tarjeta 1 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        {/* Icono (Puedes usar lucide-react) */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Operaciones Rápidas</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Accede a las herramientas más utilizadas de tu día a día.</p>
                </div>

                {/* Tarjeta 2 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Indicadores</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Visualiza el rendimiento y métricas clave de Serpomar.</p>
                </div>

                {/* Tarjeta 3 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Soporte IT</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">¿Necesitas ayuda? Crea un ticket de soporte inmediatamente.</p>
                </div>

            </div>
        </div>
    );
}
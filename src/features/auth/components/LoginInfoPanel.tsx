import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function LoginInfoPanel() {
    return (
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-blue-700 via-blue-800 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-slate-900 p-10 text-white flex-col justify-between relative overflow-hidden transition-colors duration-500">

            {/* Header - LOGO SERPOMAR */}
            <div className="flex justify-between items-center z-10">
                {/* Contenedor del logo */}
                <div className="relative h-10 w-48">
                    {/* IMAGEN MODO CLARO: serpomar_off.png (Se oculta en dark) */}
                    <Image
                        src="/serpomar_off.png"
                        alt="Serpomar S.A.S"
                        fill
                        className="object-contain object-left dark:hidden transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, 200px"
                    />
                    {/* IMAGEN MODO OSCURO: serpomar.png (Solo visible en dark) */}
                    <Image
                        src="/serpomar.png"
                        alt="Serpomar S.A.S"
                        fill
                        className="object-contain object-left hidden dark:block transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, 200px"
                    />
                </div>

                {/* Indicador de estado */}
                <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
            </div>

            {/* Centro - LOGO NODHUS */}
            <div className="flex flex-col items-center justify-center text-center z-10 space-y-8 flex-grow">

                {/* Contenedor principal del logo */}
                <div className="relative h-32 w-80 mb-4 group">
                    <div className="absolute -inset-4 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* IMAGEN MODO CLARO: nodhus.png */}
                    <Image
                        src="/nodhus.png"
                        alt="NODHUS Logo"
                        fill
                        priority
                        className="object-contain drop-shadow-2xl relative z-10 dark:hidden"
                        sizes="(max-width: 768px) 100vw, 400px"
                    />

                    {/* IMAGEN MODO OSCURO: nodhus_off.png */}
                    <Image
                        src="/nodhus_off.png"
                        alt="NODHUS Logo"
                        fill
                        priority
                        className="object-contain drop-shadow-2xl relative z-10 hidden dark:block"
                        sizes="(max-width: 768px) 100vw, 400px"
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-medium text-blue-50">Bienvenido de nuevo</h2>

                    {/* Selector de Empresa */}
                    <div className="bg-black/20 backdrop-blur-sm p-1.5 rounded-full inline-flex border border-white/10">
                        <button className="bg-white text-blue-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg transform transition-transform hover:scale-105">
                            NODHUS
                        </button>
                        <button className="text-blue-200 px-6 py-2 rounded-full text-sm font-bold hover:text-white hover:bg-white/10 transition-all">
                            SIIHUB
                        </button>
                    </div>
                </div>

                <p className="text-blue-100/80 text-sm max-w-sm leading-relaxed font-light">
                    Plataforma integral de gestión logística. Control, visibilidad y eficiencia en cada paso de tu cadena de suministro.
                </p>
            </div>

            {/* Footer */}
            <div className="z-10 text-center">
                <a href="#" className="inline-flex items-center text-xs text-blue-300 hover:text-white transition-colors gap-1 group">
                    Visitar sitio web corporativo
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-40 animate-pulse"></div>
            <div className="absolute -top-32 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-30 animate-pulse delay-1000"></div>
        </div>
    );
}
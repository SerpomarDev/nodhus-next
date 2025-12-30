"use client";
import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-8 lg:p-12 flex flex-col justify-center transition-colors duration-300">

            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">Iniciar Sesión</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Ingresa tus credenciales para acceder al panel.
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Usuario */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Usuario</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="ej. jgarcia"
                            className="block w-full pl-10 pr-3 py-3.5 bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Contraseña */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Contraseña</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="block w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Extras */}
                <div className="flex items-center justify-between text-sm mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:ring-offset-slate-800" />
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Recordarme</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                {/* Botones */}
                <div className="space-y-4 pt-2">
                    <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5">
                        Ingresar al Sistema
                    </button>
                    <button type="button" className="w-full flex justify-center py-3.5 px-4 rounded-lg shadow-sm text-sm font-bold transition-all border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:bg-transparent dark:hover:bg-slate-700/50">
                        Registrar nueva cuenta
                    </button>
                </div>
            </form>

            <div className="mt-auto pt-6 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    &copy; 2025 Serpomar SAS. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
}
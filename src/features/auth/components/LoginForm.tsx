"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Cookies from 'js-cookie';

interface LoginFormProps {
    onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
    const router = useRouter();

    // Estados del formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // Estado para el checkbox

    // Estados de UI
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Estado para el Modal de Auto-Login
    const [autoLogin, setAutoLogin] = useState<{ show: boolean; name: string }>({ show: false, name: '' });

    // 1. EFECTO: Comprobar si hay sesión guardada al cargar
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const savedName = localStorage.getItem('userName'); // Recuperamos el nombre guardado
        const isRemembered = Cookies.get('remember_me'); // Cookie de 30 días

        if (token && isRemembered && savedName) {
            // Si todo existe, lanzamos el modal de bienvenida automática
            setAutoLogin({ show: true, name: savedName });

            // Esperamos 2 segundos para que el usuario lea el saludo y redirigimos
            const timer = setTimeout(() => {
                router.push('/dashboard');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [router]);

    // Función auxiliar para obtener datos del usuario y guardar el nombre
    const fetchAndSaveUserProfile = async (userId: string, token: string) => {
        try {
            const res = await fetch(`https://esenttiapp-production.up.railway.app/api/usuario/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const userData = await res.json();
                // Guardamos el nombre para el saludo futuro
                const fullName = `${userData.primer_nombre} ${userData.primer_apellido}`;
                localStorage.setItem('userName', fullName);
                return fullName; // Retornamos el nombre para usarlo ya
            }
        } catch (e) {
            console.error("No se pudo guardar el nombre del usuario", e);
        }
        return "Usuario"; // Fallback
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("https://esenttiapp-production.up.railway.app/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario: username, password: password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Validación de Roles
                if (data.rol_id == 99 || data.rol_id == 100 || data.rol_id == null) {
                    setError("Usuario no admitido. Contacte con el área de TIC.");
                    setIsLoading(false);
                    return;
                }

                // Guardar datos básicos
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", data.user_id);
                localStorage.setItem("email", data.email);

                // Timestamps de sesión
                const sessionDuration = 45 * 60 * 1000;
                localStorage.setItem("sessionExpiryTimestamp", (Date.now() + sessionDuration).toString());
                localStorage.setItem("lastActivityTimestamp", Date.now().toString());

                // Guardar Cookie de Rol
                Cookies.set('rol_Id', data.rol_id, { expires: 7 });

                // --- LÓGICA DE RECORDARME ---
                if (rememberMe) {
                    // Si marcó "Recordarme", guardamos una cookie bandera por 30 días
                    Cookies.set('remember_me', 'true', { expires: 30 });
                } else {
                    // Si no, la borramos por seguridad
                    Cookies.remove('remember_me');
                }

                // Obtenemos y guardamos el nombre del usuario antes de redirigir
                await fetchAndSaveUserProfile(data.user_id, data.token);

                router.push('/dashboard');

            } else {
                setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
            }

        } catch (err) {
            console.error(err);
            setError("Ocurrió un error de conexión.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- RENDERIZADO DEL MODAL DE BIENVENIDA ---
    if (autoLogin.show) {
        return (
            <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
                {/* Fondo animado sutil */}
                <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                        <User size={40} className="text-blue-600 dark:text-blue-400" />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        ¡Hola, {autoLogin.name.split(' ')[0]}!
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
                        Qué bueno verte de nuevo. Estamos preparando tu panel de control...
                    </p>

                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-3 rounded-full shadow-md border border-slate-100 dark:border-slate-700">
                        <Loader2 className="animate-spin text-blue-600" size={20} />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Iniciando sesión...</span>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO DEL FORMULARIO NORMA ---
    return (
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-8 lg:p-12 flex flex-col justify-center transition-colors duration-300">

            <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">Iniciar Sesión</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Ingresa tus credenciales para acceder al panel.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300 animate-pulse">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
                {/* Usuario */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Usuario</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                            placeholder="ej. jgarcia"
                            className="block w-full pl-10 pr-3 py-3.5 bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            placeholder="••••••••"
                            className="block w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Checkbox Recordarme */}
                <div className="flex items-center justify-between text-sm mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer group select-none">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:ring-offset-slate-800 cursor-pointer"
                        />
                        <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                            Recordarme <span className="text-[10px] text-slate-400 font-normal">(30 días)</span>
                        </span>
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                {/* Botones */}
                <div className="space-y-4 pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Validando...
                            </>
                        ) : (
                            "Ingresar al Sistema"
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3.5 px-4 rounded-lg shadow-sm text-sm font-bold transition-all border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:bg-transparent dark:hover:bg-slate-700/50 cursor-pointer"
                    >
                        Registrar nueva cuenta
                    </button>
                </div>
            </form>

            <div className="mt-auto pt-6 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    &copy; {new Date().getFullYear()} Serpomar SAS. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
}
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Hook para redirección
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie'; // Asegúrate de tener instalado: npm install js-cookie

// Definimos la interfaz para recibir la función que cambia al registro
interface LoginFormProps {
    onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
    const router = useRouter();

    // Estados para inputs y UI
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función principal de Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Evitar recarga de página
        setIsLoading(true);
        setError(null);

        try {
            // 1. Petición a la API
            const response = await fetch("https://esenttiapp-production.up.railway.app/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario: username, password: password }),
            });

            if (response.ok) {
                const data = await response.json();

                // 2. Validación de ROLES (Tu lógica de negocio)
                // Roles no permitidos: 99, 100 o null
                if (data.rol_id == 99 || data.rol_id == 100 || data.rol_id == null) {
                    setError("Usuario no admitido. Contacte con el área de TIC.");
                    setIsLoading(false);
                    return; // Detenemos la ejecución
                }

                // 3. Cálculos de expiración (45 minutos)
                const sessionDuration = 45 * 60 * 1000;
                const expiryTimestamp = Date.now() + sessionDuration;

                // 4. Guardar en LocalStorage
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userId", data.user_id);
                localStorage.setItem("cliente", data.cliente);
                localStorage.setItem("email", data.email);
                localStorage.setItem("sessionExpiryTimestamp", expiryTimestamp.toString());
                localStorage.setItem("lastActivityTimestamp", Date.now().toString());

                // 5. Guardar Cookie (Usando js-cookie)
                Cookies.set('rol_Id', data.rol_id, { expires: 7 }); // Expira en 7 días

                // 6. Redirección exitosa
                // Cambia '/dashboard' por la ruta principal de tu aplicación
                router.push('/dashboard');

            } else {
                // Error de credenciales (401, 403, etc)
                setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
            }

        } catch (err) {
            console.error("Error de conexión:", err);
            setError("Ocurrió un error de conexión con el servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-8 lg:p-12 flex flex-col justify-center transition-colors duration-300">

            <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">Iniciar Sesión</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Ingresa tus credenciales para acceder al panel.
                </p>
            </div>

            {/* Mensaje de Error Visual */}
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
                            placeholder="Ingrese su usuario"
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

                {/* Checkbox y Olvidé contraseña */}
                <div className="flex items-center justify-between text-sm mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:ring-offset-slate-800" />
                        <span className="text-slate-600 dark:text-slate-300 font-medium">Recordarme</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                {/* Botones de Acción */}
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
                        onClick={onSwitchToRegister} // Acción para cambiar al form de registro
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
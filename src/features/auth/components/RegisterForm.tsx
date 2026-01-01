"use client";

import { useState } from 'react';
import {
    User, Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, CheckCircle,
    ArrowLeft, Phone, Briefcase, Calendar, CreditCard, FileText
} from 'lucide-react';

interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        id_tipo_identificacion: '',
        identificacion: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        email: '',
        cargo: '',
        telefono: '',
        fecha_nacimiento: '',
        password: '',
        password_confirmation: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (formData.password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setError("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://esenttiapp-production.up.railway.app/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }

            setSuccess(true);
            setTimeout(() => {
                onSwitchToLogin();
            }, 2000);

        } catch (err: any) {
            setError(err.message || "Ocurrió un error al intentar registrarse.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-8 flex flex-col justify-center items-center text-center transition-colors duration-300">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">¡Registro Exitoso!</h2>
                <p className="text-slate-500 dark:text-slate-400">Tus datos han sido guardados correctamente.<br />Redirigiendo...</p>
            </div>
        );
    }

    // Clases comunes para reutilizar y evitar desorden (Inputs normales y con icono)
    const inputClass = "block w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500";
    const inputIconClass = "block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500";
    const labelClass = "block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 ml-1";

    return (
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-800 p-6 lg:p-10 flex flex-col transition-colors duration-300 relative overflow-y-auto max-h-screen custom-scrollbar">

            <button
                onClick={onSwitchToLogin}
                className="self-start mb-6 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 text-sm font-medium sticky top-0 bg-white dark:bg-slate-800 z-10 py-2 w-full"
            >
                <ArrowLeft size={16} /> Volver al Login
            </button>

            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white tracking-tight">Registro de Usuario</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Completa la información corporativa.</p>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300 animate-pulse">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister}>

                {/* SECCIÓN 1: IDENTIFICACIÓN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Tipo Doc</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileText className="h-4 w-4 text-slate-400" />
                            </div>
                            <select
                                name="id_tipo_identificacion"
                                value={formData.id_tipo_identificacion}
                                onChange={handleChange}
                                required
                                className={`${inputIconClass} appearance-none`}
                            >
                                <option value="">Seleccione...</option>
                                <option value="1">Cédula de ciudadanía</option>
                                <option value="2">Cédula de extranjería</option>
                                <option value="3">Tarjeta de identidad</option>
                                <option value="4">Permiso protección temporal</option>
                                <option value="7">NIT</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Identificación</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CreditCard className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                name="identificacion"
                                type="number"
                                placeholder="Número..."
                                required
                                onChange={handleChange}
                                className={inputIconClass}
                            />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 2: NOMBRES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Primer Nombre</label>
                        <input name="primer_nombre" placeholder="Ej. Juan" required onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Segundo Nombre</label>
                        <input name="segundo_nombre" placeholder="Ej. Andrés (Opcional)" onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                {/* SECCIÓN 3: APELLIDOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Primer Apellido</label>
                        <input name="primer_apellido" placeholder="Ej. García" required onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Segundo Apellido</label>
                        <input name="segundo_apellido" placeholder="Ej. Silva (Opcional)" onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                {/* SECCIÓN 4: DATOS CONTACTO */}
                <div>
                    <label className={labelClass}>Correo Corporativo</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                        <input name="email" type="email" placeholder="correo@empresa.com" required onChange={handleChange} className={inputIconClass} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Cargo</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Briefcase className="h-4 w-4 text-slate-400" />
                            </div>
                            <input name="cargo" type="text" placeholder="Ej. Analista" required onChange={handleChange} className={inputIconClass} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Celular</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-4 w-4 text-slate-400" />
                            </div>
                            <input name="telefono" type="number" placeholder="300..." required onChange={handleChange} className={inputIconClass} />
                        </div>
                    </div>
                </div>

                {/* Fecha Nacimiento */}
                <div>
                    <label className={labelClass}>Fecha de Nacimiento</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-4 w-4 text-slate-400" />
                        </div>
                        <input name="fecha_nacimiento" type="date" required onChange={handleChange} className={`${inputIconClass} text-slate-500 dark:text-slate-300`} />
                    </div>
                </div>

                {/* SECCIÓN 5: SEGURIDAD */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                        <label className={labelClass}>Contraseña</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                required
                                onChange={handleChange}
                                className={`${inputIconClass} pr-10`}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer z-20">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Confirmar</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CheckCircle className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                name="password_confirmation"
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                required
                                onChange={handleChange}
                                className={inputIconClass}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 pb-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...</> : "REGISTRARME"}
                    </button>
                </div>
            </form>
        </div>
    );
}
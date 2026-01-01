"use client";

import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { Moon, Sun } from 'lucide-react';
import LoginForm from '@/features/auth/components/LoginForm';
import LoginInfoPanel from '@/features/auth/components/LoginInfoPanel';
import RegisterForm from '@/features/auth/components/RegisterForm'; // Importar el nuevo componente

export default function LoginPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Estado para controlar la vista: 'login' o 'register'
  const [view, setView] = useState<'login' | 'register'>('login');

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-slate-900"></div>;

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative">

      {/* Fondo dinámico */}
      <div className="absolute inset-0 z-0 bg-gray-100 dark:bg-slate-900 transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/login-bg.jpg')] bg-cover bg-center opacity-10 dark:opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Card Principal */}
      <div className="flex w-full max-w-5xl bg-white dark:bg-slate-800 shadow-2xl rounded-2xl overflow-hidden z-10 min-h-[650px] transition-colors duration-300 border border-gray-200 dark:border-slate-700">

        {/* Panel Izquierdo (Siempre visible, info de la empresa) */}
        <LoginInfoPanel />

        {/* Panel Derecho (Cambia entre Login y Registro) */}
        {view === 'login' ? (
          <LoginForm onSwitchToRegister={() => setView('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setView('login')} />
        )}

      </div>

      {/* Toggle Theme */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-yellow-400 shadow-lg hover:scale-110 transition-all duration-300 border border-gray-200 dark:border-slate-600 cursor-pointer"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </main>
  );
}
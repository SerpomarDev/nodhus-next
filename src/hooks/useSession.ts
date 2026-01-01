"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function useSession() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<string>("--:--");

    useEffect(() => {
        // Configuraciones
        const SESSION_DURATION = 45 * 60 * 1000;

        const checkSession = () => {
            const expiryStr = localStorage.getItem("sessionExpiryTimestamp");
            if (!expiryStr) return;

            const expiry = parseInt(expiryStr);
            const now = Date.now();
            const diff = expiry - now;

            if (diff <= 0) {
                handleLogout();
            } else {
                // Formatear tiempo mm:ss
                const minutes = Math.floor(diff / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        };

        const interval = setInterval(checkSession, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('rol_Id');
        router.push('/'); // Redirigir al login
    };

    return { timeLeft, handleLogout };
}
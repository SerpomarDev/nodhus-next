"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Este componente envuelve la app para darle poderes de tema
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
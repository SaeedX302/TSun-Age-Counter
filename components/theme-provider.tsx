"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "vintage" | "futuristic" | "local" | "handdrawn"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "vintage",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "vintage", ...props }: ThemeProviderProps) {
  // Use lazy initialization with a function to avoid unnecessary re-renders
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get theme from localStorage only on client side
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem("theme") as Theme | null
        return savedTheme || defaultTheme
      } catch (error) {
        console.error("Failed to get theme preference", error)
      }
    }
    return defaultTheme
  })

  // Apply theme class to document element
  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("theme-vintage", "theme-futuristic", "theme-local", "theme-handdrawn")

    // Add the current theme class
    root.classList.add(`theme-${theme}`)
  }, [theme])

  // Memoize the context value to prevent unnecessary re-renders
  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      // Save theme preference
      try {
        localStorage.setItem("theme", newTheme)
      } catch (error) {
        console.error("Failed to save theme preference", error)
      }
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

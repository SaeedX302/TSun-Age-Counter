"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Paintbrush, Zap, Home, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full bg-vintage-paper border-vintage-accent shadow-md">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full shadow-md theme-toggle-button ${theme === "futuristic" ? "animate-pulse" : ""}`}
        >
          {theme === "vintage" && <Paintbrush className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "futuristic" && <Zap className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "local" && <Home className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "handdrawn" && <Pencil className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="theme-dropdown">
        <DropdownMenuItem onClick={() => setTheme("vintage")} className="cursor-pointer theme-menu-item vintage-option">
          <Paintbrush className="mr-2 h-4 w-4" />
          <span>Vintage</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("futuristic")}
          className="cursor-pointer theme-menu-item future-option"
        >
          <Zap className="mr-2 h-4 w-4" />
          <span>Futuristic</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("local")} className="cursor-pointer theme-menu-item local-option">
          <Home className="mr-2 h-4 w-4" />
          <span>Local</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("handdrawn")}
          className="cursor-pointer theme-menu-item handdrawn-option"
        >
          <Pencil className="mr-2 h-4 w-4" />
          <span>Hand Drawn</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

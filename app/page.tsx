import { AgeCalculator } from "@/components/age-calculator"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Simplified decorative elements */}
      <div className="absolute top-8 left-8 opacity-70 hidden md:block theme-vintage-only">{/* Removed image */}</div>

      <div className="absolute bottom-8 right-8 opacity-70 hidden md:block theme-vintage-only">
        {/* Removed image */}
      </div>

      {/* Simplified futuristic theme decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none theme-futuristic-only">
        {/* Removed complex grid */}
      </div>

      {/* Simplified local theme decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none theme-local-only">
        {/* Removed decorations */}
      </div>

      {/* Simplified handdrawn theme decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none theme-handdrawn-only">
        {/* Removed decorations */}
      </div>

      <AgeCalculator />
    </main>
  )
}

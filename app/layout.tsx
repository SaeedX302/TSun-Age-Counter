import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Libre_Baskerville } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-baskerville",
})

export const metadata: Metadata = {
  title: "Eccentric Age Calculator",
  description: "Calculate your age with bizarre and wonderful styles",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${baskerville.variable} font-serif`}>
        {/* SVG Filter for hand-drawn effect - moved from head to body */}
        <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <svg width="0" height="0">
            <filter id="pencil-filter" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
        </div>

        <ThemeProvider defaultTheme="vintage">{children}</ThemeProvider>
      </body>
    </html>
  )
}

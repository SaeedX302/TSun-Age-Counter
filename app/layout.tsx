import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Libre_Baskerville } from "next/font/google"
import "./globals.css"

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
  title: "Chronos | Artisan Age Calculator",
  description: "A premium age calculation experience.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${baskerville.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  )
}

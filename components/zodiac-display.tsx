"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ZodiacSign } from "@/lib/zodiac"

interface ZodiacDisplayProps {
  zodiacSign: ZodiacSign | null
}

export function ZodiacDisplay({ zodiacSign }: ZodiacDisplayProps) {
  if (!zodiacSign) {
    return null
  }

  return (
    <div className="opacity-100 transform-none">
      <Card className="vintage-card relative overflow-hidden">
        <CardHeader className="pb-2 border-b border-vintage-muted">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl vintage-title flex items-center">
              <span className="mr-2">✧</span>
              Astrological Sign
            </CardTitle>
            <span className="text-2xl font-display" role="img" aria-label={zodiacSign.name}>
              {zodiacSign.emoji}
            </span>
          </div>
          <CardDescription className="vintage-subtitle">{zodiacSign.dates}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-16 h-16 flex-shrink-0">
              {/* Simplified zodiac display */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-vintage-paper border border-vintage-muted flex items-center justify-center">
                <span className="text-3xl">{zodiacSign.emoji}</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 flex items-center font-display text-vintage-dark">
                {zodiacSign.name} ({zodiacSign.symbol})
              </h3>
              <p className="text-sm text-vintage-brown font-serif">{zodiacSign.description}</p>
              <div className="mt-2 text-sm font-serif">
                <span className="font-medium">Element:</span> {zodiacSign.element} {getElementEmoji(zodiacSign.element)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getElementEmoji(element: string): string {
  switch (element) {
    case "Fire":
      return "🔥"
    case "Earth":
      return "🌍"
    case "Air":
      return "💨"
    case "Water":
      return "💧"
    default:
      return "✨"
  }
}

function getZodiacEmoji(sign: string): string {
  switch (sign) {
    case "Aries":
      return "🐏"
    case "Taurus":
      return "🐂"
    case "Gemini":
      return "👯"
    case "Cancer":
      return "🦀"
    case "Leo":
      return "🦁"
    case "Virgo":
      return "👧"
    case "Libra":
      return "⚖️"
    case "Scorpio":
      return "🦂"
    case "Sagittarius":
      return "🏹"
    case "Capricorn":
      return "🐐"
    case "Aquarius":
      return "🏺"
    case "Pisces":
      return "🐟"
    default:
      return "⭐"
  }
}

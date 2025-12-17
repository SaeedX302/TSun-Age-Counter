"use client"

import { Card, CardContent } from "@/components/ui/card"

interface AgeDisplayProps {
  age: {
    years: number
    months: number
    days: number
    hours: number
  } | null
}

export function AgeDisplay({ age }: AgeDisplayProps) {
  if (!age) {
    return (
      <Card className="vintage-card">
        <CardContent className="p-6 text-center text-vintage-brown font-serif italic">
          Select your date of birth to calculate your age
        </CardContent>
      </Card>
    )
  }

  const ageItems = [
    { label: "Years", value: age.years, symbol: "Y" },
    { label: "Months", value: age.months, symbol: "M" },
    { label: "Days", value: age.days, symbol: "D" },
    { label: "Hours", value: age.hours, symbol: "H" },
    { label: "Weeks", value: age.weeks, symbol: "W" },
    { label: "Seconds", value: age.seconds, symbol: "S" },
  ]

  return (
    <div className="opacity-100 transform-none">
      <Card className="vintage-card overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-vintage-muted">
            {ageItems.map((item) => (
              <div key={item.label} className="p-4 text-center group hover:bg-vintage-light/50 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="relative w-8 h-8 mb-1">
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-vintage-brown border border-vintage-muted rounded-full bg-vintage-paper">
                      {item.symbol}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-vintage-dark font-display">{item.value}</p>
                  <p className="text-xs text-vintage-brown mt-1 font-serif">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Gift, Cake } from "lucide-react"

interface MilestoneDisplayProps {
  nextBirthday: {
    date: Date
    daysUntil: number
    nextAge: number
  } | null
  upcomingMilestones: Array<{
    age: number
    yearsUntil: number
    daysUntil: number
  }> | null
}

export function MilestoneDisplay({ nextBirthday, upcomingMilestones }: MilestoneDisplayProps) {
  if (!nextBirthday || !upcomingMilestones || upcomingMilestones.length === 0) {
    return null
  }

  // Simplify birthday progress calculation
  const birthdayProgress = Math.max(0, Math.min(100, ((365 - nextBirthday.daysUntil) / 365) * 100))

  return (
    <div className="space-y-4 opacity-100 transform-none">
      <Card className="vintage-card relative overflow-hidden">
        <CardHeader className="pb-2 border-b border-vintage-muted">
          <CardTitle className="text-xl vintage-title flex items-center gap-2">
            <Cake className="h-5 w-5 text-vintage-brown" />
            <span>Next Birthday</span>
            <span>✧</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center font-serif text-vintage-dark">
                  <span className="mr-1">✧</span>
                  {nextBirthday.daysUntil} days until you turn {nextBirthday.nextAge}
                </span>
                <span className="text-sm font-medium font-serif text-vintage-dark">
                  {Math.round(birthdayProgress)}%
                </span>
              </div>
              <div className="vintage-progress">
                <div className="vintage-progress-bar" style={{ width: `${birthdayProgress}%` }}></div>
              </div>
              <p className="text-sm mt-2 text-vintage-brown flex items-center font-serif">
                <span className="mr-1">✧</span>
                Your next birthday is on{" "}
                {nextBirthday.date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="vintage-card overflow-hidden">
        <CardHeader className="pb-2 border-b border-vintage-muted">
          <CardTitle className="text-xl vintage-title flex items-center gap-2">
            <Gift className="h-5 w-5 text-vintage-brown" />
            <span>Upcoming Milestones</span>
            <span>✧</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {upcomingMilestones.map((milestone) => (
              <div
                key={milestone.age}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-vintage-light/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-vintage-paper border border-vintage-muted flex items-center justify-center relative">
                  <span className="text-lg font-bold font-display text-vintage-dark">{milestone.age}</span>
                  <div className="absolute -top-1 -right-1 text-lg">{getMilestoneSymbol(milestone.age)}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium font-display text-vintage-dark">Age {milestone.age}</h4>
                  <div className="flex items-center text-sm text-vintage-brown font-serif">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {milestone.yearsUntil} {milestone.yearsUntil === 1 ? "year" : "years"} from now (
                      {milestone.daysUntil} days)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getMilestoneSymbol(age: number): string {
  if (age === 18) return "✧"
  if (age === 21) return "✧"
  if (age === 25) return "✧"
  if (age === 30) return "✧"
  if (age === 40) return "✧"
  if (age === 50) return "✧"
  if (age === 60) return "✧"
  if (age === 70) return "✧"
  if (age >= 80) return "✧"
  return "✧"
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AgeDisplay } from "@/components/age-display"
import { ZodiacDisplay } from "@/components/zodiac-display"
import { ShareButtons } from "@/components/share-buttons"
import { MilestoneDisplay } from "@/components/milestone-display"
import { ImprovedDatePicker } from "@/components/improved-date-picker"
import { calculateAge } from "@/lib/calculate-age"
import { getZodiacSign, getNextBirthday, getUpcomingMilestones } from "@/lib/zodiac"
import { Clock, Sparkles, Zap } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function AgeCalculator() {
  const { theme } = useTheme()
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [referenceDate, setReferenceDate] = useState<Date>(new Date())
  const [useCustomReferenceDate, setUseCustomReferenceDate] = useState(false)
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
    hours: number
  } | null>(null)
  const [zodiacSign, setZodiacSign] = useState<ReturnType<typeof getZodiacSign> | null>(null)
  const [nextBirthday, setNextBirthday] = useState<ReturnType<typeof getNextBirthday> | null>(null)
  const [upcomingMilestones, setUpcomingMilestones] = useState<ReturnType<typeof getUpcomingMilestones> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    // Update current date every minute when not using custom reference date
    if (!useCustomReferenceDate) {
      // Clear any existing timer
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }

      // Set interval to update once per minute
      timerRef.current = window.setInterval(() => {
        setReferenceDate(new Date())
      }, 60000) // Update every minute
    } else if (timerRef.current) {
      // If using custom date, clear any existing timer
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [useCustomReferenceDate]) // Only re-run if useCustomReferenceDate changes

  useEffect(() => {
    if (birthDate) {
      // Validate birth date is not in the future
      if (birthDate > referenceDate) {
        setError("Birth date cannot be in the future")
        setAge(null)
        setZodiacSign(null)
        setNextBirthday(null)
        setUpcomingMilestones(null)
        return
      }

      setError(null)
      const calculatedAge = calculateAge(birthDate, referenceDate)
      setAge(calculatedAge)

      // Calculate zodiac sign
      setZodiacSign(getZodiacSign(birthDate))

      // Calculate next birthday
      const birthday = getNextBirthday(birthDate, referenceDate)
      setNextBirthday(birthday)

      // Calculate upcoming milestones
      if (calculatedAge.years !== undefined) {
        setUpcomingMilestones(getUpcomingMilestones(calculatedAge.years, birthday))
      }
    } else {
      setAge(null)
      setZodiacSign(null)
      setNextBirthday(null)
      setUpcomingMilestones(null)
    }
  }, [birthDate, referenceDate])

  // Render different layouts based on theme
  if (theme === "vintage") {
    return (
      <div className="w-full max-w-3xl opacity-100 transform-none">
        <div className="vintage-border relative">
          <div className="absolute -top-5 -right-5 transform rotate-12 opacity-70 z-10">
            <Sparkles className="h-10 w-10 text-primary/50" />
          </div>
          <div className="absolute -bottom-5 -left-5 transform -rotate-12 opacity-70 z-10">
            <Zap className="h-10 w-10 text-accent/50" />
          </div>
          <Card className="vintage-card shadow-lg overflow-hidden">
            <CardHeader className="pb-4 relative border-b border-vintage-muted">
              <div className="flex items-center justify-center">
                <CardTitle className="text-3xl vintage-title text-center">
                  <span className="typewriter">TSun AgeCounter</span>
                </CardTitle>
              </div>
              <CardDescription className="text-center vintage-subtitle mt-2">
                Discover your age and astrological sign with our TSun AgeCounter
              </CardDescription>
              <div className="text-center text-xs mt-2 text-vintage-brown font-serif italic">
                Credits Goes To °||=🌴༯𝙎ค૯𝙀𝘿🫀
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <ImprovedDatePicker date={birthDate} setDate={setBirthDate} label="Date of Birth" />
                    {error && <p className="text-sm text-red-700 mt-1 font-serif italic">{error}</p>}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reference-date" className="text-sm font-medium flex items-center font-serif">
                        <span>Use Custom Reference Date</span>
                        <span className="ml-2">
                          <Clock className="h-4 w-4" />
                        </span>
                      </Label>
                      <Switch
                        id="reference-date-toggle"
                        checked={useCustomReferenceDate}
                        onCheckedChange={setUseCustomReferenceDate}
                      />
                    </div>

                    {useCustomReferenceDate && (
                      <div className="opacity-100 h-auto">
                        <ImprovedDatePicker date={referenceDate} setDate={setReferenceDate} label="Reference Date" />
                      </div>
                    )}
                  </div>

                  <AgeDisplay age={age} />
                  <ShareButtons age={age} zodiacSign={zodiacSign} />
                </div>

                <div className="space-y-4">
                  <ZodiacDisplay zodiacSign={zodiacSign} />
                  <MilestoneDisplay nextBirthday={nextBirthday} upcomingMilestones={upcomingMilestones} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (theme === "futuristic") {
    return (
      <div className="w-full max-w-5xl opacity-100 transform-none">
        <div className="futuristic-container">
          <div className="futuristic-header">
            <div className="futuristic-title-container">
              <h1 className="futuristic-title">TSun AgeCounter</h1>
              <div className="futuristic-subtitle">
                Discover your age and astrological sign with our TSun AgeCounter
              </div>
              <div className="futuristic-credits">Credits Goes To °||=🌴༯𝙎ค૯𝙀𝘿🫀</div>
            </div>
          </div>

          <div className="futuristic-grid">
            <div className="futuristic-sidebar">
              <div className="futuristic-input-container">
                <ImprovedDatePicker date={birthDate} setDate={setBirthDate} label="Date of Birth" />
                {error && <p className="futuristic-error">{error}</p>}
              </div>

              <div className="futuristic-toggle-container">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reference-date" className="futuristic-label">
                    <span>Custom Reference Date</span>
                    <Clock className="h-4 w-4 ml-2" />
                  </Label>
                  <Switch
                    id="reference-date-toggle"
                    checked={useCustomReferenceDate}
                    onCheckedChange={setUseCustomReferenceDate}
                  />
                </div>

                {useCustomReferenceDate && (
                  <div className="mt-4">
                    <ImprovedDatePicker date={referenceDate} setDate={setReferenceDate} label="Reference Date" />
                  </div>
                )}
              </div>
            </div>

            <div className="futuristic-main-content">
              <AgeDisplay age={age} />
              <div className="futuristic-results-grid">
                <ZodiacDisplay zodiacSign={zodiacSign} />
                <MilestoneDisplay nextBirthday={nextBirthday} upcomingMilestones={upcomingMilestones} />
              </div>
            </div>
          </div>

          <div className="futuristic-footer">
            <ShareButtons age={age} zodiacSign={zodiacSign} />
          </div>
        </div>
      </div>
    )
  }

  if (theme === "local") {
    return (
      <div className="w-full max-w-4xl opacity-100 transform-none">
        <div className="local-container">
          <div className="local-header">
            <div className="local-title-badge">
              <h1 className="local-title">TSun AgeCounter</h1>
            </div>
            <div className="local-subtitle">Discover your age and astrological sign with our TSun AgeCounter</div>
            <div className="local-credits">Credits Goes To °||=🌴༯𝙎ค૯𝙀𝘿🫀</div>
          </div>

          <div className="local-content">
            <div className="local-panel">
              <div className="local-panel-header">
                <h2 className="local-panel-title">Your Information</h2>
              </div>
              <div className="local-panel-content">
                <ImprovedDatePicker date={birthDate} setDate={setBirthDate} label="Date of Birth" />
                {error && <p className="local-error">{error}</p>}

                <div className="local-toggle-container">
                  <Label htmlFor="reference-date" className="local-label">
                    <span>Use Custom Reference Date</span>
                    <Clock className="h-4 w-4 ml-2" />
                  </Label>
                  <Switch
                    id="reference-date-toggle"
                    checked={useCustomReferenceDate}
                    onCheckedChange={setUseCustomReferenceDate}
                  />
                </div>

                {useCustomReferenceDate && (
                  <div className="mt-4">
                    <ImprovedDatePicker date={referenceDate} setDate={setReferenceDate} label="Reference Date" />
                  </div>
                )}
              </div>
            </div>

            <div className="local-results">
              <AgeDisplay age={age} />
              <ZodiacDisplay zodiacSign={zodiacSign} />
            </div>

            <div className="local-sidebar">
              <MilestoneDisplay nextBirthday={nextBirthday} upcomingMilestones={upcomingMilestones} />
              <ShareButtons age={age} zodiacSign={zodiacSign} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Handdrawn theme
  return (
    <div className="w-full max-w-3xl opacity-100 transform-none">
      <div className="handdrawn-container">
        <div className="handdrawn-paper">
          <div className="handdrawn-header">
            <h1 className="handdrawn-title">TSun AgeCounter</h1>
            <div className="handdrawn-subtitle">Discover your age and astrological sign with our TSun AgeCounter</div>
            <div className="handdrawn-credits">Credits Goes To °||=🌴༯𝙎ค૯𝙀𝘿🫀</div>
          </div>

          <div className="handdrawn-content">
            <div className="handdrawn-input-section">
              <div className="handdrawn-input-box">
                <ImprovedDatePicker date={birthDate} setDate={setBirthDate} label="When were you born?" />
                {error && <p className="handdrawn-error">{error}</p>}
              </div>

              <div className="handdrawn-toggle-box">
                <div className="flex items-center gap-4">
                  <Switch
                    id="reference-date-toggle"
                    checked={useCustomReferenceDate}
                    onCheckedChange={setUseCustomReferenceDate}
                  />
                  <Label htmlFor="reference-date" className="handdrawn-label">
                    <span>Use a different date for calculation</span>
                  </Label>
                </div>

                {useCustomReferenceDate && (
                  <div className="mt-4">
                    <ImprovedDatePicker date={referenceDate} setDate={setReferenceDate} label="Calculate from:" />
                  </div>
                )}
              </div>
            </div>

            <div className="handdrawn-results-section">
              <AgeDisplay age={age} />
              <div className="handdrawn-divider"></div>
              <ZodiacDisplay zodiacSign={zodiacSign} />
              <div className="handdrawn-divider"></div>
              <MilestoneDisplay nextBirthday={nextBirthday} upcomingMilestones={upcomingMilestones} />
            </div>

            <div className="handdrawn-footer">
              <ShareButtons age={age} zodiacSign={zodiacSign} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

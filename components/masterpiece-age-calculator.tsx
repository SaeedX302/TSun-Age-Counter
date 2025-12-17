"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon, Clock, Sparkles, Star, Share2, Palette, ChevronDown } from "lucide-react"
import { calculateAge } from "@/lib/calculate-age"
import { getZodiacSign, getNextBirthday, getUpcomingMilestones } from "@/lib/zodiac"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Theme = "masterpiece" | "steampunk" | "monochrome"

export function MasterpieceAgeCalculator() {
  const [theme, setTheme] = useState<Theme>("masterpiece")
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
  const [error, setError] = useState<string | null>(null)
  const timerRef = useRef<number | null>(null)

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  // Timer logic
  useEffect(() => {
    if (!useCustomReferenceDate) {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = window.setInterval(() => setReferenceDate(new Date()), 60000)
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [useCustomReferenceDate])

  // Calculation logic
  useEffect(() => {
    if (birthDate) {
      if (birthDate > referenceDate) {
        setError("The future is yet to be written.")
        setAge(null)
        return
      }
      setError(null)
      const calculatedAge = calculateAge(birthDate, referenceDate)
      setAge(calculatedAge)
      setZodiacSign(getZodiacSign(birthDate))
      const birthday = getNextBirthday(birthDate, referenceDate)
      setNextBirthday(birthday)
    } else {
      setAge(null)
    }
  }, [birthDate, referenceDate])

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Backgrounds based on Theme */}
      <BackgroundEffects theme={theme} />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">

        {/* Left Panel: Input */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-8 rounded-[var(--radius)] border-l-4 border-l-primary transition-all duration-500">
            <div className="relative mb-8 border-b border-border/50 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 tracking-tight font-playfair mb-2 drop-shadow-sm">
                    TSun Age Counter
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground font-light tracking-wide text-sm uppercase">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Precision Chronometry</span>
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-primary font-semibold ml-1">
                  Date of Birth
                </label>
                <SmartDatePicker date={birthDate} setDate={setBirthDate} />
                {error && <p className="text-destructive text-sm italic mt-1">{error}</p>}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="ref-date" className="text-muted-foreground cursor-pointer flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Custom Reference Date</span>
                  </Label>
                  <Switch
                    id="ref-date"
                    checked={useCustomReferenceDate}
                    onCheckedChange={setUseCustomReferenceDate}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <AnimatePresence>
                  {useCustomReferenceDate && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <SmartDatePicker date={referenceDate} setDate={(d) => d && setReferenceDate(d)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Credits / Footer */}
          <div className="glass-panel p-4 rounded-[var(--radius)] flex items-center justify-between text-xs text-muted-foreground">
            <span>Designed by TSun</span>
            <div className="flex gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>

        {/* Right Panel: Display */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {age ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 rounded-[var(--radius)] h-full flex flex-col justify-between relative overflow-hidden transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Clock className="w-64 h-64 text-foreground" />
              </div>

              {/* Main Age Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
                <AgeBox value={age.years} label="Years" delay={0} />
                <AgeBox value={age.months} label="Months" delay={0.1} />
                <AgeBox value={age.days} label="Days" delay={0.2} />
                <AgeBox value={age.hours} label="Hours" delay={0.3} />
              </div>

              {/* Zodiac & Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {zodiacSign && (
                  <div className="bg-card/50 rounded-[var(--radius)] p-6 border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-primary font-playfair text-xl">Zodiac</h3>
                      <span className="text-4xl">{zodiacSign.emoji}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">{zodiacSign.name}</p>
                    <p className="text-muted-foreground text-sm">{zodiacSign.dates}</p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-secondary/50 rounded text-xs text-secondary-foreground border border-border">
                        {zodiacSign.element}
                      </span>
                      <span className="px-2 py-1 bg-secondary/50 rounded text-xs text-secondary-foreground border border-border">
                        {zodiacSign.symbol}
                      </span>
                    </div>
                  </div>
                )}

                {nextBirthday && (
                  <div className="bg-card/50 rounded-[var(--radius)] p-6 border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-primary font-playfair text-xl">Next Birthday</h3>
                      <Sparkles className="w-6 h-6 text-primary/50" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{nextBirthday.daysUntil} <span className="text-sm font-normal text-muted-foreground">days</span></p>
                    <p className="text-muted-foreground text-sm">{format(nextBirthday.date, "MMMM do, yyyy")}</p>
                    <p className="text-muted-foreground/60 text-xs mt-4 italic">
                      Turning {nextBirthday.nextAge}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 justify-end relative z-10">
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 text-foreground">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-12 rounded-[var(--radius)] h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-border transition-all duration-500">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-6 animate-pulse">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-playfair text-foreground mb-2">Begin Your Journey</h2>
              <p className="text-muted-foreground max-w-md">
                Enter your date of birth to reveal the precise duration of your existence and astrological secrets.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Sub Components ---

function AgeBox({ value, label, delay }: { value: number, label: string, delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card/80 p-4 rounded-[var(--radius)] border border-border text-center hover:bg-card transition-colors group"
    >
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors font-playfair">
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </motion.div>
  )
}

function SmartDatePicker({ date, setDate }: { date: Date | undefined, setDate: (date: Date | undefined) => void }) {
  const [month, setMonthState] = useState<number>(date ? date.getMonth() : new Date().getMonth())
  const [year, setYearState] = useState<number>(date ? date.getFullYear() : new Date().getFullYear())

  // Update internal state when prop changes
  useEffect(() => {
    if (date) {
      setMonthState(date.getMonth())
      setYearState(date.getFullYear())
    }
  }, [date])

  const years = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i)
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const handleYearChange = (newYear: string) => {
    const y = parseInt(newYear)
    setYearState(y)
    if (date) {
      const newDate = setYear(date, y)
      setDate(newDate)
    }
  }

  const handleMonthChange = (newMonth: string) => {
    const m = months.indexOf(newMonth)
    setMonthState(m)
    if (date) {
      const newDate = setMonth(date, m)
      setDate(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal h-12 bg-card/50 border-border text-foreground hover:bg-card/80",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
          {date ? format(date, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-card border-border text-foreground" align="start">
        <div className="flex gap-2 p-3 border-b border-border">
          <Select value={years.find(y => y === year)?.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {years.map(y => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={months[month]} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(year, month)}
          onMonthChange={(d) => {
            setMonthState(d.getMonth())
            setYearState(d.getFullYear())
          }}
          initialFocus
          className="p-3"
        />
      </PopoverContent>
    </Popover>
  )
}

function ThemeSwitcher({ currentTheme, setTheme }: { currentTheme: Theme, setTheme: (t: Theme) => void }) {
  return (
    <Select value={currentTheme} onValueChange={(v) => setTheme(v as Theme)}>
      <SelectTrigger className="w-[140px] h-8 text-xs bg-transparent border-primary/30 text-primary hover:border-primary">
        <Palette className="w-3 h-3 mr-2" />
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="masterpiece">Masterpiece</SelectItem>
        <SelectItem value="steampunk">Steampunk</SelectItem>
        <SelectItem value="monochrome">Monochrome</SelectItem>
      </SelectContent>
    </Select>
  )
}

function BackgroundEffects({ theme }: { theme: Theme }) {
  if (theme === "masterpiece") {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      </div>
    )
  }
  if (theme === "steampunk") {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-black/50 to-black/80" />
      </div>
    )
  }
  return <div className="absolute top-0 left-0 w-full h-full bg-black z-0" />
}

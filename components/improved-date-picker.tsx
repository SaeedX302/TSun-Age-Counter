"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ImprovedDatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label?: string
}

export function ImprovedDatePicker({ date, setDate, label }: ImprovedDatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(date)

  // Generate year options (100 years back from current year)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  // Generate month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Update calendar view when date changes
  useEffect(() => {
    if (date) {
      setCalendarMonth(date)
    }
  }, [date])

  // Optimize the month change handler
  const handleMonthChange = (monthIndex: string) => {
    const monthNum = Number.parseInt(monthIndex)

    // Create a new date object only once
    const newDate = date ? new Date(date) : new Date()
    newDate.setMonth(monthNum)

    setDate(newDate)
    setCalendarMonth(newDate)
  }

  // Optimize the year change handler
  const handleYearChange = (year: string) => {
    const yearNum = Number.parseInt(year)

    // Create a new date object only once
    const newDate = date ? new Date(date) : new Date()
    newDate.setFullYear(yearNum)

    setDate(newDate)
    setCalendarMonth(newDate)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && date) {
      // Preserve the year and month from the current selection
      selectedDate.setFullYear(date.getFullYear())
      selectedDate.setMonth(date.getMonth())
    }
    setDate(selectedDate)
    setIsCalendarOpen(false)
  }

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium mb-1 font-serif text-vintage-dark">{label}</div>}
      <div className="flex flex-col sm:flex-row gap-2">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal transition-all",
                "vintage-input",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-vintage-brown" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-vintage-paper border-vintage-muted shadow-xl rounded-sm"
            align="start"
          >
            <div className="flex p-3 border-b border-vintage-muted gap-2">
              <Select value={date ? date.getMonth().toString() : ""} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-[110px] vintage-input">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="bg-vintage-paper border-vintage-muted">
                  {months.map((month, index) => (
                    <SelectItem key={month} value={index.toString()} className="font-serif text-vintage-dark">
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={date ? date.getFullYear().toString() : ""} onValueChange={handleYearChange}>
                <SelectTrigger className="w-[90px] vintage-input">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-vintage-paper border-vintage-muted">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="font-serif text-vintage-dark">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              initialFocus
              className="custom-calendar"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

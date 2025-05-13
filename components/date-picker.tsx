"use client"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal transition-all",
            "border border-input/50 hover:border-primary/50 focus:border-primary",
            "shadow-sm hover:shadow",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-primary/70" />
          {date ? format(date, "PPP") : <span>Select date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white/95 backdrop-blur-sm border-t border-l border-white/20 shadow-xl rounded-xl"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="custom-calendar"
          classNames={{
            day_selected:
              "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700",
            day_today: "bg-accent/10 text-accent-foreground font-semibold",
            day: "h-9 w-9 p-0 font-normal rounded-full aria-selected:opacity-100 hover:bg-primary/10 hover:text-primary-foreground focus:bg-primary/20 focus:text-primary-foreground",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            caption: "flex justify-center py-2 px-4 relative items-center",
            caption_label: "text-sm font-medium text-gray-700",
            nav: "flex items-center space-x-1 bg-white/50 rounded-lg p-1",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-primary/10 rounded-full",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs",
            cell: "p-0 relative focus-within:relative focus-within:z-20 h-9 w-9",
            table: "border-collapse space-y-1",
            head_row: "flex",
            row: "flex w-full mt-2",
            selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            disabled: "text-muted-foreground opacity-50",
            button: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

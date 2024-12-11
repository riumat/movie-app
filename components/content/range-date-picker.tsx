"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - 99 + i).toString())

const DatePickerWithYearRange = ({ onChange }: { onChange: (range: { from: string; to: string }) => void }) => {
  const [range, setRange] = React.useState<{ from: string; to: string }>({
    from: "1924",
    to: new Date().getFullYear().toString(),
  })

  const handleYearChange = (year: string, type: "from" | "to") => {
    setRange((prev) => ({ ...prev, [type]: year }))
    onChange({ ...range, [type]: year })
  }

  return (
    <div className={cn("flex gap-4 w-[220px]")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="from-year-trigger"
            variant={"outline"}
            className={cn(
              "flex-1 justify-center gap-3 items-center text-left font-light px-5",
              !range.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {range.from ? (
              <>{range.from}</>
            ) : (
              <span>Pick a start year</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 max-h-60 overflow-y-auto scrollbar-thin">
          <div className="grid gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year, "from")}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded hover:bg-muted",
                  year === range.from && "bg-accent text-accent-foreground"
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="to-year-trigger"
            variant={"outline"}
            className={cn(
              "flex-1 justify-center gap-3 items-center text-left font-normal px-5",
              !range.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {range.to ? (
              <>{range.to}</>
            ) : (
              <span>Pick an end year</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 max-h-60 overflow-y-auto scrollbar-thin">
          <div className="grid gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year, "to")}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded hover:bg-muted",
                  year === range.to && "bg-accent text-accent-foreground"
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerWithYearRange

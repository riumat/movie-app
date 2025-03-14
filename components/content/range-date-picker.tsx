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

const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - 99 + i).toString()).sort((a, b) => Number(b) - Number(a))

const DatePickerWithYearRange = ({ onChange }: { onChange: (range: { from: string | null; to: string | null }) => void }) => {
  const [range, setRange] = React.useState<{ from: string | null; to: string | null }>({
    from: null,
    to: null,
  })

  const handleYearChange = (year: string, type: "from" | "to") => {
    setRange((prev) => ({ ...prev, [type]: year }))
    onChange({ ...range, [type]: year })
  }

  return (
    <div className={cn("flex flex-col gap-3 ")}>
      <div className="flex items-center justify-between ">
        <span className="text-sm">From</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="from-year-trigger"
              variant={"outline"}
              className={cn(
                "flex gap-3 justify-between  items-center w-[75%] px-3",
                !range.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {range.from ? (
                <div className="flex-1">
                  {range.from}
                  </div>
              ) : (
                <span></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 max-h-60 overflow-y-auto scrollbar-thin">
            <div className="grid grid-cols-4 gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year, "from")}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded hover:bg-muted text-sm",
                    year === range.from && "bg-accent text-accent-foreground"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-between">
      <span className="text-sm">to</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="to-year-trigger"
              variant={"outline"}
              className={cn(
                "flex gap-3 justify-between  items-center w-[75%] px-3",
                !range.to && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {range.to ? (
                <div className="flex-1">
                  {range.to}
                  </div>
              ) : (
                <span></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 max-h-60 overflow-y-auto scrollbar-thin">
            <div className="grid grid-cols-4 gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year, "to")}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded hover:bg-muted text-sm",
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
    </div>
  )
}

export default DatePickerWithYearRange

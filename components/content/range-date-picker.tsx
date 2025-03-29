"use client"

import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"

interface RangeType {
  from: string,
  to: string
}

const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - 99 + i).toString()).sort((a, b) => Number(b) - Number(a))

const DatePickerWithYearRange = ({ onChange, selectedRange }: { onChange: (range: RangeType) => void, selectedRange: RangeType }) => {
  const [range, setRange] = useState(selectedRange)

  const handleYearChange = (year: string, type: "from" | "to") => {
    setRange((prev) => ({ ...prev, [type]: year }))
    onChange({ ...range, [type]: year })
  }

  useEffect(() => {
    setRange(selectedRange)
  }, [selectedRange])

  return (
    <div className={cn("flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-3 ")}>
      <div className="flex items-center justify-between flex-1 ">
        <Popover>
          <PopoverTrigger asChild className="">
            <Button
              id="from-year-trigger"
              variant={"outline"}
              className={cn(
                "flex gap-3 justify-between  items-center  w-full  px-3 text-xs lg:text-sm",
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
      <p className="hidden lg:block">-</p>
      <div className="flex items-center justify-between flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="to-year-trigger"
              variant={"outline"}
              className={cn(
                "flex gap-3 justify-between  items-center w-full  px-3 text-xs lg:text-sm",
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

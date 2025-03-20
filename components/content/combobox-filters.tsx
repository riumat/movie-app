"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FilterItem } from "@/lib/types/filter"
import { useState } from "react"


interface ComboboxDemoProps {
  items: FilterItem[];
  selectedItems: number[];
  onChange: (item: number) => void;
  label: string
}

const filterGroup = (selectedItems: number[], items: { id: number; name: string }[]): string[] => {
  return selectedItems
    .map(id => (
      items.find(item => item.id === id)?.name)
    )
    .filter(value => value !== undefined) as string[];
}

const ComboboxFilter = ({ items, onChange, selectedItems, label }: ComboboxDemoProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(selectedItems.join(", ").toString())

  const isChecked = (item: FilterItem) => {
    return selectedItems.some(
      (selected: number) => (selected) === item.id
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between px-2 w-full"
        >
          <p className="text-ellipsis overflow-hidden font-light">
            {selectedItems.length > 0
              ? filterGroup(selectedItems, items).join(", ")
              : ` ${label}`}
          </p>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 scrollbar-thin">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>{`No ${label.slice(0, -1)} found.`}</CommandEmpty>
            <CommandGroup className="flex flex-col gap-5">
              {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    className={
                      isChecked(item)
                        ? "!bg-foreground !text-background"
                        : ""
                    }
                    onSelect={(currentValue) => {

                      setValue(currentValue === value ? "" : currentValue)
                      onChange(item.id)

                    }}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        isChecked(item) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxFilter

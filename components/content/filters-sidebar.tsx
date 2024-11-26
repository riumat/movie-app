import YearInput from "./year-input"
import { SortInput } from "./sort-input"
import Filters from "./filters"
import { FilterItem } from "@/lib/types/filter"

interface FiltersSidebarProps {
  filters: {
    selectedGenres: number[]
    selectedProviders: number[]
    page: number
    yearRange: {
      start: string
      end: string
    }
    sortType: string
  }
  range: {
    start: string
    end: string
  },
  sortType: string,
  genres: FilterItem[]
  watchProviders: FilterItem[]
  onGenreChange: (item: number) => void
  onProviderChange: (item: number) => void
  onYearChange: (start: string, end: string) => void
  onSortChange: (sortType: string) => void
}

export const FiltersSidebar = ({
  filters,
  range={start: "", end: ""},
  sortType="popularity.desc",
  genres,
  watchProviders,
  onGenreChange,
  onProviderChange,
  onYearChange,
  onSortChange
}: FiltersSidebarProps) => {
  return (
    <div className="md:w-[300px] flex-1 md:flex-none flex flex-col items-center gap-10 px-2 z-30 h-full mt-8">
      <div>
        <h2 className="text-sm font-semibold mb-3 text-center">Genres</h2>
        <Filters selectedItems={filters.selectedGenres} items={genres} onChange={onGenreChange} />
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-center">Watch Providers</h2>
        <Filters selectedItems={filters.selectedProviders} items={watchProviders} onChange={onProviderChange} />
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-center">Year Range</h2>
        <YearInput range={range} onChange={onYearChange} />
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3 text-center">Sort by</h2>
        <SortInput sortType={sortType} onChange={onSortChange} />
      </div>
    </div>
  )
}

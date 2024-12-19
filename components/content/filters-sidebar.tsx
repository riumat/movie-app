"use client"
import { FilterItem } from "@/lib/types/filter"
import ComboboxFilter from "@/components/content/combobox-filters"
import DatePickerWithYearRange from "@/components/content/range-date-picker"
import MovieSortInput from "@/components/movie/movie-sort-input"
import TvSortInput from "@/components/tv/tv-sort-input"
import { Button } from "@/components/ui/button"

interface FiltersSidebarProps {
  genres: FilterItem[]
  providers: FilterItem[]
  media: string,
  handlers: any,
  filters: any
}
export const FiltersSidebar = ({
  genres,
  providers,
  media,
  handlers,
  filters
}: FiltersSidebarProps) => {

  return (
    <div className="flex-1 md:w-[275px] md:flex-none item-center w-[24%] bg-background/95 text-foreground rounded-lg pt-5 px-3 flex flex-col gap-10">
      <div className="flex flex-col items-center">
        <h2 className="text-sm font-normal mb-3 text-start">Genres</h2>
        <ComboboxFilter
          label="genres"
          selectedItems={filters.selectedGenres}
          items={genres}
          onChange={handlers.handleGenreChange}
        />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-sm font-normal mb-3 text-start">Watch Providers</h2>
        <ComboboxFilter
          label="providers"
          selectedItems={filters.selectedProviders}
          items={providers}
          onChange={handlers.handleProviderChange}
        />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-sm font-normal mb-3 text-start">Year Range</h2>
        <DatePickerWithYearRange onChange={handlers.handleYearChange} />

      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-sm font-normal mb-3 text-start">Sort by</h2>
        {media === "movie" ?
          <MovieSortInput sortType={filters.sortType} onChange={handlers.handleSortChange} />
          :
          <TvSortInput sortType={filters.sortType} onChange={handlers.handleSortChange} />
        }
      </div>
      <Button variant="secondary" className="w-full" onClick={handlers.handleReset}>Reset Filters</Button>
    </div>
  )
}

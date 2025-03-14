"use client"
import { FilterItem } from "@/lib/types/filter"
import ComboboxFilter from "@/components/content/combobox-filters"
import DatePickerWithYearRange from "@/components/content/range-date-picker"
import MovieSortInput from "@/components/movie/movie-sort-input"
import TvSortInput from "@/components/tv/tv-sort-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import RuntimeSlider from "@/components/content/runtime-slider"

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
    <div className="flex-1 md:w-[275px] md:flex-none item-center w-[24%] flex flex-col gap-3 ">

      <div className=" bg-secondary/50 text-foreground rounded-lg p-5  flex flex-col gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Checkbox />
          <span className="text-sm">Hide watched content</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Checkbox />
          <span className="text-sm">Highlight watchlist</span>
        </div>
      </div>

      <div className=" bg-secondary/50 text-foreground rounded-lg p-5 flex flex-col gap-3">
        <div className="flex flex-col ">
          <h2 className="text-sm font-normal mb-3 text-start">Sort by</h2>
          {media === "movie" ?
            <MovieSortInput sortType={filters.sortType} onChange={handlers.handleSortChange} />
            :
            <TvSortInput sortType={filters.sortType} onChange={handlers.handleSortChange} />
          }
        </div>
      </div>

      <div className="flex-1 bg-secondary/50 text-foreground rounded-lg p-5  flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <ComboboxFilter
              label="Genres"
              selectedItems={filters.selectedGenres}
              items={genres}
              onChange={handlers.handleGenreChange}
            />
          </div>

          <div className="flex flex-col items-center">
            <ComboboxFilter
              label="Networks"
              selectedItems={filters.selectedProviders}
              items={providers}
              onChange={handlers.handleProviderChange}
            />
          </div>
        </div>

        <DatePickerWithYearRange onChange={handlers.handleYearChange} />

        <RuntimeSlider onChange={handlers.handleRuntime} />


        <Button variant="destructive" className="w-full" onClick={handlers.handleReset}>Reset Filters</Button>
      </div>

    </div>
  )
}

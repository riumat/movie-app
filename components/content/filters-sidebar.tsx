"use client"
import { FilterItem } from "@/lib/types/filter"
import ComboboxFilter from "@/components/content/combobox-filters"
import DatePickerWithYearRange from "@/components/content/range-date-picker"
import MovieSortInput from "@/components/movie/movie-sort-input"
import TvSortInput from "@/components/tv/tv-sort-input"
import { Button } from "@/components/ui/button"
import RuntimeSlider from "@/components/content/runtime-slider"
import { Filters, Handlers } from "@/lib/hooks/use-filter-state"

interface FiltersSidebarProps {
  genres: FilterItem[]
  providers: FilterItem[]
  media: string,
  handlers: Handlers,
  filters: Filters
}
export const FiltersSidebar = ({
  genres,
  providers,
  media,
  handlers,
  filters
}: FiltersSidebarProps) => {

  return (
    <div className="flex-1 md:w-[275px] md:flex-none item-center w-[150px] flex flex-col gap-2 lg:gap-3 ">

      <div className=" bg-secondary/65 text-foreground rounded-lg p-2 lg:p-5 flex flex-col gap-3">
        <div className="flex flex-col items-center">
          <h2 className=" text-xs lg:text-sm font-normal mb-3 text-center">Sort by</h2>
          {media === "movie" ?
            <MovieSortInput sortType={filters.sortType} onChange={handlers.handleSortChange} />
            :
            <TvSortInput sortType={filters.sortType} onChange={handlers.handleSortChange} />
          }
        </div>
      </div>

      <div className=" bg-secondary/65 text-foreground rounded-lg p-2 lg:p-5  flex flex-col gap-3">
      <h2 className=" text-xs lg:text-sm font-normal text-center">Genres and networks</h2>

        <ComboboxFilter
          label="Genres"
          selectedItems={filters.selectedGenres}
          items={genres}
          onChange={handlers.handleGenreChange}
        />

        <ComboboxFilter
          label="Networks"
          selectedItems={filters.selectedProviders}
          items={providers}
          onChange={handlers.handleProviderChange}
        />
      </div>

      <div className=" bg-secondary/65 text-foreground rounded-lg p-2 lg:p-5 flex flex-col gap-3">
      <h2 className=" text-xs lg:text-sm font-normal text-center">Year range</h2>


        <DatePickerWithYearRange
          onChange={handlers.handleYearChange}
          selectedRange={filters.yearRange}
        />
      </div>


      <div className=" bg-secondary/65 text-foreground rounded-lg p-2 lg:p-5 flex flex-col gap-3">
      <h2 className=" text-xs lg:text-sm font-normal text-center">Duration</h2>

        <RuntimeSlider
          onChange={handlers.handleRuntime}
          selectedRuntime={filters.runtime}
        />
      </div>
      <div className="flex-1"></div>
      <Button variant="destructive" className="w-full text-sm " onClick={handlers.handleReset}>Reset filters</Button>


    </div>
  )
}

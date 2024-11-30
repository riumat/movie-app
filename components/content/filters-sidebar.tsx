import { FilterItem } from "@/lib/types/filter"
import ComboboxFilter from "@/components/content/combobox-filters"
import DatePickerWithYearRange from "@/components/content/range-date-picker"
import MovieSortInput from "@/components/movie/movie-sort-input"
import TvSortInput from "@/components/tv/tv-sort-input"

interface FiltersSidebarProps {
  filters: {
    selectedGenres: number[]
    selectedProviders: number[]
    page: number
    yearRange: {
      from: string
      to: string
    }
    sortType: string
  }
  genres: FilterItem[]
  watchProviders: FilterItem[]
  onGenreChange: (item: number) => void
  onProviderChange: (item: number) => void
  onYearChange: (range: { from: string; to: string }) => void
  onSortChange: (sortType: string) => void
  media: string
}

export const FiltersSidebar = ({
  filters,
  genres,
  watchProviders,
  onGenreChange,
  onProviderChange,
  onYearChange,
  onSortChange,
  media
}: FiltersSidebarProps) => {
  return (
    <div className="md:w-[275px] md:flex-none h-[80vh] flex flex-col items-center justify-start gap-16 px-2 z-30 mt-8 ">
      <div>
        <h2 className="text-sm font-normal mb-3 text-start">Genres</h2>
        <ComboboxFilter
          label="genres"
          selectedItems={filters.selectedGenres}
          items={genres}
          onChange={onGenreChange}
        />
      </div>

      <div>
        <h2 className="text-sm font-normal mb-3 text-start">Watch Providers</h2>
        <ComboboxFilter
          label="providers"
          selectedItems={filters.selectedProviders}
          items={watchProviders}
          onChange={onProviderChange}
        />
      </div>

      <div>
        <h2 className="text-sm font-normal mb-3 text-start">Year Range</h2>
        <DatePickerWithYearRange onChange={onYearChange} />

      </div>

      <div>
        <h2 className="text-sm font-normal mb-3 text-start">Sort by</h2>
        {media === "movie" ?
          <MovieSortInput sortType={filters.sortType} onChange={onSortChange} />
          :
          <TvSortInput sortType={filters.sortType} onChange={onSortChange} />
        }
      </div>
    </div>
  )
}

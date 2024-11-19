import MovieCard from "@/components/cards/movie-card"
import PeopleCard from "@/components/cards/people-card"
import TvCard from "@/components/cards/tv-card"
import { MovieResult } from "@/lib/types/movie"
import { PeopleResult } from "@/lib/types/people"
import { TvResult } from "@/lib/types/tv"

const MultiCard = ({ result }: { result: MovieResult | TvResult | PeopleResult }) => {
  if (result.media_type === "movie") {
    return (
      <MovieCard key={result.id} item={result as MovieResult} />
    )
  }
  if (result.media_type === "tv") {
    return (
      <TvCard key={result.id} item={result as TvResult} />
    )
  }
  if (result.media_type === "person") {
    return (
      <PeopleCard key={result.id} item={result as PeopleResult} />
    )

  }
}

export default MultiCard
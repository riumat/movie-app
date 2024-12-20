import { selectorMovieList, selectorTvList } from "@/lib/constants";
import { Selection } from "@/lib/types/content";
import Link from "next/link";

interface MainSectionSelectorProps {
  media: string,
  id: string
}

const ContentNavbar = ({ media, id }: MainSectionSelectorProps) => {
  return (
    <div className=' flex  justify-center items-start gap-5 text-base py-3 border-b border-neutral-700 sticky top-0 z-40 bg-background text-foreground'>
      {media === "movie" ? (
        selectorMovieList.map((item) => (
          <Link
            key={item.value}
            href={`/movie/${id}/${item.value}`}
            className={`
              py-1 px-10 hover:underline outline-none
              `}
          >
            {item.name}
          </Link>
        ))
      ) : (
        selectorTvList.map((item) => (
          <Link
            key={item.value}
            href={`/tv/${id}/${item.value}`}
            className={`
              py-1 px-10 hover:underline outline-none
              `}
          >
            {item.name}
          </Link>
        ))
      )
      }
    </div>
  )
}

export default ContentNavbar
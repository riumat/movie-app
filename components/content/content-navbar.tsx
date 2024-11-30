import { selectorMovieList, selectorTvList } from "@/lib/constants";
import { Selection } from "@/lib/types/content";

interface MainSectionSelectorProps {
  setSelection: (selection: Selection) => void;
  selection: Selection;
  media: string
}

const ContentNavbar = ({ setSelection, selection, media }: MainSectionSelectorProps) => {
  return (
    <div className=' flex  justify-center items-start gap-5 text-sm py-3 border-b border-neutral-700 sticky top-0 z-50 bg-background text-foreground'>
      {media === "movie" ? (
        selectorMovieList.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelection(item.value as Selection)}
            className={`
              ${selection === item.value ? "underline font-bold" : "font-light"}
               py-1 px-10 hover:underline outline-none
               `}
          >
            {item.name}
          </button>
        ))
      ) : (
        selectorTvList.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelection(item.value as Selection)}
            className={`
              ${selection === item.value ? "underline font-bold" : "font-light"}
               py-1 px-10 hover:underline outline-none
               `}
          >
            {item.name}
          </button>
        ))
      )
      }
    </div>
  )
}

export default ContentNavbar
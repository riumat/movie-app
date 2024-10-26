import { selectorMovieList, selectorTvList } from "@/utils/constants";
import { Selection } from "@/utils/types";

interface MainSectionSelectorProps {
  setSelection: (selection: Selection) => void;
  selection: Selection;
  media: string
}

const MainSectionSelector = ({ setSelection, selection, media }: MainSectionSelectorProps) => {
  return (
    <div className=' flex flex-col justify-start items-start gap-5 text-sm border-r pr-10 border-neutral-50/20'>
      {media === "movie" ? (
        selectorMovieList.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelection(item.value as Selection)}
            className={`
              ${selection === item.value ? "underline font-bold text-white" : "font-light text-neutral-300"}
               py-1 px-10 hover:underline
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
              ${selection === item.value ? "underline font-bold text-white" : "font-light text-neutral-300"}
               py-1 px-10 hover:underline
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

export default MainSectionSelector
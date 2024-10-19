import { selectorMovieList, selectorTvList } from "@/utils/constants";
import { Selection } from "@/utils/types";

interface MainSectionSelectorProps {
  setSelection: (selection: Selection) => void;
  selection: Selection;
  media: string
}

const MainSectionSelector = ({ setSelection, selection, media }: MainSectionSelectorProps) => {
  return (
    <div className=' flex flex-col justify-evenly text-sm border-r pr-10 border-neutral-50/20'>
      {media === "movie" ? (
        selectorMovieList.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelection(item.value as Selection)}
            className={`
              ${selection === item.value ? "bg-neutral-50 text-neutral-950" : "bg-transparent text-gray-200 border border-neutral-50/30"}
               py-1 px-10 font-semibold rounded-xl active:scale-95 duration-50
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
              ${selection === item.value ? "bg-neutral-50 text-neutral-950" : "bg-transparent text-gray-200 border border-neutral-50/30"} 
              py-1 px-10 font-semibold rounded-xl active:scale-95 duration-50
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
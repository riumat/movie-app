"use client"
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { selectorMovieList, selectorTvList } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface MainSectionSelectorProps {
  media: string,
  id: string
}

const ContentNavbar = ({ media, id }: MainSectionSelectorProps) => {
  const pathname = usePathname()
  const selection = pathname.split("/")[3] ?? "";
  const [tabSelected, setTabSelected] = useState("Overview")
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (media === "movie") {
      const selectedItem = selectorMovieList.find((item) => item.value === selection);
      if (selectedItem) {
        setTabSelected(selectedItem.name);
      } else {
        setTabSelected("Overview");
      }
    } else {
      const selectedItem = selectorTvList.find((item) => item.value === selection);
      if (selectedItem) {
        setTabSelected(selectedItem.name);
      } else {
        setTabSelected("Overview");
      }
    }
    setIsOpen(false)
  }, [selection, media]);

  if (isMobile) {
    return (
      <div className=' flex  justify-center items-start gap-1 lg:gap-5 text-sm lg:text-base py-3 border-b border-neutral-700 sticky top-0 z-40 bg-background text-foreground mx-2 lg:mx-5'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className=" px-10 py-2 flex justify-between items-center font-light text-center text-sm mx-10  "
            type="button"
            variant="outline"
          >
            {tabSelected}
            <RiArrowDropDownLine className="ml-2 scale-150" />
          </Button>
        </PopoverTrigger>


        {media === "movie" ? (
          <PopoverContent className="w-full mt-2 py-1 z-50 text-foreground bg-background rounded-md ">
            <div className="flex flex-col gap-1 text-sm ">
              {selectorMovieList.map((item) => (
                <Link
                  key={item.value}
                  href={`/movie/${id}/${item.value}`}
                  className={`
              py-1 px-3 lg:px-10 hover:underline outline-none 
              ${selection === item.value ? "underline font-semibold" : ""}
              `}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </PopoverContent>
        ) : (
          <PopoverContent className="w-full mt-2 py-1 z-50 text-foreground bg-background rounded-md">
            <div className="flex flex-col gap-3  text-sm">
              {selectorTvList.map((item) => (
                <Link
                  key={item.value}
                  href={`/tv/${id}/${item.value}`}
                  className={`
              py-1 px-3 lg:px-10  hover:underline outline-none
               ${selection === item.value ? "underline font-semibold" : ""}
              `}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </PopoverContent>
        )
        }
      </Popover>
      </div>
    )
  }

  return (
    <div className=' flex  justify-center items-start gap-1 lg:gap-5 text-sm lg:text-base py-3 border-b border-neutral-700 sticky top-0 z-40 bg-background text-foreground mx-2 lg:mx-5'>
      {media === "movie" ? (
        selectorMovieList.map((item) => (
          <Link
            key={item.value}
            href={`/movie/${id}/${item.value}`}
            className={`
              py-1 px-3 lg:px-10 hover:underline outline-none 
              ${selection === item.value ? "underline font-semibold" : ""}
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
              py-1 px-3 lg:px-10  hover:underline outline-none
               ${selection === item.value ? "underline font-semibold" : ""}
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
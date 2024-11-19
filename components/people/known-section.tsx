import CarouselWrapper from "@/components/people/carousel-wrapper"
import { ContentItem } from "@/lib/types"

const KnownForSection = ({ contents }: { contents: ContentItem[] }) => {
  return (
    <>
      {contents.length > 0 && (
        <div className='mt-10 flex flex-col gap-2 w-[90%] '>
          <p className='font-light text-xl'>Known for:</p>
          <div className="ml-10 justify-center w-full">
            <CarouselWrapper
              contentList={contents}
            />
          </div>
        </div>
      )
      }
    </>
  )
}

export default KnownForSection
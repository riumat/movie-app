import CarouselWrapper from "@/components/people/carousel-wrapper"
import { ContentItem } from "@/lib/types/content"

const KnownForSection = ({ contents }: { contents: ContentItem[] }) => {
  return (
    <>
      {contents.length > 0 && (
        <div className=' flex flex-col gap-2 w-[95%]  '>
          <p className='font-light text-xl ml-10 pb-2'>Known for</p>
          <div className="ml-10 justify-center  w-[91%]">
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
import CarouselVertical from "@/components/content/carousel-vertical"

const KnownForSection = ({ contents }: { contents: any }) => {
  return (
    <>
      {contents.length > 0 && (
        <div className=' w-[62%] lg:w-[90%] flex flex-col gap-2 lg:gap-5 '>
          <p className='font-medium text-base lg:text-lg text-center lg:text-start lg:ml-10'>Known for</p>
          <div className="lg:ml-6 lg:w-[91%]">
            <CarouselVertical
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
import CarouselVertical from "@/components/content/carousel-vertical"

const KnownForSection = ({ contents }: { contents: any }) => {
  return (
    <>
      {contents.length > 0 && (
        <div className=' flex flex-col gap-2 w-[95%]  border'>
          <p className='font-light text-xl ml-10 pb-2'>Known for</p>
          <div className="ml-10 justify-center  w-[91%]">
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
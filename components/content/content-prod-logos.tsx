import { imageUrl, imgWidth } from "@/lib/constants"
import { MovieData } from "@/lib/types/movie.types"
import { TvData } from "@/lib/types/tv.types"
import Image from "next/image"

const ContentProdLogos = ({ contentData }: { contentData: MovieData | TvData }) => {
  return (
    <div className='w-0 md:w-full md:max-w-96 flex gap-5 xl:gap-10 justify-center lg:justify-start items-center relative'>
      {contentData.production_companies.slice(0, 3).map((company, index) => (
        company.logo_path && (
          <div key={index} className={`relative flex justify-center w-16 bg-background/40 lg:bg-transparent h-8 lg:w-[75px] lg:h-[50px] `}>
            <Image
              src={`${imageUrl}${imgWidth.logo[154]}${company.logo_path}`}
              fill
              alt={company.name}
              style={{ maxWidth: '120px', maxHeight: '50px' }}
              className='object-contain filter grayscale-[100%] contrast-[90%] brightness-[100%] dark:invert-[1]'
              sizes="30vw"
            />
          </div>
        )
      ))}
    </div>
  )
}

export default ContentProdLogos
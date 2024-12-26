import { imageUrl, imgWidth } from "@/lib/constants"
import { MovieData } from "@/lib/types/movie"
import { TvData } from "@/lib/types/tv"
import Image from "next/image"

const ContentProdLogos = ({ contentData }: { contentData: MovieData | TvData }) => {
  return (
    <div className='max-w-96 flex gap-5 xl:gap-10 justify-start items-center relative '>
      {contentData.production_companies.slice(0, 4).map((company, index) => (
        company.logo_path && (
          <div key={index} className={`relative flex justify-center w-[65px] h-[65px] `}>
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
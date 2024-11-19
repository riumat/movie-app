import { imageUrl, imgWidth } from "@/lib/constants"
import { MovieData, TvData } from "@/lib/types"
import Image from "next/image"

const ContentProdLogos = ({ contentData }: { contentData: MovieData | TvData }) => {
  return (
    <div className='w-[60%] flex  gap-5 xl:gap-10 justify-start items-center relative '>
      {contentData.production_companies.slice(0, 4).map((company, index) => (
        company.logo_path && (
          <div key={index} className={`relative flex justify-center w-[80px] h-[50px]`}>
            <Image
              src={`${imageUrl}${imgWidth.logo[154]}${company.logo_path}`}
              fill
              alt={company.name}
              style={{ maxWidth: '120px', maxHeight: '50px' }}
              className='object-contain filter grayscale-[100%] contrast-[90%] brightness-[100%] dark:invert-[1]'
              priority
            />
          </div>
        )
      ))}
    </div>
  )
}

export default ContentProdLogos
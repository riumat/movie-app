import FeaturedModal from '@/components/user/featured-modal'
import { imageUrl, imgWidth } from '@/lib/constants'
import { getFeaturedContentData } from '@/lib/fetchers/index'
import Image from 'next/image'

const FeaturedContent = async ({ id, session }: { id: string, session: any }) => {
  const featuredContent = await getFeaturedContentData(id)
  console.log(featuredContent)

  if (session.user.id !== Number(id) && !featuredContent) {
    return (
      <div>
        <p>This user has not set a featured movie or tv show yet.</p>
      </div>
    )
  }

  return (
    <div className='w-full h-full'>
      {featuredContent ? (
        <div className='relative h-full w-full'>
          <Image
            src={`${imageUrl}${imgWidth.backdrop[780]}${featuredContent.tmdbContent.contentData.backdrop_path}`}
            alt="Featured Content"
            sizes='(max-width: 780px) 100vw, 780px'
            className='object-contain '
            fill
          />
        </div>
      ) : (
        <div>
          <FeaturedModal session={session} />
        </div>
      )}
    </div>
  )
}

export default FeaturedContent
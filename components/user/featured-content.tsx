import RenderStars from '@/components/ui/render-stars'
import FeaturedModal from '@/components/user/featured-modal'
import { imageUrl, imgWidth } from '@/lib/constants'
import { getFeaturedContentData } from '@/lib/fetchers/index'
import { EditIcon, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedContent = async ({ id, session }: { id: string, session: any }) => {
  const featuredContent = await getFeaturedContentData(id)

  if (session.user.id !== Number(id) && !featuredContent) {
    return (
      <div>
        <p>This user has not set a featured movie or tv show yet.</p>
      </div>
    )
  }

  return (
    <section className='flex flex-col gap-5 basis-2/3'>
      <div className='flex gap-10 items-center'>
        <p className='text-xl font-bold'>Favorite Content</p>
        {session.user.id === Number(id) && <FeaturedModal session={session} >
          <div className='flex items-center gap-2 bg-foreground text-background px-3 py-1 rounded'>
            <p className='text-sm'>Change</p>
            <EditIcon size={15} />
          </div>
        </FeaturedModal>}
      </div>
      {featuredContent ? (
        <div className='relative h-full min-h-80 w-full rounded-xl '>
          <div className='absolute top-0 left-0 text-foreground flex flex-col gap-2 z-20 ml-10 mt-10 '>
            <Link href={`/${featuredContent.prismaContent.content_type}/${featuredContent.prismaContent.content_id}`} className='font-bold text-3xl hover:underline'>{featuredContent.tmdbContent.contentData.title ?? featuredContent.tmdbContent.contentData.name}</Link>
            {featuredContent.prismaContent.rating && <RenderStars rating={featuredContent.prismaContent.rating} />}
          </div>
          <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-r from-background to-[95%] to-transparent z-10' />

          <Image
            src={`${imageUrl}${imgWidth.backdrop[780]}${featuredContent.tmdbContent.imagesData.backdrops[0].file_path}`}
            alt="Featured Content"
            sizes='(max-width: 780px) 100vw, 780px'
            className='object-cover rounded-xl '
            fill
          />
        </div>
      ) : (
        <div className='relative h-full min-h-80 w-full rounded-xl border-4 border-muted/40 flex items-center justify-center '>
          <FeaturedModal session={session} >
            <div className='flex items-center gap-2'>
              <p className='font-bold'>Set a featured content</p>
              <Plus size={20} />
            </div>
          </FeaturedModal>
        </div>
      )}
    </section>
  )
}

export default FeaturedContent
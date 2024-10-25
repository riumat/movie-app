import { notFound } from 'next/navigation';
import NameSection from '@/components/NameSection';
import { TvData } from '@/utils/types';
import { fetchContentData } from '@/utils/fetchers';
import MediaTvHero from '@/components/MediaTvHero';

export default async function TvPage({ params }: { params: { id: string } }) {
  const tvId = params.id;
  let tvData: TvData;
  try {
    tvData = await fetchContentData(tvId, "tv");
    tvData.type = "tv";
  } catch (error) {
    console.log(error)
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full ">
      <NameSection images={tvData.images.backdrops} contentData={tvData} />
      <MediaTvHero tvData={tvData} />
    </div>
  );
}



import { notFound } from 'next/navigation';
import NameSection from '@/components/NameSection';
import { TvData } from '@/utils/types';
import { fetchContentData } from '@/utils/fetchers';
import MediaTvHero from '@/components/MediaTvHero';
import BackgroundDisplay from '@/components/BackgroundDisplay';

export default async function TvPage({ params }: { params: { id: string } }) {
  const tvId = params.id;
  let tvData: TvData;
  try {
    tvData = await fetchContentData(tvId, "tv");
    tvData.type = "tv";
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full ">
      <BackgroundDisplay
        page="content"
        posters={tvData.images.backdrops
          .slice(0, 1)
          .map((image) => image.file_path)}
      />
      <NameSection
        contentData={tvData}
      />
      <MediaTvHero
        tvData={tvData}
      />
    </div>
  );
}



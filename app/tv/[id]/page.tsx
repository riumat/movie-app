import { notFound } from 'next/navigation';
import { fetchContentData } from '@/lib/fetchers';
import ContentBackground from '@/components/layout/content-background';
import ContentHeader from '@/components/content/content-header';
import Body from '@/components/tv/body';
import { TvData } from '@/lib/types/tv';

export default async function TvPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const tvData: TvData = await fetchContentData(id, "tv")
    .catch(() => notFound())

  return (
    <div className="flex-1 flex flex-col items-center w-full ">
      <ContentBackground
        poster={tvData.images.backdrops[0].file_path}
      />
      <ContentHeader
        contentData={tvData}
      />
      <Body
        tvData={tvData}
      />
    </div>
  );
}



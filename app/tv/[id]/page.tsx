import { notFound } from 'next/navigation';
import { fetchContentData, fetchUserContentData } from '@/lib/fetchers';
import ContentBackground from '@/components/layout/content-background';
import ContentHeader from '@/components/content/content-header';
import Body from '@/components/tv/body';
import { TvData } from '@/lib/types/tv';

export default async function TvPage({ params }: { params: { id: string } }) {
  const userData = await fetchUserContentData(params.id, "tv")
  const tvData: TvData = await fetchContentData(params.id, "tv")
    .catch(() => notFound())

  return (
    <div className="flex-1 flex flex-col items-center w-full ">
      <ContentBackground
        poster={tvData.images.backdrops[0]?.file_path}
      />
      <ContentHeader
        contentData={tvData}
        userData={userData}
      />
      <Body
        tvData={tvData}
      />
    </div>
  );
}



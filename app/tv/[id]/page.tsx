import { notFound } from 'next/navigation';
import { checkUserContent, fetchContentData, fetchUserContentData } from '@/lib/fetchers';
import ContentBackground from '@/components/layout/content-background';
import ContentHeader from '@/components/content/content-header';
import Body from '@/components/tv/body';
import { TvData } from '@/lib/types/tv';
import { getSession } from '@/lib/session';

export default async function TvPage({ params }: { params: { id: string } }) {
  const media = "tv"
  const session = await getSession();
  const userData = await fetchUserContentData(params.id, media)
  const tvData: TvData = await fetchContentData(params.id, media)
  const similarData: any = await checkUserContent(session, tvData.recommendations, media);

  if (!tvData || !userData) return notFound();
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
        similarData={similarData}
      />
    </div>
  );
}



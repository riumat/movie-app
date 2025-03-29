import ContentHeader from "@/components/content/content-header";
import ContentNavbar from "@/components/content/content-navbar";
import ContentBackground from "@/components/layout/content-background";
import Loader from "@/components/layout/loader";
import { mediaType } from "@/lib/constants";
import { getHeaderContentData } from "@/lib/fetchers/index";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function MovieLayout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
  const movieData = await getHeaderContentData(params.id, mediaType.movie)
    .catch(() => {
      notFound()
    })

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <ContentBackground
        poster={movieData.backdrop_path}
      />
      <ContentHeader
        contentData={movieData}
      />
      <section className="bg-background text-foreground w-full ">
        <div className='flex flex-col mb-10 '>
          <ContentNavbar
            media={movieData.media_type}
            id={params.id}
          />
          <div className='z-0 flex-1 overflow-hidden relative min-h-[300px] mt-10 mx-5'>
            <Suspense fallback={<Loader />}>
              {children}
            </Suspense>
          </div>
        </div>
      </section>

    </div>
  );
}

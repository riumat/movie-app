import CarouselsSection from "@/components/landing-page/carousels-section";
import CarouselsSectionSkeleton from "@/components/landing-page/carousels-section-skeleton";
import TrendingMovieSection from "@/components/landing-page/trending-movie";
import { getLandingPageFeatured } from "@/lib/fetchers/index";
import { Suspense } from "react";

const LandingPage = async () => {
  const featuredMovie = await getLandingPageFeatured();
  return (
    <div className=" flex flex-col">
      <TrendingMovieSection movie={featuredMovie} />
      <Suspense fallback={<CarouselsSectionSkeleton />}>
        <CarouselsSection />
      </Suspense>
    </div>

  );
}

export default LandingPage
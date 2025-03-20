"server-only"

import { getTmdbContentData, getTmdbCreditsData, getTmdbFilteredContent, getTmdbGenericContentData, getTmdbGenresAndProviders, getTmdbHeaderData, getTmdbLandingContent, getTmdbLandingFeatured, getTmdbPersonData, getTmdbRecommendationsData, getTmdbSearchResults, getTmdbVideosData } from "@/lib/fetchers/tmdb";
import { formatCombinedCredits, formatCreditsReleaseDate, formatCrewList, formatFilterProviders, formatProviders, formatTvAggregate, formatTvCastList, formatVideoContent } from "@/lib/functions";
import { ApiListResponse } from "@/lib/types/api.types";
import { MediaType } from "@/lib/types/content.types";
import { MovieData } from "@/lib/types/movie.types";
import { FilterParams } from "@/lib/types/params.types";
import { TvData } from "@/lib/types/tv.types";

export const getGenresAndProviders = async (media: string) => {
  const { genres, providers } = await getTmdbGenresAndProviders(media);
  const formattedProviders = formatFilterProviders(providers);

  return {
    genres: genres,
    providers: formattedProviders
  };
};

export const getTotalPagesFiltered = async (params: FilterParams, media: MediaType) => {
  const {
    genres = "",
    providers = "",
    page = "1",
    from = "1920",
    to = new Date().getFullYear().toString(),
    sort = "popularity.desc",
    runtime_lte = "360",
    runtime_gte = "0"
  } = params;

  const content = await getTmdbFilteredContent({
    genres,
    providers,
    page,
    from,
    to,
    sort,
    runtime_gte,
    runtime_lte,
  }, media);

  return content.total_pages;
}

export const getFilteredContents = async (params: FilterParams, media: MediaType) => {
  const {
    genres = "",
    providers = "",
    page = "1",
    from = "1920",
    to = new Date().getFullYear().toString(),
    sort = "popularity.desc",
    runtime_lte = "360",
    runtime_gte = "0"
  } = params;

  const { results, total_pages } = await getTmdbFilteredContent({
    genres,
    providers,
    page,
    from,
    to,
    sort,
    runtime_gte,
    runtime_lte,
  }, media);


  return {
    results: results.map((item: any) => ({
      ...item,
      media_type: media
    })),
    totalPages: total_pages
  }
}

export const getPersonData = async (id: string) => {
  const {
    personData,
    creditsData,
    imagesData,
    externalData
  } = await getTmdbPersonData(id);

  const knownForCredits = personData.known_for_department === "Acting" ?
    formatCombinedCredits(creditsData.cast) :
    formatCombinedCredits(creditsData.crew)

  const formattedCastCredits = formatCreditsReleaseDate(creditsData.cast)
  const formattedCrewCredits = formatCreditsReleaseDate(creditsData.crew)

  return {
    ...personData,
    combined_credits: knownForCredits,
    images: imagesData,
    external_ids: externalData,
    cast_credits: formattedCastCredits,
    crew_credits: formattedCrewCredits,
  };
}

export const getGenericContentData = async (id: string, media: string) => {
  const contentData = await getTmdbGenericContentData(id, media);

  return {
    ...contentData,
    type: media,
  };
}

export const getHeaderContentData = async (id: string, media: string) => {
  const contentData = await getTmdbHeaderData(id, media);

  return {
    ...contentData,
    type: media,
  };
}

export const getContentCreditData = async (contentId: string, media: string) => {
  const creditsPromise = getTmdbCreditsData(contentId, media);
  const contentPromise = getTmdbGenericContentData(contentId, media);
  const [creditsData, contentData] = await Promise.all([creditsPromise, contentPromise]);
  const credits = media === "movie" ?
    {
      ...creditsData,
      crew: formatCrewList(creditsData.crew)
    } :
    {
      crew: [...contentData.created_by, ...formatTvAggregate(creditsData.crew)],
      cast: formatTvCastList(creditsData.cast)
    }

  return credits
}

export const getContentVideosData = async (contentId: string, media: string) => {
  const videos = await getTmdbVideosData(contentId, media);
  const { trailers, clips, feat } = formatVideoContent(videos.results);
  return { trailers, clips, feat };
}

export const getSimilarContentData = async (contentId: string, media: string) => {
  const recommendations = await getTmdbRecommendationsData(contentId, media);

  return {
    recommendations: recommendations.results.map((result: any) => ({
      ...result,
      type: media,
    }))
  };
}

export const getContentData = async (contentId: string, media: string) => {
  const {
    contentData,
    creditsData,
    imagesData,
    providersData
  } = await getTmdbContentData(contentId, media);

  const credits = media === "movie" ?
    {
      ...creditsData,
      crew: formatCrewList(creditsData.crew)
    } :
    {
      crew: [...contentData.created_by, ...formatTvAggregate(creditsData.crew)],
      cast: formatTvCastList(creditsData.cast)
    }

  const providers = formatProviders(providersData.results.IT);
  const { trailers, clips, feat } = formatVideoContent(contentData.videos.results);

  return {
    ...contentData,
    production_companies: contentData.production_companies.filter((company: any, index: number, self: any[]) => index === self.findIndex((c) => c.name === company.name)),
    recommendations: contentData.recommendations.results.map((result: any) => ({ ...result, type: media })),
    images: imagesData,
    providers: providers,
    credits: credits,
    videos: { trailers, clips, feat },
    type: media,
  };
}

export const getSearchResults = async (query: string, page: string) => {
  const contents = await getTmdbSearchResults(query, page);

  return {
    contents: contents,
  };
}

export const getLandingPageFeatured = async () => {
  const featuredMovie = await getTmdbLandingFeatured();
  return featuredMovie;
}

export const getLandingPageData = async () => {
  const trendingContents = await getTmdbLandingContent();


  return {
    movies: trendingContents.movies.map((item) => ({
      ...item,
    })) as MovieData[],
    tv: trendingContents.tv.map((item) => ({
      ...item,
    })
    ) as TvData[]
  }
}

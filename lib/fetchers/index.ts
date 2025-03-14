"server-only"

import { getPrismaBestRatedMovies, getPrismaBestRatedTvShows, getPrismaContentData, getPrismaContentFriendsData, getPrismaFeatureContentData, getPrismaPersonData, getPrismaSearchResults, getPrismaWatchAndWatchlistIds } from "@/lib/fetchers/prisma";
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
    sort = "popularity.desc"
  } = params;

  const content = await getTmdbFilteredContent({
    genres,
    providers,
    page,
    from,
    to,
    sort
  }, media);

  return content.total_pages;
}

export const getFilteredTotalPages = async (params: FilterParams, media: MediaType) => {
  const {
    genres = "",
    providers = "",
    page = "1",
    from = "1920",
    to = new Date().getFullYear().toString(),
    sort = "popularity.desc"
  } = params;

  const { total_pages } = await getTmdbFilteredContent({
    genres,
    providers,
    page,
    from,
    to,
    sort
  }, media);

  return total_pages;

}

export const getFilteredContents = async (params: FilterParams, media: MediaType) => {
  const {
    genres = "",
    providers = "",
    page = "1",
    from = "1920",
    to = new Date().getFullYear().toString(),
    sort = "popularity.desc"
  } = params;

  const tmdbPromise = getTmdbFilteredContent({
    genres,
    providers,
    page,
    from,
    to,
    sort
  }, media);

  const prismaPromise = getPrismaWatchAndWatchlistIds(media);

  const [content, prismaContent] = await Promise.all([
    tmdbPromise,
    prismaPromise
  ]);

  return content.results.map((item: any) => ({
    ...item,
    type: media,
    user: prismaContent ? {
      watched: prismaContent.watchedSet.has(item.id),
      watchlisted: prismaContent.watchlistedSet.has(item.id)
    } : null
  }))
}

export const getPersonData = async (id: string) => {
  const tmdbPromise = getTmdbPersonData(id);
  const prismaPromise = getPrismaPersonData(id);
  const [{
    personData,
    creditsData,
    imagesData,
    externalData
  }, prismaContent] = await Promise.all([tmdbPromise, prismaPromise]);

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
    user: prismaContent ?? null
  };
}

export const getGenericContentData = async (id: string, media: string) => {
  const tmdbPromise = getTmdbGenericContentData(id, media);
  const prismaPromise = getPrismaContentFriendsData(id, media);
  const [contentData, prismaContent] = await Promise.all([tmdbPromise, prismaPromise]);

  return {
    ...contentData,
    type: media,
    user: prismaContent ?? null
  };
}

export const getHeaderContentData = async (id: string, media: string) => {
  const tmdbPromise = getTmdbHeaderData(id, media);
  const prismaPromise = getPrismaContentData(id, media);
  const [contentData, prismaContent] = await Promise.all([tmdbPromise, prismaPromise]);

  return {
    ...contentData,
    type: media,
    user: prismaContent ?? null
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
  const similarPromise = getTmdbRecommendationsData(contentId, media);
  const prismaPromise = getPrismaWatchAndWatchlistIds(media);
  const [recommendations, prismaContent] = await Promise.all([similarPromise, prismaPromise]);

  return {
    recommendations: recommendations.results.map((result: any) => ({
      ...result,
      type: media,
      user: prismaContent ? {
        watched: prismaContent.watchedSet.has(result.id),
        watchlisted: prismaContent.watchlistedSet.has(result.id)
      } : null
    }))
  };
}

export const getContentData = async (contentId: string, media: string) => {
  const tmdbPromise = getTmdbContentData(contentId, media);
  const prismaPromise = getPrismaContentData(contentId, media);
  const [{
    contentData,
    creditsData,
    imagesData,
    providersData
  }, prismaContent] = await Promise.all([tmdbPromise, prismaPromise]);
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
    user: prismaContent ?? null
  };
}

export const getSearchResults = async (query: string, page: string) => {
  const tmdbPromise = getTmdbSearchResults(query, page);
  const prismaPromise = getPrismaSearchResults(query);

  const [contents, users] = await Promise.all([tmdbPromise, prismaPromise]);

  return {
    contents: contents,
    users: users
  };
}

export const getLandingPageFeatured = async () => {
  const featuredMovie = await getTmdbLandingFeatured();
  return featuredMovie;
}

export const getLandingPageData = async () => {
  const prismaMoviePromise = getPrismaWatchAndWatchlistIds("movie") ?? [];
  const prismaTvPromise = getPrismaWatchAndWatchlistIds("tv") ?? [];
  const [prismaUserMovies, prismaUserTvs] = await Promise.all([
    prismaMoviePromise,
    prismaTvPromise
  ]);

  const prismaBestRatedMovieP = getPrismaBestRatedMovies();
  const prismaBestRatedTvP = getPrismaBestRatedTvShows();
  const [prismaRatedMovies, prismaRatedTv] = await Promise.all([prismaBestRatedMovieP, prismaBestRatedTvP]);

  const ratedMoviesTmp = await Promise.all(prismaRatedMovies?.map(async (movie) => {
    const tmdbData = await getTmdbRecommendationsData(movie.id.toString(), "movie") as ApiListResponse<MovieData>;
    return tmdbData.results.filter(c => (c.vote_average > 7 && c.vote_count > 150)).splice(0, 5);
  }) || []);
  const ratedTvs = await Promise.all(prismaRatedTv?.map(async (tv) => {
    const tmdbData = await getTmdbRecommendationsData(tv.id.toString(), "tv") as ApiListResponse<TvData>;
    return tmdbData.results.filter(c => (c.vote_average > 7 && c.vote_count > 150)).splice(0, 5)
  }) || []);


  const trendingContents = await getTmdbLandingContent();


  return {
    ratedMovies: ratedMoviesTmp.flat().filter(movie => !prismaUserMovies?.watchedSet.has(movie.id)),
    ratedTvs: ratedTvs.flat().filter(tv => !prismaUserTvs?.watchedSet.has(tv.id)),
    movies: trendingContents.movies.map((item) => ({
      ...item,
      user: prismaUserMovies ? {
        watched: prismaUserMovies.watchedSet.has(item.id),
        watchlisted: prismaUserMovies.watchlistedSet.has(item.id)
      } : null
    })) as MovieData[],
    tv: trendingContents.tv.map((item) => ({
      ...item,
      user: prismaUserTvs ? {
        watched: prismaUserTvs.watchedSet.has(item.id),
        watchlisted: prismaUserTvs.watchlistedSet.has(item.id)
      } : null
    })
    ) as TvData[]
  }
}

export const getFeaturedContentData = async (id: string) => {
  const prismaContent = await getPrismaFeatureContentData(id);
  if (!prismaContent) return null;
  const tmdbContent = await getTmdbContentData(prismaContent.content_id.toString(), prismaContent.content_type);

  return {
    prismaContent,
    tmdbContent
  };
}
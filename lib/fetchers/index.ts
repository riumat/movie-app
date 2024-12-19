"server-only"

import { getPrismaContentData, getPrismaPersonData, getPrismaSearchResults, getPrismaWatchAndWatchlistIds } from "@/lib/fetchers/prisma";
import { getTmdbContentData, getTmdbFilteredContent, getTmdbGenresAndProviders, getTmdbLandingContent, getTmdbPersonData, getTmdbSearchResults } from "@/lib/fetchers/tmdb";
import { formatCombinedCredits, formatCreditsReleaseDate, formatCrewList, formatFilterProviders, formatProviders, formatTvAggregate, formatTvCastList, formatVideoContent } from "@/lib/functions";

export const getGenresAndProviders = async (media: string) => {
  const { genres, providers } = await getTmdbGenresAndProviders(media);
  const formattedProviders = formatFilterProviders(providers);

  return {
    genres: genres,
    providers: formattedProviders
  };
};

export const getTotalPagesFiltered= async (params: any, media: string) => {
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

export const getFilteredContents = async (params: any, media: string) => {
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

  return {
    content: content.results.map((item: any) => ({
      ...item,
      type: media,
      user: prismaContent ? {
        watched: prismaContent.watchedSet.has(item.id),
        watchlisted: prismaContent.watchlistedSet.has(item.id)
      } : null
    })),
    totalPages: content.total_pages
  };
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

export const getLandingPageData = async () => {
  const tmdbPromise = getTmdbLandingContent();
  const prismaMoviePromise = getPrismaWatchAndWatchlistIds("movie");
  const prismaTvPromise = getPrismaWatchAndWatchlistIds("tv");
  const [contents, prismaMovie, prismaTv] = await Promise.all([
    tmdbPromise,
    prismaMoviePromise,
    prismaTvPromise
  ]);
  return {
    ...contents,
    movies: contents.movies.map((item: any) => ({
      ...item,
      user: prismaMovie ? {
        watched: prismaMovie.watchedSet.has(item.id),
        watchlisted: prismaMovie.watchlistedSet.has(item.id)
      } : null
    })),
    tv: contents.tv.map((item: any) => ({
      ...item,
      user: prismaTv ? {
        watched: prismaTv.watchedSet.has(item.id),
        watchlisted: prismaTv.watchlistedSet.has(item.id)
      } : null
    })
    )
  }
}
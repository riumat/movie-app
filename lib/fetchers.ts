import { baseUrl } from "@/lib/constants";
import { formatCombinedCredits, formatCrewList, formatFilterProviders, formatProviders, formatTvAggregate, formatTvCastList } from "@/lib/functions";
import { getSession } from "@/lib/session";
import { MovieData } from "@/lib/types/movie.types";
import { SessionData } from "@/lib/types/session";
import { TvData } from "@/lib/types/tv.types";
import { ContentType, PrismaClient } from "@prisma/client";
const apiKey = process.env.TMDB_API_KEY

/* export const fetchGenresAndProviders = async (media: string) => {
  const [genresRes, providersRes] = await Promise.all([
    fetch(`${baseUrl}/genre/${media}/list?api_key=${apiKey}`),
    fetch(`${baseUrl}/watch/providers/${media}?api_key=${apiKey}&watch_region=IT`)
  ]);

  const [genresData, providersData] = await Promise.all([
    genresRes.json(),
    providersRes.json()
  ]);

  return {
    genres: genresData.genres,
    providers: formatFilterProviders(providersData.results)
  };
}; */

/* export const fetchFilteredContents = async (params: any, media: string) => {
  // Destructure with default values and type safety
  const {
    genres = "",
    providers = "",
    page = "1",
    from = "1920",
    to = new Date().getFullYear().toString(),
    sort = "popularity.desc"
  } = params;

  // Build URL parameters once
  const urlParams = new URLSearchParams({
    api_key: apiKey as string,
    page,
    with_watch_providers: providers,
    with_genres: genres,
    [`${media === "movie" ? "primary_release_date" : "first_air_date"}.gte`]: `${from}-01-01`,
    [`${media === "movie" ? "primary_release_date" : "first_air_date"}.lte`]: `${to}-12-31`,
    sort_by: sort,
    without_genres: "10763,10764,10767",
    "vote_count.gte": "200",
    watch_region: "IT"
  });

  // Fetch data and session in parallel
  const [response, session] = await Promise.all([
    fetch(`${baseUrl}/discover/${media}?${urlParams}`),
    getSession()
  ]);

  const { results, total_pages } = await response.json();

  // Early return if no session
  if (!session) {
    return {
      content: results.map((item: any) => ({
        ...item,
        type: media,
        watched: false,
        watchlisted: false
      })),
      totalPages: total_pages
    };
  }

  // Use a single Prisma instance
  const prisma = new PrismaClient();
  try {
    const [watched, watchlisted] = await Promise.all([
      prisma.content.findMany({
        where: {
          user_id: session.user.id,
          content_type: media as ContentType,
        },
        select: { content_id: true }
      }),
      prisma.watchlist.findMany({
        where: {
          user_id: session.user.id,
          content_type: media as ContentType,
        },
        select: { content_id: true }
      })
    ]);

    const watchedSet = new Set(watched.map(w => w.content_id));
    const watchlistedSet = new Set(watchlisted.map(w => w.content_id));

    return {
      content: results.map((item: any) => ({
        ...item,
        type: media,
        watched: watchedSet.has(item.id),
        watchlisted: watchlistedSet.has(item.id)
      })),
      totalPages: total_pages
    };
  } finally {
    await prisma.$disconnect();
  }
}; */

/* 
export const getDiscoverMovies = async () => {
  const res = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&page=1&sort_by=popularity.desc`);
  const data = await res.json();
  return data.results;
} */

/* export const fetchTrendingPosters = async (index1: number, index2: number, media: string) => {
  try {
    const response = await fetch(`${baseUrl}/${media}/popular?api_key=${apiKey}`, { next: { revalidate: 3600 } });
    const data = await response.json();
    return data.results
      .slice(index1, index2)
      .map((item: { poster_path: string }) => item.poster_path);
  } catch (error) {
    console.error('Error fetching popular content:', error);
    return [];
  }
}; */

/* export const fetchUserPersonData = async (personId: string) => {
  "use server"
  const session = await getSession();
  if (!session) return;

  const prisma = new PrismaClient()
  const person = await prisma.person.findFirst({
    where: {
      person_id: Number(personId),
      user_id: Number(session.user.id)
    }
  })

  return {
    isFollowed: person ? true : false,
    userId: session.user.id,
  }
}
 */
/* export const fetchUserContentData = async (contentId: string, contentType: "movie" | "tv") => {
  "use server"
  const session: SessionData = await getSession();
  if (!session) return;

  const prisma = new PrismaClient()
  const content = await prisma.content.findFirst({
    where: {
      content_id: Number(contentId),
      user_id: Number(session.user.id),
      content_type: contentType
    }
  })

  const isWatchListed = await prisma.watchlist.findFirst({
    where: {
      content_id: Number(contentId),
      user_id: Number(session.user.id),
      content_type: contentType
    }
  })

  const contentData = content ? {
    watched: true,
    rating: content.rating,
    review: content.review,
  } : {
    watched: false,
    rating: null,
    review: null,
  }

  const watchlisted = isWatchListed ? true : false;

  return {
    ...contentData,
    watchlisted,
    userId: session.user.id
  }
} */


/* export const fetchContentData = async (contentId: string, media: string) => {
  const creditsUrl = media === "movie" ? "credits" : "aggregate_credits";
  const [contentRes, imagesRes, providersRes, creditsRes] = await Promise.all([
    fetch(`${baseUrl}/${media}/${contentId}?api_key=${apiKey}&language=en-US&append_to_response=videos,recommendations`),
    fetch(`${baseUrl}/${media}/${contentId}/images?api_key=${apiKey}`),
    fetch(`${baseUrl}/${media}/${contentId}/watch/providers?api_key=${apiKey}`),
    fetch(`${baseUrl}/${media}/${contentId}/${creditsUrl}?api_key=${apiKey}`),
  ]);

  if (!contentRes.ok || !imagesRes.ok || !providersRes.ok || !creditsRes.ok) {
    throw new Error('Failed to fetch content data');
  }
  const [contentData, imagesData, providersData, creditsData] = await Promise.all([
    contentRes.json(),
    imagesRes.json(),
    providersRes.json(),
    creditsRes.json(),
  ]);

  const credits = media === "movie" ?
    { ...creditsData, crew: formatCrewList(creditsData.crew) } :
    { crew: [...contentData.created_by, ...formatTvAggregate(creditsData.crew)], cast: formatTvCastList(creditsData.cast) }

  const providers = formatProviders(providersData.results.IT);
  const trailers = contentData.videos.results.filter((video: any) => video.official && video.type === "Trailer" || video.type === "Teaser");
  const clips = contentData.videos.results.filter((video: any) => video.official && video.type === "Clip");
  const feat = contentData.videos.results.filter((video: any) => video.type === "Featurette");


  return {
    ...contentData,
    production_companies: contentData.production_companies.filter((company: any, index: number, self: any[]) => index === self.findIndex((c) => c.name === company.name)),
    recommendations: contentData.recommendations.results.map((result: any) => ({ ...result, type: media })),
    images: imagesData,
    providers: providers,
    credits: credits,
    videos: { trailers, clips, feat },
    type: media
  };
} */

/* export const fetchSeasonData = async (contentId: string, seasonNumber: string) => {
  const res = await fetch(`${baseUrl}/tv/${contentId}/season/${seasonNumber}?api_key=${apiKey}&append_to_response=credits`);
  const data = await res.json();
  return data;
} */

/* export const fetchPersonData = async (id: string) => {
  const [personRes, creditsRes, imagesRes, externalRes] = await Promise.all([
    fetch(`${baseUrl}/person/${id}?api_key=${apiKey}`),
    fetch(`${baseUrl}/person/${id}/combined_credits?api_key=${apiKey}`),
    fetch(`${baseUrl}/person/${id}/images?api_key=${apiKey}`),
    fetch(`${baseUrl}/person/${id}/external_ids?api_key=${apiKey}`),
  ])

  if (!personRes.ok || !creditsRes.ok || !imagesRes.ok || !externalRes.ok) {
    throw new Error('Failed to fetch person data');
  }
  const [personData, creditsData, imagesData, externalData] = await Promise.all([
    personRes.json(),
    creditsRes.json(),
    imagesRes.json(),
    externalRes.json(),
  ])

  const combinedCredits = personData.known_for_department === "Acting" ?
    formatCombinedCredits(creditsData.cast) :
    formatCombinedCredits(creditsData.crew)


  const formattedCastCredit = creditsData.cast.map((credit: any) => {
    if (credit.media_type === "tv") {
      return {
        ...credit,
        release_date: credit.first_air_date,
      }
    }
    return {
      ...credit,
    }
  })
    .filter((credit: any) => credit.release_date !== "")
    .sort((a: any, b: any) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );

  const formattedCrewCredits = creditsData.crew.map((credit: any) => {
    if (credit.media_type === "tv") {
      return {
        ...credit,
        release_date: credit.first_air_date,
      }
    }
    return {
      ...credit,
    }
  })
    .filter((credit: any) => credit.release_date !== "")
    .sort((a: any, b: any) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );



  return {
    ...personData,
    combined_credits: combinedCredits,
    images: imagesData,
    external_ids: externalData,
    cast_credits: formattedCastCredit,
    crew_credits: formattedCrewCredits
  };
} */

/* export const fetchQueryData = async (query: string, page: string) => {
  const prisma = new PrismaClient();

  const params = new URLSearchParams({
    query: query,
    language: 'en-US',
    page: page,
    api_key: apiKey as string
  });

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: query
      }
    },
    select: {
      user_id: true,
      username: true,
      watchtime: true
    }
  });


  const response = await fetch(`${baseUrl}/search/multi?${params}`, {
    headers: {
      accept: 'application/json',
    },
  });

  return {
    ...await response.json(),
    users: users
  };
}
 */



/* export const fetchTrending = async () => {
  const revalidateTime = 432000; //5gg
  const [trendingMovies, trendingTv] = await Promise.all([
    fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`, { next: { revalidate: revalidateTime } }),
    fetch(`${baseUrl}/trending/tv/week?api_key=${apiKey}`, { next: { revalidate: revalidateTime } })
  ]);

  const [movies, tv] = await Promise.all([trendingMovies.json(), trendingTv.json()]);

  const id = movies.results[0].id;
  const urlRes = await fetch(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}`, { next: { revalidate: revalidateTime } });
  const urlData = await urlRes.json();
  const url = urlData.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube");
  return {
    movies: movies.results.map((item: any) => ({ ...item, type: "movie" })),
    tv: tv.results.map((item: any) => ({ ...item, type: "tv" })),
    video: {
      url: url ? url.key : null,
      title: movies.results[0].title,
      id: movies.results[0].id,
      poster: movies.results[0].backdrop_path,
      type: "movie"
    }
  }
} */


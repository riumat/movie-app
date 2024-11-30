import { baseUrl } from "@/lib/constants";
import { formatCombinedCredits, formatCrewList, formatFilterProviders, formatProviders, formatTvAggregate, formatTvCastList } from "@/lib/functions";
import { getSession } from "@/lib/session";
import { ContentItem } from "@/lib/types/content";
import { PrismaClient } from "@prisma/client";
const apiKey = process.env.TMDB_API_KEY

export const fetchGenres = async (media: string) => {
  const res = await fetch(`${baseUrl}/genre/${media}/list?api_key=${apiKey}`);
  const data = await res.json();
  return data.genres;
};

export const fetchProviders = async (media: string) => {
  const res = await fetch(`${baseUrl}/watch/providers/${media}?api_key=${apiKey}&watch_region=IT`);
  const data = await res.json();
  return formatFilterProviders(data.results);
};

export const fetchContentDataWithFilters = async (params: any, media: string) => {
  const { genres = "", providers = "", page = "1", from = "1920", to = new Date().getFullYear().toString(), sort = "popularity.desc" } = params;
  const release = media === "movie" ? "primary_release_date" : "first_air_date";
  const res = await fetch(
    `${baseUrl}/discover/${media}?api_key=${apiKey}&page=${page}&with_watch_providers=${providers}&with_genres=${genres}&${release}.gte=${from}-01-01&${release}.lte=${to}-12-31&sort_by=${sort}&watch_region=IT&without_genres=10763,10764,10767`
  )
  const data = await res.json();

  return {
    content: data.results.map((item: any) => ({ ...item, type: media })),
    sort,
    totalPages: data.total_pages
  };
}


export const getDiscoverMovies = async () => {
  const res = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&page=1&sort_by=popularity.desc`);
  const data = await res.json();
  return data.results;
}

export const fetchTrendingPosters = async (index1: number, index2: number, media: string) => {
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
};

export const fetchUserPersonData = async (personId: string) => {
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
  //relationship
  return {
    isFollowed: person ? true : false,
    userId: session.user.id,
  }


}

export const fetchUserContentData = async (contentId: string, contentType: "movie" | "tv") => {
  "use server"
  const session = await getSession();
  if (!session) return;

  const prisma = new PrismaClient()
  const content = await prisma.content.findFirst({
    where: {
      content_id: Number(contentId),
      user_id: Number(session.user.id),
      content_type: contentType
    }
  })

  const watchlisted = await prisma.watchlist.findFirst({
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

  const isWatchListed = watchlisted ? true : false;

  return {
    ...contentData,
    isWatchListed,
    userId: session.user.id
  }
}


export const fetchContentData = async (contentId: string, media: string) => {
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
    images: imagesData,
    providers: providers,
    credits: credits,
    videos: { trailers, clips, feat },
    type: media
  };
}

export const fetchSeasonData = async (contentId: string, seasonNumber: string) => {
  const res = await fetch(`${baseUrl}/tv/${contentId}/season/${seasonNumber}?api_key=${apiKey}&append_to_response=credits`);
  const data = await res.json();
  return data;
}

export const fetchPersonData = async (id: string) => {
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
}

export const fetchQueryData = async (query: string, page: string) => {
  const params = new URLSearchParams({
    query: query,
    language: 'en-US',
    page: page,
    api_key: apiKey as string
  });


  const response = await fetch(`${baseUrl}/search/multi?${params}`, {
    headers: {
      accept: 'application/json',
    },
  });

  return response.json();
}

export const checkUserContent = async (session: any, content: ContentItem[], media: "movie" | "tv") => {
  const prisma = new PrismaClient();
  const userId = session.user.id;
  if (!userId) {
    return [];
  }

  const contentIds = content.map(item => item.id);

  const watchedContent = await prisma.content.findMany({
    where: {
      user_id: userId,
      content_type: media,
      content_id: {
        in: contentIds
      }
    },
    select: {
      content_id: true
    }
  });

  const watchlistedContent = await prisma.watchlist.findMany({
    where: {
      user_id: userId,
      content_type: media,
      content_id: {
        in: contentIds
      }
    },
    select: {
      content_id: true
    }
  });

  return {
    watched: watchedContent.map(item => item.content_id),
    bookmarked: watchlistedContent.map(item => item.content_id)
  };
}
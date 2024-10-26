import { baseUrl } from "@/utils/constants";
import { formatCombinedCredits, formatCrewList, formatProviders, formatTvAggregate, formatTvCastList } from "@/utils/functions";

const apiKey = process.env.TMDB_API_KEY;

export const getGenres = async () => {
  const res = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
  const data = await res.json();
  return data.genres;
}

export const getWatchProviders = async () => {
  const res = await fetch(`${baseUrl}/watch/providers/movie?api_key=${apiKey}&watch_region=IT`);
  const data = await res.json();
  return data.results;
}

export const fetchContentDataWithFilters = async (media: string) => {
  const [resGenres, resWatchProviders, resContent] = await Promise.all([
    fetch(`${baseUrl}/genre/${media}/list?api_key=${apiKey}`),
    fetch(`${baseUrl}/watch/providers/${media}?api_key=${apiKey}&watch_region=IT`),
    fetch(`${baseUrl}/discover/${media}?api_key=${apiKey}&page=1&sort_by=popularity.desc`)
  ]);
  const [genres, watchProviders, content] = await Promise.all([
    resGenres.json(),
    resWatchProviders.json(),
    resContent.json()
  ]);
  return { genres: genres.genres, providers: watchProviders.results, content: content.results };
}


export const getDiscoverMovies = async () => {
  const res = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&page=1&sort_by=popularity.desc`);
  const data = await res.json();
  return data.results;
}

export const fetchTrendingPosters = async (index1: number, index2: number, media: string): Promise<string[]> => {
  try {
    const response = await fetch(`${baseUrl}/${media}/popular?api_key=${apiKey}`);
    const data = await response.json();
    return data.results
      .slice(index1, index2)
      .map((item: { poster_path: string }) => item.poster_path);
  } catch (error) {
    console.error('Error fetching popular content:', error);
    return [];
  }
};


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

  return { ...contentData, images: imagesData, providers: providers, credits: credits, videos: { trailers, clips, feat } };
}

export const fetchSeasonData = async (contentId: string, seasonNumber: string) => {
  const res = await fetch(`${baseUrl}/tv/${contentId}/season/${seasonNumber}?api_key=${apiKey}&append_to_response=credits`);
  const data = await res.json();
  return data;
}

export const fetchPersonData = async (id: string) => {
  const [personRes, creditsRes, imagesRes] = await Promise.all([
    fetch(`${baseUrl}/person/${id}?api_key=${apiKey}`),
    fetch(`${baseUrl}/person/${id}/combined_credits?api_key=${apiKey}`),
    fetch(`${baseUrl}/person/${id}/images?api_key=${apiKey}`),
  ])

  if (!personRes.ok || !creditsRes.ok || !imagesRes.ok) {
    throw new Error('Failed to fetch person data');
  }
  const [personData, creditsData, imagesData] = await Promise.all([
    personRes.json(),
    creditsRes.json(),
    imagesRes.json(),
  ])

  const combinedCredits = personData.known_for_department === "Acting" ? formatCombinedCredits(creditsData.cast) : formatCombinedCredits(creditsData.crew)

  return { ...personData, combined_credits: combinedCredits, images: imagesData };

}
"server-only"

const tmdbUrl = process.env.TMDB_URL;
const apiKey = process.env.TMDB_API_KEY;

export const getTmdbGenresAndProviders = async (media: string) => {
  const [genresRes, providersRes] = await Promise.all([
    fetch(`${tmdbUrl}/genre/${media}/list?api_key=${apiKey}`),
    fetch(`${tmdbUrl}/watch/providers/${media}?api_key=${apiKey}&watch_region=IT`)
  ]);

  const [genresData, providersData] = await Promise.all([
    genresRes.json(),
    providersRes.json()
  ]);

  return {
    genres: genresData.genres,
    providers: providersData.results
  };
};

export const getTmdbFilteredContent = async (params: any, media: string) => {
  const release = media === 'movie' ? 'primary_release_date' : 'first_air_date';

  const searchParams = new URLSearchParams({
    api_key: apiKey,
    page: params.page.toString(),
    with_watch_providers: params.providers,
    with_genres: params.genres,
    [`${release}.gte`]: `${params.from}-01-01`,
    [`${release}.lte`]: `${params.to}-12-31`,
    sort_by: params.sort,
    without_genres: '10763,10764,10767',
    'vote_count.gte': '200',
    watch_region: 'IT'
  });

  const url = `${tmdbUrl}/discover/${media}?${searchParams.toString()}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

type PersonResponse = {
  personData: any;
  creditsData: any;
  imagesData: any;
  externalData: any;
}

export const getTmdbPersonData = async (id: string): Promise<PersonResponse> => {
  try {
    const endpoints = [
      `${tmdbUrl}/person/${id}`,
      `${tmdbUrl}/person/${id}/combined_credits`,
      `${tmdbUrl}/person/${id}/images`,
      `${tmdbUrl}/person/${id}/external_ids`
    ];

    const requests = endpoints.map(endpoint =>
      fetch(`${endpoint}?api_key=${apiKey}`)
    );

    const responses = await Promise.all(requests);

    if (responses.some(res => !res.ok)) {
      throw new Error('One or more person information requests failed');
    }

    const [personData, creditsData, imagesData, externalData] = await Promise.all(
      responses.map(res => res.json())
    );

    return {
      personData,
      creditsData,
      imagesData,
      externalData
    };
  } catch (error) {
    throw new Error(`Failed to fetch person data: ${error}`);
  }
}

type ContentResponse = {
  contentData: any;
  imagesData: any;
  providersData: any;
  creditsData: any;
}
export const getTmdbGenericContentData = async (id: string, media: string) => {
  try {
    const contentData = await fetch(`${tmdbUrl}/${media}/${id}?api_key=${apiKey}&language=en-US`);
    if (!contentData.ok) {
      throw new Error('Failed to fetch content data');
    }
    const content = await contentData.json();
    return content;
  } catch (error) {
    throw new Error(`Failed to fetch content data: ${error}`);
  }
}
export const getTmdbHeaderData = async (id: string, media: string) => {
  try {
    const [contentRes, providersRes, imagesRes] = await Promise.all([
      fetch(`${tmdbUrl}/${media}/${id}?api_key=${apiKey}&language=en-US`),
      fetch(`${tmdbUrl}/${media}/${id}/watch/providers?api_key=${apiKey}`),
      fetch(`${tmdbUrl}/${media}/${id}/images?api_key=${apiKey}`),
    ]);
    if (!contentRes.ok || !providersRes.ok || !imagesRes.ok) {
      throw new Error('Failed to fetch content data');
    }

    const [contentData, providersData, imagesData] = await Promise.all([
      contentRes.json(),
      providersRes.json(),
      imagesRes.json(),
    ]);

    return {
      ...contentData,
      providers: providersData,
      images: imagesData
    };
  } catch (error) {
    throw new Error(`Failed to fetch content data: ${error}`);
  }
}



export const getTmdbCreditsData = async (id: string, media: string) => {
  const creditsUrl = media === "movie" ? "credits" : "aggregate_credits";
  try {
    const response = await fetch(`${tmdbUrl}/${media}/${id}/${creditsUrl}?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error('Failed to fetch credits data');
    }

    const creditsData = await response.json();
    return creditsData;
  } catch (error) {
    throw new Error(`Failed to fetch credits data: ${error}`);
  }
}

export const getTmdbVideosData = async (id: string, media: string) => {
  try {
    const response = await fetch(`${tmdbUrl}/${media}/${id}/videos?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error('Failed to fetch videos data');
    }

    const videosData = await response.json();
    return videosData;
  } catch (error) {
    throw new Error(`Failed to fetch videos data: ${error}`);
  }
}

export const getTmdbRecommendationsData = async (id: string, media: string) => {
  try {
    const response = await fetch(`${tmdbUrl}/${media}/${id}/recommendations?api_key=${apiKey}&language=en-US`);
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations data');
    }
    const recommendationsData = await response.json();
    return recommendationsData;
  } catch (error) {
    throw new Error(`Failed to fetch recommendations data: ${error}`);
  }

}

export const getTmdbContentData = async (contentId: string, media: string): Promise<ContentResponse> => {
  try {
    const creditsUrl = media === "movie" ? "credits" : "aggregate_credits";
    const [contentRes, imagesRes, providersRes, creditsRes] = await Promise.all([
      fetch(`${tmdbUrl}/${media}/${contentId}?api_key=${apiKey}&language=en-US&append_to_response=videos,recommendations`),
      fetch(`${tmdbUrl}/${media}/${contentId}/images?api_key=${apiKey}`),
      fetch(`${tmdbUrl}/${media}/${contentId}/watch/providers?api_key=${apiKey}`),
      fetch(`${tmdbUrl}/${media}/${contentId}/${creditsUrl}?api_key=${apiKey}`),
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

    return {
      contentData,
      imagesData,
      providersData,
      creditsData
    };
  } catch (error) {
    throw new Error(`Failed to fetch content data: ${error}`);
  }
}

type SearchResponse = {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export const getTmdbSearchResults = async (query: string, page: string): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams({
      api_key: apiKey as string,
      query,
      page,
      language: 'en-US'
    });

    const res = await fetch(`${tmdbUrl}/search/multi?${searchParams.toString()}`);

    if (!res.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error}`);
  }
}

export const getTmdbLandingContent = async () => {
  const revalidateTime = 432000; //5gg
  const [trendingMovies, trendingTv] = await Promise.all([
    fetch(`${tmdbUrl}/trending/movie/week?api_key=${apiKey}`, { next: { revalidate: revalidateTime } }),
    fetch(`${tmdbUrl}/trending/tv/week?api_key=${apiKey}`, { next: { revalidate: revalidateTime } })
  ]);

  const [movies, tv] = await Promise.all([trendingMovies.json(), trendingTv.json()]);

  const id = movies.results[0].id;
  const urlRes = await fetch(`${tmdbUrl}/movie/${id}/videos?api_key=${apiKey}`, { next: { revalidate: revalidateTime } });
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
}
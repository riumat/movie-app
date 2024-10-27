import { baseUrl } from '@/utils/constants';
import axios from 'axios';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const genres = searchParams.get('genres');
  const watchProviders = searchParams.get('providers');
  const page = searchParams.get('page') ?? 1;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const sort = searchParams.get('sortType');
  const media = searchParams.get('media');

  try {
    const response = await axios.get(`${baseUrl}/discover/${media}`, {
      params: {
        language: 'en-US',
        page: page,
        api_key: process.env.TMDB_API_KEY,
        sort_by: sort,
        'vote_count.gte': 420,
        with_genres: genres,
        with_watch_providers: watchProviders,
        watch_region: "IT",
        "primary_release_date.gte": startDate,
        "primary_release_date.lte": endDate,
      },
      headers: {
        accept: 'application/json',
      },
    });
    return Response.json(response.data);
  } catch (error: any) {
    console.log('Error fetching data:', error.code);
    return Response.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
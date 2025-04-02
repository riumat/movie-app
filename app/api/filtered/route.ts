import { baseUrl } from '@/lib/constants';
import axios from 'axios';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const genres = searchParams.get('genres');
  const watchProviders = searchParams.get('providers');
  const page = searchParams.get('page') ?? 1;
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const sort = searchParams.get('sort');
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
        "primary_release_date.gte": from,
        "primary_release_date.lte": to,
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
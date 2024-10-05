import { baseUrl } from '@/utils/constants';
import axios from 'axios';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get('query');
  const page = searchParams.get('page') ?? 1;
  const url = baseUrl;

  try {
    const response = await axios.get(`${url}/search/multi`, {
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: page,
        api_key: process.env.TMDB_API_KEY,
      },
      headers: {
        accept: 'application/json',
      },
    });
    console.log(response.data.results);
    return Response.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
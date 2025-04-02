import { baseUrl } from '@/lib/constants';
import axios from 'axios';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get('query');
  const page = searchParams.get('page') ?? 1;

  try {
    const response = await axios.get(`${baseUrl}/search/multi`, {
      params: {
        query: query,
        language: 'en-US',
        page: page,
        api_key: process.env.TMDB_API_KEY,
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
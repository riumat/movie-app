import { baseUrl } from '@/lib/constants';
import axios from 'axios';
const apiKey = process.env.TMDB_API_KEY;

export async function POST(request: Request) {
  const body = await request.json();
  const { number, showId } = body;

  try {
    const response = await axios.get(`${baseUrl}/tv/${showId}/season/${number}?api_key=${apiKey}`, {
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
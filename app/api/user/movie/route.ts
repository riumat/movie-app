import { baseUrl } from '@/lib/constants';
import { getSession } from '@/lib/session';
import { PrismaClient, ContentType } from '@prisma/client';

const prisma = new PrismaClient();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function getMovieDetails(movieId: number) {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ID ${movieId}`);
  }
  return response.json();
}

function getPaginationParams(url: URL) {
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  return { page };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { page } = getPaginationParams(url);
  const pageSize = 10;

  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const totalMovies = await prisma.content.count({
      where: {
        content_type: ContentType.movie,
        user_id: Number(session.user.id),
      },
    });

    const totalPages = Math.ceil(totalMovies / pageSize);

    const movieContents = await prisma.content.findMany({
      where: {
        content_type: ContentType.movie,
        user_id: Number(session.user.id),
      },
      select: {
        content_id: true,
        review: true,
        rating: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const movieDetailsPromises = movieContents.map(async content => {
      const details = await getMovieDetails(content.content_id);
      return {
        ...details,
        review: content.review,
        rating: content.rating,
        type: 'movie',
      };
    });

    const movieDetails = await Promise.all(movieDetailsPromises);

    return new Response(JSON.stringify({
      currentPage: page,
      totalPages,
      list: movieDetails,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
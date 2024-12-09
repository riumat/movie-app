import { baseUrl } from '@/lib/constants';
import { getSession } from '@/lib/session';
import { PrismaClient, ContentType } from '@prisma/client';

const prisma = new PrismaClient();
const apiKey = process.env.TMDB_API_KEY;

async function getShowDetails(movieId: number) {
  const response = await fetch(`${baseUrl}/tv/${movieId}?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ID ${movieId}`);
  }
  return response.json();
}

function getPaginationParams(url: URL) {
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const id = parseInt(url.searchParams.get('id') || '1');
  return { page, id };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { page, id } = getPaginationParams(url);
  const pageSize = 10;

  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const relationship = await prisma.relationship.findFirst({
      where: {
        OR: [
          { requester_id: session.user.id, receiver_id: Number(id) },
          { requester_id: Number(id), receiver_id: session.user.id }
        ],
        status: 'accepted'
      }
    });

    if (!relationship) {
      return new Response(JSON.stringify({ error: "Not authorized to view this content" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const totalShows = await prisma.content.count({
      where: {
        content_type: ContentType.tv,
        user_id: Number(id),
      },
    });

    const totalPages = Math.ceil(totalShows / pageSize);

    const tvContents = await prisma.content.findMany({
      where: {
        content_type: ContentType.tv,
        user_id: Number(id),
      },
      select: {
        content_id: true,
        review: true,
        rating: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const tvDetailsPromises = tvContents.map(async content => {
      const details = await getShowDetails(content.content_id);
      return {
        ...details,
        review: content.review,
        rating: content.rating,
        type: 'tv',
      };
    });

    const tvDetails = await Promise.all(tvDetailsPromises);

    return new Response(JSON.stringify({
      currentPage: page,
      totalPages,
      list: tvDetails,
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
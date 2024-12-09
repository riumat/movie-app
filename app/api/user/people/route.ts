import { baseUrl } from '@/lib/constants';
import { getSession } from '@/lib/session';
import { PrismaClient, ContentType } from '@prisma/client';

const prisma = new PrismaClient();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function getPeopleDetails(personId: number) {
  const response = await fetch(`${baseUrl}/person/${personId}?api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ID ${personId}`);
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

    const totalPeople = await prisma.person.count({
      where: {
        user_id: Number(session.user.id),
      },
    });

    const totalPages = Math.ceil(totalPeople / pageSize);

    const people = await prisma.person.findMany({
      where: {
        user_id: Number(session.user.id),
      },
      select: {
        person_id: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const movieDetailsPromises = people.map(async content => {
      const details = await getPeopleDetails(content.person_id);
      return {
        ...details,
        type: "person",
      };
    });

    const peopleDetails = await Promise.all(movieDetailsPromises);

    return new Response(JSON.stringify({
      currentPage: page,
      totalPages,
      list: peopleDetails,
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
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
  const id = url.searchParams.get('id');
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

    if (session.user.id !== Number(id)) {
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
    }

    const totalPeople = await prisma.person.count({
      where: {
        user_id: Number(id),
      },
    });

    const totalPages = Math.ceil(totalPeople / pageSize);

    const people = await prisma.person.findMany({
      where: {
        user_id: Number(id),
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
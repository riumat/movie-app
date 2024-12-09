import { baseUrl } from "@/lib/constants";
import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
const apiKey = process.env.TMDB_API_KEY;


export async function POST(request: Request) {
  const prisma = new PrismaClient();

  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const body = await request.json();
    const { contentId, userId, contentType, rating } = body;

    if (!contentId || !userId || !contentType || !rating) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingRow = await prisma.content.findUnique({
      where: {
        user_id_content_id_content_type: {
          user_id: Number(userId),
          content_id: Number(contentId),
          content_type: contentType,
        },
      },
    });

    if (!existingRow) {
      return new Response(JSON.stringify({ error: "Row not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await prisma.content.update({
        where: {
          user_id_content_id_content_type: {
            user_id: Number(userId),
            content_id: Number(contentId),
            content_type: contentType,
          },

        },
        data: {
          rating: Number(rating),
        },
      });

    }

    return new Response(JSON.stringify({ message: "Row updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating row:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}

async function getContentDetails(movieId: number, type: string) {
  const response = await fetch(`${baseUrl}/${type}/${movieId}?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch content details for ID ${movieId}`);
  }
  return response.json();
}

function getPaginationParams(url: URL) {
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  return { page };
}

export async function GET(request: Request) {
  const prisma = new PrismaClient();
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
    const totalShows = await prisma.content.count({
      where: {
        user_id: Number(session.user.id),
        rating: {
          not: null,
        },
      },
    });

    const totalPages = Math.ceil(totalShows / pageSize);

    const contents = await prisma.content.findMany({
      where: {
        user_id: Number(session.user.id),
        rating: {
          not: null,
        },
      },
      select: {
        content_id: true,
        rating: true,
        content_type: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const contentPromises = contents.map(async content => {
      const details = await getContentDetails(content.content_id, content.content_type);
      return {
        ...details,
        rating: content.rating,
        type: content.content_type,
      };
    });

    const contentDetails = await Promise.all(contentPromises);

    return new Response(JSON.stringify({
      currentPage: page,
      totalPages,
      list: contentDetails,
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
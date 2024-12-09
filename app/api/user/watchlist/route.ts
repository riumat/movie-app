import { baseUrl } from "@/lib/constants";
import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";

const apiKey = process.env.TMDB_API_KEY;


export async function POST(request: Request) {
  const prisma = new PrismaClient();

  try {
    const body = await request.json();
    const session = await getSession();
    const { contentId, contentType, contentName } = body;

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!contentId || !contentType || !contentName) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingRow = await prisma.watchlist.findUnique({
      where: {
        user_id_content_id_content_type: {
          user_id: Number(session.user.id),
          content_id: Number(contentId),
          content_type: contentType,
        },
      },
    });

    if (existingRow) {
      return new Response(JSON.stringify({ error: "Row already exists" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    await prisma.watchlist.create({
      data: {
        user_id: Number(session.user.id),
        content_id: Number(contentId),
        content_type: contentType,
        content_name: contentName,
      },
    });

    return new Response(JSON.stringify({ message: "Row created successfully" }), {
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



export async function DELETE(request: Request) {
  const prisma = new PrismaClient();

  try {
    const session = await getSession();
    const body = await request.json();
    const { contentId, contentType } = body;

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!contentId || !contentType) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingRow = await prisma.watchlist.findUnique({
      where: {
        user_id_content_id_content_type: {
          user_id: Number(session.user.id),
          content_id: Number(contentId),
          content_type: contentType,
        },
      },
    });

    if (existingRow) {
      await prisma.watchlist.delete({
        where: {
          user_id_content_id_content_type: {
            user_id: Number(session.user.id),
            content_id: Number(contentId),
            content_type: contentType,
          },
        },
      });
    }

    return new Response(JSON.stringify({ message: "Row created successfully" }), {
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
  const id = url.searchParams.get('id');
  return { page, id };
}

export async function GET(request: Request) {
  const prisma = new PrismaClient();
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

    const totalContent = await prisma.watchlist.count({
      where: {
        user_id: Number(id),
      },
    });

    const totalPages = Math.ceil(totalContent / pageSize);

    const contents = await prisma.watchlist.findMany({
      where: {
        user_id: Number(id),
      },
      select: {
        content_id: true,
        content_type: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const contentPromises = contents.map(async content => {
      const details = await getContentDetails(content.content_id, content.content_type);
      return {
        ...details,
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

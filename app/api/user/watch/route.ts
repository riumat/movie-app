import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const prisma = new PrismaClient();

  try {
    const body = await request.json();
    const { contentId, userId, contentType, duration, genres } = body;

    if (!contentId || !userId || !contentType) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.content.create({
      data: {
        user_id: Number(userId),
        content_id: Number(contentId),
        content_type: contentType,
        duration: duration,
        genres: genres,
      },
    });

    const isWatchlisted = await prisma.watchlist.findUnique({
      where: {
        user_id_content_id_content_type: {
          user_id: Number(userId),
          content_id: Number(contentId),
          content_type: contentType,
        },
      },
    })

    if (isWatchlisted) {
      prisma.watchlist.delete({
        where: {
          user_id_content_id_content_type: {
            user_id: Number(userId),
            content_id: Number(contentId),
            content_type: contentType,
          },
        }
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

export async function DELETE(request: Request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();
    const { contentId, userId, contentType } = body;

    if (!contentId || !userId || !contentType) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.content.delete({
      where: {
        user_id_content_id_content_type: {
          user_id: Number(userId),
          content_id: Number(contentId),
          content_type: contentType,
        },
      },
    });


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

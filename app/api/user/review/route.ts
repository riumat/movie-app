import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const prisma = new PrismaClient();

  try {
    const body = await request.json();
    const { contentId, userId, contentType, review } = body;

    if (!contentId || !userId || !contentType || review === undefined) {
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
          review: review,
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

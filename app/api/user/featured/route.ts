import { ContentType, PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/session";

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

    const { content_id, content_type } = await request.json();

    // Validate input
    if (!content_id || !content_type || !Object.values(ContentType).includes(content_type)) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update user's featured content
    const updatedUser = await prisma.user.update({
      where: {
        user_id: parseInt(session.user.id)
      },
      data: {
        featured_content_id: content_id,
        featured_content_type: content_type
      }
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
  }
}
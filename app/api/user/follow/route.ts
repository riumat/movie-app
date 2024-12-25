import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";

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
    const { personId } = body;

    if (!personId) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingRow = await prisma.person.findFirst({
      where: {
        user_id: Number(session.user.id),
        person_id: Number(personId),
      },
    });

    if (existingRow) {
      return new Response(JSON.stringify({ error: "Row already exists" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    await prisma.person.create({
      data: {
        user_id: Number(session.user.id),
        person_id: Number(personId),
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
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { personId } = body;

    if (!personId) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingRow = await prisma.person.findFirst({
      where: {
        user_id: Number(session.user.id),
        person_id: Number(personId),
      },
    });

    if (!existingRow) {
      return new Response(JSON.stringify({ error: "Row dont exists" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.person.delete({
      where: {
        person_id_user_id: {
          person_id: existingRow.person_id,
          user_id: existingRow.user_id,
        },
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

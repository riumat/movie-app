import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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

    const { id } = await request.json();

    const requesterId = session.user.id;

    const exists = await prisma.relationship.findUnique({
      where: {
        id: id,
      },
    });

    if (!exists) {
      return NextResponse.json(
        { error: "Friend request not found" },
        { status: 404 }
      );
    }
    await prisma.relationship.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Friend request deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete friend request" },
      { status: 500 }
    );
  }
}
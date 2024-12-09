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

    const { receiverId } = await request.json();
    const requesterId = session.user.id;

    // Delete the relationship
    await prisma.relationship.delete({
      where: {
        requester_id_receiver_id: {
          requester_id: requesterId,
          receiver_id: receiverId,
        },
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
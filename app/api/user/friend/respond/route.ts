import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { requesterId, status } = await request.json();
    const receiverId = session.user.id;

    // Check if relationship exists and is pending
    const existingRelationship = await prisma.relationship.findUnique({
      where: {
        requester_id_receiver_id: {
          requester_id: requesterId,
          receiver_id: receiverId,
        },
      },
    });

    if (!existingRelationship) {
      return NextResponse.json(
        { error: "Friend request not found" },
        { status: 404 }
      );
    }

    if (existingRelationship.status !== "pending") {
      return NextResponse.json(
        { error: "Friend request already processed" },
        { status: 400 }
      );
    }

    // Update the relationship status
    const updatedRelationship = await prisma.relationship.update({
      where: {
        requester_id_receiver_id: {
          requester_id: requesterId,
          receiver_id: receiverId,
        },
      },
      data: {
        status: status,
        responded_at: new Date(),
      },
    });

    return NextResponse.json(updatedRelationship, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process friend request" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
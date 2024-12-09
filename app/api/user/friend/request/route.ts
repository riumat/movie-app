import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const prisma = new PrismaClient()
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

    // Check if relationship already exists
    const existingRelationship = await prisma.relationship.findUnique({
      where: {
        requester_id_receiver_id: {
          requester_id: requesterId,
          receiver_id: receiverId,
        },
      },
    });

    if (existingRelationship) {
      return NextResponse.json(
        { error: "Friend request already exists" },
        { status: 400 }
      );
    }

    // Create new friend request
    const friendRequest = await prisma.relationship.create({
      data: {
        requester_id: requesterId,
        receiver_id: receiverId,
        status: "pending",
      },
    });

    return NextResponse.json(friendRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create friend request" },
      { status: 500 }
    );
  }
}


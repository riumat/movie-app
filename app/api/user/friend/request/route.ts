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

    const existingRelationship = await prisma.relationship.findFirst({
      where: {
        OR: [
          {
            requester_id: requesterId,
            receiver_id: receiverId,
          },
          {
            requester_id: receiverId,
            receiver_id: requesterId,
          }
        ]
      },
    });

    if (existingRelationship) {
      return NextResponse.json(
        { error: "Friend request already exists" },
        { status: 400 }
      );
    }

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

export async function GET(request: Request) {
  const prisma = new PrismaClient();
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const relationships = await prisma.relationship.findMany({
      where: {
        OR: [
          { receiver_id: Number(session.user.id) },
          { requester_id: Number(session.user.id) }
        ],
      },
      include: {
        requester: {
          select: {
            user_id: true,
            username: true,
            watchtime: true
          }
        },
        receiver: {
          select: {
            user_id: true,
            username: true,
            watchtime: true
          }
        },
      }
    })

    const friends = relationships.filter(r => r.status === 'pending').map(r => {
      return { id: r.id, status: r.status, friend: { ...r.requester_id === Number(session.user.id) ? r.receiver : r.requester } }
    });

    return new Response(JSON.stringify({ friends }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  } finally {
    await prisma.$disconnect();
  }
}


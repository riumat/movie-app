import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";

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

    const friends = relationships
      .filter(r => r.status === 'accepted')
      .map(r => {
        return {
          id: r.id,
          status: r.status,
          friend: { ...r.requester_id === Number(session.user.id) ? r.receiver : r.requester }
        }
      });

    const requests = relationships
      .filter(r => r.status === 'pending')
      .filter(r => r.receiver_id === Number(session.user.id))
      .map(r => {
        return {
          id: r.id,
          status: r.status,
          requester: { ...r.requester_id === Number(session.user.id) ? r.receiver : r.requester }
        }
      });

    return new Response(JSON.stringify({ friends: friends, requests: requests }), {
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
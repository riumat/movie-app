import { baseUrl } from "@/lib/constants";
import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

export async function POST(request: Request) {
  const prisma = new PrismaClient();

  try {
    const session = await getSession();
    const body = await request.json();
    const { contentId, contentType, genres, duration } = body;

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!contentId || !contentType || !genres) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let contentDuration = duration;
    if (!contentDuration) {
      const contentData = await axios.get(`${baseUrl}/${contentType}/${contentId}?api_key=${process.env.TMDB_API_KEY}`);
      if (contentType === 'movie') {
        contentDuration = contentData.data.runtime;
      } else {
        const seasons = contentData.data.seasons;
        contentDuration = await Promise.all(
          seasons
            .filter((season: any) => season.season_number > 0)
            .map(async (season: any) => {
              const seasonData = await axios.get(`${baseUrl}/${contentType}/${contentId}/season/${season.season_number}?api_key=${process.env.TMDB_API_KEY}`);
              return seasonData.data.episodes.reduce((acc: number, episode: any) => acc + episode.runtime, 0);
            })
        ).then(durations => durations.reduce((acc, duration) => acc + duration, 0));
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { user_id: Number(session.user.id) },
        data: { watchtime: { increment: contentDuration } }
      });

      const content = await tx.content.create({
        data: {
          user_id: Number(session.user.id),
          content_id: Number(contentId),
          content_type: contentType,
        }
      });

      await tx.contentToGenre.createMany({
        data: genres.map((genreId: any) => ({
          user_id: Number(session.user.id),
          content_id: Number(contentId),
          content_type: contentType,
          genre_id: Number(genreId)
        })),
        skipDuplicates: true
      });

      return content;
    });

    return new Response(JSON.stringify({ message: "Content added successfully", data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error processing request:", error);
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
    const body = await request.json();
    const { contentId, contentType, duration } = body;

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!contentId || !contentType) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let contentDuration = duration;
    if (!contentDuration) {
      const contentData = await axios.get(`${baseUrl}/${contentType}/${contentId}?api_key=${process.env.TMDB_API_KEY}`);
      if (contentType === 'movie') {
        contentDuration = contentData.data.runtime;
      } else {
        const seasons = contentData.data.seasons;
        contentDuration = await Promise.all(
          seasons
            .filter((season: any) => season.season_number > 0)
            .map(async (season: any) => {
              const seasonData = await axios.get(`${baseUrl}/${contentType}/${contentId}/season/${season.season_number}?api_key=${process.env.TMDB_API_KEY}`);
              return seasonData.data.episodes.reduce((acc: number, episode: any) => acc + episode.runtime, 0);
            })
        ).then(durations => durations.reduce((acc, duration) => acc + duration, 0));
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.contentToGenre.deleteMany({
        where: {
          user_id: Number(session.user.id),
          content_id: Number(contentId),
          content_type: contentType,
        }
      });

      const deletedContent = await tx.content.delete({
        where: {
          user_id_content_id_content_type: {
            user_id: Number(session.user.id),
            content_id: Number(contentId),
            content_type: contentType,
          }
        }
      });

      await tx.user.update({
        where: { user_id: Number(session.user.id) },
        data: { watchtime: { decrement: contentDuration } }
      });

      return deletedContent;
    });

    return new Response(JSON.stringify({
      message: "Content deleted successfully",
      data: result
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await prisma.$disconnect();
  }
}

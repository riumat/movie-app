"server-only"

import { getSession } from "@/lib/session";
import { ContentType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPrismaWatchAndWatchlistIds = async (media: string) => {
  const session = await getSession();
  if (!session) return ;
  try {
    const [watched, watchlisted] = await Promise.all([
      prisma.content.findMany({
        where: {
          user_id: session.user.id,
          content_type: media as ContentType,
        },
        select: { content_id: true }
      }),
      prisma.watchlist.findMany({
        where: {
          user_id: session.user.id,
          content_type: media as ContentType,
        },
        select: { content_id: true }
      })
    ]);

    const watchedSet = new Set(watched.map(w => w.content_id));
    const watchlistedSet = new Set(watchlisted.map(w => w.content_id));

    return {
      watchedSet,
      watchlistedSet
    };
  } finally {
    await prisma.$disconnect();
  }
}


export const getPrismaPersonData = async (id: string) => {
  const session = await getSession();
  if (!session) return;
  try {
    const person = await prisma.person.findFirst({
      where: {
        person_id: Number(id),
        user_id: Number(session.user.id)
      }
    })
    return (person ? true : false)
  } finally {
    await prisma.$disconnect();
  }

}

export const getPrismaContentFriendsData = async (id: string, media: string) => {
  const session = await getSession();
  if (!session) return;
  try {
    const relationships = await prisma.relationship.findMany({
      where: {
        OR: [
          {
            requester_id: session.user.id,
            status: 'accepted'
          },
          {
            receiver_id: session.user.id,
            status: 'accepted'
          }
        ]
      },
      select: {
        requester_id: true,
        receiver_id: true
      }
    });

    const friendIds = relationships.map(rel =>
      rel.requester_id === session.user.id ? rel.receiver_id : rel.requester_id
    );

    const friendsData = (await Promise.all(
      friendIds
        .map(async friendId => {
          const [content, user] = await Promise.all([
            prisma.content.findFirst({
              where: {
                content_id: Number(id),
                user_id: friendId,
                content_type: media as ContentType
              }
            }),
            prisma.user.findUnique({
              where: { user_id: friendId },
              select: { user_id: true, username: true }
            })
          ]);

          return content && user ? { id: user.user_id, username: user.username } : null;
        })
    )).filter((data): data is { id: number, username: string } => data !== null);

    return friendsData;
  } finally {
    await prisma.$disconnect();
  }
}

export const getPrismaContentData = async (id: string, media: string) => {
  const session = await getSession();
  if (!session) {
    return
  };
  try {
    const content = await prisma.content.findFirst({
      where: {
        content_id: Number(id),
        user_id: Number(session.user.id),
        content_type: media as ContentType
      }
    })

    const isWatchListed = await prisma.watchlist.findFirst({
      where: {
        content_id: Number(id),
        user_id: Number(session.user.id),
        content_type: media as ContentType
      }
    })

    const contentData = content ? {
      watched: true,
      rating: content.rating,
      review: content.review,
    } : {
      watched: false,
      rating: null,
      review: null,
    }

    const watchlisted = isWatchListed ? true : false;

    return {
      ...contentData,
      watchlisted,
    }
  } finally {
    await prisma.$disconnect();
  }
}

export const getPrismaSearchResults = async (query: string) => {
  const session = await getSession();
  if (!session) return;
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query
        }
      },
      select: {
        user_id: true,
        username: true,
        watchtime: true,
        receiver: {
          where: {
            status: 'accepted'
          },
          select: {
            id: true
          }
        },
        requester: {
          where: {
            status: 'accepted'
          },
          select: {
            id: true
          }
        }
      }
    });

    return users
      .filter(user => user.user_id !== session.user.id)
      .map(user => ({
        id: user.user_id,
        username: user.username,
        watchtime: user.watchtime,
        friends: user.receiver.length + user.requester.length
      }));
  } finally {
    await prisma.$disconnect();
  }
}

export const getPrismaWatchlist = async () => {
  const session = await getSession();
  if (!session) return;
  try {
    const watchlist = await prisma.watchlist.findMany({
      where: {
        user_id: session.user.id
      },
      select: {
        content_id: true,
        content_type: true
      }
    });

    return watchlist;
  } finally {
    await prisma.$disconnect();
  }
}


export const getPrismaFeatureContentData = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: Number(userId)
      },
      select: {
        featured_content_id: true,
        featured_content_type: true,
      }
    });

    if (!user?.featured_content_id || !user?.featured_content_type) return null;

    const content = await prisma.content.findFirst({
      where: {
        content_id: user.featured_content_id,
        content_type: user.featured_content_type,
        user_id: Number(userId)
      }
    });

    return content;
  } finally {
    await prisma.$disconnect();
  }
}

export const getPrismaUserGenres = async () => {
  const session = await getSession();
  if (!session) return;

  try {
    const genres = await prisma.contentToGenre.groupBy({
      by: ['genre_id'],
      where: { user_id: Number(session.user.id) },
      _count: { genre_id: true }
    })

    return genres.map(genre => genre.genre_id);
  } finally {
    await prisma.$disconnect();
  }
}

export const getPrismaBestRatedMovies = async () => {
  const session = await getSession();
  if (!session) return;

  try {
    const ids = await prisma.content.groupBy({
      by: ['content_id', 'rating'],
      where: {
        user_id: Number(session.user.id),
        rating: {
          gt: 3
        },
        content_type: 'movie',
      },
    })
    return ids.slice(0, 4).sort((a, b) => (b.rating! - a.rating!)).map(content => (
      {
        id: content.content_id,
      }
    ));
  } finally {
    await prisma.$disconnect();
  }
}

export const getPrismaBestRatedTvShows = async () => {
  const session = await getSession();
  if (!session) return;

  try {
    const ids = await prisma.content.groupBy({
      by: ['content_id', 'rating'],
      where: {
        user_id: Number(session.user.id),
        rating: {
          gt: 3
        },
        content_type: 'tv',
      },
    })
    return ids.slice(0, 5).map(content => (
      {
        id: content.content_id,
        rating: content.rating
      }
    ));
  } finally {
    await prisma.$disconnect();
  }
}
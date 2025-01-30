"use server"

import { baseUrl } from "@/lib/constants";
import { formatMinutes } from "@/lib/functions";
import { getAuthSchema } from "@/lib/schemas";
import { getSession, setSession } from "@/lib/session";
import { AuthState } from "@/lib/types/auth";
import { Prisma, PrismaClient } from '@prisma/client'
import axios from "axios";

const apiKey = process.env.TMDB_API_KEY;



export const loginAction = async (prevState: any, formData: FormData) => {
  const AuthSchema = await getAuthSchema();
  const prisma = new PrismaClient();
  const LoginUser = AuthSchema.omit({ name: true, password: true, repeatPassword: true })

  const validateFields = LoginUser.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  if (!validateFields.success) {
    const returnState: AuthState = {
      errors: validateFields.error.flatten().fieldErrors,
      success: false,
    }
    return returnState;
  }

  const returnState: AuthState = await prisma.user.findUniqueOrThrow({
    where: {
      email: validateFields.data.email,
    }
  })
    .then(user => {
      if (user.password === formData.get("password")) {
        const data = {
          id: user.user_id,
          name: user.username,
        }
        setSession(data)

        return {
          success: true,
          userId: user.user_id
        }
      } else {
        return {
          errors: {
            email: ["Wrong credentials."],
            password: ["Wrong credentials."],
          },
          success: false,
        }
      }
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return {
          errors: {
            email: ["Wrong credentials."],
            password: ["Wrong credentials"],
          },
          success: false,
        }
      } else {
        return {
          errors: {
            email: ["Something went wrong."],
          },
          success: false,
        }
      }
    })

  return returnState;
}

export const registerAction = async (prevState: any, formData: FormData) => {
  const AuthSchema = await getAuthSchema();
  const prisma = new PrismaClient();

  const RegisterUser = AuthSchema.refine(
    data => data.password === data.repeatPassword,
    { message: "Passwords dont match.", path: ["confirmPassword"] }
  )

  const validateFields = RegisterUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeat-password"),
  })

  if (!validateFields.success) {
    const returnState: AuthState = {
      errors: validateFields.error.flatten().fieldErrors,
      success: false,
    }
    return returnState;
  }


  const returnState: AuthState = await prisma.user.create({
    data: {
      username: validateFields.data.name,
      email: validateFields.data.email,
      password: validateFields.data.password,
    }
  })
    .then(async (res) => {
      const user = {
        id: res.user_id,
        name: res.username,
      }

      setSession(user)
      return { success: true, userId: res.user_id }
    }
    )
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return {
          errors: {
            email: ["User already exists."],
          },
          success: false,
        }
      } else {
        return {
          errors: {
            email: ["Something went wrong."],
          },
          success: false,
        }
      }
    })

  return returnState;
}

export const getUserData = async (id: string) => {
  const prisma = new PrismaClient();
  const session = await getSession();

  const user = await prisma.user.findUnique({
    where: { user_id: Number(id) }
  });
  if (!user) return 404;
  if (!session) return 401;

  const [contents, people, contentGenres, watchlist, relationships] = await Promise.all([
    prisma.content.findMany({ where: { user_id: Number(id) } }),
    prisma.person.findMany({ where: { user_id: Number(id) } }),
    prisma.contentToGenre.groupBy({
      by: ['genre_id'],
      where: { user_id: Number(id) },
      _count: { genre_id: true }
    }),
    prisma.watchlist.findMany({ where: { user_id: Number(id) } }),
    prisma.relationship.findMany({
      where: {
        OR: [
          { receiver_id: Number(id) },
          { requester_id: Number(id) }
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
  ]);

  const genreNames = await prisma.contentGenre.findMany({
    where: { id: { in: contentGenres.map(item => item.genre_id) } }
  });

  const genreCounts = contentGenres.map(item => {
    const genreName = genreNames.find(genre => genre.id === item.genre_id)?.name || 'Unknown';
    return { id: item.genre_id, name: genreName, count: item._count.genre_id };
  });

  const rated = contents.filter(content => content.rating !== null).length;
  const reviewed = contents.filter(content => content.review !== null).length;

  const friends = relationships.filter(r => r.status === 'accepted').map(r => {
    return { id: r.id, status: r.status, friend: { ...r.requester_id === Number(id) ? r.receiver : r.requester } }
  });

  const friendStatus = relationships.find(r =>
    (r.requester_id === Number(session.user.id) && r.receiver_id === Number(id)) ||
    (r.receiver_id === Number(session.user.id) && r.requester_id === Number(id))
  )?.status || "notFriends";

  const friendRequests = relationships.filter(r =>
    r.receiver_id === Number(id) && r.status === "pending"
  );

  return {
    id: user.user_id,
    name: user.username,
    since: user.created_at,
    watched: contents,
    following: people,
    watchlist: watchlist,
    genres: genreCounts,
    watchtime: user.watchtime,
    rated: rated,
    reviewed: reviewed,
    friends: friends,
    friendStatus: friendStatus,
    requests: friendRequests.map(r => ({
      ...r,
      requester_name: r.requester.username,
      receiver_name: r.receiver.username
    }))
  };
}

"use server"

import { baseUrl } from "@/lib/constants";
import { formatMinutes } from "@/lib/functions";
import { getAuthSchema } from "@/lib/schemas";
import { setSession } from "@/lib/session";
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

  const user = await prisma.user.findUnique({
    where: { user_id: Number(id) }
  });
  if (!user) return;

  const [contents, people, contentGenres, watchlist] = await Promise.all([
    prisma.content.findMany({ where: { user_id: Number(id) } }),
    prisma.person.findMany({ where: { user_id: Number(id) } }),
    prisma.contentToGenre.groupBy({
      by: ['genre_id'],
      where: { user_id: Number(id) },
      _count: { genre_id: true }
    }),
    prisma.watchlist.findMany({ where: { user_id: Number(id) } }),
  ]);

  const genreNames = await prisma.contentGenre.findMany({
    where: { id: { in: contentGenres.map(item => item.genre_id) } }
  });

  const genreCounts = contentGenres.map(item => {
    const genreName = genreNames.find(genre => genre.id === item.genre_id)?.name || 'Unknown';
    return { id: item.genre_id, name: genreName, count: item._count.genre_id };
  });

  /* const watchlistDetails = await Promise.all(
    watchlist.map(async item => {
      const contentData = await axios.get(`${baseUrl}/${item.content_type}/${item.content_id}?api_key=${apiKey}&language=en-US`);
      return contentData.data;
    })
  ); */

  const rated = contents.filter(content => content.rating !== null).length;
  const reviewed = contents.filter(content => content.review !== null).length;

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
  };

}

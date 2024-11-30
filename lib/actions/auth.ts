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
    where: {
      user_id: Number(id)
    }
  })
  if (!user) return;

  const contents = await prisma.content.findMany({
    where: {
      user_id: Number(id)
    }
  });
  //relationship?
  const people = await prisma.person.findMany({
    where: {
      user_id: Number(id)
    }
  })

  const watchlist = await prisma.watchlist.findMany({
    where: {
      user_id: Number(id)
    }
  })
    .then(async (res) => {
      const watchlist = res.map(async (item) => {
        const contentData = await axios.get(`${baseUrl}/${item.content_type}/${item.content_id}?api_key=${apiKey}&language=en-US`);
        return contentData.data;
      })

      return Promise.all(watchlist)
    })


  const fetchContentDetails = async (content: any) => {
    const response = await axios.get(`${baseUrl}/${content.content_type}/${content.content_id}?api_key=${apiKey}&language=en-US`);
    const data = response.data;

    const genres = data.genres;
    const runtime = content.content_type === 'movie'
      ? data.runtime
      : (data.episode_run_time?.[0] || 0) * (data.number_of_episodes || 0);


    return { genres, runtime };
  }

  const calculateGenrePercentages = (
    genreList: { id: number; name: string; count: number }[]
  ) => {
    const totalGenres = genreList.reduce((sum, genre) => sum + genre.count, 0);

    return genreList.map((genre) => ({
      ...genre,
      percentage: ((genre.count / totalGenres) * 100).toFixed(2), // Percentuale con 2 decimali
    }));
  }

  const updateGenreList = (
    genreList: { id: number, name: string, count: number }[],
    genres: { id: number; name: string }[]
  ) => {
    genres.forEach((genre) => {
      const existingGenre = genreList.find((g) => g.id === genre.id);
      if (existingGenre) {
        existingGenre.count++;
      } else {
        genreList.push({ id: genre.id, name: genre.name, count: 1 });
      }
    });
  }

  const fetchTmdbContents = async (contents: any[]) => {
    let counterTime = 0;
    const genreList: { id: number; name: string; count: number }[] = [];

    for (const content of contents) {
      const { genres, runtime } = await fetchContentDetails(content);
      counterTime += runtime;
      updateGenreList(genreList, genres);
    }
 // Calcola le percentuali
 const genrePercentages = calculateGenrePercentages(genreList);

 // Ordina per percentuale decrescente
 const sortedGenrePercentages = genrePercentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

 return { sortedGenrePercentages, counterTime };
  }

  /* const fetchTmdb = await contents.reduce(async (acc: any, content) => {
    const response = await axios.get(`${baseUrl}/${content.content_type}/${content.content_id}?api_key=${apiKey}&language=en-US`)
    const data = response.data
    const genres = data.genres
    const runtime = content.content_type === 'movie' ? data.runtime : data.episode_run_time?.[0] * data.number_of_episodes

    counterTime += runtime;

    const genreList: { id: number, name: string, count: number }[] = await acc;

    genres.forEach((genre: { id: number, name: string, count: number }) => {
      const existingGenre = genreList.find((g) => g.id === genre.id)
      if (existingGenre) {
        existingGenre.count++
      } else {
        genreList.push({ id: genre.id, name: genre.name, count: 1 })
      }
    })

    return (await Promise.all(genreList)).sort((a, b) => b.count - a.count)
  }, [])

*/

  const { sortedGenrePercentages, counterTime } = await fetchTmdbContents(contents);
  const rated = contents.reduce((acc: number, content) => {
    if (content.rating !== null) {
      acc += 1;
    }
    return acc;
  }, 0)

  const reviewed = contents.reduce((acc: number, content) => {
    if (content.review !== null) {
      acc += 1;
    }
    return acc;
  }, 0)


  return {
    name: user.username,
    since: user.created_at,
    watched: contents,
    following: people,
    watchlist: watchlist,
    genres: sortedGenrePercentages,
    watchtime: formatMinutes(counterTime),
    rated: rated,
    reviewed: reviewed
  }
}



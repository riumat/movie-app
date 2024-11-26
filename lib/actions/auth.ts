"use server"

import { getAuthSchema } from "@/lib/schemas";
import { setSession } from "@/lib/session";
import { AuthState } from "@/lib/types/auth";
import { Prisma, PrismaClient } from '@prisma/client'


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
  return { contents, people, watchlist }
}



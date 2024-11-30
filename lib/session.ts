"use server"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key)
}

export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload;
}

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export const getSession = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return;
  return await decrypt(session);
}

export const setSession = async (user: { id: number, name: string }) => {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ user, expires })
  cookies().set("session", session, { expires, httpOnly: true })
}

export const deleteSession = async () => {
  cookies().set("session", "", { expires: new Date(0) })
}
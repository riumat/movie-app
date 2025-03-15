"server-only"

import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey)

const SESSION_NAME = "session-cinehive"
const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days

type UserSession = {
  id: number,
  name: string,
  email: string,
}

type SessionPayload = {
  user: UserSession,
  expires: Date,
}

const encrypt = async (payload: SessionPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

const decrypt = async (session: string) => {
  const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
    algorithms: ["HS256"],
  })
  return payload;
}

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get(SESSION_NAME)?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + EXPIRATION_TIME);
  const res = NextResponse.next();
  res.cookies.set({
    name: SESSION_NAME,
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export const getSession = async () => {
  const session = cookies().get(SESSION_NAME)?.value;
  if (!session) return;
  return await decrypt(session);
}

export const setSession = async (user: UserSession) => {
  const expires = new Date(Date.now() + EXPIRATION_TIME);
  const session = await encrypt({ user, expires })
  cookies().set(SESSION_NAME, session, { expires, httpOnly: true })
}

export const deleteSession = async () => {
  cookies().set(SESSION_NAME, "", { expires: new Date(0) })
}
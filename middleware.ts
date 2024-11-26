import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest } from 'next/server';
import { updateSession } from '@/lib/session';

export default NextAuth(authConfig).auth;

export const middleware = async (request: NextRequest) => {
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
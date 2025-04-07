import { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest) => {
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
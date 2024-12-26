import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  if (path) {
    try {
      revalidatePath(path);
      return NextResponse.json(
        { message: `Path ${path} revalidated successfully` },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: `Error revalidating path ${path}`, error },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: 'Invalid path parameter' },
    { status: 400 }
  );
}
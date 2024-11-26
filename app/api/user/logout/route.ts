import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const path = searchParams.get("path");
  await deleteSession();
  if (path) revalidatePath(path);
  return new Response(null, { status: 200 });
}
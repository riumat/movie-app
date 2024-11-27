import { getUserData } from "@/lib/actions/auth";
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation";

const userPage = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/");
  };
  const userData = await getUserData(params.id)


  return (
    <p className="text-foreground">{ }</p>
  )

}

export default userPage


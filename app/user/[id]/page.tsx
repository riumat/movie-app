import Background from "@/components/layout/background";
import Body from "@/components/user/body";
import { getUserData } from "@/lib/actions/auth";
import { getSession } from "@/lib/session"
import { notFound, redirect } from "next/navigation";


const userPage = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/");
  };
  const userData = await getUserData(params.id)
  if (!userData) {
    notFound();
  }

  return (
    <div className="flex-1 ">
    <Background />
    <div className="flex flex-col  items-center mt-[3.3rem]">
     <Body id={params.id} userData={userData} session={session} />
    </div>
  </div>
  )

}

export default userPage


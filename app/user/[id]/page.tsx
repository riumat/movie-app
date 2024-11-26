import AuthModal from "@/components/auth/auth-modal";
import { getUserData } from "@/lib/actions/auth";
import { getSession } from "@/lib/session"

const userPage = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    return (
      <AuthModal isOpen={true} label="login" />
    )
  };
  const { contents, people, watchlist } = await getUserData(params.id)
  console.log(contents, people, watchlist)


  return (
    <p className="text-foreground">{ }</p>
  )

}

export default userPage
import ContentCard from "@/components/cards/content-card";
import { Button } from "@/components/ui/button";
import Chart from "@/components/ui/donut";
import { Separator } from "@/components/ui/separator";
import { getUserData } from "@/lib/actions/auth";
import { formatDateSince, formatMinutes, getUserDuration, movieCount, tvCount } from "@/lib/functions";
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
  console.log(userData.genres);
  return (
    <div className="h-screen flex flex-col mt-16 ml-32 mr-32 text-foreground">

      <div className="flex w-full">
        <div className=" p-2 flex-1">
          <p className="text-5xl font-bold">{`${userData.name}`}</p>
          {session.user.id !== Number(params.id) && <Button variant={"outline"} className="mt-2">Add Friend</Button>}
          <p className="font-light text-sm italic text-foreground/50">{`member since ${formatDateSince(userData.since)}`}</p>
        </div>

        <div className=" p-2 flex-1 flex items- justify-end gap-10">
          <div className="flex flex-col items-center gap-1">
            <span className="font-light text-sm">Total watchtime</span>
            <p className="font-bold text-3xl">{`${formatMinutes(userData.watchtime)}`}</p>
          </div>
          <Separator orientation="vertical" className="h-16" />
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1 items-center">
              <p className="font-light text-sm">Movies</p>
              <p className="font-bold text-3xl">{movieCount(userData.watched)}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="font-light text-sm">Tv Shows</p>
              <p className="font-bold text-3xl">{tvCount(userData.watched)}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="font-light text-sm">Rated</p>
              <p className="font-bold text-3xl">{userData.rated}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="font-light text-sm">Reviewed</p>
              <p className="font-bold text-3xl">{userData.reviewed}</p>
            </div>
          </div>
        </div>
      </div>


      <Separator className="my-3" />
      <div className=" p-2">
        <p className="text-2xl font-bold">Genres</p>
        <Chart genres={userData.genres} />
      </div>

      <div className="border p-2">
        <p className="text-2xl font-bold">Following</p>
      </div>
      <div className="border p-2">
        {userData.watchlist.length > 0 &&
          <div>
            <p className="text-2xl font-bold">Watchlist</p>
            <div className="flex gap-2 w-full ">
              {userData.watchlist.map((content, index) => (
                <ContentCard
                  key={index}
                  item={content}
                  isWatchedServer={userData.watched.includes(content.id)}
                  isBookmarkedServer={userData.watchlist.includes(content.id)}
                />
              ))}

            </div>
          </div>
        }
      </div>
    </div >
  )

}

export default userPage


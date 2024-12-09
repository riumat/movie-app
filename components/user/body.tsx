import ContentCard from "@/components/cards/content-card"
import Chart from "@/components/ui/donut"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/user/header"
import Modal from "@/components/user/modal"
import PeopleModal from "@/components/user/people-modal"
import RatingModal from "@/components/user/rating-modal"
import ReviewModal from "@/components/user/review-modal"
import { ProfileData } from "@/lib/types/user"

const Body = ({ id, userData, session }: { id: string, userData: ProfileData, session: any }) => {
  return (
    <div className="flex flex-col w-[95%] bg-background/95 text-foreground px-3 pt-3 pb-0  rounded-lg ">

      <Header id={id} session={session} userData={userData} />

      <Separator className="my-3" />


      <div className="flex items-center gap-10 w-full justify-evenly my-5 ">
        <Modal key={"modal-1"} userData={userData} modal="movie" />
        <Modal key={"modal-2"} userData={userData} modal="tv" />
        <RatingModal key={"modal-3"} userData={userData} />
        <ReviewModal key={"modal-4"} userData={userData} />
        <PeopleModal key={"modal-5"} userData={userData} />
      </div>

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
                  isWatchedServer={userData.watched.some(watched => watched.content_id === content.content_id)}
                  isBookmarkedServer={userData.watchlist.map(item => item.content_id).includes(content.content_id)}
                />
              ))}

            </div>
          </div>
        }
      </div>
    </div >
  )
}

export default Body
import { Separator } from "@/components/ui/separator"
import Header from "@/components/user/header"
import Modal from "@/components/user/modal"
import PeopleModal from "@/components/user/people-modal"
import RatingModal from "@/components/user/rating-modal"
import ReviewModal from "@/components/user/review-modal"
import WatchlistModal from "@/components/user/watchlist-modal"
import { twGenresStyle } from "@/lib/constants"
import { ProfileData } from "@/lib/types/user"


const Body = ({ id, userData, session }: { id: string, userData: ProfileData, session: any }) => {
  return (
    <div className="flex flex-col w-[95%] bg-background/95 text-foreground px-3 pt-3 pb-0  rounded-lg ">

      <Header id={id} session={session} userData={userData} />

      <Separator className="my-3" />


      <div className="flex items-center gap-10 w-full justify-evenly my-5 ">
        <Modal key={"modal-1"} id={id} userData={userData} modal="movie" />
        <Modal key={"modal-2"} id={id} userData={userData} modal="tv" />
        <RatingModal key={"modal-3"} id={id} userData={userData} />
        <ReviewModal key={"modal-4"} id={id} userData={userData} />
        <PeopleModal key={"modal-5"} id={id} userData={userData} />
        <WatchlistModal key={"modal-6"} id={id} userData={userData} />
      </div>

      {/*  <div className=" p-2">
        <p className="text-2xl font-bold">Genres</p>
        <Chart genres={userData.genres} />
      </div> */}

      <div className="p-5 bg-gradient-to-tr from-chart-2/10 to-background/10 text-foreground rounded-xl w-96 flex flex-col items-center gap-5 ">
        {userData.genres.length === 0 ? <p>No genres found</p> : (
          <>
            <p>Most Watched Genres</p>
            <div className="flex flex-col gap-1 items-center">
              {userData.genres.slice(0, 5).sort((a, b) => b.count - a.count).map((genre, index) => (
                <div key={index} className={` p-2 cursor-pointer`} >
                  <p className={`${twGenresStyle[index]}`}>{genre.name}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>


    </div >
  )
}

export default Body
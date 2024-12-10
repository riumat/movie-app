import { Separator } from "@/components/ui/separator"
import Header from "@/components/user/header"
import Modal from "@/components/user/modal"
import PeopleModal from "@/components/user/people-modal"
import RatingModal from "@/components/user/rating-modal"
import Requests from "@/components/user/requests"
import ReviewModal from "@/components/user/review-modal"
import WatchlistModal from "@/components/user/watchlist-modal"
import { twGenresStyle } from "@/lib/constants"
import { formatMinutes } from "@/lib/functions"
import { ProfileData } from "@/lib/types/user"
import Link from "next/link"
import { IoSadOutline } from "react-icons/io5";



const Body = ({ id, userData, session }: { id: string, userData: ProfileData, session: any }) => {
  console.log(userData.friends)
  return (
    <div className="flex flex-col w-[95%] h-full bg-background/95 text-foreground px-3 pt-3 pb-0  rounded-lg ">

      <Header id={id} session={session} userData={userData} />

      <Separator className="my-3" />
      <div className="flex items-center gap-10 w-full justify-evenly my-5 mb-10 ">
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
      
      <div className="w-full flex flex-1">

        <div className="flex-1 p-5 text-foreground flex flex-col items-center gap-5 ">
          {userData.genres.length === 0 ? <p>No genres found</p> : (
            <>
              <p className="font-bold text-xl">Most Watched Genres</p>
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

        <Separator orientation="vertical"/>

        <div className=" flex-1 p-5">
          {userData.friends.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <IoSadOutline size={35} />
              <p>Friend list empty! Loser</p>
            </div>
          ) : (
            <>
              <p className="font-bold text-xl mb-5 text-center">{`Friends`}</p>
              <ul className="flex flex-col gap-1 items-center">
                {userData.friends.map((friend, index) => (
                  <li key={index} className="w-full px-3 py-3 rounded-lg hover:bg-secondary/50">
                    <Link href={`/user/${friend.friend.user_id}`} className='flex items-center gap-2'>
                      <p className='font-bold'>{friend.friend.username}</p>
                      <p className='font-extralight text-sm'>{formatMinutes(friend.friend.watchtime)} watched</p>
                    </Link>
                  </li>

                ))}
              </ul>
            </>
          )}
        </div>
        <Separator orientation="vertical" />

        <Requests userData={userData} />

      </div>

    </div >
  )
}

export default Body
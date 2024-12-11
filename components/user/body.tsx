import Chart from "@/components/ui/donut"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/user/header"
import Modal from "@/components/user/modal"
import PeopleModal from "@/components/user/people-modal"
import RatingModal from "@/components/user/rating-modal"
import RequestModal from "@/components/user/requests-modal"
import ReviewModal from "@/components/user/review-modal"
import WatchlistModal from "@/components/user/watchlist-modal"
import { formatMinutes } from "@/lib/functions"
import { ProfileData } from "@/lib/types/user"
import Link from "next/link"
import { IoSadOutline } from "react-icons/io5";


const Body = ({ id, userData, session }: { id: string, userData: ProfileData, session: any }) => {
  return (
    <div className="flex flex-col w-[95%] h-[93.5%]   text-foreground px-3  pb-0  rounded-lg ">

      <Header id={id} session={session} userData={userData} />

      <div className="flex items-center gap-10 w-full justify-evenly my-5  ">
        <Modal key={"modal-1"} id={id} userData={userData} modal="movie" />
        <Modal key={"modal-2"} id={id} userData={userData} modal="tv" />
        <RatingModal key={"modal-3"} id={id} userData={userData} />
        <ReviewModal key={"modal-4"} id={id} userData={userData} />
        <PeopleModal key={"modal-5"} id={id} userData={userData} />
        <WatchlistModal key={"modal-6"} id={id} userData={userData} />
      </div>

      <div className="w-full relative flex bg-background rounded-xl pt-5">

        <Chart genres={userData.genres} />
        <Separator orientation="vertical" className="mr-6" />

        <div className="flex-1 h-full  flex flex-col  ">
          <div className="flex-1  flex flex-col justify-center items-center overflow-hidden">
            {userData.friends.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <IoSadOutline size={70} />
                <p>Friend list empty! Loser</p>
              </div>
            ) : (
              <div className="flex flex-col items-start h-full w-full ">
                <p className="font-bold text-xl mb-5 text-center ">{`Friends`}</p>
                <ul className="flex flex-col w-full gap-1 overflow-y-auto scrollbar-thin">
                  {userData.friends.map((friend, index) => (
                    <li key={index} className="w-full px-3 py-3 rounded-lg hover:bg-secondary/50 ">
                      <Link href={`/user/${friend.friend.user_id}`} className='flex items-center gap-2'>
                        <p className='font-bold text-lg'>{friend.friend.username}</p>
                        <p className='font-extralight text-sm'>{formatMinutes(friend.friend.watchtime)} watched</p>
                      </Link>
                    </li>

                  ))}
                </ul>
              </div>
            )}
          </div>
          {session && userData.requests.length > 0 && <RequestModal userData={userData} />}

        </div>

      </div>

    </div >
  )
}

export default Body
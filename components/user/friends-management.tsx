import RequestModal from '@/components/user/requests-modal'
import { formatMinutes } from '@/lib/functions'
import { ProfileData } from '@/lib/types/user'
import Link from 'next/link'
import React from 'react'
import { IoSadOutline } from 'react-icons/io5'

const FriendsManagement = ({ id, userData, session }: { id: string, userData: ProfileData, session: any }) => {
  return (
    <div className="basis-1/3 h-full flex flex-col ">
      <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
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
      {session && (
        session.user.id === Number(id) && userData.requests.length > 0 && <RequestModal userData={userData} />
      )
      }

    </div>
  )
}

export default FriendsManagement
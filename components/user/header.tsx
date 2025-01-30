"use client"

import { Button } from "@/components/ui/button"
import FriendsModal from "@/components/user/friends-modal"
import { formatDateSince, formatMinutes } from "@/lib/functions"
import useFriend from "@/lib/hooks/use-friend"
import { ProfileData } from "@/lib/types/user"
import { Clock, Minus, Plus } from "lucide-react"

const Header = ({ id, session, userData }: { id: string, session: any, userData: ProfileData }) => {
  const { friendStatus, handleFriend } = useFriend(userData, id);
  return (
    <div className="flex py-5 bg-background rounded-xl">
      <div className=" flex-1 flex flex-col gap-2">
        <div className="flex gap-10 items-center">
          <p className="text-5xl font-bold">{`${userData.name}`}</p>
          {session.user.id !== Number(id) ?
            <Button
              variant={"outline"}
              className="mt-2 px-3 py-1 flex items-center gap-2"
              onClick={handleFriend}
              disabled={friendStatus === "pending"}
            >
              {friendStatus === "accepted" && (
                <>
                  <Minus size={24} />
                  <p>Remove Friend</p>
                </>
              )}

              {(friendStatus === "rejected" || friendStatus === "notFriends") && (
                <>
                  <Plus size={24} />
                  <p>Add Friend</p>
                </>
              )}

              {friendStatus === "pending" && (
                <>
                  <Clock size={24} />
                  <p>Pending</p>
                </>
              )}

            </Button>
            :
            <FriendsModal session={session} />
          }
        </div>
        <p className="font-light text-sm italic text-foreground/70">{`member since ${formatDateSince(userData.since)}`}</p>
      </div>

      <div className=" p-2 flex-1 flex items- justify-end gap-10">
        <div className="flex flex-col items-center gap-1">
          <span className="font-light text-sm">Total watchtime</span>
          <p className="font-bold text-4xl">{`${formatMinutes(userData.watchtime)}`}</p>
        </div>

      </div>
    </div >
  )
}

export default Header
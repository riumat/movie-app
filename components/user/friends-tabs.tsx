"use client"
import Loader from "@/components/layout/loader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMinutes } from "@/lib/functions";
import { useUserFriend } from "@/lib/hooks/use-user-friend";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { IoHappyOutline, IoSadOutline } from "react-icons/io5";


const FriendsTab = ({ session }: { session: any }) => {
  const { friends, requests, isLoading, isError, handleAccept, handleDecline } = useUserFriend()

  return (
    <Tabs defaultValue="friend" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="friend">Friends</TabsTrigger>
        <TabsTrigger value="request">Requests</TabsTrigger>
      </TabsList>
      <TabsContent value="friend" className="h-[90%] overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <>
            {friends.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-5 h-full">
                <IoSadOutline size={50} />
                <p className="text-xl">Empty! No friendos.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 h-full">
                <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-2">
                  <>
                    {friends.length > 0 && (
                      friends.map((friend: any) => (
                        <Link key={`${friend.friend.user_id}-friendlist`} href={`/user/${friend.friend.user_id}`} className='flex items-center gap-2'>
                          <p className='font-bold text-lg'>{friend.friend.username}</p>
                          <p className='font-extralight text-sm'>{formatMinutes(friend.friend.watchtime)} watched</p>
                        </Link>
                      ))
                    )}
                  </>
                </div>
              </div>
            )}

          </>
        )}
      </TabsContent>
      <TabsContent value="request" className="h-[90%] overflow-hidden" >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : (
          <>
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-5 h-full">
                <IoHappyOutline size={50} />
                <p className="text-xl">Empty! No requestos.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 h-full">
                <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-2">
                  <>
                    {requests.length > 0 && (
                      requests.map((req: any) => (
                        <div key={`${req.id}-requestlist`} className="flex items-center justify-between gap-1 text-base  px-2 py-1 border-b w-full ">
                          <div className="flex items-center ">
                            <p className="font-bold text-lg">{req.requester.username}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={"outline"}
                              className="px-2 flex items-center gap-1 bg-green-700"
                              onClick={() => handleAccept(req.id)}
                            >
                              <Check size={20} />
                              <p>Accept</p>
                            </Button>
                            <Button
                              variant={"outline"}
                              className="px-2 flex items-center gap-1 bg-destructive"
                              onClick={() => handleDecline(req.id)}
                            >
                              <X size={20} />
                              <p>Decline</p>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                </div>
              </div>
            )}

          </>
        )}
      </TabsContent>
    </Tabs>

  )
}

export default FriendsTab;
"use client"

import { Button } from '@/components/ui/button'
import { ProfileData } from '@/lib/types/user'
import axios from 'axios'
import { Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Requests = ({ userData }: { userData: ProfileData }) => {
  const router = useRouter();

  const handleAccept = (requesterId: number) => {
    axios.post("/api/user/friend/respond", {
      requesterId: requesterId,
      status: "accepted"
    })
      .then(() => router.refresh())

  }
  const handleDecline = (requesterId: number) => {
    axios.delete("/api/user/friend/remove", {
      data: {
        id: requesterId,
      }
    })
      .then(() => router.refresh())
  }

  return (
    <div className="flex-[.5] p-5 border-t overflow-hidden">
      <p className="font-bold text-xl mb-5 text-center">Requests</p>
      {userData.requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <p>No requests</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center overflow-y-auto scrollbar-thin">
          {userData.requests.map((req, index) => (
            <div key={index} className="flex items-center justify-between gap-1 text-base  px-2 py-1 border-b w-full ">
              <div className="flex items-center ">
                <p className="font-bold text-lg">{req.requester_name}</p>
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
          ))}
        </div>
      )}

    </div>
  )
}

export default Requests
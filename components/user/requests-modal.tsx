"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProfileData } from "@/lib/types/user";
import axios from "axios";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";


const RequestModal = ({ userData }: { userData: ProfileData }) => {
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
    <Dialog >
      <DialogTrigger asChild >
        <div className=" p-2  overflow-hidden flex justify-center">
          <Button className="flex flex-col gap-1 items-center relative  px-7 py-1 rounded-2xl transform transition duration-300 hover:scale-105" variant={"default"}>
            <div className="absolute inset-0 top-0 left-0 w-full h-full bg-foreground -z-10 rounded-2xl animate-ping duration-1000 opacity-15"></div>
            <p className="text-base font-bold">You have new requests!</p>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] h-[82vh] overflow-hidden flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Friend requests</DialogTitle>
        </DialogHeader>
        <div className="h-full flex flex-col gap-5  overflow-hidden">

          <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-2">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RequestModal

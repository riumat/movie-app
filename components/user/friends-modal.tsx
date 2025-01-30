import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FriendsTab from "@/components/user/friends-tabs";
import { CircleUser } from "lucide-react";

const FriendsModal = ({ session }: { session: any }) => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer " >
        <div className="px-5 py-2 bg-muted hover:bg-secondary flex items-center gap-2 border rounded" >
          <CircleUser />
          <div>
            Friends
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[60vw] h-[82vh] overflow-hidden flex flex-col gap-8" >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="h-full flex flex-col gap-5  overflow-hidden">
          <FriendsTab session={session} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FriendsModal

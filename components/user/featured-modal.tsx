import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FeaturedTabs from "@/components/user/featured-tabs";
import { ReactNode } from "react";


const FeaturedModal = ({ session, children }: { session: any, children: ReactNode }) => {

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer " >
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[60vw] h-[88vh] overflow-hidden flex flex-col gap-8" >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="h-full flex flex-col gap-5  overflow-hidden">
          <FeaturedTabs session={session} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeaturedModal

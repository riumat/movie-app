import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoReaderOutline } from "react-icons/io5"

const OverviewModal = ({ overview }: { overview: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className='px-3 flex gap-2 items-center '>
          <p className=''>Synopsis</p>
          <IoReaderOutline size={17} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[50vw] max-h-[60vh]  overflow-hidden flex flex-col gap-8  ">
        <DialogHeader>
          <DialogTitle className="text-2xl">Synopsis</DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto scrollbar-thin ">
          <p className="font-normal leading-8 mx-16">{overview}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OverviewModal

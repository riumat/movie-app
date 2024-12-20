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
        <div className='w-fit px-2 pb-1 border-b flex gap-2 items-center cursor-pointer hover:scale-105 duration-50 '>
          <p className='font-bold'>About</p>
          <IoReaderOutline size={17} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] max-h-[60vh] overflow-hidden flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">About</DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto scrollbar-thin">
          <p className="font-normal leading-8">{overview}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OverviewModal

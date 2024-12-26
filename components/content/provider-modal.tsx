import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { imageUrl, imgWidth } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link";
import { LuTv } from "react-icons/lu";


const ProviderModal = ({ providers }: { providers: any[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='w-fit px-2 pb-1 border-b flex gap-2 items-center cursor-pointer hover:scale-105 duration-50 '>
          <p className='font-bold'>Where To Watch</p>
          <LuTv size={17} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw] max-h-[60vh] min-h-[20vh] overflow-hidden flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Networks</DialogTitle>
        </DialogHeader>
        <div className="h-full flex-1 overflow-y-auto scrollbar-thin flex flex-col gap-10">
          {providers.length > 0 ? (
            <div className='flex justify-center gap-10 flex-wrap '>
              {providers.map((provider) => (
                <div key={provider.provider_id} className='flex flex-col items-center gap-2'>
                  <div className="flex items-center w-[80px] h-[100px] rounded-md">
                    <Image
                      src={`${imageUrl}${imgWidth.logo[154]}${provider.logo_path}`}
                      alt={provider.provider_name}
                      width={154}
                      height={154}
                      className="filter grayscale-[50%] brightness-125 rounded-lg object-cover"
                    />
                  </div>
                  <p className='text-sm text-center '>{provider.provider_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center ">
              <p className="text-xl ">Not available in your region yet</p>
            </div>
          )}
          <div className="flex gap-1 items-center text-xs text-muted-foreground">
            <p>Informations about networks provided by</p>
            <Link href="https://www.justwatch.com" target="_blank" className="hover:underline font-semibold">
              <p>Just Watch</p>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProviderModal

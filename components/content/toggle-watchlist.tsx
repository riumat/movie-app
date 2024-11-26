import { Button } from "@/components/ui/button";
import useWatchlist from "@/lib/hooks/use-watchlist";
import { Minus, Plus } from "lucide-react";

const ToggleWatchlist = ({ isWatched, userData, contentData }: { isWatched: boolean, userData: any, contentData: any }) => {
  const { isListed, handleWatchlist } = useWatchlist(userData, contentData)
  console.log(userData)
  return (
    <Button variant={"outline"} className={`w-full px-3 group`} onClick={handleWatchlist} disabled={isWatched} >
      {isListed ? (
        <div className="flex gap-2 items-center">
          <Minus size={30} />
          <p className="group-hover:hidden">Watchlist</p>
          <p className="hidden group-hover:block">Remove</p>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Plus size={30} />
          <p>Watchlist</p>
        </div>
      )}
    </Button>
  )

}

export default ToggleWatchlist;
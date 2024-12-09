import { Button } from "@/components/ui/button";
import useWatchlist from "@/lib/hooks/use-watchlist";
import { ContentUserData } from "@/lib/types/content";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import { Minus, Plus } from "lucide-react";

const ToggleWatchlist = ({ userData, contentData }: { userData: ContentUserData, contentData: MovieData | TvData }) => {
  const { isListed, handleWatchlist } = useWatchlist(userData, contentData)

  return (
    <Button variant={"outline"} className={`w-full px-3 group`} onClick={handleWatchlist} >
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
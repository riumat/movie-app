import { ContentUserData } from "@/lib/types/content";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import axios from "axios";
import { useState } from "react";

const useWatchlist = (userData: ContentUserData, contentData: MovieData | TvData) => {
  const [isListed, setIsListed] = useState<boolean>(userData.watchlisted);


  const handleWatchlist = () => {
    const newListed = !isListed;
    if (isListed) {
      axios.delete('/api/user/watchlist', {
        data: {
          contentId: contentData.id,
          contentType: contentData.type,
        }
      })
        .then(() => setIsListed(newListed))
        .catch(err => console.log(err));
    } else {
      axios.post('/api/user/watchlist', {
        contentId: contentData.id,
        contentType: contentData.type,
        contentName: contentData.type === 'movie' ? (contentData as MovieData).title : (contentData as TvData).name
      })
        .then(() => setIsListed(newListed))
        .catch(err => console.log(err));
    }

  };

  return { isListed, handleWatchlist };
}

export default useWatchlist;
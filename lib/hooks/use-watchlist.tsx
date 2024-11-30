import axios from "axios";
import { useState } from "react";

const useWatchlist = (isListedInitial: boolean, contentData: any) => {
  const [isListed, setIsListed] = useState<boolean>(isListedInitial);


  const handleWatchlist = () => {
    const newListed = !isListed;
    if (isListed) {
      axios.delete('/api/user/watchlist', {
        data: {
          contentId: contentData.id,
          contentType: contentData.type,
        }
      })
        .then(res => setIsListed(newListed))
        .catch(err => console.log(err));
    } else {
      axios.post('/api/user/watchlist', {
        contentId: contentData.id,
        contentType: contentData.type,
      })
        .then(res => setIsListed(newListed))
        .catch(err => console.log(err));
    }

  };

  return { isListed, handleWatchlist };
}

export default useWatchlist;
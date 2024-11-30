import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useIsWatched = (isWatchedServer: boolean, contentData: MovieData | TvData) => {
  const [isWatched, setIsWatched] = useState<boolean>(isWatchedServer);
  const router = useRouter();

  const handleIsWatched = () => {
    const newIsWatched = !isWatched;
    if (newIsWatched) {
      axios
        .post('/api/user/watch', {
          contentId: contentData.id,
          contentType: contentData.type,

        })
        .then(res => {
          axios.delete('/api/user/watchlist', {
            data: {
              contentId: contentData.id,
              contentType: contentData.type,
            }
          })
          setIsWatched(newIsWatched)
          router.refresh();
        })
        .catch(err => console.log(err));
    } else {
      axios
        .delete('/api/user/watch', {
          data: {
            contentId: contentData.id,
            contentType: contentData.type,
          },
        })
        .then(res => {
          setIsWatched(newIsWatched)
          router.refresh();
        })
        .catch(err => console.log(err));
    }

  };

  return { isWatched, handleIsWatched };
}

export default useIsWatched;
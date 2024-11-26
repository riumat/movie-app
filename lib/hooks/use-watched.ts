import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useIsWatched = (userData: any, contentData: MovieData | TvData) => {
  const [isWatched, setIsWatched] = useState<boolean>(userData.watched);
  const router = useRouter();
  const contentDuration = contentData.type === "tv" ? contentData.seasons.reduce((acc, season) => acc + season.episode_count, 0) : contentData.runtime;

  const handleIsWatched = () => {
    const newIsWatched = !isWatched;
    if (newIsWatched) {
      axios
        .post('/api/user/watch', {
          contentId: contentData.id,
          userId: userData.userId,
          contentType: contentData.type,
          duration: contentDuration,
          genres: contentData.genres.map(genre => genre.id).join(","),
        })
        .then(res => {
          axios.delete('/api/user/watchlist', {
            data: {
              contentId: contentData.id,
              userId: userData.userId,
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
            userId: userData.userId,
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
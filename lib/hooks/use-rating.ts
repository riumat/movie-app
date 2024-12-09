import { ContentUserData } from "@/lib/types/content";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import axios from "axios";
import { useState } from "react";

const useRating = (userData: ContentUserData, contentData: MovieData | TvData) => {
  const [rating, setRating] = useState<string>(userData.rating?.toString() ?? "");

  const handleStarClick = (value: number) => {
    const newValue = value.toString();
    axios.post('/api/user/rating', {
      contentId: contentData.id,
      userId: userData.userId,
      contentType: contentData.type,
      rating: newValue,
    })
      .then(() => setRating(newValue))
      .catch(err => {
        console.error(err);
      });
  };

  return { rating, handleStarClick };

}
export default useRating;
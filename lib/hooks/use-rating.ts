import { MovieData } from "@/lib/types/movie.types";
import { TvData } from "@/lib/types/tv.types";
import axios from "axios";
import { useState } from "react";

const useRating = (contentData: MovieData | TvData) => {
  const [rating, setRating] = useState<string>(contentData.user.rating?.toString() ?? "");

  const handleStarClick = (value: number) => {
    const newValue = value.toString();
    axios.post('/api/user/rating', {
      contentId: contentData.id,
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
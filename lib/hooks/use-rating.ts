import axios from "axios";
import { useState } from "react";

const useRating = (userData: any, contentData: any) => {
  const [rating, setRating] = useState<string>(userData.rating ?? "");

  const handleStarClick = (value: number) => {
    const newValue = value.toString();
    axios.post('/api/user/rating', {
      contentId: contentData.id,
      userId: userData.userId,
      contentType: contentData.type,
      rating: newValue,
    })
      .then(res => setRating(newValue))
      .catch(err => {
        console.error(err);
      });
  };

  return { rating, handleStarClick };

}
export default useRating;
"use client"
import { ContentUserData } from "@/lib/types/content";
import { MovieData } from "@/lib/types/movie";
import { TvData } from "@/lib/types/tv";
import axios from "axios";
import { useState } from "react";

const useReview = (userData: ContentUserData, contentData: MovieData | TvData, open: boolean) => {
  const [review, setReview] = useState<string>(userData.review ?? "");

  const handleReview = (newReview: string) => {
    axios
      .post('/api/user/review', {
        contentId: contentData.id,
        userId: userData.userId,
        contentType: contentData.type,
        review: newReview,
      })
      .then(() => {
        setReview(newReview)
      })
      .catch(err => {
        console.error(err);
      });
  };

  return { review, handleReview }

}

export default useReview;
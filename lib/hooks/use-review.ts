"use client"
import axios from "axios";
import { useState } from "react";

const useReview = (userData: any, contentData: any, open: boolean) => {
  const [review, setReview] = useState<string>(userData.review ?? "");

  const handleReview = (newReview: string) => {
    axios
      .post('/api/user/review', {
        contentId: contentData.id,
        userId: userData.userId,
        contentType: contentData.type,
        review: newReview,
      })
      .then(res => {
        setReview(newReview)
      })
      .catch(err => {
        console.error(err);
      });
  };

  return { review, handleReview }

}

export default useReview;
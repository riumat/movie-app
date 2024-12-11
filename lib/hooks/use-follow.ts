import { ProfileData } from "@/lib/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useIsFollowing = (userData: any, personId: number) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(userData.isFollowed);
  const router = useRouter();


  const handleIsFollowing = () => {
    const newIsFollowing = !isFollowing;
    if (newIsFollowing) {
      axios
        .post('/api/user/follow', {
          personId: personId,
          userId: userData.userId,
        })
        .then(() => {
          setIsFollowing(newIsFollowing)
          router.refresh();
        })
        .catch(err => console.log(err));
    } else {
      axios
        .delete('/api/user/follow', {
          data: {
            personId: personId,
            userId: userData.id,
          },
        })
        .then(() => {
          setIsFollowing(newIsFollowing)
          router.refresh();
        })
        .catch(err => console.log(err));
    }

  };

  return { isFollowing, handleIsFollowing };
}

export default useIsFollowing;
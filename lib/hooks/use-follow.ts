import { ProfileData } from "@/lib/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useIsFollowing = (userData: ProfileData, personId: number) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(userData.following.some(follow => follow.person_id === personId));
  const router = useRouter();

  console.log(userData)

  const handleIsFollowing = () => {
    const newIsFollowing = !isFollowing;
    if (newIsFollowing) {
      axios
        .post('/api/user/follow', {
          personId: personId,
          userId: userData.id,
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
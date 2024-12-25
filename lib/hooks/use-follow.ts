import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useIsFollowing = (following: boolean, personId: number) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(following);
  const router = useRouter();


  const handleIsFollowing = () => {
    const newIsFollowing = !isFollowing;
    if (newIsFollowing) {
      axios
        .post('/api/user/follow', {
          personId: personId,
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
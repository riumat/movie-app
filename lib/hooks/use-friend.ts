import { ProfileData } from "@/lib/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useFriend = (userData: ProfileData, personId: string) => {
  const [friendStatus, setFriendStatus] = useState<string>(userData.friendStatus);
  const router = useRouter();

  const handleFriend = () => {
    const newIsFriend = friendStatus;
    if (newIsFriend === "notFriends" || newIsFriend === "rejected") {
      setFriendStatus("pending")
      axios
        .post('/api/user/friend/request', {
          receiverId: Number(personId),
        })
        .then(() => {
          router.refresh();
        })
        .catch(err => console.log(err));
    } else if (newIsFriend === "accepted") {
      setFriendStatus("notFriends")
      axios
        .delete('/api/user/friend/remove', {
          data: {
            id: Number(userData.friends.find(friend => friend.id !== userData.id).id),
          },
        })
        .then(() => {
          router.refresh();
        })
        .catch(err => console.log(err));
    }

  };

  return { friendStatus, handleFriend };
}

export default useFriend;
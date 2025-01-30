import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/utils';
import axios from 'axios';


export const useUserFriend = () => {
  const { data, error, isLoading } = useSWR(`/api/user/friend`, fetcher);

  const handleAccept = (requesterId: number) => {
    axios.post("/api/user/friend/respond", {
      id: requesterId,
      status: "accepted"
    })
      .then(() => { mutate("/api/user/friend") })
  }
  const handleDecline = (requesterId: number) => {
    axios.delete("/api/user/friend/remove", {
      data: {
        id: requesterId,
      }
    })
      .then(() => { mutate("/api/user/friend") })
  }

  return {
    friends: data?.friends || [],
    requests: data?.requests || [],
    isLoading,
    isError: error,
    handleAccept,
    handleDecline
  };
};
"use client"
import { Button } from '@/components/ui/button'
import useIsFollowing from '@/lib/hooks/use-follow';
import { FaHeart, FaHeartCrack } from "react-icons/fa6";

const ToggleFollow = ({ userData, personId }: { userData: any, personId: number }) => {
  const { isFollowing, handleIsFollowing } = useIsFollowing(userData, personId)
  return (
    <Button
      onClick={handleIsFollowing}
      variant={isFollowing ? "default" : "outline"}
      className='flex gap-3 items-center'
    >
      {isFollowing ? <FaHeartCrack size={25} /> : <FaHeart size={25} />}
      {isFollowing ? "Unfollow" : "Follow"}

    </Button>
  )
}

export default ToggleFollow
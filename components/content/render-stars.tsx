import useRating from "@/lib/hooks/use-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";

const RenderStars = ({ isWatched, userData, contentData }: { isWatched: boolean, userData: any, contentData:any }) => {
  const { rating, handleStarClick } = useRating(userData, contentData);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <button
        key={i}
        onClick={() => handleStarClick(i)}
        className="cursor-pointer disabled:opacity-30 disabled:cursor-default"
        disabled={!isWatched}
      >
        {i <= parseInt(rating) ? <FaStar /> : <FaRegStar />}
      </button>
    );
  }
  return stars;
};

export default RenderStars;
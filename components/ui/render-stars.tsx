import { FaRegStar, FaStar } from "react-icons/fa";


const RenderStars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      i < rating ? <FaStar size={20} /> : <FaRegStar size={20} />
    );
  }
  return (
    <div className="flex items-center gap-1">
      {stars}
    </div>
  );
};

export default RenderStars
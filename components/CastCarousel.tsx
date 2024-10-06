"use client"
import NameCard from "@/components/NameCard";
import { imageUrl } from "@/utils/constants";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";


interface Cast {
  id: number,
  name: string,
  profile_path: string,
  character: string,
}

function CastCarousel({ cast }: { cast: Cast[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 5) % cast.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 5 + cast.length) % cast.length);
  };

  return (
    <div className="relative">
      <div className="flex gap-2 flex-wrap justify-center">
        {cast.slice(currentIndex, currentIndex + 5).map((actor) => (
          <NameCard key={actor.id} name={actor.name} imagePath={`${imageUrl}/t/p/w154${actor.profile_path}`} character={actor.character} />
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l">
        <GrFormPrevious />
      </button>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r">
        <GrFormNext />
      </button>
    </div>
  );
}

export default CastCarousel;
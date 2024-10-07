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
    <div className="">
      <div className="flex gap-2 justify-center items-center">
        {cast.length > 1 && (
          <button onClick={prevSlide} className="h-8 w-8 bg-gray-300 text-gray-900 p-2 rounded-l">
            <GrFormPrevious />
          </button>

        )}
        {cast.slice(currentIndex, currentIndex + 5).map((actor) => (
          <NameCard key={actor.id} name={actor.name} imagePath={`${imageUrl}/t/p/w154${actor.profile_path}`} />
        ))}
        {cast.length > 1 && (

          <button onClick={nextSlide} className="h-8 w-8 bg-gray-300 text-gray-900 p-2 rounded-r">
            <GrFormNext />
          </button>
        )}
      </div>

    </div>
  );
}

export default CastCarousel;
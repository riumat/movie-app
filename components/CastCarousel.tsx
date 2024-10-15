"use client"
import NameCard from "@/components/NameCard";
import { CrewMember } from "@/utils/types";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

function CastCarousel({ personList }: { personList: CrewMember[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % personList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 4 + personList.length) % personList.length);
  };

  return (
    <div className="flex justify-center items-center gap-10 lg:gap-12 xl:gap-16 relative">
      {personList.length > 4 && (
        <button
          onClick={prevSlide}
          className=" bg-black border-2 border-white/50 flex justify-center items-center text-gray-100 p-1 rounded-full enabled:active:scale-95 enabled:hover:bg-neutral-900 disabled:opacity-40"
          disabled={currentIndex === 0}
        >
          <div className="text-2xl xl:text-3xl">
            <GrFormPrevious />
          </div>
        </button>

      )}
      <div className="flex sm:gap-5 md:gap-12 lg:gap-14 xl:gap-16 justify-center w-[270px] sm:w-[380px] md:w-[500px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px]">
        {personList.slice(currentIndex, currentIndex + 4).map((person) => (
          <NameCard
            key={person.id}
            name={person.name}
            imagePath={person.profile_path}
            desc={(person.character ?? person.job) as string}
          />
        ))}
      </div>
      {personList.length > 4 && (

        <button
          onClick={nextSlide}
          className=" bg-black border-2 border-white/50 flex justify-center items-center text-gray-100 p-1 rounded-full enabled:active:scale-95 enabled:hover:bg-neutral-900 disabled:opacity-40"
          disabled={currentIndex + 4 > personList.length}
        >
          <div className="text-2xl xl:text-3xl">
            <GrFormNext />
          </div>
        </button>
      )}
    </div>
  );
}

export default CastCarousel;
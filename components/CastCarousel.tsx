"use client"
import NameCard from "@/components/NameCard";
import { imageUrl, imgWidth, placeholders } from "@/utils/constants";
import { CrewFormatted, CrewMember } from "@/utils/types";
import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";




function CastCarousel({ personList }: { personList: CrewMember[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {

    setCurrentIndex((prevIndex) => (prevIndex + 5) % personList.length);
    console.log(currentIndex)
    console.log(personList.length)
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 5 + personList.length) % personList.length);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center mx-16">
        {personList.length > 5 && (
          <button
            onClick={prevSlide}
            className=" bg-gray-300/20 text-gray-100 p-1 rounded-full enabled:active:scale-95 enabled:hover:bg-gray-100/25 disabled:opacity-40"
            disabled={currentIndex === 0}
          >
            <div className="text-[28px]">
              <GrFormPrevious />
            </div>
          </button>

        )}
        <div className="flex gap-10 flex-1 justify-center">
          {personList.slice(currentIndex, currentIndex + 5).map((person) => (
            <NameCard
              key={person.id}
              name={person.name}
              imagePath={person.profile_path ? `${imageUrl}${imgWidth.profile[185]}${person.profile_path}` : `${placeholders.profile}`}
              desc={(person.character ?? person.job) as string}
            />
          ))}
        </div>
        {personList.length > 5 && (

          <button
            onClick={nextSlide}
            className=" bg-gray-300/20 text-gray-100 p-1 rounded-full enabled:active:scale-95 enabled:hover:bg-gray-100/25 disabled:opacity-40"
            disabled={currentIndex + 5 > personList.length}
          >
            <div className="text-[28px]">
              <GrFormNext />
            </div>
          </button>
        )}
      </div>

    </div>
  );
}

export default CastCarousel;
"use client"
import React from "react";
import Slider from "react-slick";
import NameCard from "@/components/NameCard";
import Link from "next/link";

interface PersonCarouselProps {
  personList: {
    id: number;
    name: string;
    profile_path: string;
    character?: string;
    job?: string;
  }[];

  type: string;
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

function SliderComponent({ personList, type }: PersonCarouselProps) {
  return (
    <div className="slider-container z-50 relative !w-[90%]">
      <Slider
        {...settings}
      >
        {personList.slice(0, 30).map((person) => (
          <Link
            key={person.id}
            href={`/person/${person.id}`}
          >
            <NameCard
              name={person.name}
              imagePath={person.profile_path}
              desc={((person.character ?? person.job) ?? "Creator")}
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default SliderComponent;

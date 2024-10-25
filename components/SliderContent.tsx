"use client"
import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import MultiCard from "@/components/MultiCard";

interface PersonCarouselProps {
  contentList: {
    id?: number;
    name?: string;
    title?: string;
    media_type?: string;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string;
    profile_path?: string;
  }[];
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
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

function SliderComponent({ contentList }: PersonCarouselProps) {
  return (
    <div className="slider-container z-50 relative w-full">
      <Slider
        {...settings}
      >
        {contentList.map((content) => (

          <Link
            key={content.id}
            href={`/${content.media_type}/${content.id}`}
          >
            <MultiCard key={content.id} item={content} />
          </Link>
        ))}
      </Slider>
    </div >
  );
}

export default SliderComponent;

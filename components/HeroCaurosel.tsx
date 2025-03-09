"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { img: "/assets/images/hero-1.svg", alt: "smartwatch" },
  { img: "/assets/images/hero-2.svg", alt: "bag" },
  { img: "/assets/images/hero-3.svg", alt: "lamp" },
  { img: "/assets/images/hero-4.svg", alt: "air fryer" },
  { img: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCaurosel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={2000}
        showStatus={false}
        showArrows={false}
      >
        {heroImages.map((img) => (
          <div className="w-full h-screen" key={img.alt}>
            <Image
              src={img.img}
              alt={img.alt}
              fill
              key={img.alt}
              className="object-contain"
            />
          </div>
        ))}
      </Carousel>

      <Image
        src="assets/icons/hand-drawn-arrow.svg"
        height={175}
        width={175}
        alt="arrow"
        className="max-xl:hidden absolute -left-[25%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCaurosel;

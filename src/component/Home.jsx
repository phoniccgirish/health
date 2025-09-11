import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FitnessHero() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const slides = [
    {
      title: "Fitness & Health Training",
      description:
        "Strong is the simplest, most intuitive workout tracking experience. Trusted by over 3 million users worldwide.",
      button: "Get Started",
      buttonColor: "bg-blue-400 hover:bg-blue-500",
    },
    {
      title: "Advanced Workouts & Tracking",
      description:
        "Track your progress, improve strength, and reach your fitness goals with ease.",
      button: "Learn More",
      buttonColor: "bg-teal-400 hover:bg-teal-500",
    },
    {
      title: "Personalized Plans",
      description:
        "Get customized workout plans tailored to your fitness level and goals.",
      button: "Join Now",
      buttonColor: "bg-purple-400 hover:bg-purple-500",
    },
  ];

  return (
    <section
      className='min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-8 py-16
      bg-gradient-to-r from-blue-200/80 via-teal-200/70 to-purple-200/80'
    >
      {/* Text Carousel */}
      <div className='md:w-1/2 text-center md:text-left'>
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index} className='px-4'>
              <h1 className='text-5xl font-bold text-gray-900 leading-tight mb-6'>
                {slide.title}
              </h1>
              <p className='text-lg text-gray-700 mb-6'>{slide.description}</p>
              <button
                className={`${slide.buttonColor} text-white px-6 py-3 rounded shadow transition duration-300`}
              >
                {slide.button}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* Static Image */}
      <div className='md:w-1/2 mt-10 md:mt-0 flex justify-center'>
        <img
          src='/download.jpeg'
          alt='Fitness Training'
          className='w-full  h-150 max-w-md object-contain'
        />
      </div>
    </section>
  );
}

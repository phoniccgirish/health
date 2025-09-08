import React from "react";

export default function FitnessHero() {
  return (
    <section className='flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-100 mt-15 h-200'>
      {/* Left Content */}
      <div className='md:w-1/2 text-center md:text-left'>
        <h1 className='text-5xl font-bold text-gray-900 leading-tight mb-6'>
          Fitness & <br /> Health Training
        </h1>
        <p className='text-lg text-gray-700 mb-6'>
          Strong is the simplest, most intuitive workout tracking experience.
          Trusted by over 3 million users worldwide.
        </p>
        <button className='bg-orange-500 text-white px-6 py-3 rounded shadow hover:bg-orange-600'>
          Get Started
        </button>

        {/* Stats */}
        {/* <div className='flex space-x-8 mt-8 justify-center md:justify-start'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-gray-900'></h3>
            <p className='text-gray-600'>Happy Users</p>
          </div>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-gray-900'></h3>
            <p className='text-gray-600'>Running Track</p>
          </div>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-gray-900'></h3>
            <p className='text-gray-600'>Workout Types</p>
          </div>
        </div> */}
      </div>

      {/* Right Image */}
      <div className='md:w-1/2 mt-20 md:mt-0 flex justify-center'>
        <img
          src='/download.jpeg'
          alt='Fitness Training'
          className='w-full max-w-md object-contain'
        />
      </div>
    </section>
  );
}

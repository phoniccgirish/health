import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Fake login state (replace with real auth)
  const [user, setUser] = useState({
    loggedIn: true,
    name: "Girish Yadav",
    email: "g@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=32", // random avatar
  });

  return (
    <nav className='bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <h1 className='text-2xl font-bold text-gray-200'>Healthchef</h1>
          </div>

          {/* Menu */}
          <div className='hidden md:flex space-x-6'>
            <Link
              to='/'
              className='text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium'
            >
              Home
            </Link>
            <Link
              to='/about'
              className='text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium'
            >
              About
            </Link>
            <Link
              to='/body'
              className='text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium'
            >
              3D Body
            </Link>
            <Link
              to='/contact'
              className='text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium'
            >
              Contact
            </Link>

            {/* Show Login OR Profile */}
            {!user.loggedIn ? (
              <Link
                to='/auth'
                className='text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium'
              >
                Login
              </Link>
            ) : (
              <div className='relative group'>
                <img
                  src={user.avatar}
                  alt='Profile'
                  className='w-10 h-10 rounded-full cursor-pointer border-2 border-teal-400'
                />

                {/* Hover Card */}
                <div className='absolute right-0 mt-2 w-60 bg-gray-800 text-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4'>
                  <div className='flex items-center space-x-4'>
                    <img
                      src={user.avatar}
                      alt='Profile'
                      className='w-12 h-12 rounded-full border-2 border-teal-400'
                    />
                    <div>
                      <h2 className='text-lg font-semibold'>{user.name}</h2>
                      <p className='text-sm text-gray-400'>{user.email}</p>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={() => setUser({ loggedIn: false })}
                      className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium transition'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <div className='hidden md:flex'>
            <button className='bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300'>
              M-METAL Ai
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <button className='text-gray-300 hover:text-teal-400 focus:outline-none'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

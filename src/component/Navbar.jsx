import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className='fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 text-white flex items-center justify-between px-6 shadow-lg backdrop-blur-lg z-50'>
        {/* Logo */}
        <h1 className='text-2xl font-extrabold tracking-wide cursor-pointer'>
          Heathchef
        </h1>

        {/* Desktop Links */}
        <div className='hidden md:flex space-x-8 font-medium'>
          <Link to='/' className='hover:text-yellow-300 transition'>
            Home
          </Link>
          <Link to='/about' className='hover:text-yellow-300 transition'>
            About
          </Link>
          <Link to='/contact' className='hover:text-yellow-300 transition'>
            Contact
          </Link>
          <Link to='/body' className='hover:text-yellow-300 transition'>
            3D View
          </Link>
          <Link to='/login' className='hover:text-yellow-300 transition'>
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden flex flex-col space-y-1 focus:outline-none'
          onClick={() => setOpen(!open)}
        >
          <span className='w-6 h-0.5 bg-white'></span>
          <span className='w-6 h-0.5 bg-white'></span>
          <span className='w-6 h-0.5 bg-white'></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className='md:hidden absolute top-16 left-0 right-0 bg-gray-900 bg-opacity-95 text-white flex flex-col items-center py-6 space-y-6 z-40'>
          <Link
            to='/'
            onClick={() => setOpen(false)}
            className='hover:text-yellow-300'
          >
            Home
          </Link>
          <Link
            to='/about'
            onClick={() => setOpen(false)}
            className='hover:text-yellow-300'
          >
            About
          </Link>
          <Link
            to='/contact'
            onClick={() => setOpen(false)}
            className='hover:text-yellow-300'
          >
            Contact
          </Link>
          <Link
            to='/body'
            onClick={() => setOpen(false)}
            className='hover:text-yellow-300'
          >
            3D View
          </Link>
          <Link
            to='/login'
            onClick={() => setOpen(false)}
            className='hover:text-yellow-300'
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}

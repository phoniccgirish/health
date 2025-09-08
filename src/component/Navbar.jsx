import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("supabase.auth.token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 text-white flex items-center justify-between px-6 shadow-lg backdrop-blur-lg z-50'>
        <Link
          to='/'
          className='text-2xl font-extrabold tracking-wide cursor-pointer'
        >
          Heathchef
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center space-x-6 font-medium'>
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

          {user ? (
            <>
              <span className='flex items-center space-x-2'>
                <img
                  src='https://via.placeholder.com/32'
                  alt='Profile'
                  className='rounded-full'
                />
                <span>{user.email}</span>
              </span>

              <button
                onClick={handleLogout}
                className='bg-red-500 px-3 py-1 rounded hover:bg-red-600'
              >
                Logout
              </button>
            </>
          ) : (
            <Link to='/auth' className='hover:text-yellow-300 transition'>
              Login / Sign Up
            </Link>
          )}
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

          {user ? (
            <>
              <span className='text-center'>
                <img
                  src='https://via.placeholder.com/32'
                  alt='Profile'
                  className='rounded-full mx-auto'
                />
                <div className='mt-2'>{user.email}</div>
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className='bg-red-500 px-4 py-1 rounded hover:bg-red-600'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/auth'
              onClick={() => setOpen(false)}
              className='hover:text-yellow-300'
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </>
  );
}

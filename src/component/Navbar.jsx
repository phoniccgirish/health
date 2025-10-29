import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const userEmail = session?.user?.email;
  const userAvatar =
    session?.user?.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${userEmail || "user"}`;
  const userName =
    session?.user?.user_metadata?.full_name || userEmail?.split("@")[0];

  return (
    <nav className='bg-gray-900 shadow-lg relative z-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link to='/' className='text-2xl font-bold text-gray-200'>
              Healthchef
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-6'>
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
              to='/bodyanalysis'
              className='text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium'
            >
              Bodyanalysis
            </Link>

            <Link to='/ai'><button className='bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300'>
              Ai Health
            </button></Link>

            {!session ? (
              <Link
                to='/auth'
                className='text-gray-300 hover:text-teal-400 transition-colors duration-300 font-medium'
              >
                Login
              </Link>
            ) : (
              <div className='relative group'>
                <img
                  src={userAvatar}
                  alt='Profile'
                  className='w-10 h-10 rounded-full cursor-pointer border-2 border-teal-400 bg-gray-600'
                />

                <div className='absolute right-0 mt-2 w-64 bg-gray-800 text-gray-200 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-4 transform translate-y-2 group-hover:translate-y-0'>
                  <div className='flex items-center space-x-4'>
                    <img
                      src={userAvatar}
                      alt='Profile'
                      className='w-12 h-12 rounded-full border-2 border-teal-400 bg-gray-600'
                    />
                    <div>
                      <h2 className='text-lg font-semibold'>{userName}</h2>
                      <p className='text-sm text-gray-400'>{userEmail}</p>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <button
                      onClick={handleLogout}
                      className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium transition'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-gray-300 hover:text-teal-400 focus:outline-none'
            >
              {isMobileMenuOpen ? (
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute w-full bg-gray-800 shadow-lg ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className='pt-2 pb-4 space-y-1 px-2 sm:px-3'>
          <Link
            to='/'
            onClick={closeMobileMenu}
            className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400 hover:bg-gray-700'
          >
            Home
          </Link>
          <Link
            to='/body'
            onClick={closeMobileMenu}
            className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400 hover:bg-gray-700'
          >
            3D Body
          </Link>
          <Link
            to='/bodyanalysis'
            onClick={closeMobileMenu}
            className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400 hover:bg-gray-700'
          >
            Bodyanalysis
          </Link>

          <button className='w-full text-left bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold px-3 py-2 mt-2 rounded-lg shadow-md transition duration-300'>
            M-METAL Ai
          </button>

          <div className='pt-4 pb-3 border-t border-gray-700 mt-4'>
            {!session ? (
              <Link
                to='/auth'
                onClick={closeMobileMenu}
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400 hover:bg-gray-700'
              >
                Login
              </Link>
            ) : (
              <div className='px-3'>
                <div className='flex items-center space-x-4 mb-3'>
                  <img
                    src={userAvatar}
                    alt='Profile'
                    className='w-10 h-10 rounded-full border-2 border-teal-400 bg-gray-600'
                  />
                  <div>
                    <h2 className='text-base font-semibold text-gray-200'>
                      {userName}
                    </h2>
                    <p className='text-sm font-medium text-gray-400'>
                      {userEmail}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium transition'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

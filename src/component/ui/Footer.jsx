import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 py-8'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Brand / About */}
        <div>
          <h2 className='text-xl font-bold text-white mb-3'>Healthchef</h2>
          <p className='text-sm'>
            Building modern web experiences with simplicity, speed, and style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-3'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='/' className='hover:text-white'>
                Home
              </a>
            </li>
            <li>
              <a href='/about' className='hover:text-white'>
                About
              </a>
            </li>
            <li>
              <a href='/services' className='hover:text-white'>
                Services
              </a>
            </li>
            <li>
              <a href='/contact' className='hover:text-white'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-3'>Follow Us</h3>
          <div className='flex space-x-4'>
            <a href='#' className='hover:text-white'>
              <FaFacebookF />
            </a>
            <a href='#' className='hover:text-white'>
              <FaTwitter />
            </a>
            <a href='#' className='hover:text-white'>
              <FaInstagram />
            </a>
            <a href='#' className='hover:text-white'>
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className='border-t border-gray-700 mt-8 pt-4 text-center text-sm'>
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

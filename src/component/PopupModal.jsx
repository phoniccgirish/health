import React from "react";

// This component receives the title, message, and onClose function from its parent
const PopupModal = ({ title, message, onClose }) => {
  return (
    // This creates the full-screen semi-transparent background (overlay)
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
      onClick={onClose} // Clicking the background also closes the modal
    >
      {/* This is the actual modal box */}
      <div
        className='relative p-6 bg-gray-800 rounded-lg shadow-xl max-w-sm w-full'
        onClick={(e) => e.stopPropagation()} // Clicking the modal itself doesn't close it
      >
        <h3 className='text-xl font-bold text-emerald-400 mb-4'>{title}</h3>
        <p className='text-gray-200 mb-6'>{message}</p>
        <button
          onClick={onClose}
          className='w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-gray-900 font-bold rounded-lg'
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default PopupModal;

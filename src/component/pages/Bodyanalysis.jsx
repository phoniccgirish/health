import React from "react";
import BodyAnalyzer from "../ui/BodyAnalyzer";

const Bodyanalysis = () => {
  return (
    // You can add your <Navbar /> and <Footer /> here if they are not in your main layout
    <div className='flex flex-col items-center justify-center min-h-screen p-4 pt-24 mt-20'>
      {" "}
      {/* Added padding-top */}
      <h1 className='font-bold text-4xl mb-8'>Body Analysis & AI Plan</h1>
      {/* This renders the analyzer component that does all the work */}
      <BodyAnalyzer className='z-2' />
    </div>
  );
};
export default Bodyanalysis;

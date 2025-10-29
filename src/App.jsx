import React from "react"; // Import React
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import About from "./component/pages/About.jsx";
// import Body from "./component/pages/Body1.jsx";

// --- FIX 1: Corrected the import path and component name ---
// The component is BodyAnalyzer and it lives in the 'ui' folder.
import BodyAnalyzer from "./component/ui/BodyAnalyzer.jsx";

import Footer from "./component/ui/Footer.jsx";
import Auth from "./component/ui/Auth.jsx"; // ✅ Import Auth component
import Body from "./component/pages/Body.jsx";
import Chatai from "./component/ui/Chatai.jsx";

function App() {
  return (
    // --- FIX 2: Added flex-box layout to fix footer overlap ---
    <div className='flex flex-col min-h-screen bg-gray-900'>
      <Navbar />

      {/* --- FIX 4: Center the content and add padding --- */}
      {/* --- FIX 5: Add background color to fill empty side space --- */}
      <main className='flex-grow flex justify-center p-4 bg-gray-900'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          {/* --- FIX 3: Use the correctly imported component --- */}
          <Route path='/bodyanalysis' element={<BodyAnalyzer />} />

          <Route path='/body' element={<Body />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/ai' element={<Chatai />} />
          {/* Auth handles Login & SignUp */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

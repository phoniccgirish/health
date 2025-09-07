import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import About from "./component/pages/About.jsx";
import Body from "./component/pages/Body.jsx";
import Contact from "./component/pages/Contact.jsx";
import Login from "./Login.jsx";
import Footer from "./component/ui/Footer.jsx";

function App() {
  return (
    <>
      {/* Navbar stays on top */}
      <Navbar />

      {/* Main page routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/body' element={<Body />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      {/* Footer stays at bottom */}
      <Footer />
    </>
  );
}

export default App;

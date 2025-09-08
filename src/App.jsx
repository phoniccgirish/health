import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import About from "./component/pages/About.jsx";
import Body from "./component/pages/Body.jsx";
import Contact from "./component/pages/Contact.jsx";
import Footer from "./component/ui/Footer.jsx";
import Auth from "./component/ui/Auth.jsx"; // ✅ Import Auth component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/body' element={<Body />} />
        <Route path='/auth' element={<Auth />} />
        {/* Auth handles Login & SignUp */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;

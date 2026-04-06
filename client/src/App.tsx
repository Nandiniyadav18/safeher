import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/news";
import About from "./pages/about";
import Emergency from "./pages/emergency";
import Navbar from "./components/Navbar";
import MapView from "./pages/MapView";
import Siren from "./pages/siren";
import CameraDetector from "./pages/camera-detector";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/map" element={<MapView />} />

        {/* 🔊 ADD THIS LINE */}
        <Route path="/siren" element={<Siren />} />
        <Route path="/camera" element={<CameraDetector />} />

      </Routes>
    </div>
  );
}

export default App;

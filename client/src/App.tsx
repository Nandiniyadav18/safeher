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
    <div className="bg-pink-50 min-h-screen">
      {/* 🌸 NAVBAR */}
      <Navbar />

      {/* 🌐 ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/emergency" element={<Emergency />} />

        {/* 🗺️ MAP HEATMAP */}
        <Route path="/map" element={<MapView />} />

        {/* 🔊 SIREN */}
        <Route path="/siren" element={<Siren />} />

        {/* 📷 CAMERA DETECTOR */}
        <Route path="/camera" element={<CameraDetector />} />
      </Routes>
    </div>
  );
}

export default App;
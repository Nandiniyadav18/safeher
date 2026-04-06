import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const Tile = ({ title, desc, to, icon }: any) => (
  <Link to={to}>
    <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl p-5 shadow-xl hover:scale-105 transition">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </Link>
);

export default function Home() {
  const recognitionRef = useRef<any>(null);
  const [number, setNumber] = useState(
    localStorage.getItem("emergencyContact") || ""
  );

  // 🚨 SOS
  const triggerSOS = () => {
    navigator.vibrate?.([200, 100, 200]);

    navigator.geolocation.getCurrentPosition((pos) => {
      const msg = `🚨 EMERGENCY!
Help needed!
https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;

      const phone =
        localStorage.getItem("emergencyContact") || "919876543210";

      window.location.href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
        msg
      )}`;
    });
  };

  // 🎤 VOICE
  const startVoice = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true });

    const Speech =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const rec = new Speech();
    rec.continuous = true;

    rec.onresult = (e: any) => {
      const text = e.results[e.results.length - 1][0].transcript.toLowerCase();

      if (text.includes("help") || text.includes("bachao")) {
        triggerSOS();
      }
    };

    rec.start();
    recognitionRef.current = rec;
    alert("Voice Enabled 🎤");
  };

  // 📳 SHAKE
  useEffect(() => {
    let last = 0;

    const motion = (e: any) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const total =
        Math.abs(acc.x || 0) +
        Math.abs(acc.y || 0) +
        Math.abs(acc.z || 0);

      if (total - last > 25) triggerSOS();

      last = total;
    };

    window.addEventListener("devicemotion", motion);
    return () => window.removeEventListener("devicemotion", motion);
  }, []);

  // 📳 ENABLE SHAKE
  const enableShake = async () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      await (DeviceMotionEvent as any).requestPermission();
    }
    alert("Shake Enabled 📳");
  };

  // 📞 SAVE CONTACT
  const saveContact = () => {
    localStorage.setItem("emergencyContact", number);
    alert("Saved ✅");
  };

  return (
    <div className="min-h-screen bg-pink-100 p-4">

      <h1 className="text-2xl font-bold text-center mb-4">💖 SafeHer</h1>

      {/* CONTACT */}
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="91xxxxxxxxxx"
        className="w-full p-3 rounded mb-2"
      />

      <button onClick={saveContact} className="w-full bg-blue-500 text-white p-2 rounded">
        Save Contact
      </button>

      {/* VOICE */}
      <button onClick={startVoice} className="w-full bg-pink-500 text-white p-3 mt-3 rounded">
        🎤 Enable Voice
      </button>

      {/* SHAKE */}
      <button onClick={enableShake} className="w-full bg-green-500 text-white p-3 mt-2 rounded">
        📳 Enable Shake
      </button>

      {/* FEATURES */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Tile title="Camera" desc="Detect hidden cam" to="/camera" icon="📷" />
        <Tile title="News" desc="Updates" to="/news" icon="📰" />
        <Tile title="Siren" desc="Alarm" to="/siren" icon="🔊" />
        <Tile title="Map" desc="Safe zones" to="/map" icon="🗺️" />
      </div>

      {/* SOS */}
      <div
        onClick={triggerSOS}
        className="fixed bottom-5 right-5 bg-red-500 w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl"
      >
        🚨
      </div>
    </div>
  );
}
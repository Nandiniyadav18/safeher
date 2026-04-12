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
    <div className="bg-white/50 backdrop-blur-lg border rounded-2xl p-5 shadow hover:scale-105 transition">
      <div className="text-3xl">{icon}</div>
      <h3 className="font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </Link>
);

export default function Home() {
  const recognitionRef = useRef<any>(null);
  const [number, setNumber] = useState(
    localStorage.getItem("emergencyContact") || ""
  );
  const [safetyScore, setSafetyScore] = useState(0);

  // 🚨 SOS
  const triggerSOS = () => {
    navigator.vibrate?.([200, 100, 200]);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const msg = `🚨 EMERGENCY!
Help needed!
https://maps.google.com/?q=${latitude},${longitude}`;

        const phone =
          localStorage.getItem("emergencyContact") || "919876543210";

        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
          msg
        )}`;

        window.open(url, "_blank");
      },
      () => alert("Location permission denied ❌")
    );
  };

  // 🎤 VOICE
  const startVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());

      const Speech =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!Speech) {
        alert("Voice not supported ❌");
        return;
      }

      const rec = new Speech();
      rec.continuous = true;
      rec.lang = "en-IN";

      rec.onresult = (e: any) => {
        const text =
          e.results[e.results.length - 1][0].transcript.toLowerCase();

        if (text.includes("help") || text.includes("bachao")) {
          triggerSOS();
        }
      };

      rec.start();
      recognitionRef.current = rec;

      alert("🎤 Voice Enabled");
    } catch {
      alert("Mic permission denied ❌");
    }
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

  // 🤖 FAKE AI SAFETY SCORE
  useEffect(() => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: latitude,
          lon: longitude,
        }),
      });

      const data = await res.json();
      setSafetyScore(data.safety_score);
    } catch (err) {
      console.log("API error", err);
    }
  });
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-white pb-24">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-5 text-center text-xl font-bold shadow">
        💖 SafeHer
      </div>

      {/* AI SCORE */}
      <div className="text-center mt-4">
        <h3 className="text-gray-700">Safety Score</h3>
        <p className={`text-5xl font-bold ${safetyScore > 50 ? "text-green-500" : "text-red-500"}`}>
          {safetyScore}%
        </p>
      </div>

      {/* CONTACT */}
      <div className="px-4 mt-4">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="91xxxxxxxxxx"
          className="w-full p-3 rounded-xl border mb-2"
        />

        <button
          onClick={saveContact}
          className="w-full bg-blue-500 text-white py-2 rounded-xl"
        >
          Save Contact
        </button>
      </div>

      {/* VOICE */}
      <div className="px-4 mt-3">
        <button
          onClick={startVoice}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-xl shadow hover:scale-105 transition"
        >
          🎤 Enable Voice
        </button>
      </div>

      {/* SHAKE */}
      <div className="px-4 mt-2">
        <button
          onClick={enableShake}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-400 text-white py-3 rounded-xl shadow hover:scale-105 transition"
        >
          📳 Enable Shake
        </button>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-2 gap-4 px-4 mt-6">
        <Tile title="Camera" desc="Detect hidden cam" to="/camera" icon="📷" />
        <Tile title="News" desc="Updates" to="/news" icon="📰" />
        <Tile title="Siren" desc="Alarm" to="/siren" icon="🔊" />
        <Tile title="Map" desc="Safe zones" to="/map" icon="🗺️" />
      </div>

      {/* SOS BUTTON */}
      <div
        onClick={triggerSOS}
        className="fixed bottom-6 right-6 bg-red-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-2xl text-2xl cursor-pointer animate-pulse hover:scale-110 transition"
      >
        🚨
      </div>
    </div>
  );
}
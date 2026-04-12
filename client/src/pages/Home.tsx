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
    <div className="bg-white/60 backdrop-blur-lg border border-pink-200 rounded-3xl p-5 shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
      <div className="text-4xl">{icon}</div>
      <h3 className="font-semibold mt-2 text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </Link>
);

export default function Home() {
  const recognitionRef = useRef<any>(null);

  const [contacts, setContacts] = useState<string[]>(
    JSON.parse(localStorage.getItem("contacts") || "[]")
  );
  const [input, setInput] = useState("");
  const [safetyScore, setSafetyScore] = useState(50);
  const [loading, setLoading] = useState(true);

  // 🚨 SOS FUNCTION
  const triggerSOS = () => {
    navigator.vibrate?.([200, 100, 200]);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const msg = `🚨 EMERGENCY!
  I need help!
  https://maps.google.com/?q=${latitude},${longitude}`;
      const contacts =
        JSON.parse(localStorage.getItem("contacts") || "[]") || [];
      if (contacts.length === 0) {
        alert("No contacts saved ❌");
        return;
      }
      contacts.forEach((phone: string) => {
        // ✅ WhatsApp
        const wa = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
        window.open(wa, "_blank");
        // ✅ SMS
        sendSMS(phone, msg);
      });
    });
  };

  // 📩 SMS FUNCTION
  const sendSMS = (phone: string, message: string) => {
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl);
  };  

  // 🎤 VOICE
  const startVoice = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const Speech =
        window.SpeechRecognition || window.webkitSpeechRecognition;

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

  // 📳 SHAKE DETECTION
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
    alert("Shake detection enabled 📳");
  };

  // 📞 ADD CONTACT
  const saveContact = () => {
    if (!input) return;

    const updated = [...contacts, input];
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
    setInput("");
  };

  // ❌ DELETE CONTACT
  const deleteContact = (index: number) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  // 🤖 AI API CALL
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await fetch(
          "https://safeher-1-mw84.onrender.com/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            }),
          }
        );

        const data = await res.json();
        setSafetyScore(data.safety_score || 50);
      } catch {
        setSafetyScore(50);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 pb-24">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-400 text-white p-5 text-center text-2xl font-semibold shadow-md rounded-b-3xl">
        💖 SafeHer
      </div>

      <div className="text-center mt-2 text-pink-600 text-sm">
        Your Smart Safety Companion ✨
      </div>

      {/* SAFETY SCORE */}
      <div className="mx-4 mt-4 bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow-lg border border-pink-200 text-center">
        <h3 className="text-gray-600">Safety Score</h3>

        {loading ? (
          <p className="text-gray-400 mt-2">Loading...</p>
        ) : (
          <p
            className={`text-6xl font-bold ${
              safetyScore > 50 ? "text-green-500" : "text-rose-500"
            }`}
          >
            {safetyScore}%
          </p>
        )}
      </div>

      {/* CONTACT SECTION */}
      <div className="mx-4 mt-4 bg-white/70 backdrop-blur-lg p-4 rounded-3xl shadow border border-pink-200">
        <h3 className="text-pink-600 font-semibold mb-2">Emergency Contacts</h3>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter phone number"
          className="w-full p-3 rounded-xl border border-pink-200 mb-2 focus:outline-none"
        />

        <button
          onClick={saveContact}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-2 rounded-xl shadow hover:scale-105 transition"
        >
          💾 Add Contact
        </button>

        {/* CONTACT LIST */}
        <div className="mt-3 space-y-2">
          {contacts.map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-pink-50 p-2 rounded-xl"
            >
              <span>📞 {c}</span>
              <button
                onClick={() => deleteContact(i)}
                className="text-red-500 text-sm"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* VOICE */}
      <div className="px-4 mt-3">
        <button
          onClick={startVoice}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-2xl shadow hover:scale-105 transition"
        >
          🎤 Enable Voice
        </button>
      </div>

      {/* SHAKE */}
      <div className="px-4 mt-2">
        <button
          onClick={enableShake}
          className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white py-3 rounded-2xl shadow hover:scale-105 transition"
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
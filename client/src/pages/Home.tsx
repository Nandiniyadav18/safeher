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
    <div className="bg-white/80 backdrop-blur-xl border border-pink-200 rounded-2xl p-5 shadow-lg hover:shadow-pink-400/30 hover:-translate-y-1 transition duration-300">
      <div className="text-3xl">{icon}</div>
      <h3 className="font-semibold mt-2 text-lg text-gray-800">{title}</h3>
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

  // 🚨 SOS
  const triggerSOS = () => {
    navigator.vibrate?.([300, 200, 300]);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const msg = `🚨 EMERGENCY!
https://maps.google.com/?q=${latitude},${longitude}`;

        const savedContacts =
          JSON.parse(localStorage.getItem("contacts") || "[]") || [];

        if (savedContacts.length === 0) {
          alert("No contacts saved ❌");
          return;
        }

        savedContacts.forEach((phone: string) => {
          window.open(
            `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`
          );
          window.open(`sms:${phone}?body=${encodeURIComponent(msg)}`);
        });

        alert("🚨 SOS Sent Successfully");
      },
      () => alert("Location permission denied ❌")
    );
  };

  // 🎤 VOICE
  const startVoice = () => {
    const Speech =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Speech) {
      alert("Voice not supported ❌ Use Chrome");
      return;
    }

    if (recognitionRef.current) recognitionRef.current.stop();

    const rec = new Speech();
    rec.lang = "en-IN";
    rec.continuous = true;
    rec.start();

    recognitionRef.current = rec;

    rec.onresult = (e: any) => {
      const text =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      if (
        text.includes("help") ||
        text.includes("sos") ||
        text.includes("bachao")
      ) {
        triggerSOS();
      }
    };

    rec.onend = () => rec.start();
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
    if ((DeviceMotionEvent as any).requestPermission) {
      await (DeviceMotionEvent as any).requestPermission();
    }
    alert("Shake detection enabled 📳");
  };

  // 📞 CONTACTS
  const saveContact = () => {
    if (!input) return;

    const updated = [...contacts, input];
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
    setInput("");
  };

  const deleteContact = (index: number) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  // 🤖 AI SCORE
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await fetch(
          "https://safeher-1-mw84.onrender.com/predict",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    <div
      className="min-h-screen pb-24 relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🌫️ OVERLAY */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* ✨ GLOW EFFECT */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-pink-300/30 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-300/30 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-6 rounded-b-3xl shadow-xl">
          <h1 className="text-2xl font-bold">💖 SafeHer</h1>
          <p className="text-sm mt-1">Your Safety Companion ✨</p>
        </div>

        {/* TITLE */}
        <div className="text-center mt-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Stay Safe. Stay Strong 💖
          </h2>
          <p className="text-gray-600">AI powered safety system</p>
        </div>

        {/* SCORE */}
        <div className="mx-4 mt-6 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl text-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-7xl font-bold text-green-500">
              {safetyScore}%
            </p>
          )}
        </div>

        {/* CONTACT */}
        <div className="mx-4 mt-6 bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter phone number"
            className="w-full p-3 rounded-xl border mb-3"
          />

          <button
            onClick={saveContact}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-xl shadow hover:scale-105 transition"
          >
            Add Contact
          </button>

          {contacts.map((c, i) => (
            <div key={i} className="flex justify-between mt-2">
              {c}
              <button onClick={() => deleteContact(i)}>❌</button>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="px-4 mt-4 space-y-3">
          <button
            onClick={startVoice}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-xl shadow hover:scale-105 transition"
          >
            🎤 Voice SOS
          </button>

          <button
            onClick={enableShake}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-xl shadow hover:scale-105 transition"
          >
            📳 Shake Detection
          </button>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-2 gap-4 px-4 mt-6">
          <Tile title="Camera" desc="Detect cam" to="/camera" icon="📷" />
          <Tile title="News" desc="Updates" to="/news" icon="📰" />
          <Tile title="Siren" desc="Alarm" to="/siren" icon="🔊" />
          <Tile title="Map" desc="Safe zones" to="/map" icon="🗺️" />
        </div>

        {/* SOS */}
        <div
          onClick={triggerSOS}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-rose-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-2xl text-2xl animate-pulse cursor-pointer"
        >
          🚨
        </div>
      </div>
    </div>
  );
}
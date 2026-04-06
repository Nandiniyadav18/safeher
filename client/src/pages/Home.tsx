import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const Tile = ({
  title,
  desc,
  to,
  icon,
}: {
  title: string;
  desc: string;
  to: string;
  icon: string;
}) => (
  <Link to={to}>
    <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl p-5 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  </Link>
);

export default function Home() {
  const recognitionRef = useRef<any>(null);

  // 🚨 SOS FUNCTION
  const triggerSOS = (source = "Manual") => {
    console.log("SOS:", source);

    navigator.vibrate?.([200, 100, 200]);

    const audio = new Audio(
      "https://www.soundjay.com/button/beep-07.wav"
    );
    audio.play();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const msg = `🚨 EMERGENCY!
I need help immediately!
Location:
https://maps.google.com/?q=${latitude},${longitude}`;

        const phone =
          localStorage.getItem("emergencyContact") || "91XXXXXXXXXX";

        // Open WhatsApp with message
        window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(
          msg
        )}`;
      },
      () => alert("Location permission denied ❌")
    );
  };

  // 🎤 VOICE FUNCTION
  const startVoice = async () => {
    try {
      // Ask mic permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const Speech =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!Speech) {
        alert("Voice not supported ❌");
        return;
      }

      const recognition = new Speech();

      recognition.continuous = true;
      recognition.lang = "en-IN";

      recognition.onresult = (event: any) => {
        const text =
          event.results[event.results.length - 1][0].transcript.toLowerCase();

        console.log("Heard:", text);

        if (
          text.includes("help") ||
          text.includes("bachao") ||
          text.includes("save me") ||
          text.includes("danger")
        ) {
          triggerSOS("Voice");
        }
      };

      recognition.onerror = (e: any) => {
        console.log("Voice error:", e);
      };

      recognition.onend = () => {
        setTimeout(() => {
          recognition.start();
        }, 1000);
      };

      recognition.start();
      recognitionRef.current = recognition;

      localStorage.setItem("voiceEnabled", "true");

      alert("🎤 Voice Protection Enabled!");
    } catch (err) {
      alert("Mic permission denied ❌");
    }
  };

  // 🔁 AUTO VOICE START
  useEffect(() => {
    const enabled = localStorage.getItem("voiceEnabled");

    if (enabled === "true") {
      setTimeout(() => {
        startVoice();
      }, 1000);
    }
  }, []);

  // 📳 SHAKE DETECTION FIXED
  useEffect(() => {
    let last = 0;

    const enableMotion = async () => {
      // iPhone permission
      if (
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          const res = await (DeviceMotionEvent as any).requestPermission();
          if (res !== "granted") {
            alert("Motion permission denied ❌");
            return;
          }
        } catch (err) {
          console.log(err);
        }
      }

      const handleMotion = (e: DeviceMotionEvent) => {
        const acc = e.accelerationIncludingGravity;
        if (!acc) return;

        const total =
          Math.abs(acc.x || 0) +
          Math.abs(acc.y || 0) +
          Math.abs(acc.z || 0);

        if (total - last > 25) {
          console.log("SHAKE DETECTED 🚨");
          triggerSOS("Shake");
        }

        last = total;
      };

      window.addEventListener("devicemotion", handleMotion);
    };

    enableMotion();

    return () => {
      window.removeEventListener("devicemotion", () => {});
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-white pb-24">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-6 py-7 rounded-b-[40px] shadow-xl">
        <h1 className="text-3xl font-bold text-center">💖 SafeHer</h1>
        <p className="text-center text-sm opacity-90">
          Your Smart Safety Companion
        </p>
      </div>

      {/* SAFETY CARD */}
      <div className="px-4 mt-6">
        <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl p-6 text-center shadow-xl">
          <h3 className="text-gray-700 font-medium">
            Current Safety Score
          </h3>
          <p className="text-5xl font-bold text-green-500 mt-2 animate-pulse">
            76%
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Area is Safe 💚
          </p>
        </div>
      </div>

      {/* 🎤 ENABLE VOICE */}
      <div className="px-4 mt-4">
        <button
          onClick={startVoice}
          className="w-full bg-pink-500 text-white py-3 rounded-xl shadow"
        >
          🎤 Enable Smart Protection
        </button>
      </div>

      {/* FEATURES */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-4">
        <Tile title="Camera" desc="Scan hidden devices" to="/camera" icon="📷" />
        <Tile title="News" desc="Safety updates" to="/news" icon="📰" />
        <Tile title="Siren" desc="Emergency sound" to="/siren" icon="🔊" />
        <Tile title="Map" desc="Safe zones" to="/map" icon="🗺️" />
      </div>

      {/* 🚨 SOS BUTTON */}
      <div
        onClick={() => triggerSOS()}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-2xl text-2xl cursor-pointer hover:scale-110 transition animate-bounce"
      >
        🚨
      </div>
    </div>
  );
}
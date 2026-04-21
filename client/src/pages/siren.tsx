import { useRef, useState } from "react";

export default function Siren() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [active, setActive] = useState(false);

  const toggleSiren = () => {
    if (!active) {
      audioRef.current = new Audio(
        "/11325622-air-raid-siren-sound-effect-241383.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.play();
      setActive(true);

      navigator.vibrate?.([300, 150, 300, 150, 300]);
    } else {
      audioRef.current?.pause();
      audioRef.current = null;
      setActive(false);
    }
  };

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
      {/* overlay */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[400px] h-[400px] bg-red-300/30 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-6 shadow">
          <h1 className="text-xl font-bold">Emergency Siren</h1>
          <p className="text-sm opacity-90">
            Use in danger to attract attention
          </p>
        </div>

        {/* Main */}
        <div className="px-4 mt-10 flex flex-col items-center">
          <button
            onClick={toggleSiren}
            className={`w-40 h-40 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl transition ${
              active
                ? "bg-red-600 animate-pulse scale-105"
                : "bg-gradient-to-r from-pink-500 to-rose-400 hover:scale-105"
            }`}
          >
            {active ? "STOP" : "SIREN"}
          </button>

          <p
            className={`mt-6 text-sm font-semibold ${
              active ? "text-red-600" : "text-gray-700"
            }`}
          >
            {active
              ? "Siren is active! Stay alert."
              : "Press to activate siren"}
          </p>
        </div>

        {/* Info */}
        <div className="px-4 mt-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 text-sm text-gray-600 shadow">
            <p className="font-semibold mb-1">When to use:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>If you feel threatened</li>
              <li>To attract attention</li>
              <li>During emergencies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
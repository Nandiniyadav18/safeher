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

      if (navigator.vibrate) {
        navigator.vibrate([300, 150, 300, 150, 300]);
      }
    } else {
      audioRef.current?.pause();
      audioRef.current = null;
      setActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-pink-500 text-white px-4 py-6">
        <h1 className="text-xl font-bold">Emergency Siren</h1>
        <p className="text-sm opacity-90">
          Use in danger to attract nearby attention
        </p>
      </div>

      {/* Main */}
      <div className="px-4 mt-10 flex flex-col items-center">
        {/* Siren Button */}
        <button
          onClick={toggleSiren}
          className={`w-40 h-40 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl transition ${
            active
              ? "bg-red-600 animate-pulse"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {active ? "STOP" : "SIREN"}
        </button>

        {/* Status */}
        <p
          className={`mt-6 text-sm font-semibold ${
            active ? "text-red-600" : "text-gray-600"
          }`}
        >
          {active
            ? "Siren is active! Stay alert."
            : "Press the button to activate siren"}
        </p>
      </div>

      {/* Info */}
      <div className="px-4 mt-10">
        <div className="bg-white rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold mb-1">When to use:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>If you feel threatened</li>
            <li>To attract nearby people</li>
            <li>During emergencies at night or alone</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



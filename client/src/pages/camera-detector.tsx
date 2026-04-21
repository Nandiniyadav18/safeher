import { useState } from "react";

export default function CameraDetector() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const startScan = () => {
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      setScanning(false);
      setResult("No hidden cameras detected nearby.");
    }, 3000);
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
        <div className="absolute w-[400px] h-[400px] bg-pink-300/30 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-purple-300/30 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-6 shadow">
          <h1 className="text-xl font-bold">Hidden Camera Detector</h1>
          <p className="text-sm opacity-90">
            Scan nearby area for suspicious devices
          </p>
        </div>

        {/* Main Card */}
        <div className="px-4 mt-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-pink-100 flex items-center justify-center mb-4 text-3xl">
              📷
            </div>

            <h2 className="font-semibold text-lg mb-2">
              Camera Scan
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Detect hidden surveillance devices using scanning logic.
            </p>

            <button
              onClick={startScan}
              disabled={scanning}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                scanning
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:scale-105"
              }`}
            >
              {scanning ? "Scanning..." : "Start Scan"}
            </button>

            {scanning && (
              <p className="mt-4 text-sm text-orange-500">
                Scanning nearby devices…
              </p>
            )}

            {result && (
              <p className="mt-4 text-sm font-semibold text-green-600">
                {result}
              </p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="px-4 mt-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 text-sm text-gray-600 shadow">
            <p className="font-semibold mb-1">Note:</p>
            <p>
              Real detection is limited in browsers, so this feature is simulated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



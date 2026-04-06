import { useState } from "react";

export default function CameraDetector() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const startScan = () => {
    setScanning(true);
    setResult(null);

    // Simulated scan
    setTimeout(() => {
      setScanning(false);
      setResult("No hidden cameras detected nearby.");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-pink-500 text-white px-4 py-6">
        <h1 className="text-xl font-bold">Hidden Camera Detector</h1>
        <p className="text-sm opacity-90">
          Scan nearby area for suspicious devices
        </p>
      </div>

      {/* Main Card */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          {/* Icon Circle */}
          <div className="w-24 h-24 mx-auto rounded-full bg-pink-100 flex items-center justify-center mb-4">
            📷
          </div>

          <h2 className="font-semibold text-lg mb-2">
            Camera Scan
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            This feature helps detect hidden surveillance cameras
            using simulated scanning logic.
          </p>

          {/* Button */}
          <button
            onClick={startScan}
            disabled={scanning}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              scanning
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            {scanning ? "Scanning..." : "Start Scan"}
          </button>

          {/* Status */}
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

      {/* Info Section */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold mb-1">Note:</p>
          <p>
            Due to browser security limitations, real camera detection
            is simulated for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}



export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-pink-500 text-white px-4 py-6">
        <h1 className="text-xl font-bold">About SafeHer</h1>
        <p className="text-sm opacity-90">
          Women Safety & Awareness Application
        </p>
      </div>

      {/* Profile Card */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-4">
            👩
          </div>

          <h2 className="text-lg font-semibold">SafeHer</h2>
          <p className="text-sm text-gray-500 mt-1">
            Your Personal Safety Companion
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl p-4 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">🎯 Our Mission</h3>
          <p>
            SafeHer aims to enhance women’s safety by providing
            quick-access emergency tools, awareness features, and
            safety insights using modern web technologies.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">✨ Key Features</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Emergency Siren for immediate attention</li>
            <li>Hidden Camera Detector (simulated scan)</li>
            <li>Safety Map with safe & unsafe zones</li>
            <li>Women safety news and awareness</li>
            <li>Location-based safety assistance</li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">🛠 Technology Used</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>React + TypeScript</li>
            <li>Vite for fast development</li>
            <li>Tailwind CSS for UI design</li>
            <li>Leaflet & OpenStreetMap for maps</li>
            <li>HTML5 APIs (Audio, Geolocation)</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 mt-6 text-center text-xs text-gray-400">
        © 2026 SafeHer Project · Final Year BTech
      </div>
    </div>
  );
}


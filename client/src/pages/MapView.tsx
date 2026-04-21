import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";

// ICONS
const userIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [35, 35],
});

const policeIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  iconSize: [30, 30],
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
  iconSize: [28, 28],
});

// 🔥 AI Danger Function
const calculateDanger = (userLat: number, userLng: number, zones: any[]) => {
  let score = 0;

  zones.forEach((z) => {
    const dist = Math.sqrt(
      Math.pow(userLat - z.lat, 2) +
      Math.pow(userLng - z.lng, 2)
    );

    if (dist < 0.02) {
      if (z.risk === "unsafe") score += 3;
      else if (z.risk === "medium") score += 2;
      else score += 1;
    }
  });

  if (score > 8) return "UNSAFE";
  if (score > 4) return "MEDIUM";
  return "SAFE";
};

export default function MapView() {
  const [userLocation, setUserLocation] = useState<any>(null);
  const [zones, setZones] = useState<any[]>([]);
  const [police, setPolice] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [nearestPolice, setNearestPolice] = useState<any>(null);
  const [status, setStatus] = useState("MEDIUM");

  const fetched = useRef(false);

  // 🔹 Generate Zones
  const generateZones = (lat: number, lng: number) => {
    const arr = [];

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const r = Math.random();

        let risk = "safe";
        if (r > 0.7) risk = "unsafe";
        else if (r > 0.4) risk = "medium";

        arr.push({
          lat: lat + i * 0.008,
          lng: lng + j * 0.008,
          risk,
        });
      }
    }

    setZones(arr);
  };

  // 🔹 Fetch Police & Hospital
  const fetchPlaces = async (lat: number, lng: number) => {
    try {
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:1000,${lat},${lng});
          node["amenity"="police"](around:1000,${lat},${lng});
        );
        out;
      `;

      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      const data = await res.json();

      const h: any[] = [];
      const p: any[] = [];

      data.elements.forEach((el: any) => {
        if (el.tags?.amenity === "hospital") {
          h.push([el.lat, el.lon]);
        }

        if (el.tags?.amenity === "police") {
          p.push({
            lat: el.lat,
            lng: el.lon,
            name: el.tags?.name || "Police Station",
            phone: el.tags?.phone || "100",
          });
        }
      });

      setHospitals(h);
      setPolice(p);

      if (p.length > 0) {
        setNearestPolice(p[0]);
      }
    } catch {
      console.log("API failed");
    }
  };

  // 🔹 Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setUserLocation([lat, lng]);

      generateZones(lat, lng);

      if (!fetched.current) {
        fetchPlaces(lat, lng);
        fetched.current = true;
      }
    });
  }, []);

  // 🔥 AI Danger Update
  useEffect(() => {
    if (userLocation && zones.length > 0) {
      const result = calculateDanger(
        userLocation[0],
        userLocation[1],
        zones
      );

      setStatus(result);

      if (result === "UNSAFE") {
        console.log("⚠️ High Risk Area");
      }
    }
  }, [zones, userLocation]);

  if (!userLocation) return <p className="text-center mt-10">Loading...</p>;

  const statusColor =
    status === "SAFE"
      ? "bg-green-500"
      : status === "MEDIUM"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div
      className="min-h-screen p-4 relative"
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10">
        {/* HEADER */}
        <div className="bg-white/80 rounded-xl p-4 shadow text-center mb-4">
          <h2 className="text-xl font-bold text-pink-600">
            💖 SafeHer AI Map
          </h2>

          <div className={`mt-2 text-white px-3 py-1 rounded ${statusColor}`}>
            Status: {status}
          </div>

          {nearestPolice && (
            <>
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${nearestPolice.lat},${nearestPolice.lng}`
                  )
                }
                className="mt-3 bg-orange-500 text-white px-4 py-2 rounded"
              >
                🚓 Go to Police
              </button>

              <p className="mt-2 text-sm">📞 {nearestPolice.phone}</p>
            </>
          )}
        </div>

        {/* MAP */}
        <MapContainer
          center={userLocation}
          zoom={15}
          className="h-[500px] rounded-xl shadow"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* USER */}
          <Marker position={userLocation} icon={userIcon} />

          {/* ZONES */}
          {zones.map((z, i) => (
            <Circle
              key={i}
              center={[z.lat, z.lng]}
              radius={70}
              pathOptions={{
                color:
                  z.risk === "safe"
                    ? "green"
                    : z.risk === "medium"
                    ? "yellow"
                    : "red",
              }}
            />
          ))}

          {/* HOSPITAL */}
          {hospitals.map((h, i) => (
            <Marker key={i} position={h} icon={hospitalIcon} />
          ))}

          {/* POLICE */}
          {police.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lng]} icon={policeIcon} />
          ))}
        </MapContainer>

        {/* LEGEND */}
        <div className="mt-3 text-center bg-white/80 p-3 rounded shadow">
          🟢 Safe | 🟡 Medium | 🔴 Unsafe | 🔵 You | 🟠 Police |{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>+</span> Hospital
        </div>
      </div>
    </div>
  );
}
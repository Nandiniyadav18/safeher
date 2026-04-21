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

// fallback
const fallbackPolice = (lat: number, lng: number) => [
  {
    lat: lat + 0.004,
    lng: lng + 0.004,
    name: "Nearest Police Station",
    phone: "100",
  },
];

type DataPoint = {
  lat: number;
  lng: number;
  risk: "safe" | "medium" | "unsafe";
};

type PoliceType = {
  lat: number;
  lng: number;
  name: string;
  phone: string;
};

export default function MapView() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [zones, setZones] = useState<DataPoint[]>([]);
  const [hospitals, setHospitals] = useState<[number, number][]>([]);
  const [police, setPolice] = useState<PoliceType[]>([]);
  const [nearestPolice, setNearestPolice] = useState<PoliceType | null>(null);
  const [status, setStatus] = useState("medium");

  const fetched = useRef(false); // 🚀 FIX multiple API calls

  // distance
  const getDistance = (a: any, b: any) => {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
  };

  // zones
  const generateZones = (lat: number, lng: number) => {
    const arr: DataPoint[] = [];

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const r = Math.random();
        let risk: "safe" | "medium" | "unsafe" = "safe";

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

  // API
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

      const h: [number, number][] = [];
      let p: PoliceType[] = [];

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

      if (p.length === 0) {
        p = fallbackPolice(lat, lng);
      }

      setHospitals(h);
      setPolice(p);

      const nearest = p.reduce((prev, curr) =>
        getDistance([lat, lng], [curr.lat, curr.lng]) <
        getDistance([lat, lng], [prev.lat, prev.lng])
          ? curr
          : prev
      );

      setNearestPolice(nearest);
    } catch {
      const fallback = fallbackPolice(lat, lng);
      setPolice(fallback);
      setNearestPolice(fallback[0]);
    }
  };

  // location
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

      const r = Math.random();
      if (r > 0.7) setStatus("unsafe");
      else if (r > 0.4) setStatus("medium");
      else setStatus("safe");
    });
  }, []);

  if (!userLocation) return <p className="text-center mt-10">Loading...</p>;

  const statusColor =
    status === "safe"
      ? "bg-green-500"
      : status === "medium"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div
      className="min-h-screen p-4 relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10">
        {/* HEADER CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow p-4 text-center mb-4">
          <h2 className="text-xl font-bold text-pink-600">
            💖 SafeHer AI Map
          </h2>

          <div className={`mt-2 text-white px-3 py-1 rounded ${statusColor}`}>
            Status: {status.toUpperCase()}
          </div>

          {nearestPolice && (
            <>
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${nearestPolice.lat},${nearestPolice.lng}`
                  )
                }
                className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg shadow"
              >
                🚓 Go to {nearestPolice.name}
              </button>

              <div className="mt-2 text-sm">
                📞 {nearestPolice.phone}
              </div>
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

          <Marker position={userLocation} icon={userIcon} />

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

          {hospitals.map((pos, i) => (
            <Marker key={i} position={pos} icon={hospitalIcon} />
          ))}

          {police.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lng]} icon={policeIcon} />
          ))}
        </MapContainer>

        {/* ✅ LEGEND FIXED */}
        <div className="mt-3 text-center bg-white/80 backdrop-blur-xl p-3 rounded shadow">
          🟢 Safe | 🟡 Medium | 🔴 Unsafe | 🔵 You | 🟠 Police | 
          <span style={{ color: "red", fontWeight: "bold" }}> + </span> Hospital
        </div>
      </div>
    </div>
  );
}
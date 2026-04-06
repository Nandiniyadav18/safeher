import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

type DataPoint = {
  lat: number;
  lng: number;
  risk: "safe" | "medium" | "unsafe";
};

export default function MapPage() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // 📍 Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  // 📊 Simulated dataset (replace with your API later)
  useEffect(() => {
    const generatedData: DataPoint[] = [];

    for (let i = 0; i < 300; i++) {
      const lat = 8 + Math.random() * (37 - 8); // India range
      const lng = 68 + Math.random() * (97 - 68);

      let risk: "safe" | "medium" | "unsafe";
      const r = Math.random();

      if (r < 0.5) risk = "safe";
      else if (r < 0.75) risk = "medium";
      else risk = "unsafe";

      generatedData.push({ lat, lng, risk });
    }

    setData(generatedData);
  }, []);

  // 🎯 Color icons
  const getColorIcon = (color: string) =>
    new L.Icon({
      iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      iconSize: [32, 32],
    });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-2">Safety Map</h2>

      {/* Legend */}
      <div className="mb-2 text-sm">
        <span className="text-red-500">● Unsafe</span> |{" "}
        <span className="text-yellow-500">● Medium</span> |{" "}
        <span className="text-green-500">● Safe</span> |{" "}
        <span className="text-blue-500">● You</span>
      </div>

      <MapContainer
        center={[22.9734, 78.6569]} // India center
        zoom={5}
        className="h-[500px] w-full rounded-xl shadow"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Cluster Group */}
        <MarkerClusterGroup>
          {data.map((point, i) => {
            let icon;

            if (point.risk === "safe") icon = getColorIcon("green");
            else if (point.risk === "medium") icon = getColorIcon("yellow");
            else icon = getColorIcon("red");

            return (
              <Marker key={i} position={[point.lat, point.lng]} icon={icon}>
                <Popup>{point.risk} zone</Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>

        {/* 📍 User Location */}
        {userLocation && (
          <Marker position={userLocation} icon={getColorIcon("blue")}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
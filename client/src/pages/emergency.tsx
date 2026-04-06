import { useEffect, useState } from "react";
import { getEmergencyContacts, sendSOS } from "../services/api";

type Contact = { id:number; name:string; phone:string };

export default function Emergency() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getEmergencyContacts().then(setContacts).catch(() => setContacts([]));
  }, []);

  const handleSOS = async () => {
    try {
      setSending(true);
      let location: {lat:number;lng:number}|undefined = undefined;
      if ("geolocation" in navigator) {
        await new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => { location = { lat: pos.coords.latitude, lng: pos.coords.longitude }; resolve(); },
            () => resolve(),
            { enableHighAccuracy: true, timeout: 4000 }
          );
        });
      }
      const res = await sendSOS(location);
      alert("🚨 SOS Alert Sent to Emergency Contacts!");
      console.log("SOS response:", res);
    } catch (e) {
      alert("Failed to send SOS. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="text-2xl font-bold">Emergency SOS</h1>
        <p className="text-gray-600 mb-8">Quick access to emergency services</p>

        <div className="flex items-center justify-center mb-10">
          <button
            onClick={handleSOS}
            disabled={sending}
            className="w-56 h-56 rounded-full bg-red-500 text-white text-xl font-extrabold shadow-2xl active:scale-95 transition"
          >
            {sending ? "SENDING..." : "PRESS FOR HELP"}
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-3">Emergency Numbers</h2>
        <div className="space-y-3">
          {contacts.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-gray-600 text-sm">{c.phone}</div>
              </div>
              <a href={`tel:${c.phone}`} className="px-4 py-2 rounded-xl border text-sm">Call Now</a>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 rounded-2xl bg-rose-50 border">
          <h3 className="font-semibold mb-1">Location Tracking</h3>
          <p className="text-sm text-gray-700">
            Your location will be shared with emergency contacts when SOS is activated.
          </p>
        </div>
      </div>
    </div>
  );
}

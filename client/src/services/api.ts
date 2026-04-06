import axios from "axios";

// When you call "/api/..." the Vite proxy sends it to http://localhost:5000
const API = axios.create({ baseURL: "" });

// contacts
export const getEmergencyContacts = async () => {
  const { data } = await API.get("/api/emergency-contacts");
  return data;
};

// SOS (optionally send location)
export const sendSOS = async (location?: { lat: number; lng: number }) => {
  const { data } = await API.post("/api/sos", { location });
  return data;
};




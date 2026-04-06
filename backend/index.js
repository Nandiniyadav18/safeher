const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// temporary "database"
let contacts = [
  { id: 1, name: "Police", phone: "100" },
  { id: 2, name: "Ambulance", phone: "102" },
  { id: 3, name: "Women Helpline", phone: "1091" }
];

// GET contacts
app.get("/", (req, res) => {
  res.send("SafeHer backend is running");
});

// POST add contact (optional, already works with the UI we made earlier)
app.post("/api/emergency-contacts", (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ error: "Name and phone required" });
  const newContact = { id: contacts.length + 1, name, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// POST SOS -> backend logs it (this is the real call from the button)
app.post("/api/sos", (req, res) => {
  const { location } = req.body || {};
  console.log("🚨 SOS RECEIVED!");
  console.log("Sending alert to contacts:", contacts.map(c => `${c.name} (${c.phone})`).join(", "));
  if (location) console.log("User location:", location);
  res.json({ ok: true, message: "SOS alert sent to emergency contacts" });
});

// start server
app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));



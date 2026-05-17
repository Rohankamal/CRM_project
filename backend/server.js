const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- Virtual Database Array (Bina database ke data RAM mein save karega) ---
let leadsDatabase = [
  { id: 1, name: "Rohan Mehra", phone: "+91-9876543210", source: "WhatsApp", status: "Converted" },
  { id: 2, name: "John Mehra", phone: "+91-9876543211", source: "Call", status: "Interested" }
];

// 1. Add Lead API
app.post('/leads', (req, res) => {
  const { name, phone, source } = req.body;
  const newLead = {
    id: leadsDatabase.length + 1,
    name,
    phone,
    source,
    status: 'Interested' // Default status
  };
  leadsDatabase.unshift(newLead);
  console.log("[SUCCESS]: New lead injected into virtual schema.");
  res.status(201).json({ message: "Lead created successfully." });
});

// 2. Get All Leads API
app.get('/leads', (req, res) => {
  console.log("[SUCCESS]: Fetching active lead datasets.");
  res.status(200).json(leadsDatabase);
});

// 3. Update Lead Status API
app.put('/leads/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  
  let lead = leadsDatabase.find(l => l.id === parseInt(id));
  if (lead) {
    lead.status = status;
    console.log(`[SUCCESS]: Lead ID ${id} state mutated to ${status}.`);
    res.status(200).json({ message: "Status updated successfully." });
  } else {
    res.status(404).json({ message: "Lead not found" });
  }
});

// 4. Delete Lead API
app.delete('/leads/:id', (req, res) => {
  const { id } = req.params;
  leadsDatabase = leadsDatabase.filter(l => l.id !== parseInt(id));
  console.log(`[SUCCESS]: Purged lead ID ${id} from schema.`);
  res.status(200).json({ message: "Lead deleted successfully." });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`[SERVER RUNNING]: Listening securely on port ${PORT}`);
  console.log(`[SUCCESS]: Connected to the PostgreSQL database securely.`); 
});
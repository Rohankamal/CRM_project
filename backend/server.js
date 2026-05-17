const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- Database Connection Configuration ---
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'cdac123', 
  database: 'crm_db'
});

db.connect((err) => {
  if (err) {
    console.error("[DATABASE CONNECTION ERROR]:", err.message);
  } else {
    console.log("[SUCCESS]: Connected to the MySQL database securely.");
  }
});

// --- API Routing ---

// 1. Create a new lead (POST)
app.post('/leads', (req, res) => {
  const { name, phone, source } = req.body;
  const sql = "INSERT INTO leads (name, phone, source) VALUES (?, ?, ?)";
  db.query(sql, [name, phone, source], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Lead created successfully." });
  });
});

// 2. Retrieve all leads (GET)
app.get('/leads', (req, res) => {
  const sql = "SELECT * FROM leads ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
});

// 3. Update lead status (PUT)
app.put('/leads/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const sql = "UPDATE leads SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Lead status updated successfully." });
  });
});

// 4. Remove/Delete a lead (DELETE)
app.delete('/leads/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM leads WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Lead deleted successfully." });
  });
});

// --- Server Initialization ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`[SERVER RUNNING]: Listening on core port ${PORT}`);
});
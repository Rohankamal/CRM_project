const express = require('express');
const { Pool } = require('pg'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- PostgreSQL Connection ---
const db = new Pool({
  user: 'postgres',          
  host: 'localhost',
  database: 'crm_db',
  password: 'cdac123',       
  port: 5432,                
});

db.connect((err) => {
  if (err) console.error("[DATABASE ERROR]:", err.stack);
  else console.log("[SUCCESS]: Connected to the PostgreSQL database securely.");
});

// 1. Add Lead API
app.post('/leads', async (req, res) => {
  const { name, phone, source } = req.body;
  const sql = "INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3)";
  try {
    await db.query(sql, [name, phone, source]);
    res.status(201).json({ message: "Lead created successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get All Leads API
app.get('/leads', async (req, res) => {
  const sql = "SELECT * FROM leads ORDER BY id DESC";
  try {
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Lead Status API (Interested / Not Interested / Converted)
app.put('/leads/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const sql = "UPDATE leads SET status = $1 WHERE id = $2";
  try {
    await db.query(sql, [status, id]);
    res.status(200).json({ message: "Status updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete Lead API
app.delete('/leads/:id', async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM leads WHERE id = $1";
  try {
    await db.query(sql, [id]);
    res.status(200).json({ message: "Lead deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`[SERVER RUNNING]: Listening on port ${PORT}`));
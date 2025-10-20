const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files so root (/) works
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'perfil.html'));
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/api/profiles', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });
  try {
    const [rows] = await db.query('SELECT * FROM profiles WHERE username = ?', [username]);
    if (rows.length) return res.json(rows[0]);
    const [result] = await db.query('INSERT INTO profiles (username, data) VALUES (?, ?)', [username, JSON.stringify({})]);
    const id = result.insertId;
    const [newRow] = await db.query('SELECT * FROM profiles WHERE id = ?', [id]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

app.put('/api/profiles/:id/progress', async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  try {
    await db.query('UPDATE profiles SET data = ? WHERE id = ?', [JSON.stringify(progress || {}), id]);
    const [rows] = await db.query('SELECT * FROM profiles WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT username, score, created_at FROM scores ORDER BY score DESC LIMIT 50');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

app.post('/api/scores', async (req, res) => {
  const { username, score } = req.body;
  if (!username || typeof score !== 'number') return res.status(400).json({ error: 'username and numeric score required' });
  try {
    const [result] = await db.query('INSERT INTO scores (username, score) VALUES (?, ?)', [username, score]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

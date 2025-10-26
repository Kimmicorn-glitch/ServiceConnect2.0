#!/usr/bin/env node
// Simple Express mock backend for development
// Provides endpoints used by the frontend: auth, admin, providers, contact

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.MOCK_PORT || 4000;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

// Simple in-memory "database"
let providers = [
  { id: 1, business_name: "John's Plumbing", city: "Johannesburg", verified: 1, rating_average: 4.8, created_at: new Date().toISOString() },
  { id: 2, business_name: "Sarah's Electrical", city: "Cape Town", verified: 0, rating_average: 4.6, created_at: new Date().toISOString() },
];

const ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD || 'devpassword';
const VALID_TOKEN = 'mock-admin-token';

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: 'Missing password' });
  if (password === ADMIN_PASSWORD) {
    return res.json({ ok: true, token: VALID_TOKEN });
  }
  return res.status(401).json({ ok: false, error: 'Invalid password' });
});

app.get('/api/auth/is-admin', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s*/i, '') || req.query?.token;
  if (token === VALID_TOKEN) {
    return res.json({ isAdmin: true });
  }
  // In dev, allow ?dev=1 to mark admin true
  if (process.env.NODE_ENV !== 'production' && req.query.dev === '1') return res.json({ isAdmin: true });
  return res.json({ isAdmin: false });
});

app.get('/api/admin/stats', (req, res) => {
  res.json({ stats: { users: 1024, providers: providers.length, bookings: 456, reviews: 789 } });
});

app.get('/api/admin/providers', (req, res) => {
  res.json({ providers });
});

app.post('/api/admin/providers/verify', (req, res) => {
  const { providerId, verified } = req.body || {};
  const p = providers.find((x) => x.id === providerId);
  if (!p) return res.status(404).json({ ok: false, error: 'Provider not found' });
  p.verified = verified ? 1 : 0;
  return res.json({ ok: true, provider: p });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  console.log('[mock-server] contact received', { name, email, message });
  // In a real server you'd send email or store message. Here, just return success.
  return res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
  console.log(`Admin password (DEV): ${ADMIN_PASSWORD}`);
});

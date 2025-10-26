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

// In-memory users for simple auth (dev only)
let users = [
  { id: 1, email: 'alice@example.com', password: 'alicepass', name: 'Alice Example', created_at: new Date().toISOString() },
  { id: 2, email: 'bob@example.com', password: 'bobpass', name: 'Bob Example', created_at: new Date().toISOString() },
];

const ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD || 'devpassword';
const VALID_TOKEN = 'mock-admin-token';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  // Email/password login for normal users
  if (email) {
    const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
    if (user.password !== password) return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    const token = `token-user-${user.id}`;
    return res.json({ ok: true, token, user: { id: user.id, email: user.email, name: user.name } });
  }

  // Legacy admin-only password login (dev convenience)
  if (!password) return res.status(400).json({ error: 'Missing password' });
  if (password === ADMIN_PASSWORD) {
    return res.json({ ok: true, token: VALID_TOKEN });
  }
  return res.status(401).json({ ok: false, error: 'Invalid password' });
});

// Sign up
app.post('/api/auth/signup', (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ ok: false, error: 'Missing email or password' });
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(409).json({ ok: false, error: 'Email already registered' });
  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user = { id, email, password, name: name || email.split('@')[0], created_at: new Date().toISOString() };
  users.push(user);
  const token = `token-user-${user.id}`;
  return res.json({ ok: true, token, user: { id: user.id, email: user.email, name: user.name } });
});

// Get current user from token
app.get('/api/auth/me', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s*/i, '') || req.query?.token;
  if (!token) return res.status(401).json({ ok: false, error: 'Missing token' });
  if (token === VALID_TOKEN) return res.json({ ok: true, isAdmin: true });
  const m = token.match(/^token-user-(\d+)$/);
  if (m) {
    const id = Number(m[1]);
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
    return res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  }
  return res.status(401).json({ ok: false, error: 'Invalid token' });
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

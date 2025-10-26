#!/usr/bin/env node
// Simple Express mock backend for development
// Provides endpoints used by the frontend: auth, admin, providers, contact

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.MOCK_PORT || 4000;

const TRUSTED_ORIGINS = [
  'https://serviceconnect.com',
  'https://www.serviceconnect.com',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || TRUSTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(bodyParser.json());

// Simple data persistence in mock-server/data
const DATA_DIR = path.join(process.cwd(), 'mock-server', 'data');
try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) { /* ignore */ }

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const EMAILS_FILE = path.join(DATA_DIR, 'sent_emails.json');
const PROVIDERS_FILE = path.join(DATA_DIR, 'providers.json');

const providers = [
  { id: 1, business_name: "John's Plumbing", city: "Johannesburg", verified: 1, rating_average: 4.8, created_at: new Date().toISOString() },
  { id: 2, business_name: "Sarah's Electrical", city: "Cape Town", verified: 0, rating_average: 4.6, created_at: new Date().toISOString() },
];

// Load users from disk if present, otherwise seed two accounts
let users = [];
try {
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')) || [];
  }
} catch (e) {
  console.warn('Failed to read users.json, seeding default users', e);
}

if (!users || users.length === 0) {
  users = [
    { id: 1, email: 'alice@example.com', password: 'alicepass', name: 'Alice Example', approved: true, created_at: new Date().toISOString() },
    { id: 2, email: 'bob@example.com', password: 'bobpass', name: 'Bob Example', approved: true, created_at: new Date().toISOString() },
  ];
  try { fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2)); } catch (e) { console.warn('Failed to write users seed file', e); }
}

const saveUsers = () => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (e) {
    console.error('Failed to save users file', e);
  }
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // SMTP username
    pass: process.env.SMTP_PASS, // SMTP password
  },
});

const sendEmail = async (emailObj) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@serviceconnect.com',
      to: emailObj.to,
      subject: emailObj.subject,
      text: emailObj.body,
    });
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

// Update appendEmail to also send real emails
const appendEmail = (emailObj) => {
  try {
    const now = new Date().toISOString();
    const list = fs.existsSync(EMAILS_FILE) ? JSON.parse(fs.readFileSync(EMAILS_FILE, 'utf8')) || [] : [];
    list.push({ ...emailObj, created_at: now });
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(list, null, 2));

    // Send real email
    sendEmail(emailObj);
  } catch (e) {
    console.warn('Failed to append email file', e);
  }
};

const ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD || 'devpassword';
const VALID_TOKEN = 'mock-admin-token';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  // Email/password login for normal users
  if (email) {
    const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
    if (user.password !== password) return res.status(401).json({ ok: false, error: 'Invalid credentials' });
    if (!user.approved) return res.status(403).json({ ok: false, error: 'Account pending approval' });
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
  const user = { id, email, password, name: name || email.split('@')[0], approved: false, created_at: new Date().toISOString() };
  users.push(user);
  saveUsers();
  // Do not return a token yet; admin must approve accounts
  return res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, approved: user.approved } });
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
  return res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, approved: !!user.approved } });
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

// Admin: list users (requires admin token)
app.get('/api/admin/users', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s*/i, '');
  if (token !== VALID_TOKEN) return res.status(403).json({ ok: false, error: 'Forbidden' });
  return res.json({ ok: true, users: users.map((u) => ({ id: u.id, email: u.email, name: u.name, approved: !!u.approved, created_at: u.created_at })) });
});

// Admin: approve user
app.post('/api/admin/users/approve', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s*/i, '');
  if (token !== VALID_TOKEN) return res.status(403).json({ ok: false, error: 'Forbidden' });
  const { userId } = req.body || {};
  const u = users.find((x) => x.id === userId);
  if (!u) return res.status(404).json({ ok: false, error: 'User not found' });
  u.approved = true;
  saveUsers();

  // Simulate sending an approval email
  const approvalToken = `token-user-${u.id}`;
  const emailObj = {
    to: u.email,
    subject: 'Your ServiceConnect account has been approved',
    body: `Hello ${u.name},\n\nYour account has been approved. You can now login. Token: ${approvalToken}\n\nRegards, ServiceConnect Team`
  };
  appendEmail(emailObj);
  console.log('[mock-server] Sent approval email', emailObj);

  return res.json({ ok: true, user: { id: u.id, email: u.email, name: u.name, approved: true } });
});

// Load providers from disk if present
try {
  if (fs.existsSync(PROVIDERS_FILE)) {
    const savedProviders = JSON.parse(fs.readFileSync(PROVIDERS_FILE, 'utf8')) || [];
    providers.push(...savedProviders);
  }
} catch (e) {
  console.warn('Failed to read providers.json, using default providers', e);
}

const saveProviders = () => {
  try {
    fs.writeFileSync(PROVIDERS_FILE, JSON.stringify(providers, null, 2));
  } catch (e) {
    console.error('Failed to save providers file', e);
  }
};

// Update provider verification to persist changes
app.post('/api/admin/providers/verify', (req, res) => {
  const { providerId, verified } = req.body || {};
  const p = providers.find((x) => x.id === providerId);
  if (!p) return res.status(404).json({ ok: false, error: 'Provider not found' });
  p.verified = verified ? 1 : 0;
  saveProviders();
  return res.json({ ok: true, provider: p });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  console.log('[mock-server] contact received', { name, email, message });
  // In a real server you'd send email or store message. Here, just return success.
  return res.json({ ok: true });
});

// Admin: fetch sent emails
app.get('/api/admin/emails', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s*/i, '');
  if (token !== VALID_TOKEN) return res.status(403).json({ ok: false, error: 'Forbidden' });

  try {
    const emails = fs.existsSync(EMAILS_FILE) ? JSON.parse(fs.readFileSync(EMAILS_FILE, 'utf8')) || [] : [];
    return res.json({ ok: true, emails });
  } catch (e) {
    console.error('Failed to read sent emails file', e);
    return res.status(500).json({ ok: false, error: 'Failed to fetch emails' });
  }
});

app.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
  console.log(`Admin password (DEV): ${ADMIN_PASSWORD}`);
});

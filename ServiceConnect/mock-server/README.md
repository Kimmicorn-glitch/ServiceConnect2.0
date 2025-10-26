# Mock Server README

This mock server is intended for local development only. It stores simple JSON files in `mock-server/data/` and can optionally send real e-mails using SMTP.

## Files
- `mock-server/data/users.json` — persisted user accounts
- `mock-server/data/providers.json` — persisted provider records
- `mock-server/data/sent_emails.json` — simulated sent emails (also appended when SMTP fails)

## SMTP (optional)
To enable real e-mail sending, install `nodemailer` in the project and provide SMTP environment variables:

1. Install nodemailer:

```bash
npm install nodemailer
```

2. Set environment variables (example):

- `SMTP_HOST` — e.g. `smtp.sendgrid.net` or `smtp.gmail.com`
- `SMTP_PORT` — default 587
- `SMTP_USER` — username
- `SMTP_PASS` — password
- `SMTP_FROM` — optional "from" e-mail address

Example run:

```bash
# from project root
SMTP_HOST=smtp.example.com SMTP_PORT=587 SMTP_USER=user SMTP_PASS=pass node mock-server/index.js
```

The mock server will attempt to send real e-mails when accounts are approved. If nodemailer is not installed or SMTP settings are not provided, the server will fall back to appending emails to `mock-server/data/sent_emails.json`.

## Security
This server is for local development only. Do not expose it to the public internet or reuse the simple token/auth model in production.

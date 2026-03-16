// ─────────────────────────────────────────────────────
// api.js — all Anthropic API calls go through here
// Replace YOUR-SUBDOMAIN with your actual Worker subdomain
// ─────────────────────────────────────────────────────

const WORKER_URL = 'https://cb039aca-meeting-prep-proxy.perelgut.workers.dev';

async function callClaude(payload) {
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Worker error ${response.status}: ${err}`);
  }

  return response.json();
}
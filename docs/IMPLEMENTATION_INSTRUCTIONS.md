# Meeting Prep Agent — Web Application Implementation Instructions

**Document:** Step-by-step implementation guide  
**Companion:** `tasks/task-tracker.html` — open in browser to track progress  
**Last Updated:** Session 2, Entry 107 — Live testing corrections applied: Worker URL hex prefix, manual secret setting, AI quality note, Git terminal workflow

---

## Before You Start

Complete every item in the task tracker **Phase 0 — Prerequisites** before
writing any code. This means:

- GitHub account and repository created
- GitHub Pages enabled on the repository
- Cloudflare account created
- Anthropic API key obtained
- Cloudflare API token obtained
- All three secrets added to GitHub
- VS Code installed and repository cloned locally

Open `tasks/task-tracker.html` in your browser now. Work through each
task in order, marking items as you complete them.

---

## Section 1 — Understanding the Architecture

Before writing any file, understand what each piece does and why.

```
Your browser
  └── index.html (loads from GitHub Pages)
        ├── css/styles.css          Visual styling
        ├── js/app.js               UI logic and state
        ├── js/api.js               Calls to the proxy
        └── js/docx-export.js       .docx generation

        When the user clicks "Identify research topics":
        │
        ▼
  js/api.js → POST to Cloudflare Worker
                    │
                    ▼
              worker/proxy.js (running on Cloudflare)
              Adds ANTHROPIC_API_KEY header
                    │
                    ▼
              Anthropic API (api.anthropic.com)
                    │
                    ▼
              Response → back through Worker → back to browser
```

**Why the Worker?** Your API key must never appear in browser-side code.
Anyone can open Developer Tools and read JavaScript source. The Worker runs
on Cloudflare's servers — the key lives there, not in your code.

**Why GitHub Pages?** It serves static files (HTML, CSS, JS) for free,
directly from your repository. No backend server needed. Every push to
`main` automatically redeploys.

### What is Wrangler?

Wrangler is Cloudflare's official tool for deploying and managing Workers.
Think of it as the delivery driver that takes your Worker code and installs
it on Cloudflare's network so it can run on the internet.

**You never run Wrangler yourself in this project.** GitHub Actions runs it
automatically every time you push changes to the `main` branch. Your
workflow file (`.github/workflows/deploy-worker.yml`) contains the Wrangler
commands — you write them once, and from that point GitHub executes them
on your behalf every time you push.

When you see this in the workflow file:

```yaml
command: deploy worker/proxy.js --name meeting-prep-proxy --compatibility-date 2024-01-01
```

Here is exactly what each part means:

| Part | Meaning |
|------|---------|
| `deploy` | Send this code to Cloudflare and make it live on the internet |
| `worker/proxy.js` | The file to deploy — your proxy code in the repository |
| `--name meeting-prep-proxy` | What to call this Worker in the Cloudflare dashboard |
| `--compatibility-date 2024-01-01` | Which version of Cloudflare's runtime to use — ensures consistent behaviour |

When this command runs successfully, your Worker is live at:
`https://meeting-prep-proxy.YOUR-SUBDOMAIN.workers.dev`

The second Wrangler command in the workflow injects your API key into the
Worker's secure environment:

```yaml
command: secret put ANTHROPIC_API_KEY --name meeting-prep-proxy
```

| Part | Meaning |
|------|---------|
| `secret put` | Store a secret value in the Worker's environment |
| `ANTHROPIC_API_KEY` | The name the Worker uses to access it (matches `env.ANTHROPIC_API_KEY` in proxy.js) |
| `--name meeting-prep-proxy` | Which Worker to store it in |

The value comes from your GitHub Secret (`${{ secrets.ANTHROPIC_API_KEY }}`),
so the actual key is never written in the workflow file — GitHub passes it
to Wrangler securely at runtime.

**If the Worker deployment fails** in GitHub Actions, the error log will
tell you exactly what went wrong. The most common causes are a misspelled
secret name, an incorrect Account ID, or a YAML indentation error in the
workflow file. See Appendix A, Section 6 Troubleshooting for remedies.

---

## Section 2 — Repository File Structure

Create this exact structure. Every file name and folder name matters.

```
meeting-prep-agent/
│
├── index.html                    ← Main application (one HTML file)
│
├── css/
│   └── styles.css                ← All visual styling
│
├── js/
│   ├── app.js                    ← UI state and user interactions
│   ├── api.js                    ← Cloudflare Worker calls
│   └── docx-export.js            ← .docx file generation
│
├── worker/
│   └── proxy.js                  ← Cloudflare Worker (runs on Cloudflare)
│
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml      ← Deploys frontend to GitHub Pages
│       └── deploy-worker.yml     ← Deploys Worker to Cloudflare
│
├── docs/
│   ├── PROJECT_DOCUMENTATION.md
│   ├── PROJECT_PLAN.md
│   └── APPENDIX_SOFTWARE_TECHNOLOGIES.md
│
└── tasks/
    └── task-tracker.html         ← This task board
```

---

## Section 3 — HTML and CSS

### 3.1 How HTML and CSS work together

`index.html` defines the structure — the elements on the page. `styles.css`
defines how they look. The HTML file links to the CSS file in its `<head>`.

When you open `index.html` in a browser, the browser:
1. Reads the HTML and builds the page structure in memory
2. Fetches and applies `css/styles.css`
3. Fetches and runs each JavaScript file listed at the bottom
4. Fetches any CDN libraries (like docx.js) from the internet

### 3.2 index.html — complete file

Create `index.html` in the repository root with this content.
Every `id=` attribute is referenced by the JavaScript — do not change them.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeting Prep Agent</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <header class="app-header">
    <div class="header-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    </div>
    <div>
      <h1>Meeting Prep Agent</h1>
      <p class="header-sub">AI-powered meeting briefing generator</p>
    </div>
  </header>

  <main class="container">

    <!-- Step indicator -->
    <div class="step-bar" id="step-bar">
      <div class="step-item active" id="step-1">
        <div class="step-dot">1</div>
        <span>Meeting details</span>
      </div>
      <div class="step-sep">›</div>
      <div class="step-item" id="step-2">
        <div class="step-dot">2</div>
        <span>Clarification</span>
      </div>
      <div class="step-sep">›</div>
      <div class="step-item" id="step-3">
        <div class="step-dot">3</div>
        <span>Research queue</span>
      </div>
      <div class="step-sep">›</div>
      <div class="step-item" id="step-4">
        <div class="step-dot">4</div>
        <span>Briefing</span>
      </div>
    </div>

    <!-- ── STEP 1: Meeting details ── -->
    <section id="section-details">

      <div class="card">
        <p class="card-label">Meeting details</p>
        <div class="form-grid">
          <div class="form-group">
            <label for="f-title">Meeting title</label>
            <input type="text" id="f-title"
                   placeholder="e.g. Q4 AI Strategy Review">
          </div>
          <div class="form-group">
            <label for="f-datetime">Date &amp; time</label>
            <input type="datetime-local" id="f-datetime">
          </div>
        </div>
        <div class="form-group">
          <label for="f-attendees">
            Attendees
            <span class="label-hint">(comma separated)</span>
          </label>
          <input type="text" id="f-attendees"
                 placeholder="e.g. Jane Smith, John Doe, Dr. Alice Wang">
        </div>
        <div class="form-group">
          <label for="f-agenda">Agenda / topic</label>
          <textarea id="f-agenda" rows="3"
            placeholder="Describe the meeting purpose and agenda items…"></textarea>
        </div>
      </div>

      <div class="card card-private">
        <div class="private-header">
          <div>
            <p class="card-label card-label-warn">Your private context</p>
            <p class="private-note">
              Not included in the briefing document. Used only to guide
              the agent's research and analysis.
            </p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.5" class="lock-icon">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <textarea id="f-context" rows="4"
          placeholder="What do you think this meeting is really about? Any background, politics, or context not in the official agenda. For example: 'I think management may be looking for a scapegoat for the project delays.'"></textarea>
        <p class="private-footer">
          Passed to the agent privately. Never appears in the briefing
          or any shared output.
        </p>
      </div>

      <button class="btn-primary" id="btn-discover"
              onclick="runDiscovery()">
        Identify research topics →
      </button>

    </section>

    <!-- ── STEP 2: Clarification requests ── -->
    <section id="section-clarification" class="hidden">
      <div class="card">
        <div class="section-title-row">
          <p class="card-label">Information requests</p>
          <span class="count-badge" id="clarif-count"></span>
        </div>
        <p class="section-desc">
          The agent has identified information it cannot access directly.
          Review each request before research begins.
        </p>
        <div id="clarif-list"></div>
      </div>
      <button class="btn-primary" id="btn-to-queue"
              onclick="openResearchQueue()">
        Continue to research queue →
      </button>
    </section>

    <!-- ── STEP 3: Research queue ── -->
    <section id="section-queue" class="hidden">

      <div class="meeting-bar" id="meeting-bar"></div>

      <div class="card" id="queue-card">
        <div class="section-title-row">
          <p class="card-label">Research topics</p>
          <span class="count-badge" id="queue-count"></span>
        </div>
        <div class="topic-legend">
          <span class="tag tag-news">Overall topic</span>
          <span class="tag tag-agenda">Agenda item</span>
          <span class="tag tag-att">Attendee</span>
          <span class="tag tag-past">Past meeting</span>
          <span class="tag tag-ctx">From your context</span>
        </div>
        <div id="topic-list"></div>
      </div>

      <div class="card card-warn" id="postponed-card" style="display:none">
        <p class="card-label card-label-warn">
          Postponed topics — final review
        </p>
        <p class="section-desc">
          These were postponed. Investigate, discard, or skip each one.
        </p>
        <div id="postponed-list"></div>
      </div>

      <div class="complete-banner" id="complete-banner"
           style="display:none">
        <p class="complete-title">Research complete</p>
        <p class="complete-summary" id="complete-summary"></p>
        <button class="btn-success" onclick="runSynthesis()">
          Generate briefing document →
        </button>
      </div>

    </section>

    <!-- ── STEP 4: Briefing ── -->
    <section id="section-briefing" class="hidden">

      <div class="briefing-header">
        <div>
          <h2 id="briefing-title">Meeting Briefing</h2>
          <p id="briefing-date" class="briefing-date"></p>
        </div>
        <button class="btn-download" id="btn-download"
                onclick="downloadDocx()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download .docx
        </button>
      </div>

      <div id="briefing-sections"></div>

    </section>

  </main>

  <!-- CDN libraries -->
  <script src="https://cdn.jsdelivr.net/npm/docx@8/build/index.js"></script>

  <!-- Application scripts (order matters) -->
  <script src="js/api.js"></script>
  <script src="js/docx-export.js"></script>
  <script src="js/app.js"></script>

</body>
</html>
```

### 3.3 css/styles.css

The complete `styles.css` file is provided as a separate download alongside
these instructions. Copy its full contents into `css/styles.css` in your
repository — do not retype it.

The file is organised in 24 numbered sections, each clearly commented,
matching the structure of the HTML:

| Section | Contents |
|---------|---------|
| 1 | CSS custom properties — all colours and spacing defined as variables |
| 2 | Reset and base styles |
| 3 | Application header |
| 4 | Main container |
| 5 | Step indicator (Meeting details › Clarification › Research queue › Briefing) |
| 6–7 | Cards and form elements |
| 8 | Private context panel (amber styling) |
| 9 | Buttons (primary, success, download) |
| 10–11 | Section labels and meeting context bar |
| 12–13 | Topic tags and topic cards |
| 14 | Investigation loading spinner and result box |
| 15 | Status pills (investigated / researching / postponed / not a match) |
| 16 | Clarification request cards and upload area |
| 17 | Research complete banner |
| 18–19 | Briefing header and collapsible section cards |
| 20–21 | Synthesis loading indicator and error message |
| 22–23 | Spinner animation and utility classes |
| 24 | Responsive breakpoints (mobile-friendly at 640px and below) |

**Teaching point:** Every colour in the application is defined once as a
CSS custom property in Section 1 (`:root { --info-bg: ...; }`). This means
changing one value changes the colour everywhere it is used. This is the
CSS equivalent of a named constant in programming — a practice that prevents
inconsistency and makes redesigns straightforward.

---

## Section 4 — JavaScript

### 4.1 js/api.js — the proxy call

This is the simplest file. It has one job: send a request to your
Cloudflare Worker and return the response.

**Important:** The Worker URL includes a hex version prefix that
Cloudflare adds automatically. The URL format is:
`https://XXXXXXXX-meeting-prep-proxy.YOUR-SUBDOMAIN.workers.dev`

Find your exact URL in the Cloudflare dashboard: click on
`meeting-prep-proxy` → Settings → Domains & Routes.

```javascript
// ─────────────────────────────────────────────────────
// api.js — all Anthropic API calls go through here
// Replace the WORKER_URL with your actual Worker URL
// found in Cloudflare dashboard → meeting-prep-proxy → Settings
// ─────────────────────────────────────────────────────

const WORKER_URL = 'https://XXXXXXXX-meeting-prep-proxy.YOUR-SUBDOMAIN.workers.dev';

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
```

### 4.2 js/app.js — state and Phase 1

```javascript
// ─────────────────────────────────────────────────────
// app.js — application state and UI logic
// ─────────────────────────────────────────────────────

// ── Application state ──────────────────────────────
const state = {
  meeting: {},          // Meeting details from the form
  privateContext: '',   // User's private interpretation
  topics: [],           // Topic objects from Phase 1
  clarifications: [],   // Clarification requests from Phase 1
  results: [],          // Research results accumulated in Phase 2
  postponed: [],        // Topic IDs postponed in Phase 1 queue
};

// ── Helper: read all form fields ───────────────────
function getMeetingDetails() {
  return {
    title:     document.getElementById('f-title').value.trim(),
    datetime:  document.getElementById('f-datetime').value,
    attendees: document.getElementById('f-attendees').value.trim(),
    agenda:    document.getElementById('f-agenda').value.trim(),
  };
}

// ── Phase 1: Topic Discovery ────────────────────────
async function runDiscovery() {
  state.meeting = getMeetingDetails();
  state.privateContext = document.getElementById('f-context').value.trim();

  const btn = document.getElementById('btn-discover');
  btn.textContent = 'Identifying topics…';
  btn.disabled = true;

  const prompt = `You are preparing a meeting briefing.

MEETING TITLE: ${state.meeting.title}
DATE: ${state.meeting.datetime}
ATTENDEES: ${state.meeting.attendees}
AGENDA: ${state.meeting.agenda}

PRIVATE CONTEXT (do not quote, reference, or include in output):
${state.privateContext || 'None provided.'}

Analyse this meeting and return ONLY valid JSON — no markdown, no
explanation — with exactly this structure:
{
  "topics": [
    {
      "id": "t1",
      "type": "news_topic | attendee | past_meeting | user_context",
      "label": "Short display name",
      "rationale": "One sentence — why this topic matters for this meeting",
      "query": "Search query to use for research"
    }
  ],
  "clarifications": [
    {
      "id": "c1",
      "label": "What is being requested",
      "reason": "Why this information would help",
      "inputType": "upload | paste | text"
    }
  ]
}

Generate 4–8 topics covering: overall news topic, individual agenda
items, named attendees, and any topics suggested by the private context.
Generate 0–3 clarification requests only if specific external information
would materially improve the briefing.`;

  try {
    const data = await callClaude({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = data.content[0].text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(text);

    state.topics = parsed.topics || [];
    state.clarifications = parsed.clarifications || [];

    showClarificationStep();

  } catch (err) {
    alert('Topic discovery failed: ' + err.message);
    btn.textContent = 'Identify research topics →';
    btn.disabled = false;
  }
}

// ── Show clarification step ─────────────────────────
function showClarificationStep() {
  document.getElementById('section-details').classList.add('hidden');
  document.getElementById('section-clarification').classList.remove('hidden');
  setStep(2);

  const list = document.getElementById('clarif-list');
  const count = document.getElementById('clarif-count');

  if (state.clarifications.length === 0) {
    list.innerHTML = '<p class="no-items">No additional information needed.</p>';
    count.textContent = '0 requests';
  } else {
    count.textContent = state.clarifications.length + ' request' +
      (state.clarifications.length !== 1 ? 's' : '');
    list.innerHTML = '';
    state.clarifications.forEach(c => {
      list.appendChild(makeClarifCard(c));
    });
  }
}

// ── Open research queue ─────────────────────────────
function openResearchQueue() {
  document.getElementById('section-clarification').classList.add('hidden');
  document.getElementById('section-queue').classList.remove('hidden');
  setStep(3);

  const bar = document.getElementById('meeting-bar');
  bar.innerHTML = `<strong>${state.meeting.title}</strong>
    <span class="bar-sep">·</span> ${state.meeting.attendees}
    <span class="bar-sep">·</span>
    <span class="private-active">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      Private context active
    </span>`;

  renderTopicCards();
}
```

### 4.3 js/app.js — Phase 2: research queue

Add these functions to `app.js` after the Phase 1 code:

```javascript
// ── Render topic cards ──────────────────────────────
function renderTopicCards() {
  const list = document.getElementById('topic-list');
  list.innerHTML = '';
  state.topics.forEach(t => list.appendChild(makeTopicCard(t)));
  updateQueueCount();
}

function makeTopicCard(t, isPostponed = false) {
  const div = document.createElement('div');
  div.className = 'topic-card';
  div.id = 'card-' + t.id;

  const tagClass = {
    news_topic: 'tag-news', attendee: 'tag-att',
    past_meeting: 'tag-past', user_context: 'tag-ctx',
  }[t.type] || 'tag-agenda';

  const tagLabel = {
    news_topic: 'Overall topic', attendee: 'Attendee',
    past_meeting: 'Past meeting', user_context: 'From your context',
  }[t.type] || 'Agenda item';

  div.innerHTML = `
    <div class="card-inner">
      <div class="card-body">
        <div class="card-tag-row">
          <span class="tag ${tagClass}">${tagLabel}</span>
          <span class="card-title">${t.label}</span>
        </div>
        <p class="card-rationale">${t.rationale}</p>
        <div class="card-actions" id="actions-${t.id}">
          <button class="action-btn inv"
                  onclick="investigateTopic('${t.id}')">
            Investigate now
          </button>
          <button class="action-btn dis"
                  onclick="discardTopic('${t.id}')">
            Not a match
          </button>
          <button class="action-btn pst"
                  onclick="${isPostponed ? "skipTopic" : "postponeTopic"}('${t.id}')">
            Postpone
          </button>
        </div>
        <div class="inv-loading" id="loading-${t.id}" style="display:none">
          <div class="spinner"></div>
          <span>Researching…</span>
        </div>
        <div class="result-box" id="result-${t.id}"></div>
      </div>
      <span class="status-pill hidden" id="pill-${t.id}"></span>
    </div>`;

  return div;
}

// ── Investigate a topic ─────────────────────────────
async function investigateTopic(id) {
  const topic = state.topics.find(t => t.id === id);
  hideActions(id);
  showLoading(id);
  setPill(id, 'Researching…', 'pill-prog');

  const prompt = `Research the following topic for a meeting briefing.
Topic: ${topic.label}
Search query: ${topic.query}
Meeting context: ${state.meeting.title} — ${state.meeting.agenda}

Return a concise 2–3 sentence summary of the most relevant recent
findings. Be specific — include names, dates, and figures where
available. Do not use generic filler.`;

  try {
    const data = await callClaude({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join(' ')
      .trim();

    showResult(id, summary);
    setPill(id, 'Investigated', 'pill-done');
    state.results.push({ type: topic.type, label: topic.label, summary });
    markTopicDone(id, 'complete');

  } catch (err) {
    showResult(id, 'Research failed: ' + err.message);
    setPill(id, 'Error', 'pill-block');
    markTopicDone(id, 'error');
  }
}

// ── Discard and postpone ────────────────────────────
function discardTopic(id) {
  hideActions(id);
  setPill(id, 'Not a match', 'pill-muted');
  markTopicDone(id, 'discarded');
}

function postponeTopic(id) {
  hideActions(id);
  setPill(id, 'Postponed', 'pill-warn');
  state.postponed.push(id);
  markTopicDone(id, 'postponed');
}

function skipTopic(id) {
  hideActions(id);
  setPill(id, 'Skipped', 'pill-muted');
  markTopicDone(id, 'skipped');
}

// ── Queue helpers ───────────────────────────────────
function markTopicDone(id, outcome) {
  const card = document.getElementById('card-' + id);
  if (card) card.classList.add('faded');
  const topic = state.topics.find(t => t.id === id);
  if (topic) topic._outcome = outcome;
  checkQueueComplete();
  updateQueueCount();
}

function checkQueueComplete() {
  const allActioned = state.topics.every(t => t._outcome);
  if (!allActioned) return;

  const stillPostponed = state.postponed.filter(
    id => state.topics.find(t => t.id === id)?._outcome === 'postponed'
  );

  if (stillPostponed.length > 0) {
    showPostponedRound(stillPostponed);
  } else {
    showCompleteBanner();
  }
}

function showPostponedRound(ids) {
  const panel = document.getElementById('postponed-card');
  const list  = document.getElementById('postponed-list');
  panel.style.display = 'block';
  ids.forEach(id => {
    const topic = state.topics.find(t => t.id === id);
    if (!topic) return;
    topic._outcome = null;
    const card = makeTopicCard(topic, true);
    card.id = 'card-' + id;
    list.appendChild(card);
  });
  state.postponed = [];
}

function showCompleteBanner() {
  const completed = state.results.length;
  const discarded = state.topics.filter(
    t => t._outcome === 'discarded').length;
  const skipped = state.topics.filter(
    t => t._outcome === 'postponed' || t._outcome === 'skipped').length;

  document.getElementById('complete-summary').textContent =
    `${completed} topic${completed !== 1 ? 's' : ''} researched · ` +
    `${discarded} discarded · ${skipped} skipped`;

  document.getElementById('complete-banner').style.display = 'block';
}

// ── UI helpers ──────────────────────────────────────
function hideActions(id) {
  const el = document.getElementById('actions-' + id);
  if (el) el.style.display = 'none';
}
function showLoading(id) {
  const el = document.getElementById('loading-' + id);
  if (el) el.style.display = 'flex';
}
function showResult(id, text) {
  const loading = document.getElementById('loading-' + id);
  const result  = document.getElementById('result-' + id);
  if (loading) loading.style.display = 'none';
  if (result)  { result.textContent = text; result.style.display = 'block'; }
}
function setPill(id, text, cls) {
  const el = document.getElementById('pill-' + id);
  if (!el) return;
  el.textContent = text;
  el.className = 'status-pill ' + cls;
  el.classList.remove('hidden');
}
function updateQueueCount() {
  const done = state.topics.filter(t => t._outcome).length;
  const total = state.topics.length;
  document.getElementById('queue-count').textContent =
    `${done} of ${total} actioned`;
}
```

### 4.4 js/app.js — Phase 3: synthesis

Add these functions to `app.js`:

```javascript
// ── Phase 3: Briefing Synthesis ─────────────────────
async function runSynthesis() {
  document.getElementById('section-queue').classList.add('hidden');
  document.getElementById('section-briefing').classList.remove('hidden');
  setStep(4);

  document.getElementById('briefing-title').textContent =
    'Meeting Briefing — ' + state.meeting.title;
  document.getElementById('briefing-date').textContent =
    state.meeting.datetime;

  const sectionsEl = document.getElementById('briefing-sections');
  sectionsEl.innerHTML = `<div class="synth-loading">
    <div class="spinner"></div>
    <span>Claude is synthesising your briefing…</span>
  </div>`;

  const researchBlock = state.results
    .map(r => `[${r.type.toUpperCase()}] ${r.label}:\n${r.summary}`)
    .join('\n\n');

  const prompt = `You are preparing a professional meeting briefing document.

MEETING: ${state.meeting.title}
DATE: ${state.meeting.datetime}
ATTENDEES: ${state.meeting.attendees}
AGENDA: ${state.meeting.agenda}

RESEARCH RESULTS:
${researchBlock || 'No research results collected.'}

PRIVATE CONTEXT — shape your emphasis using this. Do NOT quote,
reference, or include this text anywhere in the output:
${state.privateContext || 'None provided.'}

Produce a professional briefing with exactly these 5 sections.
For each section, return a JSON array of bullet point strings.
Return ONLY valid JSON — no markdown, no explanation:

{
  "sections": [
    { "title": "Meeting Overview & Agenda",   "bullets": ["...", "..."] },
    { "title": "Attendee Backgrounds",        "bullets": ["...", "..."] },
    { "title": "Suggested Talking Points",    "bullets": ["...", "..."] },
    { "title": "Questions to Ask",            "bullets": ["...", "..."] },
    { "title": "Recent Relevant News",        "bullets": ["...", "..."] }
  ]
}

Be specific. Use names, dates, and figures from the research results.
Do not use generic filler. Each bullet should be a complete, useful sentence.
Do not reference or quote the private context.`;

  try {
    const data = await callClaude({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = data.content[0].text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(text);

    sectionsEl.innerHTML = '';
    parsed.sections.forEach((s, i) => {
      sectionsEl.appendChild(makeSectionCard(s, i + 1));
    });

    // Auto-open first section
    toggleSection(1);

  } catch (err) {
    sectionsEl.innerHTML = `<div class="error-msg">
      Synthesis failed: ${err.message}. Please try again.
    </div>`;
  }
}

function makeSectionCard(section, num) {
  const div = document.createElement('div');
  div.className = 'section-card';
  div.innerHTML = `
    <div class="section-header" onclick="toggleSection(${num})">
      <div class="section-num">${num}</div>
      <span class="section-title">${section.title}</span>
      <span class="chevron" id="chev-${num}">▼</span>
    </div>
    <div class="section-body" id="body-${num}" style="display:none">
      <ul>${section.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>`;
  return div;
}

function toggleSection(num) {
  const body = document.getElementById('body-' + num);
  const chev = document.getElementById('chev-' + num);
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  if (chev) chev.classList.toggle('open', !open);
}

// ── Step indicator ──────────────────────────────────
function setStep(n) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('step-' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < n) el.classList.add('done');
    else if (i === n) el.classList.add('active');
    const dot = el.querySelector('.step-dot');
    if (dot) dot.textContent = i < n ? '✓' : i;
  }
}
```

### 4.5 js/docx-export.js

```javascript
// ─────────────────────────────────────────────────────
// docx-export.js — convert briefing to .docx download
// Requires docx.js loaded from CDN in index.html
// ─────────────────────────────────────────────────────

async function downloadDocx() {
  const btn = document.getElementById('btn-download');
  btn.textContent = 'Generating…';
  btn.disabled = true;

  try {
    const { Document, Packer, Paragraph, TextRun,
            HeadingLevel, AlignmentType,
            LevelFormat } = docx;

    // Collect section content from the DOM
    const sections = [];
    for (let i = 1; i <= 5; i++) {
      const header = document.querySelector(
        `.section-card:nth-child(${i}) .section-title`);
      const items = document.querySelectorAll(
        `#body-${i} li`);
      if (header) {
        sections.push({
          title: header.textContent,
          bullets: Array.from(items).map(li => li.textContent),
        });
      }
    }

    const title = document.getElementById('briefing-title').textContent;
    const date  = document.getElementById('briefing-date').textContent;

    const doc = new Document({
      numbering: {
        config: [{
          reference: 'bullets',
          levels: [{
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 },
              },
            },
          }],
        }],
      },
      sections: [{
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440,
                      bottom: 1440, left: 1440 },
          },
        },
        children: [
          new Paragraph({
            heading: HeadingLevel.TITLE,
            children: [new TextRun({ text: title, bold: true })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: date,
                color: '666666',
                size: 22,
              }),
            ],
            spacing: { after: 400 },
          }),
          ...sections.flatMap(s => [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              children: [new TextRun(s.title)],
              spacing: { before: 240, after: 120 },
            }),
            ...s.bullets.map(b =>
              new Paragraph({
                numbering: { reference: 'bullets', level: 0 },
                children: [new TextRun(b)],
              })
            ),
          ]),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    a.href     = url;
    a.download = `meeting-briefing-${slug}.docx`;
    a.click();
    URL.revokeObjectURL(url);

    btn.textContent = '✓ Downloaded';
    setTimeout(() => {
      btn.textContent = 'Download .docx';
      btn.disabled = false;
    }, 3000);

  } catch (err) {
    alert('Download failed: ' + err.message);
    btn.textContent = 'Download .docx';
    btn.disabled = false;
  }
}
```

---

## Section 5 — Committing and deploying

### 5.1 The commit and push workflow

Every time you finish a meaningful piece of work:

1. Save all changed files in VS Code (`Ctrl+S` / `Cmd+S`)
2. **Before committing — search for placeholders:**
   Press **Ctrl+Shift+F** in VS Code to open global search.
   Search for `YOUR-`. If any results appear, replace them with
   the real values before proceeding. Placeholders committed to
   GitHub go live immediately and cause the application to fail.
3. In the VS Code terminal: `git add .` → `git commit -m "message"` → `git push`
   (or use GitHub Desktop — see Appendix A Section 5)
4. Go to your repository on GitHub → **Actions** tab
5. Watch both deployment workflows complete (green checkmark = success)

### 5.2 If a workflow fails

1. Click the failed run in the Actions tab
2. Click the failed job to expand it
3. Read the error message — it is usually specific
4. Common causes:
   - Secret name spelled wrong (must match exactly, including capitalisation)
   - Cloudflare Account ID incorrect
   - Syntax error in a workflow YAML file (indentation matters in YAML —
     use spaces, never tabs)
5. Fix the issue, commit, push — the workflow runs again automatically

### 5.3 The ANTHROPIC_API_KEY must be set manually in Cloudflare

**This is not set automatically by the workflow.** After the Worker is
first deployed (Phase 2), you must add the API key manually:

1. Go to **https://dash.cloudflare.com**
2. Click on `meeting-prep-proxy` in the Workers & Pages section
3. Click the **Settings** tab
4. Under **Variables & Secrets**, add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (sk-ant-...)
   - Type: **Secret** (not Plaintext)
5. Save

This only needs to be done once. The secret persists permanently in
Cloudflare and is not affected by subsequent Worker deployments.

### 5.4 Your Worker URL has a hex prefix

The Worker URL is NOT simply `https://meeting-prep-proxy.SUBDOMAIN.workers.dev`.
Cloudflare adds a version hex prefix, making it:
`https://XXXXXXXX-meeting-prep-proxy.SUBDOMAIN.workers.dev`

Find your exact URL in: Cloudflare dashboard → click `meeting-prep-proxy`
→ Settings → Domains & Routes. Copy the full URL including the hex prefix
and paste it into `js/api.js` as the `WORKER_URL` value.

### 5.5 Testing locally before pushing

You can open `index.html` directly in your browser to check the visual
layout. However, the API calls will not work locally because the Worker
URL only responds to requests from your deployed GitHub Pages domain.

---

## Section 6 — Updating the task tracker

After completing each task:

1. Open `tasks/task-tracker.html` in your browser
2. Click the task to expand it
3. Click the correct status button (In progress / Done / Blocked)
4. Add any notes about what you encountered or decided
5. Status is saved automatically in your browser

Commit and push the updated `task-tracker.html` regularly so your
GitHub repository reflects current progress.

---

## Section 7 — What success looks like

Your application is complete when all of the following are true:

1. Visiting `https://YOUR-USERNAME.github.io/meeting-prep-agent` loads
   the application without errors
2. The "Identify research topics" button returns a real list of topics
   from Claude (not placeholder text)
3. Clicking "Investigate now" on a topic triggers a real web search and
   displays a specific, factual result summary
4. The "Generate briefing document" button produces a five-section
   briefing with specific content drawn from the research
5. The "Download .docx" button saves a valid Word file to your computer
6. The private context field influences the briefing tone without
   appearing in the output document
7. The application works in Chrome, Firefox, and Safari
8. The Anthropic API key is not visible anywhere in the source code
   or in the browser Developer Tools network panel

### A note on AI research quality

The application performs real research using Claude and live web search.
**Always review every result before using it.** Known limitations observed
during testing:

- The agent may research a named attendee without noting they are deceased.
  Always verify that attendees are current, active individuals before
  presenting the briefing.
- Research results reflect what Claude finds via web search — they may be
  incomplete, out of date, or missing critical context.
- The human-in-the-loop design (reviewing each "Investigate now" result)
  exists precisely to catch these errors before they reach the briefing.

The agent is a research assistant, not a replacement for human judgement.

---

*These instructions are part of the Meeting Prep Agent project specification.*  
*Cross-reference: `tasks/task-tracker.html` for progress tracking.*  
*Cross-reference: `docs/PROJECT_DOCUMENTATION.md` for design decisions.*
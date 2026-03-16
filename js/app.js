// ─────────────────────────────────────────────────────
// app.js — application state and UI logic
// ─────────────────────────────────────────────────────

// ── Google OAuth configuration ──────────────────────
const GOOGLE_CLIENT_ID = '132688114703-8tgc8pbql5ci4rt8jmkahj145hbk2atr.apps.googleusercontent.com';

// ── API response utility ────────────────────────────
function getTextFromResponse(data) {
  if (!data?.content) {
    throw new Error('API error: ' + JSON.stringify(data));
  }
  const textBlock = data.content.find(b => b.type === 'text');
  if (!textBlock) {
    throw new Error('No text block in response');
  }
  return textBlock.text;
}

// ── Application state ──────────────────────────────
const state = {
  meeting: {},
  privateContext: '',
  topics: [],
  clarifications: [],
  results: [],
  postponed: [],
  calendarOffset: 0,
  calendarAccessToken: null,
  calendarEvents: {},
  investigationQueue: [],
  investigationRunning: false,
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

    const text = getTextFromResponse(data).replace(/```json|```/g, '').trim();
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

  const list  = document.getElementById('clarif-list');
  const count = document.getElementById('clarif-count');

  if (state.clarifications.length === 0) {
    list.innerHTML = '<p class="no-items">No additional information needed.</p>';
    count.textContent = '0 requests';
  } else {
    count.textContent = state.clarifications.length + ' request' +
      (state.clarifications.length !== 1 ? 's' : '');
    list.innerHTML = '';
    state.clarifications.forEach(c => list.appendChild(makeClarifCard(c)));
  }
}

// ── Make clarification card ─────────────────────────
function makeClarifCard(c) {
  const div = document.createElement('div');
  div.className = 'clarif-card';
  div.id = 'clarif-' + c.id;
  div.innerHTML = `
    <p class="clarif-title">${c.label}</p>
    <p class="clarif-reason">${c.reason}</p>
    <div class="card-actions">
      <button class="action-btn inv" onclick="showUpload('${c.id}')">Provide now</button>
      <button class="action-btn dis" onclick="dismissClarif('${c.id}')">Not applicable</button>
      <button class="action-btn pst" onclick="postponeClarifItem('${c.id}')">Postpone</button>
    </div>
    <div class="upload-area" id="upload-${c.id}" style="display:none">
      <label>Upload a file or paste content below:</label>
      <input type="file" id="file-${c.id}">
      <textarea rows="3" id="paste-${c.id}" placeholder="Or paste content here…"></textarea>
      <div class="upload-confirm">
        <button class="action-btn inv" onclick="confirmProvide('${c.id}')">Confirm</button>
        <button class="action-btn dis" onclick="cancelUpload('${c.id}')">Cancel</button>
      </div>
    </div>
    <span class="status-pill hidden" id="clarif-pill-${c.id}"></span>`;
  return div;
}

function showUpload(id) {
  document.querySelector('#clarif-' + id + ' .card-actions').style.display = 'none';
  document.getElementById('upload-' + id).style.display = 'block';
}
function cancelUpload(id) {
  document.querySelector('#clarif-' + id + ' .card-actions').style.display = 'flex';
  document.getElementById('upload-' + id).style.display = 'none';
}
function confirmProvide(id) {
  const paste = document.getElementById('paste-' + id).value;
  state.results.push({ type: 'clarification', label: id, summary: paste });
  document.getElementById('upload-' + id).style.display = 'none';
  setClarifPill(id, 'Provided', 'pill-done');
  document.getElementById('clarif-' + id).classList.add('faded');
}
function dismissClarif(id) {
  document.querySelector('#clarif-' + id + ' .card-actions').style.display = 'none';
  setClarifPill(id, 'Not applicable', 'pill-muted');
  document.getElementById('clarif-' + id).classList.add('faded');
}
function postponeClarifItem(id) {
  document.querySelector('#clarif-' + id + ' .card-actions').style.display = 'none';
  setClarifPill(id, 'Postponed', 'pill-warn');
  document.getElementById('clarif-' + id).classList.add('faded');
}
function setClarifPill(id, text, cls) {
  const el = document.getElementById('clarif-pill-' + id);
  el.textContent = text;
  el.className = 'status-pill ' + cls;
}

// ── Open research queue ─────────────────────────────
function openResearchQueue() {
  document.getElementById('section-clarification').classList.add('hidden');
  document.getElementById('section-queue').classList.remove('hidden');
  setStep(3);

  const bar = document.getElementById('meeting-bar');
  bar.innerHTML = `<strong>${state.meeting.title}</strong>
    <span class="bar-sep">·</span>${state.meeting.attendees}
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

// ── Render topic cards ──────────────────────────────
function renderTopicCards() {
  const list = document.getElementById('topic-list');
  list.innerHTML = '';
  state.topics.forEach(t => list.appendChild(makeTopicCard(t)));
  updateQueueCount();
}

function makeTopicCard(t, isPostponed = false) {
  const prefix = isPostponed ? 'post-' : '';
  const div = document.createElement('div');
  div.className = 'topic-card';
  div.id = 'card-' + prefix + t.id;

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
       <div class="card-actions" id="actions-${prefix}${t.id}">
          <button class="action-btn inv" onclick="investigateTopic('${t.id}','${prefix}')">Investigate now</button>
          <button class="action-btn dis" onclick="discardTopic('${t.id}','${prefix}')">Not a match</button>
          <button class="action-btn pst" onclick="${isPostponed ? 'skipTopic' : 'postponeTopic'}('${t.id}','${prefix}')">Postpone</button>
        </div>
        <div class="inv-loading" id="loading-${prefix}${t.id}" style="display:none">
          <div class="spinner"></div><span>Researching…</span>
        </div>
        <div class="result-box" id="result-${prefix}${t.id}"></div>
      </div>
      <span class="status-pill hidden" id="pill-${prefix}${t.id}"></span>
    </div>`;
  return div;
}

// ── Investigate a topic ─────────────────────────────
function investigateTopic(id, prefix = '') {
  state.investigationQueue.push({ id, prefix });
  processInvestigationQueue();
}

async function processInvestigationQueue() {
  if (state.investigationRunning) return;
  if (state.investigationQueue.length === 0) return;

  state.investigationRunning = true;
  const { id, prefix } = state.investigationQueue.shift();

  const topic = state.topics.find(t => t.id === id);
  hideActions(prefix + id);
  showLoading(prefix + id);
  setPill(prefix + id, 'Researching…', 'pill-prog');

  const attendeeNote = topic.type === 'attendee'
    ? `\nIf researching a person, first confirm whether they are currently alive and in their stated role. If the person is deceased, state this clearly as the first sentence and note when they died. Do not present a deceased person as a current meeting participant.\n`
    : '';

  const prompt = `Research the following topic for a meeting briefing.
Topic: ${topic.label}
Search query: ${topic.query}
Meeting context: ${state.meeting.title} — ${state.meeting.agenda}
${attendeeNote}
Return a concise 2–3 sentence summary of the most relevant recent
findings. Be specific — include names, dates, and figures where
available. Do not use generic filler.`;

  try {
    const summary = await callWithRetry({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{ role: 'user', content: prompt }],
    }, prefix + id);

    showResult(prefix + id, summary);
    setPill(prefix + id, 'Investigated', 'pill-done');
    state.results.push({ type: topic.type, label: topic.label, summary });
    markTopicDone(id, 'complete');

  } catch (err) {
    showResult(prefix + id, 'Research failed: ' + err.message);
    setPill(prefix + id, 'Error', 'pill-block');
    markTopicDone(id, 'error');
  }

  state.investigationRunning = false;
  processInvestigationQueue();
}

async function callWithRetry(payload, cardId) {
  const attempt = async () => {
    const data = await callClaude(payload);
    if (data?.error?.type === 'rate_limit_error') {
      throw Object.assign(new Error('rate_limit'), { isRateLimit: true });
    }
    if (data?.type === 'error' && data?.error?.type === 'rate_limit_error') {
      throw Object.assign(new Error('rate_limit'), { isRateLimit: true });
    }
    return getTextFromResponse(data);
  };

  try {
    return await attempt();
  } catch (err) {
    if (err.isRateLimit) {
      if (cardId) setPill(cardId, 'Rate limited — retrying in 15s…', 'pill-warn');
      await new Promise(r => setTimeout(r, 15000));
      return await attempt();
    }
    throw err;
  }
}

// ── Discard / postpone / skip ───────────────────────
function discardTopic(id, prefix = '') {
  hideActions(prefix + id);
  setPill(prefix + id, 'Not a match', 'pill-muted');
  markTopicDone(id, 'discarded');
}

function postponeTopic(id, prefix = '') {
  hideActions(prefix + id);
  setPill(prefix + id, 'Postponed', 'pill-warn');
  state.postponed.push(id);
  markTopicDone(id, 'postponed');
}

function skipTopic(id, prefix = '') {
  hideActions(prefix + id);
  setPill(prefix + id, 'Skipped', 'pill-muted');
  markTopicDone(id, 'skipped');
}

// ── Queue helpers ───────────────────────────────────
function markTopicDone(id, outcome) {
  const card = document.getElementById('card-post-' + id) ||
               document.getElementById('card-' + id);
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
    card.id = 'card-post-' + id;
    list.appendChild(card);
  });
  state.postponed = [];
}

function showCompleteBanner() {
  const completed = state.results.length;
  const discarded = state.topics.filter(t => t._outcome === 'discarded').length;
  const skipped   = state.topics.filter(
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
  const done  = state.topics.filter(t => t._outcome).length;
  const total = state.topics.length;
  const el = document.getElementById('queue-count');
  if (el) el.textContent = `${done} of ${total} actioned`;
}

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
Do not use generic filler.
Write 2–6 bullets per section. Each bullet can be 1–5 sentences long — use
as many sentences as the point requires to be genuinely useful. Do not pad
short points and do not truncate important ones. A well-researched section
may warrant more bullets or longer ones. The goal is a professional briefing
that reads naturally, not a uniform grid of single sentences.
Do not reference or quote the private context.`;

  try {
    const rawText = await callWithRetry({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }, null);

    const text = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(text);

    sectionsEl.innerHTML = '';
    parsed.sections.forEach((s, i) => {
      sectionsEl.appendChild(makeSectionCard(s, i + 1));
    });
    toggleSection(1);

  } catch (err) {
    const msg = err.message.includes('rate_limit')
      ? 'Rate limit reached. Please wait 60 seconds and try again.'
      : `Synthesis failed: ${err.message}. Please try again.`;
    sectionsEl.innerHTML = `<div class="error-msg">${msg}</div>`;
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
    const el  = document.getElementById('step-' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < n)      el.classList.add('done');
    else if (i ===n) el.classList.add('active');
    const dot = el.querySelector('.step-dot');
    if (dot) dot.textContent = i < n ? '✓' : i;
  }
}

// ── Mode selector ───────────────────────────────────
function setMode(mode) {
  const calendarPicker = document.getElementById('calendar-picker');
  const manualForm     = document.getElementById('manual-form');
  const btnCalendar    = document.getElementById('btn-mode-calendar');
  const btnManual      = document.getElementById('btn-mode-manual');

  if (mode === 'calendar') {
    btnCalendar.classList.add('active');
    btnManual.classList.remove('active');
    calendarPicker.style.display = 'block';
    manualForm.style.display = 'none';
    state.calendarOffset = 0;
    fetchCalendarEvents();
  } else {
    btnManual.classList.add('active');
    btnCalendar.classList.remove('active');
    manualForm.style.display = 'block';
    calendarPicker.style.display = 'none';
  }
}

// ── Strip HTML tags from text ───────────────────────
function stripHtml(html) {
  if (!html) return '';
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.innerText || el.textContent || '').trim();
}

// ── Fetch calendar events via MCP ───────────────────
async function fetchCalendarEvents(append = false) {
  const loadingCard = document.getElementById('calendar-loading-card');
  const eventList   = document.getElementById('event-list');

  if (!append) {
    loadingCard.style.display = 'block';
    eventList.innerHTML = '';
  }

  // Remove existing Load more button if present
  const existingBtn = document.getElementById('btn-load-more');
  if (existingBtn) existingBtn.remove();

  try {
    if (!state.calendarAccessToken) {
      state.calendarAccessToken = await getGoogleAccessToken();
    }

    const start   = new Date(Date.now() + state.calendarOffset * 24 * 60 * 60 * 1000);
    const end     = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);

    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events` +
      `?timeMin=${encodeURIComponent(start.toISOString())}` +
      `&timeMax=${encodeURIComponent(end.toISOString())}` +
      `&singleEvents=true` +
      `&orderBy=startTime` +
      `&maxResults=10`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${state.calendarAccessToken}` }
    });

    if (!response.ok) throw new Error(`Google Calendar API error: ${response.status}`);

    const data   = await response.json();
    const events = (data.items || []).map(ev => ({
      id:          ev.id,
      title:       ev.summary || 'Untitled event',
      start:       ev.start?.dateTime || ev.start?.date || '',
      end:         ev.end?.dateTime   || ev.end?.date   || '',
      attendees:   (ev.attendees || []).map(a => a.displayName || a.email).join(', '),
      location:    ev.location || '',
      description: stripHtml(ev.description),
    }));

    loadingCard.style.display = 'none';

    if (events.length === 0 && !append) {
      eventList.innerHTML = '<p class="no-items">No events found in this period.</p>';
    } else {
      events.forEach(ev => {
         state.calendarEvents[ev.id] = ev;
         eventList.appendChild(makeEventCard(ev));
    });
    }

    // Show Load more button if within 3-week window
    if (state.calendarOffset < 14) {
      const btn = document.createElement('button');
      btn.id = 'btn-load-more';
      btn.className = 'btn-load-more';
      const nextStart = new Date(end);
      const nextEnd   = new Date(end.getTime() + 7 * 24 * 60 * 60 * 1000);
      btn.textContent = `Load more — ${nextStart.toLocaleDateString('en-CA', {month:'short',day:'numeric'})} to ${nextEnd.toLocaleDateString('en-CA', {month:'short',day:'numeric'})} →`;
      btn.onclick = () => {
        state.calendarOffset += 7;
        fetchCalendarEvents(true);
      };
      eventList.appendChild(btn);
    }

  } catch (err) {
    loadingCard.style.display = 'none';
    eventList.innerHTML = `<div class="error-msg">
      Could not fetch calendar events: ${err.message}
    </div>`;
  }
}

// ── Google OAuth token request ──────────────────────
function getGoogleAccessToken() {
  return new Promise((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      callback: (response) => {
        if (response.error) {
          reject(new Error('Google sign-in failed: ' + response.error));
        } else {
          resolve(response.access_token);
        }
      },
    });
    client.requestAccessToken({ prompt: 'consent' });
  });
}

// ── Render a calendar event card ────────────────────
function makeEventCard(ev) {
  const div = document.createElement('div');
  div.className = 'event-card';

  const start    = new Date(ev.start);
  const dateStr  = start.toLocaleDateString('en-CA', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
  const timeStr  = start.toLocaleTimeString('en-CA', {
    hour: 'numeric', minute: '2-digit'
  });
  const attCount = ev.attendees
    ? ev.attendees.split(',').filter(a => a.trim()).length
    : 0;

  div.innerHTML = `
    <div class="event-meta">
      <div class="event-title">${ev.title}</div>
      <div class="event-detail">
        ${dateStr} · ${timeStr}
        ${attCount > 0 ? ' · ' + attCount + ' attendee' + (attCount !== 1 ? 's' : '') : ''}
      </div>
    </div>
    <button class="btn-use-event"
            onclick="selectCalendarEvent('${ev.id}')">
      Use this meeting
    </button>`;
  return div;
}

// ── Populate form from selected calendar event ──────
function selectCalendarEvent(id) {
  const ev = state.calendarEvents[id];
  if (!ev) return;
  setMode('manual');

  document.getElementById('f-title').value     = ev.title || '';
  document.getElementById('f-datetime').value  = ev.start
    ? ev.start.slice(0, 16) : '';
  document.getElementById('f-attendees').value = ev.attendees || '';
  const agendaParts = [ev.location, ev.description].filter(Boolean);
  document.getElementById('f-agenda').value = agendaParts.join('\n\n');;

  document.getElementById('manual-form').scrollIntoView({
    behavior: 'smooth', block: 'start'
  });
}

// ── Initialise default mode on page load ───────────
setMode('manual');
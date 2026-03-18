# Building Your Own AI Agent — 2-Day Workshop
## Detailed Agenda

**Format:** Instructor-led, hands-on  
**Outcome:** Each student leaves with a working, publicly deployed AI agent  
**Prerequisite:** None — but students who install software before Day 1 will have more time to build

---

## Day 1

---

### 9:00 – 10:00 | Pre-Workshop Setup Clinic

**Format:** Open lab — drop-in, instructor and TA circulate  
**Purpose:** Ensure every student can hit the ground running at 10:00

Students who arrive at 9:00 get one-on-one help with:

- Creating accounts: GitHub, Anthropic (Claude.ai), Cloudflare
- Installing VS Code and GitHub Desktop
- Cloning their repository to their local computer
- Verifying the Git workflow: edit → commit → push
- Confirming GitHub Pages is enabled on their repository

**What instructors watch for:**
- Students who have a school-managed computer that blocks installations — redirect them to use GitHub's web interface instead of Desktop
- Students whose school Google account blocks third-party app connections — advise them to use a personal Gmail for the Google Calendar integration

**Target exit state:** Every student has a GitHub repository, has enabled GitHub Pages, has VS Code open with the repository folder, and can run `git status` in the terminal without errors.

---

### 10:00 – 10:30 | Welcome and Overview

**Format:** Full group, instructor presents  
**Purpose:** Orient students to the two days ahead and establish why this matters

**10:00 – 10:10 | Introductions**
- Instructor and TA introductions
- Student round — name, what they do, what they hope to build after the workshop
- Acknowledge the range of backgrounds in the room: this workshop is designed for people who have never written a line of code as much as for people who have written thousands

**10:10 – 10:25 | What We Are Building**

Show the live demo of the completed Meeting Prep Agent at https://perelgut.github.io/meeting-prep-agent

Walk through the full user flow:
1. Enter a meeting — or import one from Google Calendar
2. Review the research topics the agent identifies
3. Investigate topics one at a time — watch the agent search the internet in real time
4. Generate the briefing document
5. Download the Word file

Do not explain the technical details yet. Let the demo speak. The goal is for students to think: *I want to build that.*

**10:25 – 10:30 | The Rules of the Workshop**

Three rules:
1. **There are no stupid questions.** Every question is a teaching moment for the whole room.
2. **Stay with the group.** If you finish a step early, help a neighbour. If you fall behind, say so — we will not leave you behind.
3. **Read error messages.** When something goes wrong, the error message almost always tells you exactly what is wrong. The habit of reading error messages carefully is the most valuable skill you will leave with.

---

### 10:30 – 12:30 | Session 1 — Architecture and Setup

**Format:** Instruction followed by hands-on  
**Learning objectives:**
- Understand the three-tier architecture: browser → Cloudflare Worker → Anthropic API
- Understand why an API key cannot be stored in browser-side code
- Complete all account setup and credential configuration
- Understand what GitHub Actions is doing and why

---

**10:30 – 11:00 | How an AI Agent Actually Works**

*Instructor talk with whiteboard diagram*

Draw the architecture on the whiteboard as you explain it:

```
Your browser (GitHub Pages)
    ↓  sends request
Cloudflare Worker (your secure proxy)
    ↓  adds API key, forwards request
Anthropic API (Claude)
    ↓  thinks, searches the web, responds
Cloudflare Worker
    ↓  returns response
Your browser (displays results)
```

Key points to make:

**Why three tiers?** The API key is a password. Passwords do not go in browser code — anyone can open Developer Tools and read your source code. The Cloudflare Worker runs on Cloudflare's servers, not in the browser. The key lives there, invisible to the outside world.

**What is GitHub Pages?** Free hosting for static websites, served directly from a GitHub repository. Every time you push code to GitHub, your site updates automatically within minutes. No server to manage. No bill to pay.

**What is GitHub Actions?** Automation that runs when you push code. In this project, it has two jobs: deploy your HTML/CSS/JavaScript to GitHub Pages, and deploy your Cloudflare Worker. You write the instructions once; GitHub runs them every time.

**What does the agent actually do?** It is not a search engine. It is a reasoning system that can use tools — including web search — to accomplish a goal. The goal is set by the user. The agent decides which tools to call, in what order, and how to synthesize the results.

---

**11:00 – 12:30 | Hands-On: Accounts, Credentials, and First Deployment**

*Students work at their own pace; instructor and TA circulate*

Work through the following in order. Each step has a verification check — do not move to the next step until the current one is confirmed working.

**Step 1 — Anthropic API key** (15 minutes)
- Go to https://console.anthropic.com
- Create an API key named `meeting-prep-agent`
- Copy the key to Notepad immediately — it will not be shown again
- Verify: the key begins with `sk-ant-`

**Step 2 — Cloudflare account and API token** (20 minutes)
- Go to https://cloudflare.com and create an account (Google sign-in recommended)
- Note your Account ID from the browser URL bar at dash.cloudflare.com
- Navigate to Manage Account → Account API Tokens → Create Token
- Use the "Edit Cloudflare Workers" template
- Name the token `meeting-prep-agent-deploy`
- Add the Zone Resources second row (the step that trips people up — see Appendix A)
- Copy the token to Notepad

**Step 3 — GitHub Secrets** (10 minutes)
- Go to your repository on GitHub → Settings → Secrets and variables → Actions
- Add three secrets: `ANTHROPIC_API_KEY`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Verify: all three appear in the secrets list with today's date

**Step 4 — Create the workflow files** (15 minutes)
- In VS Code, create `.github/workflows/deploy-pages.yml` — paste content from handout
- Create `.github/workflows/deploy-worker.yml` — paste content from handout
- Save, commit, and push:
  ```
  git add .
  git commit -m "Add deployment workflows"
  git push
  ```

**Step 5 — Verify green checkmarks** (10 minutes)
- Go to your repository on GitHub → Actions tab
- Both workflows should show green checkmarks within 2–3 minutes
- If either fails, click on it and read the error log — share the screen with the instructor

**Verification check:** Open your GitHub Pages URL (`https://YOUR-USERNAME.github.io/meeting-prep-agent`). You should see a blank page or a 404 — this is correct because we have not created `index.html` yet. What matters is that the deployment pipeline is working.

---

### 12:30 – 1:30 | Lunch

*One hour. Instructor and TA remain available for students who want to troubleshoot setup issues.*

---

### 1:30 – 3:20 | Session 2 — Building the Application Shell

**Format:** Instruction followed by hands-on  
**Learning objectives:**
- Understand the role of each file in the application
- Create the Cloudflare Worker proxy
- Create the HTML structure and CSS styling
- Understand how the three JavaScript files work together

---

**1:30 – 1:50 | The File Structure**

*Instructor talk*

Show the complete file structure on screen:

```
meeting-prep-agent/
├── index.html          ← The application (what the user sees)
├── css/
│   └── styles.css      ← All visual styling
├── js/
│   ├── api.js          ← One function: send a request to the Worker
│   ├── app.js          ← All application logic and UI state
│   └── docx-export.js  ← Convert the briefing to a Word file
└── worker/
    └── proxy.js        ← The Cloudflare Worker (runs on Cloudflare, not in browser)
```

Key teaching point: **Separation of concerns.** Each file has exactly one job. `api.js` does not know what the briefing looks like. `docx-export.js` does not know how to call the API. `app.js` knows about the application state but delegates the actual API call and the document export to the specialist files.

This is how professional software is structured. It makes each piece easier to understand, easier to test, and easier to change.

---

**1:50 – 3:20 | Hands-On: Creating the Application Files**

*Students work at their own pace; instructor and TA circulate*

**File 1 — worker/proxy.js** (15 minutes)

Create `worker/proxy.js`. Paste from the handout. This file:
- Receives POST requests from the browser
- Adds the Anthropic API key from its secure environment
- Forwards the request to the Anthropic API
- Returns the response

After pasting, read through it with students. Point out:
- The CORS headers (allow the browser to talk to a different domain)
- `env.ANTHROPIC_API_KEY` — this is how the Worker reads the secret we set in Cloudflare
- The `anthropic-beta` header — required for MCP server support

**File 2 — js/api.js** (10 minutes)

Create `js/api.js`. This is the shortest file — one function, `callClaude()`, that sends a POST request to the Worker URL and returns the response.

**Important:** The `WORKER_URL` constant contains a placeholder. Leave it for now — we will get the real URL after the first deployment.

**File 3 — css/styles.css** (10 minutes)

This file is provided in full on the handout — it is long and the specifics are not the teaching focus. Paste it, save it, and move on. Point out that it uses CSS custom properties (variables) throughout: every colour is defined once at the top and referenced everywhere else.

**File 4 — index.html** (25 minutes)

Create `index.html`. Walk through its structure with students as they paste:
- The step indicator (Meeting details → Clarification → Research queue → Briefing)
- The meeting details form
- The private context field — and why it is visually distinct (amber styling)
- The calendar picker section
- The research queue section (hidden until needed)
- The briefing section (hidden until synthesis)
- The script tags at the bottom — order matters

**Commit and first real deployment** (10 minutes)

```
git add .
git commit -m "Add all Phase 1 application files"
git push
```

Go to the Actions tab. Watch both workflows run. When the Pages workflow completes, open the GitHub Pages URL. The application should load.

**Get the Worker URL** (10 minutes)

Go to dash.cloudflare.com → Workers & Pages. Your `meeting-prep-proxy` Worker should be listed. Click on it → Settings → Domains & Routes. Copy the full URL (including the hex prefix — it looks like `https://XXXXXXXX-meeting-prep-proxy.YOUR-SUBDOMAIN.workers.dev`).

Open `js/api.js`. Replace the placeholder with the real URL.

**Set the ANTHROPIC_API_KEY in Cloudflare** (do this now, once)

Go to dash.cloudflare.com → your Worker → Settings → Variables & Secrets. Add `ANTHROPIC_API_KEY` as a Secret (not Plaintext). This only needs to be done once — it persists permanently.

Commit and push the updated `api.js`.

---

### 3:20 – 3:40 | Break

---

### 3:40 – 5:30 | Session 3 — JavaScript: The Agent's Brain

**Format:** Instruction followed by hands-on  
**Learning objectives:**
- Understand the three-phase agent loop
- Implement topic discovery (Phase 1)
- Implement the research queue (Phase 2)
- Test the application end-to-end through Phase 2

---

**3:40 – 4:00 | How the Agent Thinks**

*Instructor talk*

Draw the three-phase loop on the whiteboard:

**Phase 1 — Topic Discovery**
The user fills in the meeting form and clicks "Identify research topics." The agent receives the meeting details (including the private context) and returns two lists: research topics and clarification requests.

The prompt instructs Claude to return only valid JSON — no prose, no explanation. The application parses the JSON and renders it as cards in the UI.

Teaching point: **Structured output.** Asking an AI to return JSON instead of prose turns its output into data your program can work with. This is one of the most important prompt engineering patterns.

**Phase 2 — The Research Queue**
Each topic card has three choices: Investigate now, Not a match, Postpone. When the user clicks "Investigate now," the application makes another API call — this time with the web search tool enabled — and displays the result on the card. The user reviews each result before it proceeds.

Teaching point: **Human in the loop.** The agent never makes a decision the user hasn't approved. Every research result is visible before it enters the briefing. This is a design philosophy, not a technical limitation.

**Phase 3 — Synthesis**
When all topics are actioned, the agent receives everything it has learned and produces the final briefing. This is a separate API call with a separate prompt — the synthesis prompt asks for a specific five-section structure in JSON format.

---

**4:00 – 5:20 | Hands-On: js/app.js and js/docx-export.js**

*Students work at their own pace; instructor and TA circulate*

**File 5 — js/app.js** (60 minutes)

This is the largest file. Paste from the handout, then walk through the key functions with students:

- `getTextFromResponse(data)` — the defensive parser that handles any API response shape, not just the happy path
- `runDiscovery()` — builds the Phase 1 prompt, calls the API, parses the JSON, renders the clarification panel
- `investigateTopic(id, prefix)` — adds to the investigation queue (one at a time), calls the API with web search enabled, displays the result
- `processInvestigationQueue()` — the sequential queue that prevents rate limit errors by running one investigation at a time
- `callWithRetry()` — if a rate limit error occurs anyway, waits 60 seconds and retries automatically
- `runSynthesis()` — builds the synthesis prompt from all research results, renders the five-section briefing
- `setMode()`, `fetchCalendarEvents()`, `selectCalendarEvent()` — the Google Calendar integration

Teaching point on the deceased attendee fix: show students the line in `investigateTopic()` that checks whether the topic type is `attendee` and adds the instruction to verify whether the person is still alive. Explain why it is there. This is the human judgment that the machine needed to be given explicitly.

**File 6 — js/docx-export.js** (20 minutes)

Paste from the handout. Walk through what `downloadDocx()` does: reads the rendered briefing sections from the DOM, builds a Word document using the docx.js library loaded from CDN, and triggers a browser file download.

**End-to-end test** (20 minutes)

Have every student test their application:
1. Enter a real meeting — something coming up on their own calendar
2. Click "Identify research topics"
3. Investigate at least two topics
4. Click "Generate briefing document"
5. Click "Download .docx"

Verify: the Word file downloads and opens correctly.

If the synthesis fails with a rate limit error: wait 60 seconds and try again. The retry logic will handle it automatically.

---

### 5:20 – 5:30 | Day 1 Wrap-Up

- What we built today: a fully deployed AI agent, live on the internet
- What we will do tomorrow: Google Calendar integration, polish, and showcase
- Homework (optional but recommended): try the application with a real meeting; note anything that surprises you or doesn't work as expected
- Pre-reading for Day 2: the Google OAuth setup instructions in the handout

**Common overnight question:** "The briefing is too short / too long / not quite right." Answer: the quality of the output depends heavily on the prompts. Tomorrow we will look at prompt engineering as a craft — the difference between a mediocre briefing and an excellent one is often a single sentence in the prompt.

---

---

## Day 2

---

### 9:00 – 10:00 | Open Lab — Catch-Up and Questions

**Format:** Open lab — drop-in, instructor and TA circulate  
**Purpose:** Help students who hit roadblocks overnight; let fast movers explore

Common overnight issues to watch for:
- Worker URL in api.js still has the placeholder — check with `WORKER_URL` in browser console
- Synthesis rate limit — remind students the retry logic handles this; just wait
- .docx download fails in Edge due to tracking prevention warnings — these are cosmetic; the download should work regardless
- Students who want to improve their briefing quality — point them to the prompt sections in app.js; show them how changing a sentence in the synthesis prompt changes the output

Students who are ahead can start on the Google Cloud setup for the Calendar integration.

---

### 10:00 – 10:20 | Day 2 Recap and Roadmap

**Format:** Full group, instructor presents  

**Recap** (5 minutes)

Quick show of hands: who got a briefing document yesterday? Who downloaded it as a Word file? Who tried it on a real meeting?

Ask one or two students to share what surprised them. This is always a rich 5 minutes — the surprises are the best teaching material.

**Day 2 Roadmap** (15 minutes)

Three things on the agenda today:
1. Connect the application to Google Calendar so meetings auto-populate from the user's real calendar
2. Polish — the inactive Generate button with progress count, the rate limit message, the topic count in the briefing header
3. Showcase — everyone demonstrates their working agent to the group

Teaching point for the day: the Google Calendar integration will teach us something important about AI architecture. The original plan was to use an AI-mediated connection to Google Calendar. When that proved unavailable, we bypassed the AI entirely and called Google's own API directly. The result was faster and more reliable. **The right tool for fetching structured data from a known API is the API — not an AI asked to fetch it for you.** AI adds value in the reasoning and synthesis phases. Not everywhere.

---

### 10:20 – 12:20 | Session 4 — Google Calendar Integration

**Format:** Instruction followed by hands-on  
**Learning objectives:**
- Understand OAuth 2.0 at a conceptual level — what it is and why it exists
- Set up a Google Cloud project with the Calendar API enabled
- Create an OAuth 2.0 Client ID for a web application
- Implement the Google Identity Services sign-in flow
- Call the Google Calendar API directly with a Bearer token

---

**10:20 – 10:45 | OAuth 2.0 — The Concept**

*Instructor talk*

OAuth 2.0 is the standard that lets you click "Sign in with Google" on a website without giving that website your Google password. Here is how it works, in plain English:

1. The application sends the user to Google's sign-in page, along with a list of what it wants permission to do (in our case: read your calendar)
2. The user signs in to Google and clicks "Allow"
3. Google sends back a temporary access token — like a visitor badge that says "this person is allowed to read their calendar"
4. The application presents that badge to Google Calendar's API when it makes requests
5. The badge expires after an hour; the user signs in again next time

Nothing in this flow involves the application ever knowing the user's Google password. The token is temporary and scoped — it only allows reading calendar events, nothing else.

Teaching point: **Minimum necessary permission.** The application asks only for `calendar.readonly` — the ability to read events, not create, modify, or delete them. This is a security principle: request only the permissions you actually need.

---

**10:45 – 12:20 | Hands-On: Google Cloud Setup and Calendar Integration**

*Students work at their own pace; instructor and TA circulate*

**Step 1 — Google Cloud project** (20 minutes)

- Go to https://console.cloud.google.com
- Create a project named `meeting-prep-agent`
- Navigate to APIs & Services → Library
- Search for "Google Calendar API" and enable it
- Click "Create credentials" when prompted

**Step 2 — OAuth consent screen** (15 minutes)

- Select "User data" as the credential type
- Fill in the app name ("Meeting Prep Agent") and your email
- Add the `calendar.readonly` scope — note that Google classifies this as "sensitive"
- Explain to students: sensitive does not mean dangerous. It means Google requires explicit user consent. The warning screen is expected.

**Step 3 — Create the OAuth Client ID** (10 minutes)

- Application type: Web application
- Name: `meeting-prep-agent-web`
- Authorized JavaScript origins: `https://YOUR-USERNAME.github.io`
- Authorized redirect URIs: `https://YOUR-USERNAME.github.io/meeting-prep-agent`
- Copy the Client ID to Notepad

**Step 4 — Add yourself as a test user** (5 minutes)

- OAuth consent screen → Audience → Test users → Add your Google account email
- Explain: while the app is in "Testing" status, only listed emails can sign in. This is appropriate for a personal project — no Google verification required.

**Important timing note:** Google OAuth credentials take up to 5 minutes to propagate after creation. Do not test immediately — wait 5 minutes before clicking the Calendar button. Testing immediately will produce a "401: invalid_client" error even when everything is configured correctly.

**Step 5 — Update the application code** (15 minutes)

Three changes to make:

In `index.html`: add the Google Identity Services script tag before the other scripts
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

In `js/app.js`: add the Client ID constant near the top
```javascript
const GOOGLE_CLIENT_ID = 'YOUR-ACTUAL-CLIENT-ID.apps.googleusercontent.com';
```

**Critical:** Replace the placeholder immediately before saving. Use VS Code's global search (Ctrl+Shift+F) to search for `YOUR-` before every commit. If a placeholder is committed, it goes live.

The `fetchCalendarEvents()` function and `getGoogleAccessToken()` function are already in the app.js you pasted from the handout — they handle the OAuth flow and the direct Google Calendar API call.

Commit and push. Wait for both workflows to go green.

**Step 6 — Test the Calendar integration** (15 minutes)

- Reload your application
- Click "📅 From Google Calendar"
- Complete the Google sign-in flow (click "Continue" past the "unverified app" warning — this is expected)
- Your upcoming calendar events should appear as cards
- Click "Use this meeting" on one — verify that the form auto-fills

If the attendees field shows a name in "Last, First" format: this is how the contact is stored in Google Calendar. The field is editable — fix it before proceeding.

---

### 12:20 – 1:20 | Lunch

*One hour.*

---

### 1:20 – 3:00 | Session 5 — Polish and Quality

**Format:** Instruction followed by hands-on  
**Learning objectives:**
- Understand prompt engineering as a craft, not a science
- Implement the remaining UX enhancements
- Test the complete application end-to-end from both entry points

---

**1:20 – 1:40 | Prompt Engineering — The Craft**

*Instructor talk*

The quality of an AI agent's output is determined, more than anything else, by the quality of the instructions it is given. This is called prompt engineering — and it is a craft, not a science.

Three lessons from this project:

**Lesson 1: Be specific about structure.** The discovery prompt asks Claude to return "ONLY valid JSON — no markdown, no explanation." Without that instruction, Claude will wrap the JSON in prose and code fences. The application cannot parse that. One sentence prevents the entire failure mode.

**Lesson 2: Tell it what to check, not just what to find.** The attendee research prompt originally asked for "current role and recent activity." A deceased public figure has a current role — in memory. Adding one sentence — "first confirm whether they are currently alive" — changed the behaviour completely. Common sense is not automatic. It must be stated.

**Lesson 3: Constrain the output shape without over-constraining the content.** The synthesis prompt originally said "each bullet should be a complete, useful sentence." The agent interpreted this as a template: one sentence per bullet, the same length, four bullets per section. Every section looked the same. Changing the instruction to "write 2–6 bullets per section, each 1–5 sentences long, as the content warrants" produced a briefing that read like a professional document instead of a grid.

The lesson: constraints on structure are good. Constraints on content are usually a mistake.

---

**1:40 – 3:00 | Hands-On: Polish and Full Test**

*Students work at their own pace; instructor and TA circulate*

Students should already have the complete app.js from the handout, which includes all the polish features. This session is for verifying they work and for experimenting with prompts.

**Verify the following are working:**

- [ ] The "Generate briefing document" button appears immediately when the research queue opens, greyed out and disabled
- [ ] The progress count updates as topics are actioned: "2 of 6 topics actioned — complete all to generate briefing"
- [ ] The button activates and changes colour when all topics are done
- [ ] Clicking "Investigate now" rapidly on multiple topics queues them rather than firing simultaneously — each shows "Queued…" then "Researching…"
- [ ] If a rate limit is hit, the card shows "Rate limited — retrying in 60s…" and recovers automatically
- [ ] The briefing header shows the researched topic count: "Based on N researched topics"
- [ ] The .docx download produces a valid Word file with all five sections

**Prompt experimentation** (if time permits)

Encourage students to try modifying the synthesis prompt in `app.js`. Specifically:
- Change the number of sections
- Change the bullet count range
- Add an instruction like "begin each section with a one-sentence executive summary before the bullets"
- Change the tone instruction

This is where students start to understand that the agent's personality is in their hands.

---

### 3:00 – 3:20 | Break

---

### 3:20 – 4:00 | Session 6 — Showcase and Closing

**Format:** Full group  
**Purpose:** Celebrate what was built; surface what was learned; point toward what comes next

---

**3:20 – 3:45 | Student Showcase**

Each student (or pair, if the group is large) takes 2–3 minutes to demonstrate their working application:
- Show the application loading in the browser
- Enter a meeting or pick one from Google Calendar
- Run through at least one investigation
- Show the generated briefing

Instructors watch for:
- Interesting choices students made in their prompts
- Unexpected results that generate good discussion
- Students whose applications are not quite working — offer specific, targeted help during Q&A

The showcase is not a competition. It is a collective demonstration that everyone in the room built something real.

---

**3:45 – 4:00 | What You Now Know — and What Comes Next**

*Instructor closing*

**What you built:**
A working AI agent, deployed on the public internet, that connects to the Anthropic API through a secure proxy, searches the web in real time, reads your Google Calendar, synthesizes research into a professional document, and exports it as a Word file. You built it in two days.

**What you now understand that most people don't:**
- How API keys work and why they need to be kept off the client side
- How an AI agent differs from a search engine — goals, tools, and reasoning
- How to structure a prompt to get structured output
- How OAuth 2.0 works at a conceptual level
- How to use human-in-the-loop design to keep AI output trustworthy
- How to read an error message and diagnose a problem

**What you can build next:**
The same architecture — browser, proxy, AI, API — can be applied to almost any problem. Some ideas:

- A job posting analyzer: paste a job description and your CV; the agent researches the company, identifies skill gaps, and suggests talking points for the interview
- An email triage assistant: summarize a long email thread and surface the decisions that need to be made
- A news digest agent: given a list of topics you care about, research what happened this week and produce a readable summary
- A course feedback agent: analyze student feedback from multiple sources and identify themes

The pattern is the same. The application changes. The skills transfer.

**The one thing to remember:**
The agent proposes. You decide. Every result the agent produces is a starting point for your judgment, not a replacement for it. That is not a limitation. It is a feature.

---

*Workshop closes at 4:00 PM.*

---

## Appendices

### A — Pre-Workshop Checklist (to be completed before Day 1, 9:00 AM)

Students who complete the following before arriving on Day 1 will have more time to build and less time troubleshooting setup.

- [ ] Create a GitHub account at https://github.com
- [ ] Create a repository named `meeting-prep-agent` (public, with README)
- [ ] Enable GitHub Pages on the repository (Settings → Pages → Source: GitHub Actions)
- [ ] Install VS Code at https://code.visualstudio.com
- [ ] Install GitHub Desktop at https://desktop.github.com and sign in
- [ ] Clone the `meeting-prep-agent` repository to your computer
- [ ] Create a Cloudflare account at https://cloudflare.com
- [ ] Create an Anthropic account at https://console.anthropic.com

Accounts that require a credit card: none. All services used in this workshop have free tiers that are sufficient for the project.

---

### B — What to Bring

- Your laptop (Windows or macOS — see instructor if you have questions about other platforms)
- Your charger
- Your Google account credentials — you will connect Google Calendar during Day 2
- A real upcoming meeting you would like to prep for — this makes the demo personal and the output immediately useful

---

### C — Handout File List

The following files are provided as handouts or are available in the workshop repository:

- `deploy-pages.yml` — GitHub Actions workflow for GitHub Pages
- `deploy-worker.yml` — GitHub Actions workflow for Cloudflare Worker
- `worker/proxy.js` — Cloudflare Worker proxy
- `js/api.js` — API call wrapper (with WORKER_URL placeholder)
- `css/styles.css` — Complete stylesheet
- `index.html` — Complete HTML structure
- `js/app.js` — Complete application logic
- `js/docx-export.js` — Word document export

All files are also available at: https://github.com/perelgut/meeting-prep-agent

---

### D — Instructor Notes: Common Problems and Solutions

| Problem | Likely cause | Solution |
|---------|-------------|----------|
| `git status` says "not a git repository" | Terminal is in the wrong folder | Use File → Open Folder in VS Code to open the repository folder; try again |
| GitHub Actions workflow fails | Secret name spelled wrong, or Account ID incorrect | Click the failed run → read the error log; check secret names exactly |
| "Method not allowed" when visiting Worker URL | Normal — Worker only accepts POST | This is correct; the Worker is working |
| "401: invalid_client" on Google sign-in | OAuth credentials not yet propagated | Wait 5 minutes; do not make any changes |
| Rate limit error during synthesis | Too many tokens in the last minute | Wait 60 seconds and try again; the retry logic handles it |
| Tracking prevention warnings in Edge for docx CDN | Edge privacy settings blocking CDN storage | These are cosmetic; the download should work regardless |
| .docx opens with garbled content | docx.js CDN loaded the wrong build | Verify `index.html` uses `index.umd.js` not `index.js` |
| Attendee name shows as "Last, First" | Google Calendar contact stored in that format | Edit the attendees field manually before proceeding |
| Agenda field empty after selecting a Calendar event | Event has no description in Google Calendar | Normal for some events; add agenda items manually |

---

*This agenda is part of the Meeting Prep Agent workshop materials.*  
*Companion documents: PROJECT_DOCUMENTATION.md, APPENDIX_SOFTWARE_TECHNOLOGIES.md, IMPLEMENTATION_INSTRUCTIONS.md*

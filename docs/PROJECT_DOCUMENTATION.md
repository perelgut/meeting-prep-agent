# Meeting Prep Agent — Project Documentation

**Course:** Computer Programming — AI Agents Module  
**Project:** Meeting Prep Agent  
**Last Updated:** Session 2, Entry 079 — Appendix A major rewrite complete; all 28 live session corrections applied

---

## Change Log & Design Diary

This section records every significant decision, enhancement, and change made
to the project — including the reasoning behind each one. Updated after every
meaningful conversation or code change.

---

### Entry 001 — Initial project selection
**Date:** Session 1  
**Type:** Design decision

Seven candidate AI Agent projects were proposed. The group selected **Meeting
Prep Agent** on the basis that it: has a clear real-world use case, produces
a tangible deliverable (a briefing document), is impressive to demo, and
exercises MCP integration, web search, and document generation in one project.

Rejected alternatives (retained for reference):
- Email Triage Assistant
- Assignment Feedback Agent
- Job Posting Analyzer
- News Digest Agent
- Receipt & Expense Tracker
- Course Registration Advisor

---

### Entry 002 — Initial scoping decisions
**Date:** Session 1  
**Type:** Design decisions

Three scoping questions were answered before architecture was drawn:

| Question | Decision | Rationale |
|----------|----------|-----------|
| Calendar source | Either — user chooses at runtime | Flexibility; not all users have Google Calendar |
| Briefing sections | All five | Maximum usefulness for a demo |
| Delivery format | Downloadable .docx | Professional output; works offline |

---

### Entry 003 — Stage 1 built: UI shell
**Date:** Session 1  
**Type:** Implementation

React artifact created containing:
- Mode toggle (Google Calendar / Manual Entry)
- Manual entry form: title, date/time, attendees, topic/agenda
- Section checkboxes for briefing content selection
- Generate button with loading state
- Placeholder result panel
- Stage progress banner

This file (`PROJECT_DOCUMENTATION.md`) created and first version delivered.

---

### Entry 004 — Enhancement: expanded research loop
**Date:** Session 1  
**Type:** Requirements enhancement — instructor-directed

**Change requested:** Two refinements to the research loop:

1. **News search granularity:** Instead of searching only on the overall meeting
   topic, also search each individual agenda item separately. This produces
   richer, more targeted research results.

2. **Past meeting matching:** Instead of matching only on attendees, also match
   on topic similarity. Similarity is semantic (meaning-based), not string-based.
   Example given: "September Board Meeting" and "October Meeting for Board of
   Directors" should be treated as highly similar even with no shared keywords.

**Impact on architecture:**
- Research loop redesigned into three named phases (Discovery, Queue, Synthesis)
- Topic types introduced: `news_topic`, `attendee`, `past_meeting`, with
  `news_topic` covering both overall topic and per-agenda-item searches
- Stage count increased from 5 to 6
- New state machine formally documented (PENDING → INVESTIGATING → COMPLETE /
  DISCARDED / POSTPONED)

---

### Entry 005 — Enhancement: interactive research queue with user control
**Date:** Session 1  
**Type:** Requirements enhancement — instructor-directed

**Change requested:** Each research topic should be presented to the user with
three explicit choices before investigation proceeds:

- **Investigate now** — proceed immediately with this topic
- **Not a match** — discard this topic silently
- **Postpone** — defer to a second round

After all initial topics are actioned, all postponed topics are re-presented
with the same three choices. The research loop terminates when either:
- No topics remain (all investigated or discarded), or
- The user postpones all remaining topics in the postponed round

**Design rationale recorded:** This implements the *human-in-the-loop* pattern,
which is architecturally significant. The agent proposes; the human controls.
This is a deliberate contrast with fully autonomous agents and is flagged as
a key classroom discussion point.

**Artifacts updated this entry:**
- Architecture Summary (this document) — revised to show three-phase structure
- Research Topic Types section — added (new)
- Research Queue State Machine section — added (new)
- Stage detail sections — revised and expanded (Stages 3–6)
- Stage table — updated with new numbering and Stage 1-R2 entry
- Interactive UI prototype — rebuilt to demonstrate the full queue mechanic

---

### Entry 006 — Process correction: diary not being maintained
**Date:** Session 1  
**Type:** Process correction — instructor-directed

**Issue identified:** The documentation was being updated with architectural
changes but the change log / design diary was not being maintained. Decisions,
enhancements, and the reasoning behind them were not being recorded.

**Correction:** This Change Log & Design Diary section added retroactively,
covering all decisions from Session 1. Going forward, every meaningful
conversation, decision, enhancement, or correction will be logged here at the
time it occurs — not reconstructed afterward.

**Standing instruction recorded:** The diary must be updated to reflect every
enhancement and every subsequent comment or change made to any project document.

---

### Entry 007 — Standing directive: diary is top priority
**Date:** Session 1  
**Type:** Process directive — instructor-directed

**Directive received:** Keeping the diary current is the **top priority** for
this project. It must be updated after **every** interchange — no exceptions.
Failure to update the diary after any interchange constitutes failure to meet
the primary, most basic instruction for this project.

**Acknowledged and recorded.** Every future interchange, regardless of how
small, will result in a diary entry before the updated document is delivered.
This entry itself is the first example of that commitment being honoured.

---

### Entry 008 — Decision to proceed + Software Technologies appendix directive
**Date:** Session 1  
**Type:** Design decision + Documentation directive — instructor-directed

**Proceed confirmed:** The current state of the project (UI shell, research queue
architecture, interactive prototype, diary structure) was reviewed and approved.
Work continues to Stage 2.

**New directive — Software Technologies appendix:**
Once the technology stack is fully locked down, an appendix titled
"Software Technologies Required" must be created as part of the Specification
document. Requirements for this appendix:

- One section per tool, library, framework, and IDE extension
- Each section contains step-by-step installation instructions
- Instructions must cover **all three platforms:** Windows, Apple (macOS), and
  Android
- Target audience: end consumers with no prior experience developing this type
  of application — instructions must assume nothing

**Project Plan implication recorded:**
The Project Plan must include a note that all tools, VS Code extensions, and
other environment prerequisites are assumed to be installed and configured
before any core project work begins. Environment setup is a prerequisite task,
not a core task, but it is non-trivial and must be completed first.

**Decisions deferred:**
- Final technology stack not yet locked down (VS Code, GitHub, GitHub Projects
  confirmed as direction; full list pending)
- Appendix will be drafted once stack is finalized

---

### Entry 009 — Platform clarification and stack lock-down timing
**Date:** Session 1  
**Type:** Design decisions — instructor-directed

**Android clarified:** "Android computers" means **Chromebooks running Linux
apps** — not Android phones or tablets. Chromebooks with Linux (Crostini)
enabled are fully capable development machines and support VS Code, Node.js,
Git, and all other tools in this stack natively. Installation instructions in
the Software Technologies appendix will cover:
- Windows
- macOS (Apple)
- Chromebook (Linux app environment)

Android phones and tablets are out of scope for this project.

**Technology stack lock-down timing:** The full stack will be finalized
**after Stage 2** (Google Calendar MCP integration), once the MCP integration
requirements are fully understood. The Software Technologies appendix will be
drafted immediately after the stack is locked.

**Implication for Project Plan:** The prerequisite section will note that
Chromebook users must have Linux (Crostini) enabled before beginning
environment setup. This is a one-time OS-level step on the Chromebook and
must be documented as the first instruction in the Chromebook track.

---

### Entry 010 — Chromebook / Android support dropped
**Date:** Session 1  
**Type:** Scope reduction — instructor-directed

**Decision:** Chromebook (and Android generally) support has been dropped from
the project scope entirely. The Software Technologies appendix will cover
**Windows and macOS only**.

**Rationale recorded:** The project's primary purpose is to demonstrate to
non-programmers that they can conceive and build real applications with AI
assistance. Adding Chromebook complexity — particularly the Linux environment
setup step — would create an unnecessary barrier that undercuts that message.
Simplicity of onboarding takes priority over platform completeness.

**Documents affected:**
- Entry 009 superseded on the platform question (Chromebook confirmed then
  immediately removed — both decisions recorded for audit trail)
- Software Technologies appendix scope: Windows and macOS only
- Project Plan prerequisite section: Windows and macOS only

---

### Entry 011 — Documentation approach confirmed; Stage 2 commenced
**Date:** Session 1  
**Type:** Acknowledgement + milestone

**Confirmation received:** The continuous diary update approach was reviewed
and confirmed as exactly what was intended. Approach continues unchanged.

**Stage 2 begins:** Google Calendar MCP integration. This stage will:
- Connect the "Google Calendar" mode button to a live MCP API call
- Fetch the user's upcoming calendar events
- Display them as a selectable list in the UI
- Auto-populate meeting details when an event is selected
- Document the MCP server declaration pattern for teaching purposes

---

### Entry 012 — Stage 2 complete: Google Calendar MCP integration
**Date:** Session 1  
**Type:** Implementation milestone

**Stage 2 built and delivered.** The artifact now demonstrates the full
Google Calendar MCP connection pattern, including:
- Connect button → loading state → simulated API response
- Event cards rendered from mock JSON (mirrors real API response structure)
- Event selection → auto-fill of all meeting detail fields
- Inline annotated code panel showing the exact MCP API call
- Bridge button to Stage 3 (Topic Discovery)

**Teaching decision recorded:** The mock events were chosen deliberately to
include a "Board of Directors — December Session" event alongside the
"Q4 AI Strategy Review", so that when Stage 3 (semantic similarity matching
for past meetings) is demonstrated, the board meeting example from Entry 004
is already present in the data — giving continuity to the teaching narrative.

**Technology stack additions confirmed this stage:**
- Google Calendar MCP: `https://gcal.mcp.claude.com/mcp`
- Anthropic API `/v1/messages` endpoint with `mcp_servers` parameter

---

### Entry 013 — Enhancement: user context field and agent clarification requests
**Date:** Session 1  
**Type:** Requirements enhancement — instructor-directed

**Feature requested:** A free-text field where the user can provide their own
private interpretation of the meeting — what they believe it is really about,
beyond the official meeting title or agenda. This context is passed to the
agent as a privileged lens that colours all subsequent research and synthesis.

**Example given by instructor:**
- Official meeting title: "Project Update"
- User's private context: "The project update will be examining why we are
  running 2 weeks late and why there have been so many bugs during development.
  It looks like management is trying to pin something on a scapegoat."

**Implications for the agent's behaviour:**

1. **Email analysis recolouring:** Prior email threads that might appear routine
   are now read through the lens of blame attribution — the agent looks for
   patterns, tone shifts, or selective CC'ing that support or contradict the
   user's interpretation.

2. **GitHub log examination:** The scapegoat framing triggers examination of
   commit history, issue assignments, PR reviews, and blame annotations — a
   research topic type not previously in scope. This implies GitHub as a
   potential additional data source.

3. **Agent-initiated clarification requests:** Where the agent identifies that
   useful information exists but is not accessible to it (private files, internal
   wikis, local documents, proprietary data), it may ask the user to upload or
   paste that information directly. The user context field is the trigger for
   this behaviour — the agent knows what it is looking for and can ask
   specifically rather than generically.

**New research topic type added:**
- `user_context` — derived from the user's private interpretation; drives
  recolouring of all other research and may generate additional sub-topics
  (e.g. GitHub log review, specific document requests)

**New agent capability added:**
- **Clarification request cards:** After the initial topic discovery phase,
  if the agent determines it needs information it cannot access, it presents
  one or more request cards asking the user to upload a file, paste text, or
  provide specific information. These cards appear in the research queue
  alongside investigable topics, with the same Investigate / Dismiss / Postpone
  mechanic — except "Investigate now" is replaced by an upload or paste action.

**New data source flagged — GitHub:**
- The scapegoat example implies GitHub commit logs, issue history, and PR
  reviews as a potentially relevant data source
- GitHub MCP server availability to be investigated
- Deferred: will be assessed when technology stack is locked down after Stage 3

**UI changes required:**
- Add "Your private context" text area to the meeting details form (both
  calendar-selected and manual entry modes)
- Visually distinguish this field — it is private user interpretation, not
  meeting metadata
- In the research queue, user context card appears first, before other topics,
  as it modifies the meaning of everything that follows
- Add upload/paste capability to clarification request cards in the queue

**Architecture impact:**
- Phase 1 (Topic Discovery) prompt must include the user context field as a
  separate, flagged input — Claude is told explicitly that this represents the
  user's private interpretation and should influence research framing
- Phase 3 (Briefing Synthesis) prompt must also receive the user context, so
  the final briefing reflects the interpretive lens throughout

---

### Entry 014 — Design decisions: clarification request presentation and context privacy
**Date:** Session 1  
**Type:** Design decisions — instructor-directed

**Decision 1 — Clarification request presentation:**
All agent clarification requests are listed **upfront as a batch**, before the
research queue begins. The user reviews the full list and decides which items
to provide, which to dismiss, and which to postpone — in a single pass.

Rationale: Interleaving upload requests with research topics would disrupt the
queue flow and create an unpredictable experience. Presenting all requests
together lets the user make informed decisions about data sharing before
research begins, and avoids the agent blocking mid-queue waiting for input.

**Implementation implication:** Phase 1 (Topic Discovery) API call now returns
two lists:
1. Research topics (for the queue)
2. Clarification requests (for the upfront batch panel, shown before the queue)

The upfront panel is presented and resolved before the research queue opens.

**Decision 2 — User context privacy:**
The user's private context field is passed to the agent as input only. It is
**never included in the final briefing document**, which may be shared with
other meeting participants.

The private context influences:
- Which research topics are generated (Phase 1)
- How email threads and documents are interpreted (Phase 2)
- The framing and emphasis of the final briefing (Phase 3)

But it leaves no explicit trace in the output. The briefing reads as objective
analysis; the user's interpretive lens is the invisible hand behind it.

**Rationale recorded:** The briefing document is a shareable artifact. Including
the user's private speculation about blame or political dynamics in a document
that might be forwarded or printed would be a significant professional risk.
The agent acts as a trusted advisor who has been briefed privately — it shapes
the advice without disclosing the source of its framing.

**Architecture update:**
- Phase 1 prompt updated to return two structured lists: topics and requests
- UI flow updated: Clarification batch panel → Research queue → Synthesis
- Briefing synthesis prompt explicitly instructed: do not reference or quote
  the user context field; use it only to guide emphasis and interpretation

---

### Entry 015 — Stage 2 continued: private context field and clarification batch panel
**Date:** Session 1  
**Type:** Implementation

**Continuing Stage 2** to incorporate the two features designed in Entries
013 and 014 into the existing Stage 2 artifact:

1. **Private context field** — free-text area added to meeting details form
   (both calendar-selected and manual entry modes), visually distinguished
   from meeting metadata, clearly labelled as private/not included in output

2. **Upfront clarification batch panel** — appears after meeting details are
   confirmed; lists all agent-requested uploads/pastes before the research
   queue opens; each request has Provide now / Not applicable / Postpone
   actions; queue does not open until this panel is resolved

Stage 2 artifact rebuilt to include both additions.

---

### Entry 016 — Stage 2 revised: complete
**Date:** Session 1  
**Type:** Implementation milestone

**Stage 2 fully revised and delivered.** The artifact now includes:

- Full calendar flow (connect → load → select → auto-fill)
- Private context field with amber styling, lock icon, and explicit privacy
  labelling — using the instructor's scapegoat example as placeholder text
- Step indicator (Meeting details → Clarification requests → Research queue
  → Briefing) giving users a clear sense of where they are in the flow
- Upfront clarification batch panel with three realistic request cards
  generated from the private context:
  1. Project status report or update document (file upload)
  2. GitHub repository name (text input)
  3. External email threads not in Gmail (paste area)
- Postponed request re-presentation within the same panel
- "Project Update" added to mock events (alongside the AI Strategy and Board
  meetings) to give a realistic context for the scapegoat scenario

**Note on mock data continuity:** The "Project Update" event was added
deliberately so the private context placeholder text ("running 2 weeks late…
scapegoat") matches a real-looking event in the calendar list. The "Board of
Directors — December Session" event is retained from Entry 012 for the
semantic similarity demonstration in Stage 3.

**Stage 2 is now complete. Ready for Stage 3.**

---

### Entry 017 — Stage 2 approved; Stage 3 commenced
**Date:** Session 1  
**Type:** Milestone approval + commencement

**Stage 2 approved.** The flow — calendar connection, private context field,
and upfront clarification batch panel — was reviewed and described as
"productive and collaborative." The design direction is confirmed.

**Stage 3 begins:** Phase 1 Topic Discovery — the first live Anthropic API
call in the project. This stage will:
- Make a real API call to claude-sonnet-4-20250514
- Pass meeting details + private context as a structured prompt
- Instruct Claude to return two JSON lists: research topics + clarification
  requests (confirming/replacing the simulated ones from Stage 2)
- Render the returned topics as the interactive research queue
- Implement the full Investigate / Not a Match / Postpone mechanic with
  individual API + web_search calls per topic
- Handle the postponed topic re-presentation loop
- Show result summaries on each investigated card

This is the stage where the application becomes a real AI agent — not a
prototype with simulated data, but a system that reasons dynamically about
a specific meeting.

---

### Entry 018 — Stage 3 complete: Topic Discovery & Research Queue
**Date:** Session 1  
**Type:** Implementation milestone

**Stage 3 built and delivered.** The artifact now demonstrates the full
Phase 1 → Phase 2 flow:

- Discovery button → loading state → 6 topic cards rendered
- Annotated code panel showing the dual-MCP + web_search API call with
  private context handling
- Full research queue: investigate (with per-topic spinner and result),
  discard, postpone
- Postponed topic re-presentation round
- Completion banner with counts → bridge to Stage 4

**Notable design decision in the topic list:**
The sixth topic ("Vendor evaluation timeline analysis", tagged "From your
context") demonstrates the user_context topic type — it would not exist
without the private "scapegoat" framing in the context field. Its result
summary (vendor shortlist submitted 11 days late, no documented escalation)
shows the kind of specific, actionable finding that private context unlocks.
This is the most teachable moment in Stage 3.

**Technology stack additions confirmed this stage:**
- Gmail MCP: `https://gmail.mcp.claude.com/mcp` (active alongside Calendar MCP)
- Web search tool: `{ type: "web_search_20250305", name: "web_search" }`
- Both declared in same API call — no conflict, Claude routes appropriately

**Stack is now sufficiently defined to lock down after this stage.**
Software Technologies appendix to be drafted next session.

---

### Entry 019 — Stage 3 approved; Stage 4 commenced
**Date:** Session 1  
**Type:** Milestone approval + commencement

**Stage 3 approved.** The topic discovery flow, research queue mechanic,
and private context handling were reviewed and approved. The instructor
expressed being impressed with the progress.

**Stage 4 begins:** Briefing Synthesis + .docx generation. This is the
final functional stage. It will:
- Make the Phase 3 synthesis API call passing all research results
- Receive a structured 5-section briefing from Claude
- Render the briefing in the UI with clear section headings
- Generate a properly formatted .docx file using the docx.js library
  loaded from CDN (no server required)
- Provide a Download button that saves the file to the user's machine
- The private context influences the briefing tone and emphasis but
  does not appear anywhere in the output document

This stage completes the application end-to-end. After Stage 4, the
Software Technologies appendix will be drafted and the Project Plan
prerequisites section added.

---

### Entry 020 — Stage 4 complete: Briefing Synthesis + .docx generation
**Date:** Session 1  
**Type:** Implementation milestone — application complete end-to-end

**Stage 4 built and delivered.** The application is now functionally
complete across all four stages:

1. Meeting details + private context (Stage 2)
2. Upfront clarification batch (Stage 2)
3. Topic discovery + interactive research queue (Stage 3)
4. Briefing synthesis + .docx download (Stage 4)

**Briefing content note:** The five sections of the simulated briefing
were written to demonstrate the private context effect concretely. The
vendor timeline delay (11 days late, no documented escalation), the
overdue risk framework, and the CFO-notification question all trace back
to the "scapegoat" private context — without a single word of that
framing appearing in the output. Students reviewing the briefing can
be asked: "Where is the private context in this document?" The answer
is: everywhere in tone, nowhere in text. That is the key teaching moment
for this stage.

**Application is complete. Remaining work:**
- Software Technologies appendix (Windows + macOS, stack now locked)
- Project Plan prerequisites section
- Any further enhancements or refinements requested

**Full technology stack — now locked:**

| Component | Technology | Where it runs |
|-----------|-----------|---------------|
| UI + application code | Claude.ai artifact/canvas | Browser — no install |
| AI Model | claude-sonnet-4-20250514 | Claude.ai — no install |
| Calendar integration | Google Calendar MCP | Claude.ai connector |
| Email integration | Gmail MCP | Claude.ai connector |
| Web research | web_search tool | Claude.ai — built in |
| Document generation | docx.js via CDN | Browser — no install |
| Documentation editing | Visual Studio Code | Windows / macOS |
| Version control | GitHub | Browser + VS Code |
| Project tracking | GitHub Projects | Browser |

---

### Entry 021 — Development environment decision: Claude.ai artifact system
**Date:** Session 1  
**Type:** Design decision — instructor-directed

**Decision:** Students will work directly in the Claude.ai artifact/canvas
environment. No local development environment (Node.js, terminal, local
server) is required.

**Rationale:** This decision directly supports the project's core purpose —
demonstrating to non-programmers that they can build real applications with
AI assistance. Eliminating the local dev environment setup removes the
single largest barrier to entry for students with no prior development
experience.

**Implication for Software Technologies appendix:**
The appendix will NOT cover:
- Node.js installation
- npm / package managers
- Local development servers
- Terminal / command line usage
- Build tools or bundlers

The appendix WILL cover:
- How to create a Claude.ai account (Windows and macOS)
- How to access and use the artifact/canvas environment
- How to connect Google Calendar and Gmail integrations
- How to use GitHub for version control of prompt files and documentation
- How to use GitHub Projects for project tracking
- VS Code — retained for editing documentation and prompt files, not for
  running code

**Critical implication for the appendix structure:**
The very first section must be a clear, step-by-step guide to getting
into the Claude.ai environment where the application lives. This is the
"instantiate the environment" instruction the instructor specified.
Every subsequent tool (GitHub, VS Code) is supplementary to that core.

**Project Plan prerequisite update:**
The prerequisite is now: "Student has a Claude.ai account and has
connected their Google Calendar and Gmail integrations." This replaces
the earlier assumption about a full local development environment.

---

### Entry 022 — Appendix A drafted: Software Technologies Required
**Date:** Session 1  
**Type:** Implementation — documentation deliverable

**Appendix A drafted and delivered.** Covers all five technologies in the
locked stack, written for students with no prior development experience.

**Structure of the appendix:**
1. Claude.ai account — Windows and macOS, step by step
2. Google account and integrations — Calendar + Gmail connection,
   including how to revoke access
3. Visual Studio Code — Windows and macOS, including Apple Silicon note
4. GitHub account — account creation, first repository, Projects board
   with suggested cards for each build stage
5. GitHub Desktop (optional) — clone, commit, push workflow explained
   in plain language
6. Quick Reference table — what runs where (answers the most common
   student confusion: "do I need to install anything to run this?")
7. Troubleshooting — five common issues with plain-language solutions

**Key design decisions in the appendix:**
- The very first section establishes Claude.ai as the environment where
  the application lives — not a local machine
- VS Code is framed explicitly as a documentation editor, not a code
  runner — this prevents students from trying to run the application
  locally
- The Google permissions revocation instructions (myaccount.google.com/
  permissions) are included proactively — students on shared accounts or
  using school credentials need to know how to disconnect cleanly
- GitHub Projects setup includes suggested card names matching the four
  build stages — students can start tracking immediately
- Apple Silicon (M1/M2/M3/M4) note included for macOS VS Code download
  — a common point of confusion for newer Mac users

**Next remaining task:** Project Plan prerequisites section.

---

### Entry 023 — Appendix review deferred; Project Plan prerequisites commenced
**Date:** Session 1  
**Type:** Decision + commencement

**Appendix A status:** Reviewed at a high level and confirmed as looking
correct. A detailed step-by-step review with the instructor is planned for
a future session to ensure every instruction is accurate and complete for
an inexperienced student user. No changes made at this time.

**Project Plan prerequisites section:** Work begins now. This will be
drafted as a standalone section — either appended to the main Project
Documentation or as its own document. Decision: given that the Project
Plan will eventually grow into a fuller document, it will be created as
its own file: `PROJECT_PLAN.md`.

**Scope of the prerequisites section:**
- Formal statement that all appendix tools must be installed and
  configured before any build stage begins
- Checklist format so students can verify readiness
- Estimated time to complete setup (realistic, not optimistic)
- Clear statement of what "ready to begin" looks like
- Note that environment setup is non-trivial but is not a core project
  task — it is a prerequisite, not a stage

---

### Entry 024 — Project Plan drafted: prerequisites section complete
**Date:** Session 1  
**Type:** Implementation — documentation deliverable

**PROJECT_PLAN.md drafted and delivered.** The document contains:

**Prerequisites section — key design decisions:**
- Checklist format with five sections mirroring the appendix structure,
  so students can tick off items in the same order they installed them
- Explicit verification steps for each integration (not just "connected"
  — actually test it with a real question to Claude)
- Honest time estimate: 85–120 minutes. "Plan for two hours" — students
  who rush this step consistently run into problems mid-build
- "What Ready to Begin Looks Like" — four concrete, testable checks that
  give a clear pass/fail rather than a vague sense of being ready
- Shared/institutional computer section — addresses the specific
  circumstances of international students on student visas who may be
  using school-provided equipment or school Google accounts

**Build stages table** — included with the four stages and their
inter-dependencies, noting that stages were demonstrated in the design
session and students will re-implement them in their own environments.

**Working method section** — includes the recommended prompt pattern for
getting unstuck, written specifically for this project:
  "I am building a Meeting Prep Agent as described in
  PROJECT_DOCUMENTATION.md. I am currently working on Stage N..."
This is a practical teaching point: context-rich prompts produce
significantly better assistance than decontextualised ones.

**Three-document structure now complete:**
- `PROJECT_DOCUMENTATION.md` — architecture + design diary
- `APPENDIX_SOFTWARE_TECHNOLOGIES.md` — installation instructions
- `PROJECT_PLAN.md` — prerequisites + build stages + working method

**Session 1 work is substantially complete.** Remaining items:
- Detailed review of Appendix A (scheduled for future session)
- Any further enhancements or refinements as they arise

---

### Entry 025 — Session 1 complete; Appendix A review scheduled for future session
**Date:** Session 1  
**Type:** Session closure

**Session 1 declared complete.** All planned work for this session has
been delivered and approved.

**Appendix A detailed review:** Deferred to a future session. The
instructor confirmed the appendix looks good at a high level but a
thorough step-by-step review with an inexperienced student user in mind
has not yet been conducted. This review is a named outstanding task.

**Full Session 1 deliverables summary:**

| Deliverable | Status |
|-------------|--------|
| Project selection (Meeting Prep Agent) | ✅ Complete |
| Initial architecture design | ✅ Complete |
| Stage 1 — UI shell | ✅ Complete |
| Research loop enhancement (news + agenda items) | ✅ Complete |
| Past meeting semantic similarity | ✅ Complete |
| Interactive research queue (Investigate/Discard/Postpone) | ✅ Complete |
| User private context field | ✅ Complete |
| Upfront clarification batch panel | ✅ Complete |
| Stage 2 — Calendar MCP + private context + clarification | ✅ Complete |
| Stage 3 — Topic Discovery + Research Queue | ✅ Complete |
| Stage 4 — Briefing Synthesis + .docx generation | ✅ Complete |
| Technology stack locked | ✅ Complete |
| Development environment decision (Claude.ai) | ✅ Complete |
| Platform scope (Windows + macOS only) | ✅ Complete |
| Appendix A — Software Technologies Required | ✅ Drafted; review pending |
| Project Plan — prerequisites + build stages | ✅ Complete |
| Change diary — 25 entries | ✅ Current |

**Outstanding items carried to next session:**
1. Detailed review of Appendix A, step by step, for inexperienced users
2. Any further enhancements or refinements to the application
3. Future stages as directed by instructor

---

### Entry 026 — Session 2 commenced
**Date:** Session 2  
**Type:** Session opening

**Session 2 opened.** Resuming from Session 1 closure (Entry 025).

**Outstanding items carried forward from Session 1:**
1. Detailed review of Appendix A — step-by-step, for inexperienced users
2. Any further enhancements or refinements to the application
3. Further stages or directions as instructed

**Documents current as of this session:**
- `PROJECT_DOCUMENTATION.md` — 25 entries, architecture complete
- `APPENDIX_SOFTWARE_TECHNOLOGIES.md` — drafted, detailed review pending
- `PROJECT_PLAN.md` — prerequisites + build stages + working method

Awaiting instructor direction on where to begin.

---

### Entry 027 — Project review: control flow and data flow diagrams
**Date:** Session 2  
**Type:** Documentation enhancement — instructor-directed

**Review requested:** A full project review including formal documentation
of both the control flow and the data flow. These diagrams will be added
to the Project Documentation and rendered visually for teaching purposes.

**Control flow** covers: what happens when, who decides, and what the
branching conditions are — the sequence of steps and decision points.

**Data flow** covers: what information exists, where it comes from, how
it is transformed, and where it ends up — the movement and mutation of
data through the system.

Both diagrams are being produced as interactive visuals and as written
descriptions to be added to the Project Documentation.

---

### Entry 028 — Control flow and data flow diagrams produced
**Date:** Session 2  
**Type:** Documentation enhancement — completed

**Two diagrams produced and added to Project Documentation:**

**Control flow diagram:**
- Three swim lanes: User / Application / Claude API + MCP
- Shows all four decision points (diamonds)
- Research queue loop clearly rendered with loop-back arrows
- Postponed topic re-presentation pass shown as a second loop
- Colour coding: gray = user, blue = app, teal = API, amber = private context
- Dashed arrows = API responses (return path)

**Data flow diagram:**
- Six horizontal phase bands: Input / Private context / Phase 1 /
  Phase 2 / Phase 3 / Output
- Private context shown as a continuous amber band with dashed lines
  feeding into Phase 1 and Phase 3 prompts — and explicitly not
  reaching the output band
- Research results accumulator shown as a growing structure in Phase 2
- Clarification data shown feeding into the accumulator (not a separate
  channel)
- Three output nodes: rendered UI, .docx binary, saved file

**Written descriptions** added to Project Documentation covering:
- Key control flow points and decision logic
- Data object lifecycle table (what exists, where used, in output?)
- Private context constraint — the privacy-by-prompt-instruction pattern
- Research results accumulator structure and growth pattern
- Data flow summary in ASCII diagram form

**Teaching value recorded:** The data flow diagram makes the privacy
constraint visible in a way that prose cannot — students can literally
see the amber dashed line stop before it reaches the output band.

---

### Entry 029 — No-persistence architecture documented as design decision
**Date:** Session 2  
**Type:** Design decision — instructor-directed

**Observation made:** The data flow diagram reveals that no data object
in the system survives a tab close. The only persistent artifact is the
user-downloaded .docx file.

**Instructor direction:** Make this obvious in the documentation, and
frame it explicitly as a design choice — not an omission.

**Section added to Data Flow documentation:**
"No persistent storage — a deliberate design decision"

Documents the four rationales (no server required, privacy by
architecture, appropriate for use case, simplicity) and the trade-off
accepted (no session resume, no past briefing retrieval without the
.docx).

Also documents the two future-version options if persistence were
ever added: `localStorage` for lightweight continuity, and a cloud
database for cross-device access — with the additional complexity
each would introduce noted explicitly.

**Key framing recorded:** Students must be taught that this is a
deliberate decision, not a gap. The distinction between "we chose not
to" and "we didn't get to it" matters both technically and professionally.

---

### Entry 030 — Decision: implement as full web application stored in GitHub
**Date:** Session 2  
**Type:** Major milestone — instructor-directed

**Decision:** The project moves from Claude.ai artifact prototype to a
real, standalone web application stored in GitHub and openable directly
in a browser without any local server or build step.

**Two deliverables requested:**
1. **Task tracking HTML file** — a self-contained, browser-openable file
   that tracks all implementation tasks, their status, and dependencies.
   This file will live in the GitHub repository and be updated as work
   progresses.

2. **Step-by-step implementation instructions** — detailed enough for a
   student with no prior web development experience to follow. These
   instructions will be added to the Project Documentation and cross-
   referenced with the task tracker.

**Architecture implications for the real application:**
- No build tools, no npm, no bundler — pure HTML + CSS + JavaScript
  files that open directly in a browser (consistent with the no-server
  design decision from Entry 029)
- All libraries loaded from CDN (Anthropic API client, docx.js)
- Repository structure to be defined
- The Anthropic API key question must be addressed — browser-based apps
  cannot safely store API keys; this requires a documented approach
- MCP connections authenticated via Claude.ai — must determine how
  these are handled outside the Claude.ai canvas environment

**Open questions to resolve before instructions are written:**
1. API key handling — how does a browser app call the Anthropic API
   without exposing the key? (Options: proxy server, user-provided key
   entered at runtime, Claude.ai-specific approach)
2. MCP authentication outside Claude.ai canvas — the Google Calendar
   and Gmail MCP connections were pre-authenticated in Claude.ai;
   standalone app requires its own OAuth flow or alternative
3. Repository structure — folder layout, file naming conventions
4. Deployment target — local file system only, or GitHub Pages?

These questions will be resolved and documented before instructions
are written.

---

### Entry 031 — Architecture decisions: API key, MCP, hosting
**Date:** Session 2  
**Type:** Design decisions — instructor-directed + clarification

**Decision 1 — Hosting:** GitHub Pages. The app will be deployed free
directly from the repository and accessible via a public URL of the form
`https://username.github.io/meeting-prep-agent`

**Decision 2 — MCP / Google integrations:** Skipped for the standalone
app. Manual entry only. Google Calendar and Gmail MCP integration is
documented as a named future enhancement. This simplifies the build
significantly and keeps the focus on the AI agent logic.

**Decision 3 — API key handling:** Instructor proposed GitHub Secrets.
Important clarification recorded below.

**GitHub Secrets — clarification:**
GitHub Secrets are environment variables available to GitHub Actions
(automated build/deploy workflows). They are NOT accessible to code
running in the user's browser at runtime. A secret stored in GitHub
never reaches the browser — it stays on GitHub's servers and is only
injected during the build or deploy pipeline.

This means GitHub Secrets cannot be used directly to hide an API key
in a browser-side JavaScript application. However, they CAN be used
in a specific pattern:

**The correct pattern — GitHub Actions as a build-time injector:**
A GitHub Actions workflow runs on every push, reads the secret, and
injects it into a config file or environment that the deployed app
can use. But for a browser app calling an external API, the key still
ends up in the deployed files where a determined user could find it.

**Recommended approach for this project:**
Given the educational context and the GitHub Pages hosting decision,
the cleanest solution is a **GitHub Actions proxy pattern**:

- The API key is stored as a GitHub Secret (safe — never in source code)
- A GitHub Actions workflow deploys a minimal Cloudflare Worker (free
  tier) that holds the key server-side and proxies Anthropic API calls
- The browser app calls the Cloudflare Worker, not the Anthropic API
  directly — the key is never exposed in the browser

This is the same architecture used by many production apps. It:
- Keeps the key out of source code and out of the browser entirely
- Is free (Cloudflare Workers free tier: 100,000 requests/day)
- Works with GitHub Pages hosting
- Is a genuine, teachable, real-world pattern

**Alternative for pure simplicity:** If the Cloudflare Worker adds too
much complexity for the course level, the fallback is a runtime input
field where each student pastes their own key — held in memory only,
never stored, cleared on page close. Honest, simple, and the key is
each student's own responsibility.

**Decision deferred:** Instructor to confirm which approach to use.
Both will be documented as options. Instructions will be written for
the chosen path.

---

### Entry 032 — API key approach confirmed: Cloudflare Worker proxy
**Date:** Session 2  
**Type:** Design decision — instructor-directed

**Decision confirmed:** Option A — Cloudflare Worker proxy.

The API key will be stored as a GitHub Secret. A GitHub Actions workflow
will deploy a Cloudflare Worker that proxies all Anthropic API calls.
The browser application will never see the key.

**Rationale recorded:** This is the correct professional pattern. It
teaches students a real-world architecture decision — not a workaround —
and the Cloudflare Worker free tier (100,000 requests/day) means there
is no cost to any student.

**Option B** (runtime input field) will be documented as an alternative
in the Software Technologies appendix, for students who want to
experiment independently outside the course environment.

**Full architecture for the standalone web application:**

| Component | Technology | Where it lives |
|-----------|-----------|----------------|
| Frontend | HTML + CSS + JavaScript | GitHub repository |
| Hosting | GitHub Pages | Auto-deployed from repo |
| API proxy | Cloudflare Worker (1 JS file) | Cloudflare (free) |
| API key | GitHub Secret | GitHub — never in code |
| Deployment | GitHub Actions workflow | Runs on every push to main |
| Libraries | CDN (docx.js, etc.) | Loaded at runtime |
| Calendar/Gmail | Manual entry only (MCP: future) | N/A |

**Implementation will produce:**
1. Repository file structure (all files listed with purpose)
2. Task tracking HTML file (self-contained, lives in repo)
3. Step-by-step instructions added to Project Documentation
4. All source files ready to commit to GitHub

---

### Entry 033 — Implementation deliverables produced
**Date:** Session 2  
**Type:** Implementation milestone

**Two deliverables produced:**

**1. tasks/task-tracker.html** — self-contained browser-based task board
- 5 phases, 24 tasks total
- Each task is expandable with step-by-step instructions embedded
- Status buttons (To do / In progress / Done / Blocked) per task
- Notes field per task for observations and blockers
- Status and notes saved in browser localStorage — persists between sessions
- Filter bar to view tasks by status
- Progress counter and percentage in the header
- No server required — open directly in browser or from GitHub Pages

**2. docs/IMPLEMENTATION_INSTRUCTIONS.md** — step-by-step guide
- Section 1: Architecture explanation (browser → Worker → Anthropic)
- Section 2: Repository file structure with annotated tree
- Section 3: Complete index.html and CSS guide
- Section 4: Complete JavaScript for all three files (api.js, app.js
  in three parts, docx-export.js) — all code provided verbatim
- Section 5: Commit/push workflow and failure diagnosis
- Section 6: Task tracker update workflow
- Section 7: Seven-point definition of "success"

**Phase structure of the task tracker:**
- Phase 0: Prerequisites & accounts (7 tasks)
- Phase 1: Repository structure (7 tasks)
- Phase 2: Cloudflare Worker proxy (3 tasks)
- Phase 3: Frontend HTML & CSS (2 tasks)
- Phase 4: Frontend JavaScript (5 tasks)
- Phase 5: GitHub Pages deployment (4 tasks)

**Key design decisions in the instructions:**
- All JavaScript provided verbatim — students copy, read, and modify
  rather than write from scratch. The learning is in understanding
  what each function does, not in syntax
- `WORKER_URL` is the only configuration value students must change —
  clearly labelled in the code
- The "What success looks like" section gives 7 testable criteria —
  students know exactly when they are done
- Local testing caveat documented: the Worker only accepts requests
  from the deployed GitHub Pages domain, not from `file://`

---

### Entry 034 — Gaps identified: Cloudflare missing from appendix; wrangler unexplained
**Date:** Session 2  
**Type:** Defect correction — instructor-identified

**Two gaps identified by instructor:**

1. **Cloudflare account setup missing from Appendix A.** The appendix
   was written before Cloudflare was added to the stack (Cloudflare was
   confirmed in Entry 032, after the appendix was drafted in Entry 022).
   The appendix therefore has no section covering:
   - Creating a Cloudflare account
   - Navigating to Workers & Pages
   - Finding the Account ID
   - Obtaining a Cloudflare API token
   - Understanding the free tier limits

2. **Wrangler not explained anywhere.** The deploy workflow YAML uses
   `cloudflare/wrangler-action` and the command `wrangler deploy` with
   no explanation of what Wrangler is. For an inexperienced student,
   this is a black box in the middle of a critical step.

   Wrangler is Cloudflare's command-line tool for deploying and managing
   Workers. In this project it is invoked by GitHub Actions — students
   never run it themselves — but they need to understand what it is
   doing when they read the workflow file or diagnose a failure.

**Corrections being made:**
- Appendix A: new Section 6 — Cloudflare account and Workers setup
  (Windows and macOS, as with all other sections)
- Implementation Instructions Section 2 or a new Section 0: Wrangler
  explanation added — what it is, who runs it, what the deploy command
  does, and what a failure looks like

---

### Entry 035 — Appendix A and Implementation Instructions corrected
**Date:** Session 2  
**Type:** Defect correction — completed

**Corrections made:**

**Appendix A — Software Technologies Required:**
- Version date updated to Session 2, Entry 035
- Tools list updated: Cloudflare added as item 3 (Essential), other
  tools renumbered accordingly
- Quick Reference table updated to include Cloudflare Workers row
- New Section 6 added: "Cloudflare Account and Workers" covering:
  - What Wrangler is and why students never run it themselves
  - What the Worker does (the proxy pattern explained in plain English)
  - Creating a Cloudflare account (Windows and macOS)
  - Finding the Account ID
  - Navigating to Workers & Pages
  - Obtaining a Cloudflare API token (step by step)
  - Free tier limits (100,000 requests/day, no credit card, no expiry)
  - Verifying the Worker is deployed (including what the "Method not
    allowed" browser response means and why it is correct)
- Troubleshooting section: three new Cloudflare-specific entries added:
  - Workflow failed (secret name, Account ID, YAML indentation)
  - Worker deployed but app cannot reach it (URL format, push/deploy)
  - Lost Cloudflare API token (how to create a replacement)

**Implementation Instructions — Section 1:**
- Wrangler explanation added immediately after the architecture diagram
- Full table breaking down every part of the `deploy` command
- Full table breaking down the `secret put` command
- Explanation of how GitHub passes the secret to Wrangler at runtime
  without the key appearing in the workflow file
- Cross-reference to Appendix A Section 6 Troubleshooting for failures

**Root cause of the gap recorded:** Cloudflare was confirmed as a stack
component in Entry 032, after the appendix was completed in Entry 022.
The appendix was not updated at the time the stack changed. Going forward,
any stack change must trigger an immediate check of whether the appendix
needs updating.

---

### Entry 036 — Session 2 continuation directed
**Date:** Session 2  
**Type:** Direction

**Instructor directed:** Continue. No changes to the corrections in
Entries 034–035. Work proceeds to the next logical task.

**Current state assessment:**
All documentation deliverables are complete and corrected:
- PROJECT_DOCUMENTATION.md — 35 entries, current
- PROJECT_PLAN.md — prerequisites and build stages
- APPENDIX_SOFTWARE_TECHNOLOGIES.md — 6 sections including Cloudflare
- IMPLEMENTATION_INSTRUCTIONS.md — Sections 1–7, Wrangler explained
- task-tracker.html — 5 phases, 24 tasks, interactive

**What remains to be built — the actual application source files:**
The implementation instructions describe what to write but the source
files themselves have not yet been created. The following files need
to be produced so students have working reference implementations:
- worker/proxy.js — already written in the instructions (verbatim)
- css/styles.css — referenced but full content not yet provided
- js/api.js — written verbatim in instructions
- js/app.js — written verbatim in instructions (three parts)
- js/docx-export.js — written verbatim in instructions
- .github/workflows/deploy-pages.yml — written in task tracker
- .github/workflows/deploy-worker.yml — written in task tracker
- index.html — written verbatim in instructions

The CSS file is the only source file not yet fully provided. This is
the natural next deliverable.

---

### Entry 037 — styles.css produced; all source files now complete
**Date:** Session 2  
**Type:** Implementation milestone

**css/styles.css produced.** The final source file not previously provided
is now complete. The file is 24 sections, fully commented, covering all
visual elements of the application.

**All application source files are now fully provided:**

| File | Status | How provided |
|------|--------|-------------|
| `index.html` | ✅ Complete | Verbatim in Implementation Instructions §3.2 |
| `css/styles.css` | ✅ Complete | Separate file download (this entry) |
| `js/api.js` | ✅ Complete | Verbatim in Implementation Instructions §4.1 |
| `js/app.js` | ✅ Complete | Verbatim in Implementation Instructions §4.2–4.4 |
| `js/docx-export.js` | ✅ Complete | Verbatim in Implementation Instructions §4.5 |
| `worker/proxy.js` | ✅ Complete | Verbatim in task tracker Phase 2 Task 1 |
| `.github/workflows/deploy-worker.yml` | ✅ Complete | Verbatim in task tracker Phase 2 Task 2 |
| `.github/workflows/deploy-pages.yml` | ✅ Complete | Verbatim in task tracker Phase 5 Task 1 |

**Implementation Instructions §3.3 updated** to replace the placeholder
reference with a table describing all 24 CSS sections, plus a teaching
point about CSS custom properties as named constants.

**Teaching note recorded:** The CSS custom properties pattern in Section 1
of styles.css is a direct analogy to named constants in programming.
Worth explicit classroom discussion when students first encounter the
styles file.

**Project deliverables — complete inventory:**
- `PROJECT_DOCUMENTATION.md` — 37 diary entries
- `PROJECT_PLAN.md` — prerequisites checklist + build stages
- `APPENDIX_SOFTWARE_TECHNOLOGIES.md` — 6 sections, Cloudflare included
- `IMPLEMENTATION_INSTRUCTIONS.md` — 7 sections, all code provided
- `task-tracker.html` — 5 phases, 24 tasks, interactive
- `css/styles.css` — complete application stylesheet
- All JS/HTML/worker/workflow files provided verbatim in instructions

**The full project documentation and implementation package is now
complete.** Remaining work is review, refinement, and the Appendix A
detailed step-by-step review deferred from Session 1.

---

### Entry 038 — Prerequisites live session: GitHub repository creation
**Date:** Session 2  
**Type:** Live implementation — instructor-led

**Session context:**
- Instructor already has a GitHub account — account creation step skipped
- Platform: Windows
- Starting with: creating the meeting-prep-agent repository on GitHub,
  then enabling GitHub Pages, then cloning locally with GitHub Desktop

This is a live walkthrough of the prerequisite steps from the Project Plan
checklist (items 1.1 through 4.3 approximately). Any discrepancies between
the written instructions and what is actually encountered on screen will
be noted and corrected in the appendix.

---

### Entry 039 — GitHub repository created successfully; documentation thoroughness directive
**Date:** Session 2  
**Type:** Live implementation milestone + process directive

**Repository creation: successful.**
- Repository name: `meeting-prep-agent`
- Visibility: Public
- README file added at creation
- No discrepancies encountered between written instructions and actual
  GitHub UI on Windows — instructions accurate as written for this step

**Process directive received:** Each step of each task must be documented
as thoroughly as possible. This means:
- What the user was instructed to do
- What they actually saw on screen
- Whether it matched the instructions or differed
- Any clarifications or corrections needed
- The outcome (success / issue encountered / resolved)

This level of detail serves two purposes:
1. It validates and improves the appendix instructions in real time
2. It creates a genuine audit trail that future students can follow,
   including knowing what "success looks like" at each step

**Applying this directive going forward:** Every live step in this session
will be logged with full detail in the diary before proceeding to the next.

**Next step:** Enable GitHub Pages on the repository (Project Plan
prerequisite item 1.2 / task tracker Phase 0, Task 2).

---

### Entry 040 — GitHub Pages enabled successfully
**Date:** Session 2  
**Type:** Live implementation milestone

**GitHub Pages — enabled successfully.**

**Steps taken:**
1. Navigated to repository Settings tab (rightmost tab, gear icon)
2. Located Pages in the left sidebar under "Code and automation"
3. Found Build and deployment Source dropdown — defaulted to
   "Deploy from a branch"
4. Changed Source to "GitHub Actions"
5. Change took effect immediately — no separate Save button required

**What was seen on screen:** Exactly as described in the instructions.
No discrepancies. The appendix instructions for this step are accurate
and require no changes.

**What success looks like at this step:**
- Settings → Pages shows Source set to "GitHub Actions"
- No error messages
- No workflow file is required yet — that comes in Phase 5

**Instruction accuracy:** Confirmed accurate for Windows, Chrome browser,
current GitHub UI as of Session 2.

**Next step:** Create Cloudflare account (Project Plan prerequisite /
task tracker Phase 0, Task 3).

---

### Entry 041 — Cloudflare sign-up: three discrepancies found; appendix corrections needed
**Date:** Session 2  
**Type:** Live implementation — discrepancies identified

**Three discrepancies between written instructions and actual Cloudflare UI:**

**Discrepancy 1 — Button label:**
- Written instructions say: "Click the Sign up button (top right)"
- Actual UI shows: A button labelled **"Under Attack?"** prominently,
  and a separate **"Start for Free"** button
- Correction needed: Replace "Click Sign up" with "Click Start for Free"
  and add a note that "Under Attack?" is a different product (Cloudflare's
  DDoS protection service) and should be ignored

**Discrepancy 2 — Sign-in method:**
- Written instructions describe creating a new email/password account
- Actual UI also offers: **Sign in with Google** (and likely Apple/GitHub)
- Instructor chose: Sign in with Google — valid choice, avoids yet another
  password to manage
- Correction needed: Add a note that Google sign-in is available and
  recommended if the user already uses Google. The steps that follow are
  the same regardless of sign-in method.

**Discrepancy 3 — First question after sign-in:**
- Written instructions make no mention of a plan/use-case question
- Actual UI asks: Whether the account will be used for **Personal,
  Professional, or both**
- Correction needed: Add a step covering this question and advise what
  to select. For this project, **Personal** is the appropriate answer —
  students are building a learning project, not a commercial product.
  Either Personal or "both" will work technically; the choice affects
  marketing emails, not functionality.

**Current state:** Instructor is on the Cloudflare sign-up flow, at the
Personal / Professional / Both question. Awaiting guidance on how to
proceed so we can continue documenting what follows.

**Appendix corrections to be made after this step is completed.**

---

### Entry 042 — Cloudflare onboarding questions: use case and team size
**Date:** Session 2  
**Type:** Live implementation — additional discrepancies identified

**Additional onboarding screens not documented in the appendix:**

**Screen 2 — Use case description:**
- Cloudflare asked for a description of the intended use case
- Instructor provided a description of the project
- Correction needed: Add a step noting that Cloudflare asks for a
  use case description. Students can write something like:
  "Building a personal web application that calls an AI API"

**Screen 3 — Team size:**
- Cloudflare asked whether working solo or with a team
- Instructor selected: Solo / working alone
- Correction needed: Add a step noting this question. Students should
  select solo/individual.

**Screen 4 — "How would you like to get started?"**
Three options presented:
- Build and scale apps globally
- Protect your apps and users
- Connect and accelerate traffic

**Correct selection for this project: "Build and scale apps globally"**
This is the Workers and Pages path — exactly what we need for deploying
the Cloudflare Worker proxy. The other two options lead to Cloudflare's
CDN/DDoS and networking products which are not relevant to this project.

**Running count of appendix corrections for the Cloudflare section:**
1. Button label: "Start for Free" not "Sign up"
2. "Under Attack?" button noted and dismissed
3. Google sign-in option noted and recommended
4. Personal / Professional / Both question — select Personal
5. Use case description field — suggested text to provide
6. Solo / team question — select solo
7. "How would you like to get started?" — select "Build and scale apps globally"

All corrections will be applied to Appendix A Section 6 after this
onboarding flow is fully documented.

---

### Entry 043 — Cloudflare onboarding: "How would you like to start building?"
**Date:** Session 2  
**Type:** Live implementation — additional discrepancy identified

**Screen 5 — "How would you like to start building?"**
Six options presented:
- Start with code or a template
- Run serverless AI models globally
- Set up object storage
- Purchase a domain name
- Store and transform images
- Store and stream videos

**Correct selection for this project: "Start with code or a template"**
This leads directly to the Workers creation flow. All other options are
unrelated Cloudflare products (R2 storage, domain registrar, Images, Stream).

**Note for the appendix:** Students may be tempted by "Run serverless AI
models globally" since this is an AI project — but that option refers to
running AI inference models on Cloudflare's infrastructure, which is not
what we are doing. Our Worker is a lightweight proxy, not an AI model.
Worth a brief clarifying note in the appendix.

**Running count of appendix corrections: now 8.**

---

### Entry 044 — Cloudflare onboarding: Worker creation screen
**Date:** Session 2  
**Type:** Live implementation — additional discrepancy identified

**Screen 6 — Worker/Pages creation screen**
Three-panel layout:
- Left panel: "Create a worker"
- Middle panel: "Ship something new" with five options:
  - Connect GitHub
  - Connect GitLab
  - Start with Hello World
  - Select a template
  - Upload your static files
- Right panel (implied): "Select a method"

**Important clarification:** This screen is a general Pages/Workers
creation wizard that Cloudflare shows to new accounts. We do NOT want
to create a Worker manually through this UI — our Worker will be
deployed automatically by GitHub Actions using Wrangler. Creating it
manually here would create a duplicate and could cause naming conflicts.

**Correct action: navigate away from this screen entirely.**
The right move is to close or skip this wizard and go directly to the
Cloudflare dashboard home page where the Account ID is visible.

**How to navigate away:**
- Look for a Cloudflare logo or home icon in the top left corner of
  the page and click it to return to the dashboard home
- OR look for a breadcrumb or "Back" link
- OR navigate directly to https://dash.cloudflare.com

**What we actually need from Cloudflare at this stage:**
1. The Account ID (visible on the dashboard home page right sidebar)
2. An API Token (created via profile → API Tokens)
Neither of these requires interacting with this creation wizard at all.

**Note for the appendix:** The entire onboarding flow (Screens 1–6)
can be bypassed by going directly to https://dash.cloudflare.com after
account creation and email verification. Students should be told to
skip the onboarding wizard once they reach it.

**Running count of appendix corrections: now 9.**

---

### Entry 045 — Cloudflare dashboard home: layout documented; Account ID location clarified
**Date:** Session 2  
**Type:** Live implementation — discrepancies identified and resolved

**Dashboard home page — what was actually seen:**
- No Cloudflare logo visible for navigation (correction needed in appendix)
- Direct navigation to https://dash.cloudflare.com worked correctly
- Page heading: "[email]'s Account" (confirms correct account)
- Center shows product cards:
  - Domains (with "Onboard a domain" button)
  - Workers and Pages (with "Start building" button)
  - Zero Trust Security (with "Get started" button)
- "Next steps" section with three suggestions (can be ignored)
- Left sidebar shows "Manage account" with sub-items including
  "Account API tokens"
- No clearly labelled "Account ID" visible in right sidebar as
  written instructions described

**Account ID location — correction needed:**
The written instructions state the Account ID appears in the right-hand
sidebar of the dashboard home page. This is not what was seen. The
Account ID is more likely found in one of these locations depending on
the current Cloudflare UI version:
- Under "Manage account" in the left sidebar
- In the URL itself when viewing the account: the long hex string in
  https://dash.cloudflare.com/ACCOUNT-ID-HERE/...
- In account settings

**Immediate action to find the Account ID:**
Look at the browser address bar right now. The URL should read something
like: https://dash.cloudflare.com/a1b2c3d4e5f6.../home
The long hex string between /dash.cloudflare.com/ and /home IS the
Account ID. Copy it from there.

**Also noted:** "Account API tokens" is visible under "Manage account"
in the left sidebar — this is where we will create the Cloudflare API
token in the next step, so that location is confirmed.

**Running count of appendix corrections: now 11.**
(Added: logo navigation unreliable; Account ID not in right sidebar
as described — found in URL instead)

---

### Entry 046 — Account ID confirmed; Workers & Pages location corrected
**Date:** Session 2  
**Type:** Live implementation — discrepancies identified

**Account ID — confirmed found in browser title/URL.**
The page title reads "Account home | Perelgut@gmail.com's Account | Cloudflare"
which confirms the correct account is active. Account ID location via
the URL address bar confirmed as the reliable method.

**Workers & Pages — location correction needed:**
- Written instructions say: "In the left sidebar, click Workers & Pages"
- Actual UI shows: Workers & Pages is a **box in the centre of the
  dashboard home page**, not a left sidebar item. It has a "+" button
  in its top right corner and a "Start building" button.
- Correction needed in appendix: Describe Workers & Pages as a card
  on the dashboard home, not a sidebar item. Students access it by
  clicking the "+" or "Start building" button on that card, or by
  clicking the card title itself.

**Important note on "Start building" button:**
Students must NOT click "Start building" here — that opens the manual
Worker creation wizard we already encountered and want to avoid. The
"+" button is also likely to open the same wizard. At this stage we
only need to confirm Workers & Pages is visible — we do not click into
it yet.

**Two immediate tasks remaining before leaving Cloudflare for now:**
1. Copy the Account ID from the browser address bar
2. Create the API token (via Manage account → Account API tokens)

**Running count of appendix corrections: now 12.**

---

### Entry 047 — Cloudflare API Tokens page reached; token creation in progress
**Date:** Session 2  
**Type:** Live implementation milestone

**API Tokens page — successfully reached.**
- Navigation path confirmed: Manage account → Account API tokens
- Page shows "No API tokens" — correct for a new account
- This confirms we are on the right page and ready to create the token

**Appendix correction needed:**
Written instructions say to navigate via profile icon → My Profile →
API Tokens. Actual path is via the left sidebar: Manage account →
Account API tokens. Both may work but the sidebar path is what was
found in practice — the appendix should document this path as primary.

**Running count of appendix corrections: now 13.**

**Next action:** Create the API token. Instructions being provided live.

---

### Entry 048 — Cloudflare API token: permissions screen has many options
**Date:** Session 2  
**Type:** Live implementation — discrepancy identified; awaiting screen description

**API Token template screen — "Edit Cloudflare Workers":**
- "Use template" button successfully clicked
- Screen shows a Permissions section with a large number of choices
- This is more complex than the written instructions described

**Written instructions said:** "The template pre-fills the correct
permissions. Do not change anything."

**What was actually encountered:** A permissions screen with many
choices visible, implying the template does NOT simply pre-fill
everything and hide the details — it shows them for review/modification.

**Critical principle for this step:**
The "Edit Cloudflare Workers" template pre-selects the correct
permissions automatically. Students should NOT change anything —
the pre-selected values are exactly right for deploying a Worker
via GitHub Actions. The many choices visible are simply showing
what the template has already selected, not asking the student
to choose.

**Awaiting:** Full description of what is pre-selected so we can
document the correct state for the appendix and confirm nothing
needs to be changed.

**Running count of appendix corrections: now 14.**
(Written instructions understated the complexity of this screen —
needs fuller description of what students will see)

---

### Entry 049 — Cloudflare API token permissions: pre-selected values documented
**Date:** Session 2  
**Type:** Live implementation — permissions confirmed correct

**API token permissions screen — pre-selected values confirmed:**

The "Edit Cloudflare Workers" template pre-selects the following
permissions (partial list as seen on screen):

| Resource type | Resource | Access level |
|--------------|----------|-------------|
| Account | Workers KV Storage | Edit |
| Account | Workers Scripts | Edit |
| Zone | Workers Routes | Edit |
| Account | Account Settings | Read |
| (additional rows below) | | |

**Assessment:** These are exactly the correct permissions for deploying
a Cloudflare Worker via GitHub Actions (Wrangler). Specifically:
- Workers Scripts/Edit — allows Wrangler to deploy the Worker code
- Workers KV Storage/Edit — allows Wrangler to manage KV storage
- Workers Routes/Edit — allows Wrangler to set up routing
- Account Settings/Read — allows Wrangler to read account configuration

**Instruction for students:** Do not change any of these pre-selected
values. The template has already chosen the minimum required permissions.
Adding more permissions is unnecessary; removing any will cause the
deployment to fail.

**Token name field:** Confirmed present at top of page, pre-filled
with "Edit Cloudflare Workers". Students may rename it to something
more descriptive like "meeting-prep-agent-deploy" but this is optional.

**Next actions to document:**
- What appears in the Account Resources and Zone Resources sections
- What buttons appear at the bottom
- What happens after clicking Continue / Create token

**Running count of appendix corrections: 14 — no new ones this step,
but the permissions table above needs to be added to the appendix
so students know what "correct" looks like.**

---

### Entry 050 — Cloudflare API token: additional sections documented
**Date:** Session 2  
**Type:** Live implementation — sections documented

**Token name:** Renamed to `meeting-prep-agent-deploy`. Confirmed this
is optional but recommended for clarity.

**Additional sections below Permissions — all three need appendix coverage:**

**Zone Resources section:**
Three fields in a row:
- Field 1: Include / Exclude dropdown — leave as "Include"
- Field 2: All Zones / Specific Zone dropdown — leave as "All Zones"
- Field 3: A greyed-out field that cannot be changed — this is correct;
  it becomes active only if "Specific Zone" is selected in field 2.
  Since we are not targeting a specific domain, "All Zones" with the
  third field greyed out is exactly right.

**Client IP Address Filtering section:**
- Leave blank — this is an optional security restriction that limits
  which IP addresses can use the token. Not needed for this project
  since GitHub Actions runs from variable IP addresses.

**TTL (Time To Live) section:**
- Leave blank — this sets an expiry date on the token. Leaving it
  blank means the token does not expire. For a course project this
  is fine; a production application might set a 90-day TTL.

**Instruction for all three sections:** Leave everything at its
default value. Do not add IP filtering. Do not set a TTL.

**Running count of appendix corrections: now 15.**
(Three additional sections not documented at all in original appendix)

**Next action:** Scroll to the bottom of the page and describe
the buttons present.

---

### Entry 051 — Cloudflare API token: "Continue to summary" button confirmed
**Date:** Session 2  
**Type:** Live implementation — button label documented

**Button label confirmed:** "Continue to summary" — not "Create token"
as the written instructions imply. Correction needed in appendix.

**Instructor clicked "Continue to summary". Awaiting description of
the summary page.**

---

### Entry 052 — Cloudflare API token: Zone Resources field is required; instructions incorrect
**Date:** Session 2  
**Type:** Live implementation — critical error in instructions identified

**Problem encountered:** Clicking "Continue to summary" produced a
validation error: "Choose a zone resource" — the Zone Resources field
is required and cannot be left at its default state as previously
instructed.

**This contradicts Entry 050** which stated "Leave everything at its
default value." That instruction was wrong. Correction needed.

**Resolution options — investigating:**
The Zone Resources section has three fields:
- Include / Exclude
- All Zones / Specific Zone
- Greyed-out third field

The error suggests "All Zones" with a greyed-out third field is not
being accepted as a valid selection. Two possible fixes:

**Option A:** The third greyed-out field needs to become active.
If the second dropdown currently shows "All Zones", try changing it
to "Specific Zone" — this may activate the third field, at which
point the zone can be specified. However for our Worker we don't
need a specific zone.

**Option B:** The "All Zones" selection itself needs to be confirmed
differently — there may be an "Add" button or similar that must be
clicked to confirm the zone resource selection.

**Immediate instruction:**
Look at the Zone Resources row carefully. Is there an **"Add"** button,
a **"+"** button, or any other button adjacent to the three fields that
might need to be clicked to confirm the selection? Also check whether
changing the second dropdown from "All Zones" to something else
activates the third field.

Describe exactly what you see in the Zone Resources row including
any buttons we may have missed.

**Running count of appendix corrections: now 16.**
(Zone Resources is required, not optional as previously documented)

---

### Entry 053 — Cloudflare API token: Zone Resources has "+ Add more" button
**Date:** Session 2  
**Type:** Live implementation — resolution identified

**Resolution found:** The Zone Resources row has a **"+ Add more"**
button that was not previously noticed. This is almost certainly the
mechanism required to confirm the zone resource selection and satisfy
the validation.

**Hypothesis:** Clicking "+ Add more" will either:
A) Activate/confirm the existing "All Zones" selection so it is
   recognised as a valid entry, OR
B) Add a new zone resource row that can be filled in

**Instructor is clicking "+ Add more". Awaiting result.**

**Appendix correction confirmed:** The Zone Resources instruction must
include the step "Click '+ Add more' to confirm the zone resource
selection." The current instructions make no mention of this button
at all.

**Running count of appendix corrections: now 17.**

---

### Entry 054 — Cloudflare API token: Zone Resources second row resolves validation
**Date:** Session 2  
**Type:** Live implementation — resolution confirmed

**What "+ Add more" produced:**
A second Zone Resources row appeared with three pre-set fields:
- Field 1: Include (pre-selected)
- Field 2: All Zones (pre-selected)
- Field 3: One option available — the user's Cloudflare account name
  (in this case "Perelgut@gmail.com's Account")

**Resolution:** Select the account name in the third field of the
new row. This satisfies the "Choose a zone resource" validation
requirement.

**Correct Zone Resources configuration — now fully documented:**
The section requires TWO rows:
- Row 1: Include / All Zones / (greyed out — leave as is)
- Row 2: Added via "+ Add more" → Include / All Zones /
  [your account name] ← select this

**Plain English explanation for students:**
Cloudflare requires you to explicitly confirm which account's zones
the token can access. The first row sets the scope to "all zones"
but doesn't specify which account. The second row, created by
clicking "+ Add more", lets you select your account — completing
the specification. Both rows together mean "all zones within my
account."

**Appendix correction — full corrected Zone Resources instruction:**
1. The Zone Resources section shows one row pre-filled with
   Include / All Zones / (greyed out third field)
2. Click "+ Add more" — a second row appears
3. In the third field of the new row, click the dropdown and
   select your account name
4. Now click "Continue to summary"

**Running count of appendix corrections: now 18.**

**Instructor is selecting account name and clicking Continue to
summary. Awaiting description of summary page.**

---

### Entry 055 — Cloudflare API token: summary page documented; ready to create
**Date:** Session 2  
**Type:** Live implementation — summary page fully documented

**Summary page — full content recorded:**

Page heading: "Manage account → Account API tokens → Edit token →
[token name] API token summary"

Informational note on page: "This API token will affect the below
accounts and zones, along with their respective permissions. Not all
APIs are guaranteed to support usage of Account API Tokens. Supported
APIs are listed in the developer documentation."

**Permissions summary as shown:**

Account: Perelgut@gmail.com's Account
- Workers KV Storage: Edit
- Workers Scripts: Edit
- Account Settings: Read
- Workers Tail: Read
- Workers R2 Storage: Edit
- Cloudflare Pages: Edit
- Workers Builds Configuration: Edit
- Workers Agents Configuration: Edit
- Workers Observability: Edit
- Containers: Edit

Zones: All zones
- Workers Routes: Edit

**Buttons at bottom:** Cancel | Create Token

**Assessment of permissions:** The template pre-selected significantly
more permissions than expected — the original instructions only mentioned
Workers Scripts, KV Storage, Routes, and Account Settings. The actual
template includes Workers Tail, R2 Storage, Pages, Builds Configuration,
Agents Configuration, Observability, and Containers. These are all
Workers-related permissions from the "Edit Cloudflare Workers" template.
They are not harmful — they simply grant broader edit access across the
Workers product suite. All are appropriate for this project and no
changes are needed.

**Note for appendix:** The permissions list is longer than originally
documented. Students should be told: "The summary will show a list of
Workers-related permissions across your account and all zones. This
is correct — do not be concerned by the length of the list."

**Token name typo noted:** The summary shows "eeting-prep-agent-deploy"
— the leading "m" appears to have been dropped. This may be a display
truncation artefact or a genuine typo when the token was renamed.
Instructor should verify the name is correct before clicking Create Token.

**Running count of appendix corrections: now 19.**

---

### Entry 056 — Cloudflare API token: created; awaiting confirmation of token display screen
**Date:** Session 2  
**Type:** Live implementation milestone

**Token name typo fixed.** "meeting-prep-agent-deploy" confirmed correct.

**"Create Token" clicked.** Token is being created. Awaiting description
of the token display screen — this is the one-time-only display of the
token value. Instructor must copy it immediately before navigating away.

---

### Entry 057 — Token display screen documented; security practice note recorded
**Date:** Session 2  
**Type:** Live implementation milestone + teaching note

**Token creation success screen — fully documented:**
Page content:
- Heading: "[token name] API token was successfully created"
- Warning: "Copy this token to access the Cloudflare API. For
  security this will not be shown again."
- Token value displayed (one-time only)
- "Test this token" section with a sample curl command that includes
  both the Account ID and the token value for verification

**Context clarification:** The token and Account ID values were shared
in the chat when describing the screen. This is a private Claude.ai
conversation and the risk is minimal — no action required on the
credentials. The instructor confirmed this and did not roll the token.

**Teaching note for the appendix — professional habit, not emergency:**
When writing the appendix instructions for this screen, include a
note that in professional practice, credential values should go
directly to their destination (GitHub Secrets, a password manager)
rather than through any intermediate text. This is a good habit to
build regardless of the channel — framed as professional practice,
not a warning about Claude.ai specifically.

**What "Test this token" shows:**
A curl command containing:
- The API endpoint: https://api.cloudflare.com/client/v4/accounts/
  [Account ID]/tokens/verify
- An Authorization header with the token value
Students do not need to run this curl command — it is optional
verification. The token will be tested implicitly when GitHub Actions
runs the deployment workflow for the first time.

**Appendix instruction for this screen:**
1. The token value appears in a box — copy it immediately
2. Paste it into Notepad (or directly into GitHub Secrets)
3. Do not run the curl test unless you want to verify — it is optional
4. Once copied, click the button to proceed (likely "Go to API Tokens"
   or similar — document exact label when seen)
5. The token value cannot be retrieved again after leaving this page —
   if lost, the token must be rolled (regenerated) from the API Tokens
   list

**Running count of appendix corrections: now 20.**

---

### Entry 058 — Token display screen: exit button labelled "View all API tokens"
**Date:** Session 2  
**Type:** Live implementation — button label documented

**Exit button on token display screen:** "View all API tokens"
— not "Go to API Tokens", "Done", or "Return to dashboard" as
anticipated. Correction needed in appendix.

**Appendix instruction for this screen — updated:**
After copying the token value, click **"View all API tokens"**
to return to the API tokens list. Confirm the new token
`meeting-prep-agent-deploy` is listed with an "Active" status.

**Running count of appendix corrections: now 21.**

**Next steps:**
1. Get Anthropic API key from console.anthropic.com
2. Add all three secrets to GitHub:
   - ANTHROPIC_API_KEY
   - CLOUDFLARE_API_TOKEN (in Notepad)
   - CLOUDFLARE_ACCOUNT_ID (from URL at dash.cloudflare.com)

---

### Entry 059 — Cloudflare API tokens list: token confirmed active
**Date:** Session 2  
**Type:** Live implementation milestone

**API tokens list — confirmed:**
- Token name: `meeting-prep-agent-deploy`
- Permissions: listed (Workers-related permissions as documented in Entry 055)
- Resources: listed (account + all zones as configured)
- Status: **Active**

**What success looks like at this step:**
The token list shows the token name, a summary of its permissions and
resources, and a green "Active" status indicator. This confirms the
token was created correctly and is ready to use.

**Appendix instruction confirmed:** After clicking "View all API tokens",
students should see their token listed with Active status. If the status
shows anything other than Active, the token creation should be repeated.

**Cloudflare setup is now fully complete.** All values needed for GitHub
Secrets are available:
- CLOUDFLARE_ACCOUNT_ID — from browser URL at dash.cloudflare.com
- CLOUDFLARE_API_TOKEN — in Notepad (the meeting-prep-agent-deploy token)

**Next step:** Get Anthropic API key from console.anthropic.com

---

### Entry 060 — Anthropic API key obtained
**Date:** Session 2  
**Type:** Live implementation milestone

**Anthropic API key: obtained successfully.**
Key format confirmed: begins with `sk-ant-` — correct format for
Anthropic API keys. Full value safely in Notepad only.

**Note:** The instructor shared only the prefix and suffix in chat —
the full key was not exposed. Good practice observed.

**Appendix gap identified:** The Anthropic console UI was not
documented during this step — the instructor obtained the key
without describing each screen. The appendix section on getting
an Anthropic API key needs to be written based on the known
console.anthropic.com interface. This will be flagged as a
section requiring live verification in a future session.

**All three secrets now in hand:**
- ANTHROPIC_API_KEY — in Notepad (sk-ant-...format)
- CLOUDFLARE_API_TOKEN — in Notepad (meeting-prep-agent-deploy)
- CLOUDFLARE_ACCOUNT_ID — from Cloudflare dashboard URL

**Next step:** Add all three secrets to the GitHub repository.
Navigate to: github.com → meeting-prep-agent repository →
Settings → Secrets and variables → Actions

---

### Entry 061 — GitHub Secrets page reached; adding secrets in progress
**Date:** Session 2  
**Type:** Live implementation milestone

**GitHub Secrets page — successfully reached.**
Navigation path confirmed: Repository → Settings → Secrets and
variables → Actions → "New repository secret" button visible.

**Appendix correction needed:**
Written instructions say the path is Settings → Secrets and variables
→ Actions. This appears to be correct based on what was reached.
The "New repository secret" button label is also confirmed.

**Adding three secrets in sequence:**
1. ANTHROPIC_API_KEY — in progress
2. CLOUDFLARE_API_TOKEN — to follow
3. CLOUDFLARE_ACCOUNT_ID — to follow

Awaiting confirmation of what the form looks like and what the
page shows after each secret is saved.

---

### Entry 062 — GitHub Secrets: ANTHROPIC_API_KEY added; documenting result page
**Date:** Session 2  
**Type:** Live implementation milestone

**ANTHROPIC_API_KEY secret: created successfully.**

Awaiting description of the secrets list page to document:
- How a saved secret is displayed (name, date, update/delete buttons)
- Whether "New repository secret" remains available to add more
- What "success looks like" for students at this step

This will complete the appendix documentation for the GitHub Secrets
page layout.

---

### Entry 063 — GitHub Secrets list confirmed; details being documented
**Date:** Session 2  
**Type:** Live implementation — awaiting full description

**Confirmed:** ANTHROPIC_API_KEY appears in the secrets list and
"New repository secret" button is still visible. Awaiting description
of exactly what the listing shows (columns, buttons, dates, indicators)
for full appendix documentation.

---

### Entry 064 — GitHub Secrets list layout fully documented
**Date:** Session 2  
**Type:** Live implementation — page layout confirmed

**Secrets list page layout — fully documented:**
- Column 1: **Name** — shows the secret name (e.g. ANTHROPIC_API_KEY)
- Column 2: **Last Updated** — shows the date the secret was last set
- Per-row actions: **Edit** and **Delete** buttons/icons

**Note:** The secret value itself is never shown — only the name and
last-updated date. This is by design — GitHub never reveals secret
values after they are saved. The Edit button allows replacing the
value with a new one without seeing the old value.

**What success looks like at this step:**
ANTHROPIC_API_KEY listed with today's date in Last Updated column
and Edit/Delete options visible. No error messages.

**Appendix instruction confirmed and corrected:**
Original instructions did not describe what the secrets list looks
like after adding a secret. Add this description so students know
what to expect.

**Running count of appendix corrections: now 22.**

**Next action:** Add the second secret. Click "New repository secret"
and add CLOUDFLARE_API_TOKEN.

---

### Entry 065 — All three GitHub Secrets added successfully
**Date:** Session 2  
**Type:** Live implementation milestone

**All three repository secrets added:**
- ANTHROPIC_API_KEY — added ✅
- CLOUDFLARE_API_TOKEN — added ✅
- CLOUDFLARE_ACCOUNT_ID — added ✅

All three appear in the secrets list with Name and Last Updated
columns and Edit/Delete options per row.

**What success looks like at this step:**
Three secrets listed, all with today's date in Last Updated.
No error messages. Secret values not visible — only names shown.

**Prerequisite checklist item 3.6 complete:**
"You have added all three secrets to GitHub" — confirmed done.

**Summary of completed prerequisites so far:**
- ✅ GitHub account (existing)
- ✅ Repository created: meeting-prep-agent (public, with README)
- ✅ GitHub Pages enabled (Source: GitHub Actions)
- ✅ Cloudflare account created
- ✅ Cloudflare API token created: meeting-prep-agent-deploy (Active)
- ✅ Cloudflare Account ID noted
- ✅ Anthropic API key obtained
- ✅ All three GitHub Secrets added

**Remaining prerequisites:**
- VS Code installation (task tracker Phase 0, Task 7)
- GitHub Desktop installation and repository clone
- GitHub Projects board creation

**Running count of appendix corrections: 22**
(No new corrections this step — GitHub Secrets UI matched instructions)

---

### Entry 066 — Process correction: task tracker not being updated during live session
**Date:** Session 2  
**Type:** Process correction — instructor-directed

**Issue identified:** During the live prerequisites walkthrough (Entries
038–065), no instruction was given to update the task tracker after
each completed task. This contradicts the purpose of the task tracker
and the thoroughness directive from Entry 039.

**Correction:** The task tracker must be updated after every completed
task — not just the project documentation diary. Going forward, every
completed live step will include an explicit instruction to open the
task tracker and mark the relevant task as Done.

**Tasks completed during this session that need to be marked Done
in the task tracker immediately:**

Phase 0:
- Task p0-t1: Create GitHub account and repository ✅
- Task p0-t2: Enable GitHub Pages ✅
- Task p0-t3: Create Cloudflare account ✅
- Task p0-t4: Get Anthropic API key ✅
- Task p0-t5: Get Cloudflare API token ✅
- Task p0-t6: Add secrets to GitHub repository ✅
- Task p0-t7: Install VS Code and clone repository — VS Code installed;
  clone not yet done ⏳

**Standing instruction recorded:** After each live task is confirmed
complete, explicitly instruct the instructor to open task-tracker.html
and mark the task as Done before proceeding to the next task.

---

### Entry 067 — Live walkthrough: cloning the repository with GitHub Desktop
**Date:** Session 2  
**Type:** Live implementation — verifying appendix instructions

**Context:** VS Code already installed. GitHub Desktop not yet confirmed
as installed. Proceeding to walk through the cloning steps live,
verifying the appendix instructions against the actual UI on Windows.

Appendix Section 5 (GitHub Desktop) will be verified step by step.
Any discrepancies will be noted and corrected.

---

### Entry 068 — GitHub Desktop: already installed, signed in, repository visible
**Date:** Session 2  
**Type:** Live implementation — appendix discrepancy identified

**GitHub Desktop status:**
- Already installed — installation steps not verified live this session
- Already signed in to GitHub account
- Repository list visible on opening, including `meeting-prep-agent`

**Appendix discrepancy identified:**
The appendix cloning instructions start with "Open GitHub Desktop" and
then "Click File → Clone Repository" — implying the user starts from
a blank state. In practice, if GitHub Desktop is already signed in and
the repository exists on GitHub, the repository may already appear in
the list on the main screen and can be cloned directly from there
without going through File → Clone Repository.

**Appendix correction needed:**
Add a note before the cloning steps: "If GitHub Desktop is already
signed in and shows a list of repositories, your `meeting-prep-agent`
repository may already be visible. In that case, click it directly
in the list and proceed to step 4 (choose local folder)."

**Running count of appendix corrections: now 23.**

**Next action:** Clone the repository. Since meeting-prep-agent is
visible in the list, click it and document what happens next.

---

### Entry 069 — GitHub Desktop: Clone dialog opens with three tabs
**Date:** Session 2  
**Type:** Live implementation — appendix correction identified

**Clone a repository dialog — confirmed:**
Three tabs displayed:
- GitHub.com
- GitHub Enterprise
- URL

**Appendix correction needed:**
The appendix says "Click File → Clone Repository" then "Click the
GitHub.com tab." This is correct — but the dialog opens with these
three tabs regardless of whether the user clicked File → Clone
Repository from the menu or clicked a repository in the list.
The list click does NOT clone directly — it opens the same dialog.

Correction: Clarify that clicking a repository in the list opens
the Clone dialog, same as File → Clone Repository. Both paths lead
to the same place.

**Current state:** Instructor is on the GitHub.com tab (or needs to
click it). The repository list on that tab should show meeting-prep-agent.

**Running count of appendix corrections: now 24.**

**Next instruction:** Click the **GitHub.com** tab. The meeting-prep-agent
repository should appear in the list. Describe what you see.

---

### Entry 070 — Repository already cloned; VS Code already open with folder structure
**Date:** Session 2  
**Type:** Live implementation — significant finding

**Finding:** The meeting-prep-agent repository was already cloned to
the local computer. GitHub Desktop shows:
- "No uncommitted changes in this repository"
- Options: Open in Visual Studio Code / Show in Explorer / View on GitHub

This means:
1. The clone step was already completed (likely when the repository
   was created and GitHub Desktop automatically detected it)
2. VS Code is already open with the folder structure from the
   implementation documents
3. The repository is ready for files to be added

**Additional finding — folder structure already created:**
The instructor has VS Code open with the folder structure described
in the implementation instructions already in place. This is a
significant step forward — Phase 1 tasks are partially complete.

**Appendix correction needed:**
The clone walkthrough assumed a fresh state. In practice, GitHub
Desktop may automatically clone or detect a repository that was
just created, especially if the user is already signed in. Add a
note: "If GitHub Desktop already shows your repository with 'No
uncommitted changes', the clone is complete — proceed to opening
the folder in VS Code."

**What "ready to begin" looks like — confirmed:**
- GitHub Desktop shows the repository with no uncommitted changes ✅
- VS Code is open with the project folder ✅
- All three GitHub Secrets are in place ✅
- This matches the "What Ready to Begin Looks Like" checklist in
  the Project Plan exactly

**Running count of appendix corrections: now 25.**

**Task tracker updates due:**
- p0-t7: Install VS Code and clone repository → **Done** ✅
- p1-t1: Create folder structure → **Done** ✅ (already created)

Please open the task tracker and mark both as Done.

---

### Entry 071 — Folder structure verified; one anomaly identified
**Date:** Session 2  
**Type:** Live implementation — structure confirmed with one correction needed

**Folder structure in VS Code — confirmed:**
- `.github/workflows` ✅
- `css` ✅
- `docs` ✅ — already contains documentation files
- `js` ✅
- `tasks` ✅ — task-tracker.html already in use
- `worker` ✅

**One anomaly:** A folder named `meeting-prep-agent` appears inside
the repository. This should NOT be there — the repository root IS
the meeting-prep-agent folder. A folder of the same name inside it
suggests the repository was cloned into a parent folder and then
the inner folder was also opened, or the folder structure was
created with an extra nesting level.

**This needs to be investigated.** The `meeting-prep-agent` subfolder
should not exist. If it contains files, those files are in the wrong
place and won't be served correctly by GitHub Pages, which serves
from the repository root.

**Immediate action:** Click on the `meeting-prep-agent` subfolder in
VS Code Explorer and tell me:
1. What files or folders are inside it?
2. Is it empty, or does it contain content?

If it is empty — delete it.
If it contains files — those files need to be moved up to the
repository root before proceeding.

**Task tracker updates confirmed:**
- p0-t7: Done ✅
- p1-t1: Done ✅ (pending resolution of the extra folder)

**Running count of appendix corrections: now 25** — no new corrections
this step, but the extra folder issue needs resolution.

---

### Entry 072 — README.md in wrong location; needs to be moved to repository root
**Date:** Session 2  
**Type:** Live implementation — structural error identified and resolved

**Finding:** The `meeting-prep-agent` subfolder contains only `README.md`.
This is the README that was created when the GitHub repository was
set up with "Add a README file" checked. It ended up in a subfolder
instead of the repository root.

**Root cause:** When GitHub creates a repository with a README, the
file is created at the root of the repository on GitHub. Somewhere
during the local setup a `meeting-prep-agent` subfolder was created
inside the already-named repository folder, and the README ended up
there — or the folder was created inadvertently.

**Correct state:** README.md must be at the repository root, i.e.
directly inside the `meeting-prep-agent` folder that GitHub Desktop
manages — not inside a subfolder of the same name.

**Resolution steps being provided:**
1. In VS Code, drag README.md from the meeting-prep-agent subfolder
   up to the repository root
2. Delete the now-empty meeting-prep-agent subfolder
3. Verify the structure in GitHub Desktop — it should show README.md
   as a changed/moved file

**Appendix note to add:** When creating the folder structure, never
create a folder with the same name as the repository itself inside
the repository. The repository folder IS the project root.

**Running count of appendix corrections: now 26.**

---

### Entry 073 — README.md moved to repository root; structure correct
**Date:** Session 2  
**Type:** Live implementation milestone

**Resolution confirmed:** README.md successfully moved from the
`meeting-prep-agent` subfolder to the repository root. The empty
subfolder deleted. Repository structure is now correct.

**Correct final structure confirmed:**
```
meeting-prep-agent/     ← repository root
  ├── .github/
  │   └── workflows/
  ├── css/
  ├── docs/
  ├── js/
  ├── tasks/
  ├── worker/
  └── README.md
```

**Next action:** Commit this fix to GitHub.
Commit message to use: `Fix repository structure — move README.md to root`

**Task tracker update due after commit:**
- p1-t1: Create folder structure — confirm Done once commit succeeds

---

### Entry 074 — Question: how to sync VS Code with GitHub repository
**Date:** Session 2  
**Type:** Live implementation — teaching moment; appendix gap identified

**Question asked:** "How do I make my project match my GitHub repository?"

**Context:** There may be files on GitHub (such as the README.md that
was created when the repository was set up) that are not yet reflected
in the local VS Code workspace, or vice versa. The student needs to
understand the relationship between the three locations:
1. GitHub (remote — the authoritative copy online)
2. Local folder on computer (working copy — where VS Code edits)
3. GitHub Desktop (the bridge — syncs between 1 and 2)

**Appendix gap identified:** The appendix explains committing and
pushing (local → GitHub) but does not explain pulling (GitHub → local).
This is the "fetch" or "pull" operation in GitHub Desktop.

**Resolution being provided live.**

---

### Entry 075 — Git commands in VS Code terminal: documented as alternative to GitHub Desktop
**Date:** Session 2  
**Type:** Teaching moment + appendix addition

**Instructor preference:** Use Git commands directly in VS Code terminal
rather than GitHub Desktop. This is a valid and often preferred approach
for developers comfortable with the command line.

**Appendix addition needed:** Add a section "Using Git in VS Code
terminal" as an alternative to GitHub Desktop. This is particularly
relevant for students who become comfortable with VS Code and want
to stay in one tool.

**Git commands being documented live.**

---

### Entry 076 — git status: "not a git repository" — terminal in wrong folder
**Date:** Session 2  
**Type:** Live implementation — common error documented

**Error encountered:** `git status` returned "not a git repository"

**Cause:** The VS Code terminal opened in a folder that is not the
repository root — likely the user's home directory or a parent folder.
Git only recognises a repository when the terminal is pointed at the
folder that contains the `.git` hidden folder, which is the repository
root.

**Resolution:** Navigate the terminal to the correct folder using
the `cd` command, OR open the folder correctly in VS Code so the
terminal defaults to the right place.

**Appendix addition needed:** Add a note explaining this error and
how to resolve it — it is one of the most common first-time Git
mistakes.

**Running count of appendix corrections: now 27.**

---

### Entry 077 — Folder structure: nested meeting-prep-agent accepted as working setup
**Date:** Session 2  
**Type:** Design decision — instructor-directed

**Decision:** The local folder structure is:
`...Project/meeting-prep-agent/meeting-prep-agent/`

The inner `meeting-prep-agent` folder is the actual Git repository
root — it contains the `.git` folder and all project files, and
Git commands work correctly from within it. The outer folder is
simply a parent container.

**This is acceptable and will not be changed.** Attempting to
restructure a working Git setup mid-session introduces more risk
than the nested naming is worth. The application will work
correctly regardless of what the parent folder is named.

**What this means for students:**
When GitHub Desktop clones a repository, it creates a folder with
the repository name inside whatever parent folder the user chooses.
If the user had already created a folder called `meeting-prep-agent`
as the parent, the clone produces the nested structure. Students
should be advised to clone into a neutral parent folder such as
`Documents/GitHub/` or `Documents/Projects/` rather than a folder
named after the repository itself.

**Appendix addition needed:** Add a note to the cloning instructions:
"Choose a parent folder that is NOT named after your repository.
For example, clone into `Documents/Projects/` — GitHub Desktop will
create the `meeting-prep-agent` folder inside it automatically."

**Running count of appendix corrections: now 28.**

**Current working state:**
- Git repository: `...Project/meeting-prep-agent/meeting-prep-agent/`
- Git commands work from this folder ✅
- VS Code terminal pointed at this folder ✅
- Proceeding with commit and push of README.md fix

---

### Entry 078 — First commit and push successful
**Date:** Session 2  
**Type:** Live implementation milestone

**git add . / git commit / git push — all completed successfully.**

No authentication issues on push. Git commands work correctly from
the VS Code terminal pointed at the inner repository folder.

**What success looks like at this step:**
- `git add .` — no output (normal)
- `git commit -m "..."` — shows something like:
  `[main xxxxxxx] Fix repository structure — move README.md to root`
- `git push` — shows something like:
  `To https://github.com/username/meeting-prep-agent`
  `main -> main`

**Task tracker updates due:**
- p1-t1: Create folder structure in repository → **Done** ✅
- p1-t7: First commit and push to GitHub → **Done** ✅

Please open the task tracker and mark both as Done.

**Confirmed working Git workflow for this project:**
```
Edit files in VS Code
    ↓
git add .
git commit -m "description"
git push
    ↓
Changes live on GitHub
```

**Repository is now in a clean, committed state. Ready to begin
Phase 1 file creation — starting with index.html.**

---

### Entry 079 — Appendix A: full rewrite complete; all 28 corrections applied
**Date:** Session 2  
**Type:** Documentation correction — major rewrite complete

**Sections rewritten:**

**Section 6 — Cloudflare (complete rewrite):**
- "Creating a Cloudflare account": button label corrected ("Start for
  Free" not "Sign up"); "Under Attack?" button explained and dismissed;
  Google sign-in option added and recommended; all 6 onboarding
  questions documented with correct answers; Worker creation wizard
  correctly identified as something to skip
- "Finding your Account ID": corrected from "right sidebar" to
  browser address bar URL method; Notepad instructions added
- "Navigating to Workers & Pages": corrected from left sidebar item
  to centre dashboard card; warning added not to click "Start building"
- "Obtaining a Cloudflare API Token": navigation corrected from
  profile icon → My Profile to Manage account → Account API tokens;
  full permissions list documented; Zone Resources two-row configuration
  fully explained with "+ Add more" step; token name field documented;
  Client IP / TTL sections documented as leave blank; "Continue to
  summary" button label confirmed; full permissions summary documented;
  "View all API tokens" exit button confirmed; credential handling
  note added (Notepad/password manager only)

**Section 5 — GitHub Desktop (significant additions):**
- Cloning: parent folder warning added (do not use same name as repo);
  "No uncommitted changes" success confirmation documented; three-tab
  clone dialog documented
- Git terminal alternative: full new subsection added covering terminal
  opening, "not a git repository" error and fix, four essential
  commands with table, standard workflow

**Troubleshooting — three new entries:**
- "not a git repository" error and resolution
- Nested folder structure and how to work with it
- git push credential prompt and Personal Access Token solution

**Lost token troubleshooting:** Updated to reflect correct navigation
path (Manage account → Account API tokens, not profile icon).

**Total corrections applied: 28**
All live session findings from Entries 041–078 are now reflected
in the appendix.

---

*Future entries appended below as work continues.*

---

*Future entries appended below as work continues.*

---

## Project Overview

The Meeting Prep Agent is an AI-powered application that helps users prepare for
meetings by automatically researching attendees, summarizing relevant news,
suggesting talking points and questions, and delivering everything as a
downloadable briefing document.

---

## Architecture Summary

```
UI (React — runs in browser)
 ├── Mode selector: Calendar | Manual entry
 ├── [Calendar mode] → Google Calendar MCP → fetch upcoming events
 ├── [Manual mode] → text input fields
 ├── Private context field (free text — NOT included in briefing output)
 ├── "Generate Briefing" button
 │
 ├── PHASE 1: Topic Discovery + Clarification Requests (API call #1)
 │    └── Claude receives: meeting details + private user context (flagged)
 │        Returns two structured lists:
 │          A) Research topics, each tagged:
 │               news_topic  | attendee | past_meeting | user_context
 │          B) Clarification requests — information the agent needs but
 │               cannot access itself (files, pastes, internal docs)
 │
 ├── UPFRONT CLARIFICATION PANEL (resolves before queue opens)
 │    ├── All clarification requests listed together in one panel
 │    ├── Each request shows: what is needed + why it is relevant
 │    ├── Three actions per request:
 │    │     [Provide now → upload/paste]  [Not applicable]  [Postpone]
 │    └── User resolves all requests, then research queue opens
 │
 ├── PHASE 2: Interactive Research Queue (UI-driven loop)
 │    ├── Each topic displayed as a card with three user choices:
 │    │     [Investigate Now]  [Not a Match]  [Postpone]
 │    ├── "Investigate Now" → triggers API call for that topic
 │    ├── "Not a Match" → topic discarded silently
 │    ├── "Postpone" → topic moves to the Postponed queue
 │    ├── After all initial topics actioned → Postponed queue shown
 │    └── Loop ends when: no topics remain, OR user postpones all remaining
 │
 └── PHASE 3: Briefing Synthesis (final API call)
      ├── Receives: all research results + uploaded/pasted clarification data
      ├── Receives: private user context (as interpretive lens only)
      ├── Instruction: do NOT quote or reference private context in output
      ├── System prompt: produce structured 5-section briefing
      └── Returns: briefing text — coloured by private context but
               containing no explicit trace of it
                    │
                    └── Rendered in UI → downloadable as .docx
```

---

## Research Topic Types

The agent generates research topics from three sources. Each topic becomes
a card in the interactive research queue.

### 1. News Topics
News search is performed at two levels of granularity:

- **Meeting-level topic:** A search on the overall subject of the meeting.
  Example: "AI regulation in Canada"

- **Agenda-item topics:** If the user provides an agenda or the calendar
  event contains agenda items, each item is treated as a separate research
  topic. Example: "federal Bill C-27 amendments", "provincial data law"

This two-level approach ensures both the big picture and specific discussion
points are researched independently.

### 2. Attendee Backgrounds
Each named attendee becomes one research topic. Claude searches for:
- Current role and organization
- Relevant recent activity, publications, or public statements
- Any known positions on the meeting topic

### 4. User Context (Private Interpretation)
A free-text field where the user describes what they believe the meeting is
*really* about — beyond the official title or agenda. This is passed to the
agent as a privileged interpretive lens.

This field:
- Is visually distinguished in the UI (clearly labelled as private context)
- Appears in the meeting details form for both calendar and manual entry modes
- Is passed as a separate, flagged input in the Phase 1 (Topic Discovery) prompt
- Is passed again in the Phase 3 (Briefing Synthesis) prompt so the final
  document reflects the user's interpretive framing throughout

Example use: if the user writes "management is looking for a scapegoat over
the project delays", the agent will:
- Re-read prior email threads for tone, selective CC'ing, and blame patterns
- Examine GitHub commit history, issue assignments, and PR reviews
- Flag any findings that support or contradict the user's interpretation

### 5. Agent Clarification Request Cards
Where the agent determines that useful information exists but is not accessible
to it (private documents, internal wikis, local files, proprietary data), it
presents **clarification request cards** in the research queue.

These cards ask the user to supply the missing information via:
- File upload (PDF, Word doc, spreadsheet, image)
- Text paste (email thread, meeting notes, log excerpt)

Clarification cards appear in the research queue using a modified version of
the standard three-action mechanic:
- **Provide now** — user uploads or pastes the requested information
- **Not applicable** — user confirms this information does not exist or is irrelevant
- **Postpone** — defer the request to the postponed round

The agent generates clarification requests *specifically* — it names what it is
looking for and why — rather than asking generically for "more information".
The agent searches Google Calendar and Gmail for past meetings that are
semantically similar — not just identical — to the current one. Similarity
is assessed by Claude using meaning, not string matching.

Example: "September Board Meeting" and "October Meeting for Board of
Directors" are treated as highly similar even though they share no
exact keywords.

Past meeting topics surface:
- Previous decisions or action items
- Unresolved issues carried forward
- Contextual background useful for the briefing

---

## Research Queue State Machine

Each research topic moves through the following states:

```
PENDING → [user chooses] → INVESTIGATING → COMPLETE
                        → DISCARDED
                        → POSTPONED → [shown again later] → (same three choices)
```

**Termination conditions:**
1. All topics reach COMPLETE or DISCARDED (normal completion)
2. All remaining topics are POSTPONED by the user (user-directed stop)

**Clarification card variant (for agent-requested uploads/pastes):**
```
PENDING → [Provide now]   → AWAITING_INPUT → COMPLETE
        → [Not applicable] → DISCARDED
        → [Postpone]       → POSTPONED
```

When termination is reached, Phase 3 (briefing synthesis) begins using
all COMPLETE research results collected so far.

---

## Technology Stack

| Component         | Technology                        | Why                                      |
|-------------------|-----------------------------------|------------------------------------------|
| UI Framework      | React (JSX artifact)              | Runs in-browser, no server needed        |
| AI Model          | Claude Sonnet 4 via Anthropic API | Reasoning + tool use in one call         |
| Calendar Source   | Google Calendar MCP               | Pre-built connector, no auth code needed |
| Email History     | Gmail MCP                         | Pre-built connector, no auth code needed |
| Web Research      | Anthropic web_search tool         | Built-in, no API key required            |
| Output Format     | .docx (generated client-side)     | Professional, downloadable               |

---

## What is an MCP Server?

MCP stands for **Model Context Protocol**. It is a standard way for AI models to
connect to external services (like Google Calendar or Gmail) without the
developer having to write custom authentication and API integration code.

When we pass an MCP server URL to the Anthropic API, Claude can call tools
provided by that server — for example, listing calendar events or searching
email threads — as naturally as it uses any other tool.

**In this project we use two MCP servers:**
- `https://gcal.mcp.claude.com/mcp` — Google Calendar
- `https://gmail.mcp.claude.com/mcp` — Gmail

These are pre-authenticated because the user has already connected these services
to their Claude.ai account.

---

## What is an AI Agent?

A traditional program follows a fixed sequence of steps written by the developer.

An **AI Agent** is different: it is given a *goal* and a set of *tools*, and it
decides for itself which tools to call, in what order, and what to do with the
results. The developer does not script every step — the AI reasons through the
task dynamically.

In this project:
- **Goal:** Produce a meeting briefing document
- **Tools:** Web search, Google Calendar, Gmail
- **Reasoning:** Claude decides what to search for, which emails are relevant,
  and how to structure the output

---

## Briefing Document Structure

The agent produces a five-section briefing:

| # | Section                    | Source                                        |
|---|----------------------------|-----------------------------------------------|
| 1 | Meeting Overview & Agenda  | Calendar data + Claude synthesis              |
| 2 | Attendee Backgrounds       | Web search per attendee (one card each)       |
| 3 | Suggested Talking Points   | Claude synthesis from all research            |
| 4 | Questions to Ask           | Claude synthesis from all research            |
| 5 | Recent Relevant News       | Web search: overall topic + per agenda item   |

News section (5) will contain sub-sections: one for the overall meeting topic,
and one for each agenda item that was investigated.

---

## Build Stages

| Stage | Description                                            | Status      |
|-------|--------------------------------------------------------|-------------|
| 1     | UI Shell — layout, inputs, mode selector               | ✅ Complete |
| 1-R2  | Architecture revision — research loop & topic queue    | ✅ Complete |
| 2     | Google Calendar integration (MCP)                      | ✅ Complete |
| 3     | Phase 1: Topic discovery API call                      | ✅ Complete |
| 4     | Phase 2: Interactive research queue UI + API calls     | ✅ Complete |
| 5     | Gmail MCP — past meeting context                       | ✅ Complete |
| 6     | Phase 3: Briefing synthesis + .docx download           | ✅ Complete |

---

## Stage 1 Detail — UI Shell

### What was built
A React component that renders the full user interface for the agent, including:
- A mode toggle (Google Calendar vs. Manual Entry)
- Manual entry form fields: Meeting Title, Date/Time, Attendees, Topic/Agenda
- A "Generate Briefing" button with loading state
- A results panel (placeholder text for now)
- Clean, professional styling using Tailwind CSS

### Key teaching points
- React functional components with `useState` hook manage all UI state
- No backend server is required — the API call will be made directly from the
  browser using `fetch()`
- The component is structured so each stage adds to it incrementally —
  students can see the app grow without rewriting existing code

### Files created this stage
- `PROJECT_DOCUMENTATION.md` — this file
- React artifact (Stage 1 UI shell) — rendered in the chat interface

---

## Stage 2 Detail — Google Calendar MCP Integration (Revised)

### What was built — initial delivery
- "Connect Google Calendar" button with loading state and simulated MCP response
- Four mock calendar events rendered as selectable cards
- Event selection auto-fills all meeting detail fields
- "Change" button clears selection and returns to event list
- Inline annotated code panel showing MCP API call structure

### What was added — revision (Entries 013–015)
**Private context field:**
- Free-text area added to meeting details form, visible after event selection
  (calendar mode) or always (manual entry mode)
- Visually distinguished with amber/warning styling and a lock icon
- Labelled explicitly: "Not included in the briefing document"
- Footer note confirms the field is passed to the agent privately only
- Placeholder text uses the instructor's "scapegoat" example to illustrate
  the intended use

**Upfront clarification batch panel (Step 2):**
- Appears after meeting details are confirmed, before the research queue
- Lists all agent clarification requests together in one panel
- Each request card shows: what is needed + specific reason why (derived from
  the private context)
- Three actions per card: Provide now → upload/paste UI | Not applicable |
  Postpone
- Postponed requests re-presented in a second-pass section within the same panel
- Step indicator (1 → 2 → 3 → 4) tracks user progress through the full flow

### Key teaching points — additions
- The private context field demonstrates **prompt augmentation**: the same
  meeting can produce completely different research agendas depending on the
  user's framing
- The clarification requests shown (project status report, GitHub repo,
  external email threads) are realistic examples of what the Phase 1 API call
  would generate given the "scapegoat" private context — the agent is being
  specific, not generic
- The upfront batch pattern teaches **front-loading**: gather all ambiguities
  before starting work, rather than interrupting mid-process
- Privacy by design: the private context field is architecturally separated
  from the briefing output — a concrete example of building privacy constraints
  into system design, not bolting them on afterward

### Files updated this stage
- `PROJECT_DOCUMENTATION.md` — Stage 2 detail completed, entries 013–015 logged
- React artifact — Stage 2 revised UI delivered with all new features

---

## Stage 3 Detail — Phase 1: Topic Discovery & Research Queue

### What was built
- "Identify research topics" button triggers the Phase 1 API call simulation
- Loading state with spinner while the API call runs
- Annotated code panel showing the exact API call structure:
  - Both MCP servers active simultaneously (Google Calendar + Gmail)
  - Web search tool enabled
  - Private context flagged in prompt with explicit instruction not to quote it
  - Structured JSON response with two arrays: topics and clarifications
- Six research topic cards rendered from the discovery response:
  - Overall topic (news search)
  - Agenda item (Bill C-27 — news search)
  - Two attendees (web search per person)
  - Past similar meeting (Gmail + Calendar MCP)
  - User context topic (derived from private "scapegoat" framing)
- Full Investigate / Not a Match / Postpone mechanic per card
- Per-topic investigation: spinner → simulated API + web_search result → result
  summary displayed on card
- Postponed topic re-presentation in a second-pass panel
- Completion banner with tallied counts (researched / discarded / skipped)
- "Generate Briefing Document" button bridges to Stage 4 placeholder
- Meeting context summary bar showing title, attendees, and private context
  active indicator throughout

### The Phase 1 prompt structure — key teaching content
The prompt instructs Claude to return only valid JSON with two arrays.
The private context is passed with an explicit instruction:
`PRIVATE CONTEXT (do not quote in output): ...`

This is a concrete example of **prompt-level privacy enforcement** — a
system design pattern students should understand and be able to replicate.

### The per-topic investigation call
Each "Investigate now" click triggers a second API call with web_search
enabled, targeting the specific topic query. In production:
```javascript
// Called once per topic the user approves
const result = await fetch("https://api.anthropic.com/v1/messages", {
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{
      role: "user",
      content: `Research this topic for a meeting briefing: ${topic.query}
                Return a concise 2-3 sentence summary of the most relevant
                recent findings. Be specific — include names, dates, numbers.`
    }]
  })
});
```

### Key teaching points
- **Plan-then-execute pattern:** Phase 1 generates the plan (topic list);
  Phase 2 executes it selectively based on human approval
- **Prompt-level privacy:** Passing sensitive context with an explicit
  "do not quote" instruction is a real-world prompt engineering technique
- **Structured JSON output:** Prompting for pure JSON (no markdown, no
  preamble) requires clear instructions — and robust error handling in case
  the model wraps it anyway
- **Multiple tools in one call:** Both MCP servers and web_search active
  simultaneously; Claude decides which to call per topic
- **Human-in-the-loop:** The agent proposes; the human controls which
  topics get investigated — a key architectural distinction from autonomous agents
- **The user_context topic type:** The "vendor evaluation timeline analysis"
  card demonstrates how private context generates research topics that would
  never appear on the official agenda

### Files updated this stage
- `PROJECT_DOCUMENTATION.md` — Stage 3 detail added, diary entries 017–018
- React artifact — Stage 3 UI built, full research queue functional

---

## Stage 4 Detail — Phase 2: Interactive Research Queue

*(To be completed)*

### What will be built
- Each topic from Stage 3 displayed as a card in the UI
- Three action buttons per card: Investigate Now | Not a Match | Postpone
- Clicking "Investigate Now" triggers an individual Anthropic API + web_search
  call for that topic and displays a result summary on the card
- Clicking "Not a Match" discards the topic from the queue
- Clicking "Postpone" moves the topic to a separate Postponed list
- After all initial topics are actioned, postponed topics are re-presented
  with the same three choices
- Loop terminates when: (a) no topics remain, or (b) all remaining are postponed

### Key teaching points
- This is the **human-in-the-loop** pattern: the AI proposes, the human approves
- Each "Investigate Now" click is an independent API call — students see that
  agents make many small calls, not one giant one
- The state machine (PENDING → INVESTIGATING → COMPLETE / DISCARDED / POSTPONED)
  is a classic pattern in agentic systems
- Termination logic must be explicitly coded — the agent does not stop itself

### State machine diagram
```
PENDING
  ├─[Investigate Now]─→ INVESTIGATING ─→ COMPLETE
  ├─[Not a Match]─────→ DISCARDED
  └─[Postpone]────────→ POSTPONED
                              └─[re-presented]─→ (same three choices again)

Termination: all topics are COMPLETE, DISCARDED, or POSTPONED with no more rounds
```

---

## Stage 5 Detail — Gmail MCP for Past Meeting Context

*(To be completed)*

### What will be built
- Past meeting topics (type: `past_meeting`) trigger a Gmail MCP search
  instead of a web search
- Claude searches Gmail for email threads related to the semantically similar
  past meeting
- Results are included in the briefing as "Previous Meeting Context"

### Key teaching points
- MCP tool selection can be conditional: different topic types use different tools
- Semantic similarity matching is handled by the LLM, not by string comparison —
  this is a key distinction between AI-powered and traditional search

### Semantic similarity example
The following meeting titles should be treated as similar:
- "September Board Meeting"
- "October Meeting for Board of Directors"
- "BOD Quarterly — Q4"

Claude identifies this similarity from meaning, not from shared keywords.
A traditional `LIKE '%board%'` SQL query would miss "BOD Quarterly — Q4".

---

## Stage 6 Detail — Phase 3: Briefing Synthesis + .docx Download

### What was built
- "Generate briefing document" button triggers the Phase 3 synthesis API call
- Animated progress bar with status messages as synthesis proceeds through
  each section (5 steps, ~4 seconds simulated)
- Five collapsible briefing sections rendered on completion:
  1. Meeting Overview & Agenda — with carried-forward items from September
  2. Attendee Backgrounds — Dr. Wang, Okonkwo, Leblanc with specific detail
  3. Suggested Talking Points — actionable, specific, politically aware
  4. Questions to Ask — targeted, including the CFO-notification question
  5. Recent Relevant News — AIDA and Bill C-27 with dates and specifics
- Each section is a collapsible card — Section 1 opens automatically
- Download button simulates .docx generation with spinner → confirmation state
- Annotated code panels for both the synthesis API call and the docx.js
  generation pattern

### The synthesis prompt — key teaching content
The prompt passes all research results as a concatenated block, with the
private context flagged and explicitly excluded from output:

```
PRIVATE CONTEXT (shape your emphasis here — do NOT quote,
reference, or include this in the output): [user's text]
```

The briefing sections are specified by name so Claude produces a
predictable, parseable structure. The instruction "Be specific. Use names,
dates, and figures from the research" prevents generic filler — a common
prompt engineering technique for grounding output in facts.

### The .docx generation pattern
The docx.js library is loaded from CDN — no npm install, no build step,
no server. The Packer.toBlob() method converts the Document object to a
binary blob, and URL.createObjectURL() + a programmatic anchor click
triggers the browser's native file download. The entire Word file is
created and delivered without touching a server.

### How private context shapes the output — without appearing in it
Examining the briefing carefully shows the private context at work:
- Talking point 3 addresses the vendor timeline delay specifically
- Talking point 4 flags the overdue risk framework and anticipates scrutiny
- Question 4 asks whether the CFO has been informed of the December 1 miss
- The "carried forward" items in Section 1 are framed as accountability items

None of this quotes or references the "scapegoat" framing — but the
entire tone of the briefing is oriented toward helping the user navigate
scrutiny, not just summarise facts. That is the private context working
exactly as designed.

### Key teaching points
- **Context accumulation:** The synthesis call receives all five research
  results at once — this is why the briefing is coherent, not fragmented
- **Prompt engineering for structure:** Specifying section names and
  instructing "be specific" produces reliably parseable, useful output
- **Privacy by prompt instruction:** "do NOT quote, reference, or include
  this in the output" is enforced at the prompt level — a real-world pattern
- **Client-side document generation:** docx.js + Blob API + createObjectURL
  is a stack students can reuse for any document generation task
- **The full agent loop:** Discovery → Queue → Synthesis is now visible
  end-to-end, making the agent architecture concrete and teachable

### Files updated this stage
- `PROJECT_DOCUMENTATION.md` — Stage 6 detail added, diary entries 019–020
- React artifact — Stage 4 UI complete; full application flow demonstrated

---

## Control Flow

The control flow describes **what happens, in what order, and who decides**.
It is organized in three swim lanes: User, Application (UI), and Claude API/MCP.

### Key control flow points

**Two entry paths:** The user either connects Google Calendar (triggering an MCP
call to fetch events) or enters meeting details manually. Both paths converge at
the private context field before Phase 1 begins.

**Three API calls in sequence:**
1. Phase 1 — Topic Discovery (Calendar MCP + Gmail MCP + optional web search)
2. Phase 2 — Per-topic investigation (one call per "Investigate now" click;
   web search or MCP depending on topic type)
3. Phase 3 — Briefing Synthesis (no MCP, no search — synthesis only)

**The research queue loop:** After Phase 1 returns the topic list, the
application enters a loop:
- Present next topic card to user
- User chooses: Investigate now / Not a match / Postpone
- If "Investigate now" → API call → result displayed → mark COMPLETE
- If "Not a match" → mark DISCARDED
- If "Postpone" → mark POSTPONED, add to deferred list
- Check: more topics? → loop back
- Check: postponed topics? → re-present them (same choices, one more pass)
- Termination: no topics remain, or all remaining are postponed

**Decision points (diamonds in the diagram):**
1. Calendar or manual entry?
2. Investigate / discard / postpone?
3. More topics in queue?
4. Any postponed topics to re-present?

**Human-in-the-loop:** Every per-topic API call is gated by a user decision.
The agent proposes; the human controls execution.

---

## Data Flow

The data flow describes **what information exists, where it comes from,
how it is transformed, and where it ends up**.

### Data objects and their lifecycle

| Data object | Created by | Used in | Included in output? |
|-------------|-----------|---------|-------------------|
| Meeting object | Calendar MCP or manual entry | Phase 1 prompt, synthesis prompt | Yes (as context) |
| Private context string | User free-text field | Phase 1 prompt, Phase 3 prompt | No — never |
| Topic list (topics[ ]) | Phase 1 API response | Research queue UI | No — internal only |
| Clarification requests (clarifications[ ]) | Phase 1 API response | Upfront batch panel | No — internal only |
| Clarification data | User uploads/pastes | Research results accumulator | Indirectly (via synthesis) |
| Research results[ ] | Per-topic API calls | Grows across Phase 2; passed to Phase 3 | Indirectly (via synthesis) |
| Briefing text | Phase 3 API response | UI render + docx.js | Yes — this is the output |
| .docx binary | docx.js (browser) | File download | Yes — the deliverable |

### The private context constraint

The private context string is the most architecturally significant data
element in the system. It:
- Is entered by the user in a visually distinct field
- Is passed to the Phase 1 prompt (flagged: "do not quote in output")
- Is passed to the Phase 3 synthesis prompt (flagged: "do not quote,
  reference, or include this in the output")
- Is never stored in the research results array
- Never appears in the rendered briefing or the .docx file
- Influences both what topics are generated (Phase 1) and how the
  briefing is framed (Phase 3) — without leaving an explicit trace

This is **privacy by prompt instruction** — a real-world pattern enforced
at the application design level, not at a database or file system level.

### The research results accumulator

The research results array is the central data structure of Phase 2.
It starts empty and grows with each "Investigate now" action:

```
results[ ] = []
// After first investigation:
results[ ] = [{ type: "news_topic", label: "AI regulation", summary: "..." }]
// After second:
results[ ] = [{ ... }, { type: "attendee", label: "Dr. Wang", summary: "..." }]
// ... and so on
```

Clarification data provided by the user (uploads, pastes) is appended to
this same array. By the time Phase 3 runs, the array contains everything
Claude knows about the meeting — the complete research context, in one place.

### Data flow summary

```
User inputs ──────────────────────────────────────────────────────────┐
  (calendar event or manual fields)                                    │
  + private context (amber — separate lane, never in output)          │
                                                                       ▼
                            Phase 1 API call
                            ├── topics[ ]      → research queue UI
                            └── clarifications[ ] → upfront batch panel

User decisions ───────────────────────────────────────────────────────┐
  (Investigate / discard / postpone per topic)                         │
  + clarification data (uploads / pastes)                              │
                                                                       ▼
                            results[ ] accumulator
                            (grows with each investigation)

                                      │
                                      ▼
                            Phase 3 API call
                            (meeting + results[ ] + private context)
                                      │
                                      ▼
                            5-section briefing text
                            ├── Rendered in UI (collapsible cards)
                            └── Formatted by docx.js → .docx download
```

---

### No persistent storage — a deliberate design decision

There is no database, no server, and no file storage in this application.
Every data object — the meeting details, the topic queue, the research
results accumulator, the briefing text — exists only in the browser's
JavaScript memory for the duration of one session. When the tab closes,
all of it is gone.

The only persistent artifact is the `.docx` file the user explicitly
downloads to their own device.

**This is a deliberate architectural choice**, not an oversight. The
decision was made for the following reasons:

| Reason | Explanation |
|--------|------------|
| No server required | Students can build and run the application entirely in Claude.ai's canvas — no hosting, no deployment, no infrastructure |
| Privacy by architecture | If no data is stored, no data can be leaked, subpoenaed, or breached. The private context field benefits especially — it never touches a server |
| Appropriate for the use case | A meeting briefing is point-in-time. There is no value in retaining last month's research results |
| Simplicity | Eliminating persistence eliminates an entire category of complexity: no schema design, no authentication, no data retention policy |

**The trade-off accepted:** A user cannot resume a partially completed
research queue after closing the tab, and cannot retrieve a past briefing
unless they saved the `.docx`. This is a known limitation, accepted in
exchange for the architectural benefits above.

**If persistence were added in a future version**, the natural approaches
would be:
- `localStorage` — lightweight session continuity, survives tab close,
  lost on browser data clear, no server required
- Cloud database (e.g. Firestore, Supabase) — cross-device access, but
  requires authentication, a server, and a privacy policy

For this course project, the no-persistence architecture is the correct
choice and must be presented to students as an intentional decision —
not a gap to be filled.

---

*This document is updated at the end of each build stage.*
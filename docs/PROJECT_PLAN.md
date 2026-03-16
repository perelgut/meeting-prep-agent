# Meeting Prep Agent — Project Plan

**Course:** Computer Programming — AI Agents Module  
**Project:** Meeting Prep Agent  
**Last Updated:** Session 1, Entry 024

---

## About This Document

This Project Plan governs the build sequence, team responsibilities, and
readiness requirements for the Meeting Prep Agent project. It is a living
document — updated as stages are completed and decisions are made.

The companion documents to this plan are:

| Document | Purpose |
|----------|---------|
| `PROJECT_DOCUMENTATION.md` | Architecture, design decisions, change diary |
| `APPENDIX_SOFTWARE_TECHNOLOGIES.md` | Step-by-step tool installation instructions |
| This file (`PROJECT_PLAN.md`) | Build stages, prerequisites, responsibilities |

---

## Prerequisites — Read This Before Starting Anything Else

**All prerequisites in this section must be completed before any build
stage begins.** This is not optional. Starting Stage 1 without a working
environment wastes time and creates problems that are difficult to diagnose
mid-build.

Environment setup is not a core project task — it does not appear as a
build stage and it is not where the interesting work happens. But it is
the foundation everything else stands on. Budget the time, work through
it carefully, and verify each item on the checklist below before
proceeding.

Detailed step-by-step instructions for every item are in
**Appendix A — Software Technologies Required**.

---

### Prerequisite Checklist

Work through each item in order. Do not skip ahead.

#### Section 1 — Claude.ai Environment

- [ ] **1.1** You have created a Claude.ai account at https://claude.ai
- [ ] **1.2** You can sign in to Claude.ai successfully from your browser
- [ ] **1.3** You have located the canvas / artifact panel in Claude.ai
        *(Tip: start a new conversation and ask Claude to "create a simple
        HTML artifact" — if a panel opens to the right showing rendered
        output, your canvas environment is working)*
- [ ] **1.4** You have verified that your Claude.ai account can make
        multi-turn conversations without immediately hitting usage limits

#### Section 2 — Google Integrations

- [ ] **2.1** You have a Google account you will use for this project
- [ ] **2.2** You have connected Google Calendar to Claude.ai
        *(Verify: in a Claude.ai conversation, type "What meetings do I have
        this week?" — Claude should ask to access your calendar and then
        list events)*
- [ ] **2.3** You have connected Gmail to Claude.ai
        *(Verify: in a Claude.ai conversation, type "Search my email for
        messages about meetings" — Claude should return results from your
        inbox)*
- [ ] **2.4** You have confirmed that both integrations show "Connected"
        status in the Claude.ai Integrations panel

#### Section 3 — GitHub

- [ ] **3.1** You have created a GitHub account at https://github.com
- [ ] **3.2** You have created a repository named `meeting-prep-agent`
- [ ] **3.3** You have created a GitHub Projects board named
        `Meeting Prep Agent — Build Tracker` linked to the repository
- [ ] **3.4** You have added task cards to the board for each build stage
        (see Appendix A, Section 4 for the suggested card names)

#### Section 4 — Visual Studio Code

- [ ] **4.1** You have installed Visual Studio Code on your computer
- [ ] **4.2** You can open VS Code and create a new file
- [ ] **4.3** You have opened your project folder in VS Code
        *(This folder is where you will save all project documents)*

#### Section 5 — GitHub Desktop (if using)

- [ ] **5.1** You have installed GitHub Desktop
- [ ] **5.2** You have signed in to GitHub Desktop with your GitHub account
- [ ] **5.3** You have cloned your `meeting-prep-agent` repository to your
        local computer
- [ ] **5.4** You have confirmed that GitHub Desktop can see changes when
        you edit a file in VS Code

---

### Estimated Setup Time

Be realistic. First-time setup always takes longer than expected.

| Task | Estimated time |
|------|---------------|
| Claude.ai account + verification | 10–15 minutes |
| Google integrations (both) | 15–20 minutes |
| GitHub account + repo + Projects board | 20–30 minutes |
| VS Code installation | 10–15 minutes |
| GitHub Desktop + clone | 15–20 minutes |
| Verification of all checklist items | 15–20 minutes |
| **Total** | **85–120 minutes** |

Plan for two hours. If you finish faster, that is a bonus. If you hit
a problem with one item, do not let it block you from setting up the
others — come back to it or ask your instructor for help.

---

### What "Ready to Begin" Looks Like

You are ready to start Stage 1 when you can answer yes to all of the
following:

1. You can open Claude.ai in your browser and start a conversation.
2. You ask Claude "what meetings do I have this week?" and it returns
   events from your Google Calendar.
3. You can see your `meeting-prep-agent` repository on GitHub.
4. You can open VS Code and see your project folder in the sidebar.

If any of these four checks fail, resolve them before proceeding.
The build stages assume all four are working.

---

### A Note on Shared or Institutional Computers

If you are using a computer provided by your school or employer:

- **VS Code** can usually be installed in user space without administrator
  rights. If the installer asks for admin credentials, speak to your IT
  department or use a personal computer for VS Code.
- **Google integrations** may be blocked if you are using a school Google
  account with third-party app restrictions. Use a personal Gmail account
  if this applies to you.
- **Claude.ai** works in any modern browser and requires no installation.
  It will work on any school-provided computer.
- **GitHub** is a website — no installation required for basic use.
  GitHub Desktop requires installation; if blocked, you can upload files
  directly through the GitHub website instead.

---

## Build Stages

The following stages constitute the core project work. Each stage builds
on the previous one. Do not start a stage until the previous stage is
working and has been reviewed.

| Stage | Description | Prerequisite complete? | Status |
|-------|-------------|----------------------|--------|
| 1 | UI Shell — layout, inputs, mode selector | All of Section 1–2 | ⏳ Pending |
| 2 | Google Calendar MCP + private context + clarification panel | Stage 1 complete | ⏳ Pending |
| 3 | Topic Discovery API call + Research Queue | Stage 2 complete | ⏳ Pending |
| 4 | Briefing Synthesis + .docx download | Stage 3 complete | ⏳ Pending |

*Note: Stages 1–4 were built and demonstrated during the project design
session. Student teams will re-implement each stage in their own Claude.ai
environments, using the Project Documentation and this plan as their guide.*

---

## Working Method

### Where work happens
All application code is written and tested in Claude.ai's canvas
environment. You do not run code on your own computer.

### How to save your work
The Claude.ai conversation history preserves your work between sessions.
Additionally, copy any significant artifacts (code, prompts, documentation)
into your VS Code project folder and commit them to GitHub at the end of
each working session. This gives you a backup and a version history.

### How to get unstuck
If Claude produces output that does not work as expected:
1. Describe the problem clearly in the conversation — tell Claude what
   you expected and what actually happened.
2. Paste any error messages directly into the conversation.
3. Ask Claude to explain what the code is doing before asking it to fix it
   — understanding the problem is more valuable than a quick patch.
4. If a whole approach is not working after two or three attempts, step
   back and ask Claude to suggest an alternative approach.

### How to ask Claude for help with this project specifically
The most effective prompt pattern for this project is:

> "I am building a Meeting Prep Agent as described in PROJECT_DOCUMENTATION.md.
> I am currently working on Stage [N]. [Describe what you are trying to do.]
> [Paste any relevant code or error.] Help me [specific request]."

Providing the stage number and the project context in every prompt
significantly improves the quality of Claude's assistance.

---

## Document History

| Version | Date | Change |
|---------|------|--------|
| 0.1 | Session 1 | Initial draft — prerequisites section and build stage table |

---

*This document is updated as the project progresses.*  
*See `PROJECT_DOCUMENTATION.md` for the full change diary.*
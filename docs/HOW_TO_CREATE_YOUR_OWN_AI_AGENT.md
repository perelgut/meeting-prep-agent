# How to Create Your Own AI Agent

## You don't need a computer science degree. You don't need a startup. You just need an idea and a browser.

*By a Senior Writer — The Atlantic*

---

There is a moment, somewhere in the middle of building something you didn't think you could build, when the thing you are building does something you didn't expect. It surprises you. It makes a decision on its own. And you realize, with a small shock, that you are no longer entirely in charge.

Stephen Perelgut had that moment on a Tuesday afternoon, sitting at his computer in the suburbs north of Toronto. He had spent the better part of three sessions — spread across as many weeks — building a piece of software with the help of an AI assistant. Not vibe-coding a to-do list. Not asking ChatGPT to write an email. Building, from scratch, a working artificial intelligence agent: a program that could think through a problem, search the internet for relevant information, make judgments about what mattered, and produce a professional document ready for the boardroom.

When he finally clicked the button to generate a briefing for a real meeting on his calendar, the agent went to work. It pulled up the names of the attendees. It searched for recent news about each of them. It looked for relevant industry developments. It synthesized what it found into five organized sections, each with detailed bullet points drawing on specific names, dates, and figures. It took less than two minutes.

"Intriguingly," Perelgut said afterward, "selecting these is actually doing some research."

He sounded slightly amazed. He is a fifty-year veteran of the computer industry — a man who worked at IBM alongside PhD researchers, who now teaches programming at a career college. He had seen a lot of technology. But this was different.

---

## The Idea

The project began, as many good projects do, with a list of rejected alternatives.

Seven possible AI agent applications were proposed. The group — Perelgut working with an AI collaborator — considered an Email Triage Assistant, an Assignment Feedback Agent, a Job Posting Analyzer, a News Digest Agent, a Receipt and Expense Tracker, and a Course Registration Advisor. They were all reasonable. None of them had the right combination of qualities.

What they chose instead was a Meeting Prep Agent: a program that would do, automatically, the kind of preparation that most professionals attempt badly or skip entirely. Given the name of a meeting, the names of the people attending, and a rough agenda, it would research everything relevant, synthesize what it found, and produce a downloadable briefing document.

The selection criteria were simple. The application needed a clear real-world use case. It needed to produce something tangible — not just text on a screen, but a document you could print and take into a room. It needed to be impressive enough to demo. And it needed to genuinely stretch the capabilities of AI, not just use it as a fancy search engine.

The Meeting Prep Agent checked every box.

---

## The Private Room

One of the most interesting design decisions came early, before a single line of code was written.

The group was thinking about what information a user might want to give the agent — and they realized there were really two kinds of information. There was the official information: the meeting title, the agenda, the names of the attendees. And then there was the real information: what the user actually thought was going on.

They called it the Private Context field.

The example they used was pointed. Imagine a meeting titled "Project Update." Official enough. But the person attending knows what it's really about: the project is two weeks behind schedule, there have been too many bugs, and someone in management is looking for a scapegoat. That context changes everything about how you prepare. The questions you ask. The information you look for. The tone you bring into the room.

The Private Context field is a text box where you write exactly that — what you privately believe the meeting is about. The agent reads it. It uses it to color every piece of research it conducts. And then — critically — it never quotes it, references it, or includes it in the briefing document it produces. The private context shapes the output without appearing in it.

"Privacy by design," Perelgut called it. The agent is told, explicitly, that this information is privileged. It is the user's interpretive lens. Use it to inform the research. Never reveal it.

It is a small thing, technically. It is a large thing, humanly. The difference between a tool that helps you and a tool that knows you is exactly this kind of nuance.

---

## The Architecture of a Conversation

Most people, when they think about AI, imagine something like a very fast search engine. You type a question. It finds an answer. Transaction complete.

An AI agent is something different. It is less like a search engine and more like a capable colleague — one who can be given a goal, handed a set of tools, and trusted to figure out the path.

The Meeting Prep Agent works in three phases, each a separate conversation with the AI.

In the first phase, the agent is given the meeting details and asked to think about what it would need to know. It returns a list of research topics — one for the overall subject of the meeting, one for each agenda item, one for each attendee, and possibly some additional topics suggested by what the user wrote in the Private Context field. It also returns a list of clarification requests: things it wishes it had access to but doesn't, like internal documents or proprietary data. The user can provide those, or skip them.

In the second phase — the Research Queue — the user works through each topic. For each one, they can choose to have the agent investigate it, mark it as not relevant, or postpone it for later. When investigation is requested, the agent searches the internet in real time and returns a summary: specific, factual, with names and dates and figures. The user reviews every result before it goes any further.

In the third phase, everything the agent has learned is handed back to it and it is asked to synthesize. It produces a professional briefing document: five sections, each with several bullet points, drawn entirely from the research it has done. The document can be downloaded as a Word file and taken into the meeting.

The whole thing, from entering the meeting details to downloading the briefing, takes about ten minutes on a reasonable internet connection.

---

> **A Note on the Machinery** *(sidebar)*
>
> This article describes an AI agent built on three services that most readers will never need to interact with directly. But for the curious, here is what each one does, in plain English.
>
> **The AI brain (Anthropic's Claude):** The intelligence at the center of the agent. When the application needs to think — to figure out what research topics to generate, or to synthesize a briefing from raw research — it sends a request to Claude, which does the thinking and sends back an answer. Claude also has access to a web search tool, which is how the agent finds real, current information about meeting attendees and agenda topics.
>
> **The security guard (Cloudflare Workers):** You cannot put the key to your house in the front window. Similarly, the password that allows the application to talk to Claude cannot be stored where anyone browsing the internet could see it. A Cloudflare Worker is a tiny piece of code running on Cloudflare's global network that sits between the user's browser and the AI. Every request from the application passes through it. The Worker adds the password, forwards the request, and returns the answer — keeping the credential safe at all times.
>
> **The hosting service (GitHub Pages):** The application's web pages need to live somewhere. GitHub Pages is a free service that hosts them — imagine it as the address where the application lives on the internet. Every time Perelgut made a change to the code and pushed it to GitHub, within minutes the live application updated automatically. No server to manage. No hosting bill to pay.
>
> Together, these three services cost nothing for a personal project and require no specialized expertise to set up. That is the point.

---

## The Surprises

Every project has its surprises. What distinguishes a good project from a great one is whether the surprises teach you something.

The Meeting Prep Agent had several.

The first was a dead man.

During testing, Perelgut entered the names of several meeting attendees — real people, public figures — and asked the agent to research them. It did. It produced thorough, well-sourced background summaries for each one. The problem was that one of the attendees had been dead for years. The agent researched him thoroughly, found accurate information, and wrote up his background as though he were a current, active participant who might be sitting across the table at the meeting.

It was, as Perelgut put it, "at minimum embarrassing and potentially misleading." The agent had found the right information. It simply hadn't thought to ask the most basic question: is this person still alive?

The fix was elegant in its simplicity. A single instruction was added to the agent's research prompt for any topic involving a named person: *If researching a person, first confirm whether they are currently alive and in their stated role. If the person is deceased, state this clearly as the first sentence of the summary and note when they died. Do not present a deceased person as a current meeting participant.*

The agent had not known to do this. Once told, it did it perfectly. This is the fundamental relationship between human judgment and artificial intelligence as it currently exists: the human knows what common sense looks like. The machine can follow it. The challenge is articulating common sense clearly enough for a machine to apply.

The second surprise was a rate limit.

When the agent was asked to research multiple topics simultaneously — the user clicking "Investigate now" rapidly across several cards — it would sometimes hit an invisible ceiling. The AI provider limited how many words per minute any single account could process. Exceed the limit, and the request failed with an error.

The solution was a queue. Instead of firing all research requests at once, the application now processes them one at a time, in order. If the user clicks five topics in rapid succession, each one patiently waits its turn. If a rate limit is hit anyway, the agent waits sixty seconds and tries again automatically, displaying a calm message: *Rate limited — retrying in 60s…*

Users never see the technical ceiling. They see a system that handles itself gracefully.

The third surprise was the calendar.

The original plan was to connect the agent directly to Google Calendar through a service called MCP — a new standard for AI programs to talk to external services. When that connection proved unavailable for external developers, the team pivoted. Instead of having the AI fetch the calendar data, they obtained a standard authorization from Google and fetched the data directly, bypassing the AI intermediary entirely.

The result was better. Faster, simpler, more reliable. And it produced, in Perelgut's words, a moment of genuine delight: *"Wow. Calendar entries have appeared."*

Sometimes the workaround is the right answer.

---

## What This Is Not

Let us be precise about what this project is and is not.

It is not magic. Everything the agent produces comes from somewhere — from information the user provides, from web searches on public sources, from patterns in how the research is presented. It does not know things you do not tell it. It does not have access to your private files unless you give it that access. It does not make things up, though like all current AI systems it can make mistakes, present outdated information, or miss things a careful human reader would catch.

It is not a replacement for human judgment. Every research result in the queue is shown to the user before it enters the briefing. The user can dismiss it, accept it, or move on. The agent proposes. The human disposes. This is a deliberate design choice — not a limitation but a philosophy. The briefing the agent produces is a starting point, not a conclusion.

It is not finished. The project now has a task tracker with seven phases and dozens of individual tasks. Phase 6 and Phase 7 are mostly complete. There are already ideas for Phase 8. Good software is never finished; it is only incrementally better.

What it is, is real. A working application. Built by one person with no team, no budget, and no software engineering staff, over three working sessions spread across a few weeks, in the margins of a busy life.

---

## The Deeper Point

Perelgut's students are not typical computer science students. They are adults — many of them new to Canada on student visas, learning programming as a path to a new career. They have not spent their childhoods thinking about software. They come to it late, with real-world stakes and limited runway.

He wants them to build this.

Not this exact application — though this exact application will be the teaching example. He wants them to build *something* — to have the experience of starting from nothing and ending with a working piece of software that does something useful in the world. The Meeting Prep Agent is the proof of concept. If a veteran of fifty years in the industry found it genuinely surprising, his students might find it genuinely transformative.

"The agent proposes; the human is responsible for what gets used." This is how Perelgut describes the relationship between the software and the person running it. It is a careful sentence. It assigns credit and responsibility in the same breath. The agent is the tool. The human is the professional.

There is a version of this story that is breathless about AI — that sees what this agent can do and extrapolates toward superintelligence, or job apocalypse, or some other dramatic terminus. That is not this story.

This story is about a retired IBM researcher sitting in front of a laptop on a Tuesday, clicking a button, and watching software he helped build do something that surprised him. It is about the gap between what people think they are capable of and what they actually are, when given the right tools and the right encouragement. It is about the fact that the bar for creating genuinely useful AI-powered software has dropped, in the span of a few years, from "you need a team of engineers and millions in funding" to "you need an idea and a browser."

The surprises are the point. When the machine does something unexpected, it means you have built something with more potential than you knew. That is not a reason to hand over control. It is a reason to pay attention.

---

*The Meeting Prep Agent is live at https://perelgut.github.io/meeting-prep-agent. The full project documentation — 196 diary entries covering every design decision, every bug, and every surprise — is available in the project repository.*

---

*© The Atlantic. All rights reserved.*

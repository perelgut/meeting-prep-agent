# AI Agents in Action — Speaker Notes
## Executive Presentation (50 minutes)

*Companion to: EXECUTIVE_PRESENTATION_SLIDES.md*

---

## How to Use This Document

Each section corresponds to one slide. For each slide you will find:
- **On screen:** What the audience sees
- **Your goal:** What this slide must accomplish
- **What to say:** The narrative — adapt to your voice, do not read verbatim
- **Key talking points:** The two or three things that must land, regardless of how you say them
- **Watch for:** Signals from the room and how to respond

---

---

## SLIDE 1 — Title Slide

**On screen:** Title, subtitle, presenter name, date

**Your goal:** Set the tone. This is not a vendor pitch. It is not a technology lecture. It is a story about something that was built.

**What to say:**
"Thank you for your time. I am going to spend fifty minutes showing you something that was built, explaining how it was built, and making the case that some of your people should learn to build things like it. I will start with a demonstration — because words about AI are, at this point, cheap. Watching it work is not."

**Key talking points:**
- Do not begin with definitions or context-setting — begin with the promise of the demo
- Establish that this is evidence-based, not speculative

**Watch for:** Skepticism in the room — executives have sat through many AI presentations. Acknowledge it quickly and move to the demo.

---

---

## SLIDE 2 — The Question

**On screen:** "Could a non-programmer build a working AI agent in two days?" / "We decided to find out."

**Your goal:** Establish the stakes and the framing. This is not a research project or a proof of concept — it was a real experiment with a real answer.

**What to say:**
"About six months ago, someone asked a version of this question: can a person with no software engineering background — no team, no budget, no startup — build a working AI agent? Not a prototype. Not a demo that works under controlled conditions. A real application, deployed on the public internet, that does something genuinely useful.

We decided to find out. The person who built it is a fifty-year veteran of the computer industry — someone who has seen everything. What he had not seen before was how fast this had become possible.

He built it in two days. I am going to show it to you."

**Key talking points:**
- The person was experienced but not a developer — this matters for the credibility of the claim that non-programmers can do this
- Two days is the number that surprises people — use it prominently and let it sit

**Watch for:** Disbelief about the "two days" claim. Do not defend it — show it.

---

---

## SLIDE 3 — What Was Built

**On screen:** Bullet list of the application's capabilities

**Your goal:** Give the audience a mental model of the application before they see it. The demo will be more legible if they know what to look for.

**What to say:**
"Let me tell you what this application does before I show it to you, so you know what you're watching.

You give it a meeting — either by typing in the details or by connecting your Google Calendar and picking an event. The application then identifies what it needs to research: background on each attendee, news about the meeting topic, anything relevant to the agenda. It searches the internet in real time. It presents each research result to you for review. You approve, dismiss, or defer each one. When you're done, it synthesizes everything into a five-section briefing document that you can download as a Word file and take into the room.

The whole thing takes about ten minutes.

And there is one feature I want to highlight before we see the demo, because it is the one that tends to stop people."

[Pause]

"It has a private context field."

[Pause — let this land before moving to the next slide]

**Key talking points:**
- Frame the application as doing something specific and real, not something vague and impressive-sounding
- End on the private context field as a teaser — it is the emotional hook of the presentation

---

---

## SLIDE 4 — Live Demo

**On screen:** Live application

**Your goal:** Show the application working. Let it speak. Do not over-narrate.

**What to say:**
[Before opening the browser:]
"I am going to use a real meeting. Not a staged scenario — a meeting I either have coming up or one I have pulled from my own calendar. You will see the agent identify the research topics, search the web in real time, and produce a briefing. I will narrate as we go but I want you to watch the output."

[During the demo — light narration:]
- When topics appear: "These are the research topics the agent identified. One for each attendee, one for the overall subject, one for each agenda item. These came from the AI — I did not specify them."
- When investigating a topic: "I'm clicking Investigate Now. The agent is now searching the web. Watch what comes back."
- When the result appears: "Specific. Named. Dated. This is not a summary of what it already knew — it searched the internet thirty seconds ago."
- When generating the briefing: "I've actioned all the topics. Now I click Generate."
- When the briefing appears: "Five sections. Real content. Drawn from the research we just ran."
- When downloading: "And it downloads as a Word file."

[After the demo:]
"That is what your people could build. Now let me tell you about the private context field."

**Key talking points:**
- Do not apologize for anything that works slowly or imperfectly — rate limits and wait times are real; say "this is the agent managing its own load" and move on
- The goal is a visceral sense of capability, not a flawless performance
- The briefing quality will vary — if it is notably good, say so; if it is thin, say "this was a quick test with minimal research — in practice you would investigate more topics"

**Watch for:** Audience members who lean forward during the web search animation — this is the moment that converts skeptics. Pause there.

---

---

## SLIDE 5 — The Private Context Field

**On screen:** "Official meeting title" vs. the private interpretation

**Your goal:** Create the moment of recognition — every executive in the room has had this meeting.

**What to say:**
"Every professional has had a meeting that has an official title and a real agenda. The official title is what goes in the calendar invite. The real agenda is what you say to a trusted colleague in the corridor before walking into the room.

The private context field is where you write the real agenda.

The example I like to use: the meeting is called 'Project Update.' But you know it is actually about the fact that the project is two weeks behind, there have been too many bugs, and management is looking for someone to blame. That context changes everything — which questions you prepare, which documents you bring, which alliances you check before walking in.

You type that context into the field. The agent reads it. It uses it to shape every piece of research it does — it looks for the things that matter given what you actually believe is happening, not just what the calendar invite says.

And then — this is the part people find remarkable — it never quotes it. It never includes it in the briefing. It never reveals that you said it. It simply knows, and the briefing reflects that knowledge without exposing it.

We called it privacy by design."

**Key talking points:**
- The example should resonate with every executive in the room — use it as written
- The "never reveals" point is the one that surprises people; pause after it
- This is where the application crosses from "useful tool" to "this understands how I work"

**Watch for:** Nodding — this slide produces physical recognition. Let the moment breathe. Do not rush to the next slide.

---

---

## SLIDE 6 — Agent vs. Chatbot

**On screen:** Comparison table

**Your goal:** Give the audience a clear conceptual distinction they can carry forward. Many executives conflate ChatGPT-style tools with agents — this slide separates them.

**What to say:**
"Before we go further, I want to distinguish between two things that often get lumped together.

A chatbot — or an AI assistant like the ones most of you are already using — answers questions. You give it a question, it gives you an answer. Very fast, often very good. But fundamentally reactive.

An agent is different. You give it a goal. It figures out how to achieve the goal — what to search, what to synthesize, what to produce. It makes decisions along the way. It uses tools. It produces something that did not exist before.

The analogy I use: a chatbot is a very fast librarian. You describe the book you want; it finds it. An agent is a capable junior analyst. You describe the outcome you need; it figures out how to produce it.

The distinction matters because the business value of agents is qualitatively different from the business value of chatbots. Chatbots make individuals faster at specific tasks. Agents make workflows possible that were not previously feasible."

**Key talking points:**
- "You give it a goal" vs. "you give it a question" — this is the sentence that makes the distinction stick
- The junior analyst analogy is memorable and non-technical
- Avoid saying agents are "better" — they are different; chatbots have their place

**Watch for:** Someone wanting to debate the distinction. Acknowledge it and move on — the goal is the practical implication, not the taxonomy.

---

---

## SLIDE 7 — The Human in the Loop

**On screen:** The three choices per topic card; the quote

**Your goal:** Address the trust and reliability concern before it is raised as an objection.

**What to say:**
"The question I hear most often at this point is: how do you trust what the agent produces?

The answer is: you don't — not automatically. And the application is designed to reflect that.

Every research result the agent produces is shown to you before it enters the briefing. For each one, you have three choices: accept it, dismiss it as not relevant, or defer it for later. Nothing goes into the final document without your approval.

This is not a limitation we worked around. It is a design principle we built toward. The person who built this application expressed it as: 'The agent proposes. The human is responsible for what gets used.'

That sentence is worth sitting with. It does not say the human double-checks the agent's work. It says the human is responsible. The agent is a tool. The professional using it is accountable for the output. That accountability cannot be delegated to the machine, and this application does not attempt to do so.

This is the design philosophy we teach in the workshop. It is not accidental."

**Key talking points:**
- The human-in-the-loop is a feature, not a workaround — frame it that way
- "The agent proposes. The human is responsible." — say this slowly and let it land
- This slide pre-empts the most common executive objection (what if it's wrong?) without being defensive

**Watch for:** The liability question — "who is responsible if the briefing is wrong?" Answer: the same person who is responsible if a human researcher produced a wrong briefing — the professional who used it without reviewing it.

---

---

## SLIDE 8 — The Moment That Surprised Everyone

**On screen:** The deceased attendee story

**Your goal:** Build credibility by acknowledging failure honestly; demonstrate that the failure mode was correctable.

**What to say:**
"I want to tell you about the moment in the build that taught us the most.

During testing on the second day, the developer entered the names of several meeting attendees — real people, public figures — and asked the agent to research them. It did. Thorough summaries. Accurate information. Well sourced.

One of the attendees had been dead for years.

The agent had no idea. It researched him, found accurate information about his career and positions, and presented him as a current, active participant who might be sitting across the table at the meeting.

[Pause]

This is not a story about AI being dangerous. It is a story about AI being literal. The agent was asked for background on a named person. It found background. It did not think to ask whether that person was still available to meet.

The fix took thirty seconds: one sentence added to the agent's instructions. 'If researching a person, first confirm whether they are currently alive. If deceased, state this clearly.' The agent never made that mistake again.

This is the fundamental relationship between human judgment and these systems. The machine can follow common sense perfectly — once it has been told what common sense looks like. The challenge is articulating what you know implicitly, clearly enough for a machine to apply.

That is a learnable skill. The workshop teaches it."

**Key talking points:**
- Tell this story as a story — do not rush it
- The fix being thirty seconds is important: failures are correctable and specific
- "Articulating what you know implicitly" — this is the core skill the workshop develops
- This slide earns trust by being honest about limitation

**Watch for:** Laughter at the dead man — this is appropriate. Let it happen. Then bring the room back with "this is not a story about AI being dangerous."

---

---

## SLIDE 9 — What This Architecture Makes Possible

**On screen:** The pattern and application examples

**Your goal:** Translate the specific application into an organizational context the audience recognizes.

**What to say:**
"The Meeting Prep Agent is one application of a pattern. Let me show you the pattern.

[Point to the architecture on screen]

A user's browser connects to a secure intermediary — a piece of code running on a server, not in the browser — which connects to an AI model, which can connect to the web, to email, to calendars, to internal systems, and to any API. The output goes back through the chain and into the user's hands as a document, a summary, a recommendation.

Once you see this pattern, you start to see it everywhere.

[Walk through the examples on screen briefly]

Every one of these is a real workflow that knowledge workers spend significant time on today. Every one follows the same architecture as the Meeting Prep Agent. Every one could be built in a two-day workshop by someone who has never written code.

The question for your organization is: which of your workflows have this shape? Where is the time being spent on research, synthesis, and structured document production that an agent could do in minutes instead of hours?

That is not a question I can answer for you. But your employees can — if they know what is possible."

**Key talking points:**
- The pattern generalizes — this is the "aha" moment for executives
- Ask the workflow question directly and genuinely — it is not rhetorical
- Do not try to specify which applications are most relevant — that is for the audience to determine

**Watch for:** An executive who volunteers a specific use case from their organization — engage with it. This is the conversation you want to happen.

---

---

## SLIDE 10 — The Cost of Not Building

**On screen:** The three simultaneous truths

**Your goal:** Create urgency without hyperbole. The argument is competitive, not apocalyptic.

**What to say:**
"I want to be direct about why this matters now, not in two years.

Three things are simultaneously true.

First: building a working AI agent now requires no prior programming experience. The barrier that existed two years ago — you needed a developer, a team, months of work — does not exist in the same form today.

Second: most of your employees do not know this. They know about AI assistants. They may use them daily. But they think of AI as something that answers questions, not something they can build to do their work.

Third: some of your competitors' employees are finding out. Not through formal programs — yet. Through curiosity, through experimentation, through the kind of accidental discovery that precedes every technology shift.

I am not making a prediction about AI replacing jobs. I am making an observation about competitive advantage. The organizations that develop structured programs for teaching their people to build with AI — not just use it — will have employees who can identify workflow problems and propose working solutions. Not in six months. In two days.

The question is not whether this matters. It already does. The question is whether your organization has a deliberate answer to it."

**Key talking points:**
- The three-truths structure is the spine of this slide — deliver them as distinct, separate points with pauses
- "Not in six months. In two days." — this lands if the demo has worked
- Avoid the words "disruption" and "transformation" — executives are tired of them

**Watch for:** Pushback that this is hype. Response: "The application you saw ten minutes ago was built in two days by one person with no team. That is evidence, not prediction."

---

---

## SLIDE 11 — The Two-Day Workshop

**On screen:** Day 1 and Day 2 outline

**Your goal:** Make the workshop feel concrete and achievable, not ambitious and theoretical.

**What to say:**
"Let me tell you what two days actually looks like.

Day 1 begins with a setup clinic at 9am for people who want help getting their tools in order — the accounts, the repositories, the configuration. The formal session starts at 10. By the end of Day 1, every participant has a working application deployed on the public internet. That happens on Day 1.

Day 2 goes further. Participants connect their application to Google Calendar, so it reads from real data. They refine their prompts — learning that the quality of AI output is in the hands of the person giving instructions. At the end of Day 2, every participant demonstrates their working agent to the group.

The showcase matters. When twelve people demonstrate twelve different working applications built from the same starting point, something happens in the room. They stop thinking of themselves as people who use technology and start thinking of themselves as people who build it.

That shift is the real outcome of the workshop."

**Key talking points:**
- "By the end of Day 1, every participant has a working application deployed on the public internet" — say this clearly
- The showcase moment is important — describe it as a shift in identity, not just a skill
- Keep the description of the days high-level; executives do not need the session breakdown

---

---

## SLIDE 12 — Who This Is For

**On screen:** Strong fit descriptions; "not a programming course"

**Your goal:** Help executives visualize specific people in their organization who belong in this room.

**What to say:**
"Who should come?

The person who is most valuable in this workshop is not the most technical person on the team. It is the person who best understands a workflow problem — who can articulate clearly what is taking time, why it matters, and what a good output looks like.

Some of the most productive participants are people in research-heavy roles: strategy, competitive intelligence, sales, compliance, communications. People whose work involves gathering information from multiple sources, making sense of it, and producing structured documents. That is the shape of work that agents are best at.

What they do not need is programming experience. They will write code — but they will write it by describing what they want, in plain English, to an AI assistant that helps them. The goal is not to produce developers. The goal is to produce people who understand, from the inside, what AI agents can do and what they require.

The optimal group size is ten to sixteen people. Small enough for everyone to get individual attention. Large enough for the showcase to have energy."

**Key talking points:**
- "The person who understands the workflow problem" — this reframes who belongs in the room
- Naming specific roles (strategy, competitive intelligence, sales, compliance) helps executives make the mental connection to their teams
- "Not to produce developers" — say this explicitly; it addresses the most common concern

**Watch for:** "What about our IT team?" — they are welcome but not the primary audience. The application development tooling is intentionally lightweight so that IT involvement is not required.

---

---

## SLIDE 13 — What Participants Leave With

**On screen:** Tangible outcomes list; the closing quote

**Your goal:** Answer the ROI question before it is asked explicitly.

**What to say:**
"Let me be specific about what participants leave with.

They leave with a working application — deployed on the public internet, theirs to keep and modify. That is the tangible artifact.

But the more important things they leave with are harder to quantify.

They leave with a mental model for how agents work that no vendor briefing can provide. You can attend fifty presentations about AI and not have it. You get it by building something and watching it fail, then fixing it and watching it work.

They leave with prompt engineering intuition — the understanding that the quality of AI output is directly in the hands of the person giving instructions. That the difference between a mediocre briefing and an excellent one is often a single sentence. That common sense must be stated explicitly.

And they leave with confidence. The confidence to look at a workflow problem and say: we could build an agent for that. Not theoretically. From experience.

As one description of this project put it: 'The distance between I have an idea and I have a working AI agent is, in 2026, measured not in months or credentials — but in focused hours.'"

**Key talking points:**
- The mental model and the prompt engineering intuition are the durable outcomes — emphasize these
- "The confidence to say: we could build an agent for that" — this is the organizational value
- The closing quote should be read slowly and clearly

---

---

## SLIDE 14 — What You Are Investing In

**On screen:** The numbers table

**Your goal:** Make the investment feel proportionate. This is not a large commitment relative to what it produces.

**What to say:**
"The logistics are straightforward.

Two days. Ten to sixteen participants. No prerequisites — the setup clinic on Day 1 morning handles everything. All the services used have free tiers, so there is no platform cost for a personal project.

What participants bring is a laptop and an idea.

I want to be clear about what you are not investing in. You are not investing in turning your employees into software engineers. That is not the goal and it is not the outcome.

You are investing in people who understand, from the inside, what AI agents are capable of — and what they require from a human to do it well. People who can have an informed conversation with your technology team, with your vendors, with the people who are proposing AI solutions to your organization. People who can evaluate those proposals because they have built something themselves.

That understanding is not available in a two-hour briefing. It is available in two days."

**Key talking points:**
- Keep this slide brief — it is the logistics slide, not the argument slide
- "Not turning your employees into software engineers" — say this proactively
- End on the "understanding not available in a briefing" point — it distinguishes the workshop from everything else they've seen

---

---

## SLIDE 15 — The One Thing to Remember

**On screen:** "The agent proposes. You decide." Large text

**Your goal:** Land the central principle of the presentation in a form the audience will remember after they leave the room.

**What to say:**
"I want to end with the thing that I think matters most — not about this workshop, but about AI agents in general.

AI agents are extraordinarily capable at research, synthesis, and structured production. They are faster than any human at gathering information. They are patient and consistent in ways humans are not. They do not get tired or distracted.

They are not capable of judgment. They are not capable of context — of understanding the politics of an organization, the history of a relationship, the unspoken stakes of a negotiation. They are not accountable.

Those things remain yours.

The application you saw today is built on that principle. Every design decision reflects it. The human approves every research result. The human decides what goes into the briefing. The human is responsible for what the briefing says.

The workshop is built on the same principle. Participants do not leave having been shown what AI can do. They leave having built something themselves and learned, firsthand, where the machine ends and the professional begins.

That boundary is the most important thing to understand about AI in the workplace. And it is a thing you learn by building — not by watching."

**Key talking points:**
- "The agent proposes. You decide." — this should be the last complete sentence before the pause
- The contrast between capability (research, synthesis) and incapability (judgment, context, accountability) is the key distinction
- "Where the machine ends and the professional begins" — this is the line to leave the room with

**Watch for:** Nods of agreement. This slide tends to generate them. Let the silence after it be comfortable.

---

---

## SLIDE 16 — Next Steps

**On screen:** Contact information and options

**Your goal:** Make it easy to continue the conversation without creating pressure.

**What to say:**
"If any of this has resonated, there are a few natural next steps.

The most useful one is a demonstration using your own meeting data — not a staged scenario, but something relevant to your organization. That typically takes thirty minutes and tends to produce the clearest sense of whether and where this applies.

Beyond that, we can talk about customizing the workshop application for your industry, your workflows, or the specific problems your teams are working on.

I am happy to take questions now, or to continue the conversation after we wrap. Either way, thank you for your time."

**Key talking points:**
- Do not oversell in the close — the demo has done the work
- The offer of a customized demonstration is the right next step, not a sales process
- Leave the room feeling like a conversation was started, not a pitch was completed

---

---

## SLIDE 17 — Q&A

**On screen:** "Questions" with the list of common questions visible

**Your goal:** Handle the likely objections with direct, confident answers.

**Prepared answers for common executive questions:**

---

**"How do we ensure the AI doesn't hallucinate?"**

The human-in-the-loop design is the answer. Every research result is shown to the user before it enters the briefing. The user can dismiss anything that looks wrong. Additionally, the agent uses live web search — it is not drawing on static training data, it is finding current information. The briefing is a starting point, not a final document. The professional using it is responsible for verifying what they act on.

---

**"What about data security? What leaves our network?"**

The application sends the user's meeting details and prompts to the Anthropic API via a secure proxy. It does not send documents, email, or proprietary data unless the user explicitly provides it. The API key — the credential that authorizes the connection — is never in the browser; it lives on Cloudflare's servers. For organizations with strict data handling requirements, the proxy can be deployed to infrastructure they control.

---

**"Can this connect to our internal systems — our CRM, our document repositories?"**

Yes, with additional setup. The architecture supports connecting to any system that has an API. Adding, for example, a Salesforce connection for account history, or a SharePoint connection for internal documents, follows the same pattern as the Google Calendar connection participants build in the workshop. It is not trivial, but it is within reach for a team that has been through the workshop.

---

**"What's the ongoing cost after the workshop?"**

Minimal for personal use — the free tiers of all three services (GitHub, Cloudflare, Anthropic) are sufficient for moderate use. An individual running the application for their own meetings would likely stay within the free tier indefinitely. For organizational deployment at scale, Anthropic's paid API tiers start at a few dollars per month and scale with usage.

---

**"How is this different from what our IT team is already exploring?"**

IT teams exploring AI are typically evaluating enterprise platforms — large-scale deployments, vendor relationships, procurement processes. This workshop is about something different: teaching individual contributors to understand and build AI solutions for their own workflows, independent of the enterprise technology roadmap. The two efforts are complementary, not competitive.

---

**"What if someone builds something that creates a compliance or legal risk?"**

The workshop application does not store data, does not connect to production systems, and does not take automated action. It produces a document for human review. The same compliance considerations that apply to a human analyst producing a research document apply here. The workshop includes explicit discussion of what agents can and cannot do, and where the professional's judgment and accountability are not optional.

---

*End of speaker notes*

---

*Companion document: EXECUTIVE_PRESENTATION_SLIDES.md*

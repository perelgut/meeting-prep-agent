# Appendix A — Software Technologies Required

**Project:** Meeting Prep Agent  
**Audience:** Students with no prior application development experience  
**Platforms covered:** Windows and macOS  
**Last Updated:** Session 2, Entry 035

---

## Important Note Before You Begin

Unlike traditional software development, this project runs almost entirely
inside your web browser. You do not need to install a programming language,
a compiler, or a local web server. The application is built and runs inside
Claude.ai's canvas environment.

The tools in this appendix fall into two categories:

**Essential (required before you write a single line):**
1. Claude.ai account
2. Google account (for Calendar and Gmail integrations)
3. Cloudflare account (for the secure API proxy)

**Supplementary (for managing documentation and project progress):**
4. Visual Studio Code
5. GitHub account
6. GitHub Desktop (optional — simplifies GitHub on Windows/macOS)

Work through them in order.

---

## 1. Claude.ai Account

Claude.ai is the environment where the entire application is built and runs.
It provides the AI model, the canvas where you write and run code, the web
search capability, and the connectors to Google Calendar and Gmail.

### What you need
- A valid email address
- A web browser (Chrome, Firefox, Safari, or Edge — all work)
- No credit card is required for a free account

### Windows — step by step

1. Open your web browser.
2. Go to **https://claude.ai**
3. Click **Sign up** (top right corner).
4. Enter your email address and click **Continue**.
5. Check your email for a verification message from Anthropic.
6. Click the link in the verification email. It will open a new browser tab.
7. Choose a password (at least 8 characters). Click **Continue**.
8. Enter your name when prompted. Click **Continue**.
9. Read and accept the Terms of Service.
10. You are now inside Claude.ai. You will see a text input at the bottom
    of the screen — this is where you interact with Claude.

### macOS — step by step

The steps are identical to Windows above. Safari, Chrome, and Firefox all
work. If you use Safari:

1. Open Safari.
2. Go to **https://claude.ai**
3. Follow steps 3–10 above exactly.

### Choosing a plan

The free plan is sufficient to begin this project. If you find you are
reaching usage limits during active development sessions, a paid plan
(Claude Pro) increases the number of messages you can send per hour.
Your instructor will advise if a paid plan is needed for your course.

### Staying signed in

Claude.ai will keep you signed in on your browser for an extended period.
If you are using a shared or lab computer, click your profile icon (top
right) and choose **Sign out** at the end of every session.

---

## 2. Google Account & Integrations

The Meeting Prep Agent connects to Google Calendar and Gmail to retrieve
meeting details and search past email threads. Both connections are made
through Claude.ai's integrations system — you do not write any connection
code yourself.

### What you need
- An existing Google account, OR
- A new Google account (free at https://accounts.google.com)

A school Gmail account works if your institution has not restricted
third-party app connections. If you are unsure, use a personal Gmail account.

### Step 1 — Verify you have a Google account

1. Go to **https://accounts.google.com**
2. Sign in with your email and password.
3. If you can see your Google account dashboard, you are ready. Continue
   to Step 2.
4. If you do not have a Google account, click **Create account** and follow
   Google's instructions. Return here when your account is active.

### Step 2 — Connect Google Calendar to Claude.ai

**Windows and macOS — same steps:**

1. Sign in to **https://claude.ai**
2. Click the **plug icon** (Integrations) in the left sidebar. It looks
   like a small connector symbol. If you do not see it, look for a menu
   icon (three horizontal lines) and expand the sidebar.
3. Find **Google Calendar** in the list of available integrations.
4. Click **Connect**.
5. A Google sign-in window will open. Sign in with your Google account.
6. Google will ask you to grant Claude.ai permission to view your calendar
   events. Read the permissions listed, then click **Allow**.
7. You will be returned to Claude.ai. Google Calendar will now show a
   green checkmark or "Connected" status.

### Step 3 — Connect Gmail to Claude.ai

1. In the same Integrations panel, find **Gmail**.
2. Click **Connect**.
3. A Google sign-in window will open (you may already be signed in).
4. Google will ask for permission to read your email. Click **Allow**.
5. Gmail will show a green checkmark or "Connected" status.

### Disconnecting at any time

If you want to remove Claude.ai's access to your Google account:

1. Go to **https://myaccount.google.com/permissions**
2. Find Claude.ai (or Anthropic) in the list.
3. Click it, then click **Remove access**.

This immediately revokes all calendar and email access. Your Claude.ai
account continues to work normally — only the Google integrations are
affected.

---

## 3. Visual Studio Code

Visual Studio Code (VS Code) is a free text editor used in this project
for writing and editing documentation files (including this appendix and
the Project Documentation). It is not used to run the application — the
application runs in Claude.ai.

### Windows — step by step

1. Open your web browser and go to **https://code.visualstudio.com**
2. Click the large blue **Download for Windows** button. The correct
   version for your computer is detected automatically.
3. When the download completes, open the installer file
   (`VSCodeUserSetup-x64-....exe`). You will find it in your Downloads folder.
4. The setup wizard will open.
   - Accept the license agreement.
   - Leave the install location as the default.
   - On the "Select Additional Tasks" screen, check the box for
     **"Add to PATH"** — this makes VS Code easier to use later.
   - Click **Install**.
5. When installation finishes, click **Finish**. VS Code will open.
6. VS Code may suggest installing extensions on first launch. You can
   dismiss these for now — no extensions are required for this project.

### macOS — step by step

1. Open your web browser and go to **https://code.visualstudio.com**
2. Click the **Download for Mac** button (it detects macOS automatically).
   - If you have an Apple Silicon Mac (M1, M2, M3, or M4 chip), click the
     dropdown arrow next to the download button and choose
     **"Apple Silicon"** for best performance.
   - If you have an Intel Mac, the default download is correct.
3. Open your **Downloads** folder. You will see a file named
   `VSCode-darwin-....zip` (or similar).
4. Double-click the zip file to extract it. A file called
   **Visual Studio Code.app** will appear.
5. Drag **Visual Studio Code.app** into your **Applications** folder.
   This is important — do not run it from the Downloads folder, or macOS
   may block some features.
6. Open your **Applications** folder and double-click **Visual Studio Code**
   to launch it.
7. macOS may show a warning: "This app was downloaded from the internet —
   are you sure you want to open it?" Click **Open**.

### Opening a folder in VS Code

When you want to edit your project documentation:

1. Open VS Code.
2. Click **File → Open Folder** (Windows) or **File → Open…** (macOS).
3. Navigate to the folder where you have saved your project files.
4. Click **Select Folder** (Windows) or **Open** (macOS).
5. Your files will appear in the left sidebar.

---

## 4. GitHub Account

GitHub is used to store your project documentation and track changes over
time. It is free for the purposes of this project.

### Creating an account

**Windows and macOS — same steps:**

1. Go to **https://github.com**
2. Click **Sign up** (top right).
3. Enter your email address and click **Continue**.
4. Create a password and click **Continue**.
5. Choose a username. This will be visible on your profile — choose
   something professional. Click **Continue**.
6. Answer the question about whether you want product updates (either
   answer is fine). Click **Continue**.
7. Complete the puzzle verification if prompted.
8. Check your email for a verification code from GitHub.
9. Enter the code on the GitHub page.
10. GitHub will ask some optional questions about your use case — you can
    skip these or answer them. Click **Continue**.
11. Choose the **Free** plan when asked to select a plan.
12. You now have a GitHub account.

### Creating your first repository

A repository ("repo") is a folder on GitHub that stores your project files.

1. Sign in to **https://github.com**
2. Click the green **New** button (top left, next to "Repositories"), or
   click the **+** icon (top right) and choose **New repository**.
3. Fill in the form:
   - **Repository name:** `meeting-prep-agent`
   - **Description:** Meeting Prep Agent — AI Agent course project
   - **Visibility:** Choose **Private** (only you can see it) or
     **Public** (visible to anyone). Private is recommended for coursework.
   - Check **"Add a README file"** — this creates the repo with an
     initial file so it is not empty.
4. Click **Create repository**.
5. Your repository is now live at
   `https://github.com/your-username/meeting-prep-agent`

### Creating a GitHub Projects board

GitHub Projects is a simple task board for tracking what needs to be done,
what is in progress, and what is complete.

1. Go to your repository page on GitHub.
2. Click the **Projects** tab near the top of the page.
3. Click **Link a project** → **New project**.
4. Choose **Board** as the template (gives you a Kanban-style To Do /
   In Progress / Done layout).
5. Name the project `Meeting Prep Agent — Build Tracker`.
6. Click **Create project**.
7. You will see three columns: **Todo**, **In Progress**, and **Done**.
8. Click **+ Add item** at the bottom of the **Todo** column to add tasks.
   For this project, add one card per build stage:
   - Stage 1: UI Shell
   - Stage 2: Calendar MCP + Private Context
   - Stage 3: Topic Discovery & Research Queue
   - Stage 4: Briefing Synthesis & .docx Download
   - Appendix: Software Technologies document
   - Appendix: Project Plan

---

## 5. GitHub Desktop (Optional but Recommended)

GitHub Desktop is a visual application that makes it easy to save your
changes to GitHub without using the command line. It is optional — you can
also upload files directly through the GitHub website.

### Windows — step by step

1. Go to **https://desktop.github.com**
2. Click **Download for Windows**.
3. Open the downloaded file (`GitHubDesktopSetup-x64.exe`).
4. GitHub Desktop will install automatically — no wizard steps required.
5. When it opens, click **Sign in to GitHub.com**.
6. Your browser will open a GitHub sign-in page. Sign in with your
   GitHub account, then click **Authorize desktop**.
7. Return to GitHub Desktop. Enter your name and email when prompted
   (these appear on your commits — use your real name).
8. Click **Finish**.

### macOS — step by step

1. Go to **https://desktop.github.com**
2. Click **Download for macOS**.
3. Open your Downloads folder and double-click
   **GitHubDesktop.zip** to extract it.
4. Drag **GitHub Desktop.app** to your **Applications** folder.
5. Open GitHub Desktop from Applications.
6. macOS may show the "downloaded from the internet" warning — click **Open**.
7. Click **Sign in to GitHub.com** and follow the same steps as Windows
   above (steps 6–8).

### Cloning your repository in GitHub Desktop

"Cloning" means downloading a copy of your GitHub repository to your
computer so you can edit files locally in VS Code.

1. Open GitHub Desktop.
2. Click **File → Clone Repository**.
3. Click the **GitHub.com** tab. Your repository (`meeting-prep-agent`)
   should appear in the list. Click it.
4. Choose a local folder where the files will be saved
   (e.g. `Documents/meeting-prep-agent`).
5. Click **Clone**.
6. The repository files are now on your computer. Open VS Code and use
   **File → Open Folder** to open that same folder.

### Saving changes back to GitHub

After editing files in VS Code:

1. Return to GitHub Desktop. It will show a list of files you have changed.
2. At the bottom left, type a short description of your changes
   (e.g. "Updated Stage 2 documentation").
3. Click **Commit to main**.
4. Click **Push origin** (top right). Your changes are now saved to GitHub.

---

## Quick Reference — What Runs Where

| Task | Where it happens |
|------|-----------------|
| Build and run the application | Claude.ai (browser) |
| Connect Google Calendar / Gmail | Claude.ai Integrations panel |
| Write and test AI prompts | Claude.ai (browser) |
| Secure API key proxy | Cloudflare Workers (browser dashboard) |
| Edit documentation files | VS Code (installed) |
| Save and version documentation | GitHub / GitHub Desktop |
| Track project progress | GitHub Projects (browser) |
| Install or run any local server | Not required for this project |

---

## 6. Cloudflare Account and Workers

Cloudflare Workers is a service that runs small pieces of JavaScript code
on Cloudflare's global network. In this project, the Worker acts as a
secure intermediary between your web application and the Anthropic API —
it holds the API key so the key never appears in your browser-side code.

You do not install anything on your computer to use Cloudflare Workers.
Everything is managed through a browser dashboard and deployed
automatically by GitHub Actions.

### What is Wrangler?

Wrangler is Cloudflare's official command-line deployment tool for Workers.
It handles packaging your Worker code and sending it to Cloudflare's network.

**In this project, you never run Wrangler yourself.** Instead, GitHub
Actions runs it automatically every time you push changes to the `main`
branch. The workflow file (`.github/workflows/deploy-worker.yml`) contains
the Wrangler commands — you wrote them once and GitHub runs them for you
from that point on.

When you read the workflow file and see:

```
command: deploy worker/proxy.js --name meeting-prep-proxy
```

This is a Wrangler command that means:
- **deploy** — send this file to Cloudflare and make it live
- **worker/proxy.js** — the file to deploy (your proxy code)
- **--name meeting-prep-proxy** — the name your Worker will have on
  Cloudflare (you will see this name in the Cloudflare dashboard)

When GitHub Actions runs this command, it uses your `CLOUDFLARE_API_TOKEN`
secret to authenticate with Cloudflare on your behalf. You never need to
sign in to Cloudflare manually for deployments after the initial setup.

### What the Worker does

Once deployed, the Worker sits at a URL like:
`https://meeting-prep-proxy.YOUR-SUBDOMAIN.workers.dev`

When your browser application needs to call the Anthropic API, it sends
a request to this URL instead of directly to Anthropic. The Worker:

1. Receives the request from the browser
2. Adds the `ANTHROPIC_API_KEY` header (from its own secure environment)
3. Forwards the request to `https://api.anthropic.com/v1/messages`
4. Returns Anthropic's response to the browser

The API key travels from Cloudflare to Anthropic — it never reaches the
browser. This is the entire purpose of the proxy.

### Creating a Cloudflare account

**Windows and macOS — same steps:**

1. Open your browser and go to **https://cloudflare.com**
2. Click **Sign up** (top right).
3. Enter your email address and a password. Click **Create Account**.
4. Check your email for a verification message from Cloudflare.
5. Click the link in the verification email to verify your address.
6. Cloudflare will ask if you want to add a website or domain.
   Click **Skip** or **Skip for now** — you do not need a domain for
   this project.
7. You will land on the Cloudflare dashboard home page.

### Finding your Account ID

Your Account ID is a 32-character code that identifies your Cloudflare
account. It is needed as a GitHub Secret so that GitHub Actions knows
which Cloudflare account to deploy to.

**Windows and macOS — same steps:**

1. Sign in to **https://dash.cloudflare.com**
2. On the dashboard home page, look at the right-hand sidebar.
3. You will see a section labelled **Account ID** with a 32-character
   string of letters and numbers (example: `a1b2c3d4e5f6...`).
4. Click **Click to copy** or select and copy the value manually.
5. Save this value — you will add it to GitHub Secrets shortly.

If you do not see the Account ID in the sidebar, make sure you are on
the **Home** page (click the Cloudflare logo top left to return there).

### Navigating to Workers & Pages

**Windows and macOS — same steps:**

1. In the Cloudflare dashboard left sidebar, click **Workers & Pages**.
2. This is where all your deployed Workers will appear after GitHub
   Actions runs the deployment workflow.
3. After your first successful deployment, you will see a Worker named
   `meeting-prep-proxy` listed here.
4. Click on it to see its URL, settings, and request logs.

### Obtaining a Cloudflare API Token

The API token allows GitHub Actions to deploy your Worker automatically.
It is a password-like value that gives GitHub Actions permission to act
on your Cloudflare account — but only for Workers, not for anything else.

**Windows and macOS — same steps:**

1. In the Cloudflare dashboard, click your profile icon (top right corner
   — it shows your email initial).
2. Click **My Profile**.
3. In the left sidebar of the Profile page, click **API Tokens**.
4. Click **Create Token**.
5. Find the template named **Edit Cloudflare Workers** and click
   **Use template** next to it.
6. The template pre-fills the correct permissions. Do not change anything.
7. Scroll down and click **Continue to summary**.
8. Review the summary — it should say the token can edit Workers.
9. Click **Create Token**.
10. The token is displayed **once only**. Copy it immediately.
11. Store it safely (a password manager is ideal). You cannot view it
    again after leaving this page — if you lose it, you will need to
    create a new one.

### Understanding the free tier

Cloudflare Workers free tier includes:
- **100,000 requests per day** — far more than any student project needs
- **No credit card required** to create an account or use the free tier
- **No time limit** — the free tier does not expire

You will not be charged anything for this project.

### Verifying your Worker is deployed

After your first push to GitHub that triggers the deployment workflow:

1. Go to **https://dash.cloudflare.com** and sign in.
2. Click **Workers & Pages** in the left sidebar.
3. You should see `meeting-prep-proxy` in the list.
4. Click on it. You will see:
   - The Worker's URL (copy and save this — you need it in `js/api.js`)
   - A **Metrics** tab showing request counts
   - A **Logs** tab for debugging if something goes wrong
5. To test the Worker is alive, visit its URL in a browser. You should
   see a "Method not allowed" message — this is correct, because the
   Worker only accepts POST requests from the application, not GET
   requests from a browser.

---

## Troubleshooting

**Claude.ai says I have reached my usage limit.**  
The free plan has a message limit per time window. Wait a short period and
try again, or speak to your instructor about whether a paid plan is needed.

**Google Calendar or Gmail is not showing in Claude.ai Integrations.**  
Refresh the Claude.ai page. If still missing, sign out and sign back in.
Check that your Google account has not blocked third-party app connections
at https://myaccount.google.com/permissions.

**VS Code shows a security warning on macOS.**  
Right-click (or Control-click) the app in Applications and choose **Open**
from the menu. This bypasses the Gatekeeper warning for apps from verified
developers.

**GitHub Desktop cannot find my repository.**  
Make sure you are signed in to the same GitHub account where you created
the repository. Click **File → Clone Repository** and check the
**GitHub.com** tab — all your repositories will be listed there.

**I accidentally closed my work in Claude.ai and cannot find it.**  
Claude.ai saves your conversation history. Click the chat history icon
(left sidebar) to find your previous session. Artifacts (canvas work) are
accessible from within their originating conversation.

**The GitHub Actions workflow for the Worker deployment failed.**  
Click the failed run in the GitHub Actions tab to see the error log. Common
causes are: a GitHub Secret name spelled incorrectly (must match exactly,
including capitalisation), an incorrect Account ID (must be the 32-character
hex string, not your email), or a syntax error in the workflow YAML file
(indentation is significant in YAML — use spaces, not tabs). Fix the issue,
commit, and push — the workflow will run again automatically.

**The Worker deployed successfully but the application cannot reach it.**  
Make sure the `WORKER_URL` constant in `js/api.js` matches the URL shown
on your Worker's page in the Cloudflare dashboard exactly, including the
`https://` prefix and no trailing slash. Also confirm you have pushed
`js/api.js` to GitHub and the GitHub Pages deployment has completed.

**I lost my Cloudflare API token.**  
Go to **https://dash.cloudflare.com** → profile icon → **My Profile** →
**API Tokens**. The existing token cannot be recovered. Click **Create Token**,
use the **Edit Cloudflare Workers** template again, create a new token, and
update the `CLOUDFLARE_API_TOKEN` secret in your GitHub repository settings.

---

*This appendix is part of the Meeting Prep Agent project specification.*  
*Platform coverage: Windows and macOS only.*
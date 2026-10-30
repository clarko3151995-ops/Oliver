# Using Claude: A Beginner's Guide (Built Around Rink Scanner)

This guide teaches you how to work with Claude by walking through a real change we made to **Rink Scanner**, the phone app in this repo that snaps rink receipts and sends them to Oliver (your Make.com intake scenario).

The change: a **"Recent uploads on this phone"** list under the Save button, so whoever is at the rink can see that their receipt actually got sent.

---

## Part 1: The big picture, in warehouse terms

| Software idea | Warehouse version |
|---|---|
| **Repository (repo)** | The warehouse. Every file for the app lives here. |
| **Branch** | A staging lane. You build an order there without touching stock on the shelves (`main`). |
| **Commit** | A signed packing slip: "here is exactly what changed, and why." |
| **Push** | Loading the truck: sending your commits from this computer up to GitHub. |
| **Pull request (PR)** | Receiving inspection. Someone checks the pallet before it goes into stock (`main`). |
| **Webhook** | A dock door with an address. Rink Scanner backs up to Make.com's door and drops off a receipt. |
| **Context window** | Claude's workbench. Everything in the conversation sits on it. When it fills up, older stuff gets summarized to make room. |
| **Connector (MCP)** | A forklift attachment. It lets Claude reach into another system: Gmail, Google Sheets, Make.com, QuickBooks. |
| **CLAUDE.md** | The SOP binder at the workstation. Claude reads it at the start of every session in that repo. |
| **Skill** | A laminated work instruction for one specific job ("how we file a receipt into the RAG sheet"). |
| **Subagent** | A temp worker you send to pick one aisle while you keep working. |

---

## Part 2: Where Claude lives (pick your tool)

You have several ways to use Claude. They share the same brain but have different tools on the belt.

### 1. Claude app / claude.ai (chat)
**Best for:** thinking out loud, planning, explaining, writing, quick questions, reading your Gmail/Calendar/Drive through connectors.
- **Projects:** a folder of chats that share uploaded files and instructions. Make one called "Oliver Bookkeeping" and drop in your Make.com scenario notes so you don't re-explain them each time.
- **Artifacts:** Claude can build a web page, chart, or small tool right in the chat that you can open, use, and share.
- **Connectors:** Settings → Connectors. You already have Gmail, Google Calendar, Drive, Sheets, Docs, Make, and QuickBooks connected.
- **Preferences/memory:** the "about me" notes you set (warehouse background, Make.com, etc.) are why Claude talks to you in warehouse analogies.

### 2. Claude Code on the web or phone (where this guide was made)
**Best for:** changing code in a GitHub repo without installing anything.
- Runs in a **cloud container**: a temporary computer that clones your repo, works on a branch, and pushes commits back to GitHub.
- The container is thrown away later, so **anything not pushed is lost**. Like a temp staging area that gets cleared at shift end.
- It can open PRs, watch them, and fix failing checks when you ask.
- It can schedule check-ins ("remind me tomorrow to test this at the rink").

### 3. Claude Code on your PC (desktop app or terminal)
**Best for:** working on files that live on your computer, running things locally, longer build sessions.
- Your i7-10700F with 16GB RAM is plenty. Claude does the heavy thinking in the cloud; your PC just runs the tool.
- Install instructions change over time, so use the official page: <https://code.claude.com/docs>.
- Same ideas as the web version, but it works in a folder on your machine and asks permission before running commands or editing files.

**Where to start:** use **chat** for planning and learning, and **Claude Code on the web** for changes to this repo. Try the PC version once you want to work on local files.

---

## Part 3: Let's build it together (the Recent Uploads list)

Here is the exact workflow used for this change. Re-use it for any feature.

### Step 1: Say what you want, and let Claude ask questions
Good first message:
> "In Rink Scanner, add a small list showing the last 10 receipts sent from this phone, with time, note, and whether Make said Sent or Queued. Don't change anything on the Make.com side."

Why it works: it names the **app**, the **outcome**, a **limit** (10), and a **boundary** (don't touch Make). Boundaries are like saying "stage it in lane 4, don't touch the pick faces."

### Step 2: Claude reads before it writes
Claude opened `index.html` first and found:
- The app already stores the PIN in the phone's `localStorage` (a small notepad that a website gets inside the browser).
- Make replies with `{"ok": true}` when it processes a receipt, or the word `Accepted` when the scenario is switched off and the receipt is queued.

So the list could reuse the same notepad and the same two replies. **No new server, no Make changes.**

### Step 3: The change itself (in `index.html`)
Four small pieces:
1. **Style** (`.history-card` CSS) so the list looks like the rest of the app.
2. **Markup:** a `<section id="historyCard">` under the form.
3. **Logic:**
   - `addToHistory()` puts the newest receipt at the top and keeps only 10 (`HISTORY_MAX`). It's like FIFO rotation with a 10-slot rack.
   - `renderHistory()` redraws the list.
4. **Hook it in:** call `addToHistory()` only after Make confirms. Failed uploads don't get listed, so the list never lies.

A safety detail worth learning: notes are shown with `textContent`, not `innerHTML`. If someone typed `<b>hi</b>` as a note, it shows those exact characters instead of being treated as page code. Treat typed input like an unverified delivery: count it, don't trust it.

### Step 4: Test without touching real data
Claude ran the page in a headless browser (a browser with no screen) and **faked the Make.com webhook**, so nothing reached Oliver. The test:
- entered a PIN, uploaded two fake receipts (one "Sent", one "Queued"),
- checked that both appear in the list,
- reloaded the page and checked they're still there,
- checked for JavaScript errors (none).

Think of it as a dry-run cycle count before the real one.

### Step 5: Commit and push
The work went on branch `claude/beginner-guide-6pqn25`, not `main`. To get it into the live app:
1. Open the repo on GitHub, and you'll see a banner offering to open a pull request for the branch (or ask Claude: *"open a PR for this branch"*).
2. Review the changes and merge.
3. Open Rink Scanner on your phone and test one real receipt.

### Your turn: practice prompts
Try these in a Claude Code session on this repo, one at a time:
- *"Explain what `resizeToBase64` does, line by line, like I work in a warehouse."*
- *"Add a 'Clear list' button to Recent uploads. Ask me questions first."*
- *"If an upload fails, keep it in the list as 'Failed – tap to retry'. Plan it before writing code."*
- *"Write a CLAUDE.md for this repo describing Rink Scanner and how it talks to Make.com."*

---

## Part 4: Your toolbox

### Habits that get the best results
- **Ask for questions first.** "Ask me clarifying questions before you start" saves a wrong build.
- **Ask for a plan** on anything bigger than a small fix: "Plan this first, don't write code yet." (Claude Code also has a **plan mode** for this.)
- **One job per message** when learning. Small batches are easier to inspect.
- **Paste the error.** Copy the exact red text, a screenshot, or the Make.com execution log. "It's broken" is a mis-pick with no SKU.
- **Ask "why".** "Why did you use localStorage instead of a Google Sheet?" teaches you more than the code does.

### Claude Code commands worth knowing
Type `/` in Claude Code to see the full list. Start with:
| Command | What it does |
|---|---|
| `/help` | Shows what's available. |
| `/init` | Writes a starter `CLAUDE.md` (the SOP binder) for the repo. |
| `/clear` | Empties the workbench for a fresh task. |
| `/compact` | Summarizes the conversation so far to free up room. |
| `/model` | Switches which Claude model you're using. |
| `/code-review` | Reviews your changes for bugs. |
| `/security-review` | Checks your changes for security problems. |

### Connectors you already have
| Connector | Example ask |
|---|---|
| **Make** | "List the executions of the Oliver – App Intake scenario from today and tell me if any failed." |
| **QuickBooks** | "Show my profit and loss for last month." |
| **Google Sheets** | "Add these three receipts to my expenses sheet." |
| **Gmail / Calendar** | "Find receipts emailed to me this week." / "What's on my calendar Friday?" |
| **Google Drive / Docs** | "Read my bookkeeping notes doc and summarize the open questions." |

Connectors can **change real data**. Claude asks before risky actions, but read the confirmation the same way you'd read a pick ticket before you pull.

### Your custom skills
You already have personal skills set up. Mention them by name or with `/`:
- **sparks**: start a message with "Spark:" to quick-capture an idea.
- **rag-filing**: "file this to RAG" saves useful info into your Drive RAG folder.
- **home-rag-update** and **receipt-price-book**: household sheet and grocery price tracking.
- **morning**: your morning brief.

### Safety basics
- **Secrets stay out of code.** Rink Scanner keeps the PIN on the phone, never in `index.html`. Do the same with API keys.
- **Branches protect `main`.** Let Claude work on a branch; you decide what gets merged.
- **Read before you approve.** When Claude asks permission to run something, it's a pick confirmation. Glance at it.

---

## Quick reference card
1. Say the **outcome + limits + boundaries**.
2. Let Claude **ask questions** and **make a plan**.
3. Claude **reads**, then **changes**, then **tests**.
4. Work lands on a **branch** → **PR** → you **merge**.
5. Test it for real on your phone.

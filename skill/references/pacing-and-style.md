# Pacing, style and flow of SDAIA Academy courses

Distilled from how the four existing courses were built (October 2026 sessions) and from measuring their decks.
Follow these unless the user says otherwise.

## The shape of a course

- **Teaching days × 4 sessions, plus one capstone-presentation day.** Three or four teaching days so far (Applied NLP: 3 + 1; the others 4 + 1). A day is about four hours.
- **A session is about 50 minutes:** 20–25 minutes of concepts and live demos, then a **25-minute lab**. Every lab's checklist adds up to exactly 25 minutes (5 steps of 2–8 minutes plus one ✱ stretch item without a time).
- **Breaks:** a short break after sessions 1 and 3 and a longer one at mid-day, but breaks are **not slides**: the instructor presses `B` in the deck and gets a break screen over the current slide (10 minutes by default; they retype the length or a "back at" time, Enter starts it, Esc ends it). Decks contain no break slides and agendas no break rows. **Never print clock times** ("9:00", "starts at 9am") anywhere: agendas, course pages and running orders show only durations and session numbers.
- **One case study per course:** a fictional organisation with synthetic, deterministic data (fixed seed) and deliberately planted problems, used by every session and the capstone. Fluency courses give undergraduates a co-op-trainee variant.
- **Capstone day:** opening and expectations (rubric), final prep, then presentations across the four sessions with a running-order table (editable inputs) and a "now presenting" slide with two timers (talk and Q&A), then peer feedback, instructor review, next steps and closing. Individual capstones for fluency audiences (5 + 2 minutes); individuals or pairs for engineering (8 + 4 minutes). Capstone preparation is seeded during the last two teaching days (a lab that picks the task, a kickoff session at the end of the last day).
- **Rubric:** five or six weighted criteria shown as bars on the course page (e.g. 25/25/20/20/10). Measured results beat claims: "results from at least two measured runs".
- **Labs never assume an earlier lab was finished.** The user skips exercises or sends them home. A lab may build on a previous day's work only with a fallback ("if you did not finish 3.2, use the sample file"). Same-day dependencies are not allowed.

## A deck, slide by slide

Measured over 14 decks: a teaching day has 36–58 slides (median about 48), the capstone day 23–24. A session is 8–15 slides. Speaker notes cover 7–47% of slides (the Arabic course has the most). Content slides average 75–100 words.

Day opening (3–8 slides): title slide (`.slide.title` with kicker, h1, lead, meta pills including the track pill), course or day overview, a review quiz of the previous day (from Day 2 on), agenda (`.agenda`: the four sessions only, each with its title and a one-line summary; no durations, no break rows), setup check on Day 1.

Each session:
1. `.slide.section` with `data-session="S1 · Title"`, a kicker ("Session 1"), the h1, three outcomes (`ul.bullets.outcomes`) and the big `.sess-no`.
2. 6–11 concept slides. Vary the form: a cards slide, a table, a flow, a code or prompt slide, a stat or bars slide, a worked example (chat, trace), a callout that says what goes wrong. One idea per slide. Prefer concrete numbers from the actual lab run over illustrative numbers.
3. One quiz (`.quiz` with 4 options, `data-ok` on the right one and a hidden `.why`). Vary where the right answer sits: over a deck the `data-ok` letters spread across A–D (the Director noticed earlier decks put it on B almost every time).
4. The lab slide (`.slide.lab`): `.cols.cols-2.mid` with `.lab-tag` "Lab 2.1 · 25 min", h2, `.nb` link to the notebook or lab page and a one-line description on the left; a `.checklist` whose `.min` badges sum to 25, plus one `li.stretch`, on the right.

Day close (2–4 slides): wrap-up (what was built today, three "remember" cards), capstone pointer, "tomorrow" teaser, and a dark closing slide.

## Voice

- Direct second person, plain and concrete. Short declarative titles ("Monitors watch what nobody promised"). Engineering first, theory on demand. Measure, don't assume.
- Evidence first: cite real studies and reports as stats or bars; keep the finding honest even when it is unflattering (Arabic performance is much weaker; hybrid search lost to dense until reranked).
- Every tool name is an example, not an endorsement. Re-verify product names, renames and deprecations for the current month by web search before writing them (NotebookLM → Gemini Notebook, Custom GPTs → plugins, LMArena → Arena). Prefer Saudi-relevant tools with real logos (HUMAIN Chat, Etlaq, ALLaM).
- Saudi context in every course where it fits: PDPL, SDAIA's generative-AI guidelines and ethics principles, NDMO data classification (Top Secret / Secret / Restricted / Public), government examples.
- Speaker notes (`aside.notes`): instructor guidance, the answer to the quiz, the live demo script, common failures (401 from a pasted key, 429 busy model, proxies blocking a host). Aim for notes on at least a third of the slides.
- Arabic courses: Arabic UI and content with Latin acronyms (RICE, PRD, MCP) and Western digits; wrap Latin words, file names and code in `.en` or `.ltr`; use «» for quoting Arabic terms (not `<code>`, which breaks letter joining); write arrows in reading direction (←); SVG text needs `direction:ltr` and explicit `text-anchor`. English courses show the Arabic course title once on the title slide (`<span class="ar">`).

## Labs

Three formats exist. Pick by audience:

- **Notebooks** (engineering and data-science courses): one percent-format source `labs/_src/D{d}_{n}_slug.py` per lab with `# BEGIN SOLUTION` / `# END SOLUTION` markers; `labs/_tools/py2nb.py` (copy from `templates/py2nb.py`) builds the student notebook `labs/D{d}_{n}_slug.ipynb` (exercises raise `NotImplementedError`) and the solution in `labs/solutions/`. First cell: title, "Day d · Session n · 25 min", what you will build, the checklist with minutes. Second cell: Colab clone + install or local path search, then `import <course>_utils as U`. Then numbered tasks, ✏️ exercises each followed by a check-and-safety-net cell (catches `NotImplementedError` and supplies a reference result so later cells run), 🔍 "look at" prompts, a 3-question checkpoint with answers in `<details>`, and "carry forward" (what the next lab reuses). A quick mode (`<COURSE>_QUICK=1`, `U.pick(full, quick)`) keeps every solution notebook under about 10 minutes on CPU. Links open in Colab from GitHub: `https://colab.research.google.com/github/SDAIAAcademy/<repo>/blob/main/labs/<nb>.ipynb`. Standalone programs are single-file PEP 723 scripts run with `uv run`. Python via uv; `uv.lock` committed; a `00_setup_check` notebook; `requirements-colab.txt`; `.env.example`.
- **HTML lab pages** (fluency and executive courses, no code): `labs/D{d}_{n}_slug.html` on `lab.css` + `academy.js`: header (tag, title, one-sentence intro, meta chips: time, solo or pair, tool, audience), goal box, "what you need" with files, numbered `.step` blocks with `.min` badges and copyable `.prompt[data-tool]` blocks, `td.fill` tables to fill in, a `.step.stretch`, check questions (`ol.checks`), folded `details.instructor` notes (answer key, traps, common errors), pager links. Synthetic files (PDF, DOCX, XLSX, TXT) come from a deterministic generator `labs/tools/prepare_files.py` with an `answer_keys.md` for instructors.
- **Walkthrough notebooks without exercises** (tool tours) and **PEP 723 scripts** (servers, CLIs, CI checks) complement the above when a session is about a tool rather than a concept.

Shared helpers live in one module (`nlp_utils.py`, `agentkit.py`, `de_utils.py`). Data generators are stdlib-only where possible. Every lab is executed end to end before its slides are finalised, and the slide's numbers come from that run.

## Repository layout

```
index.html          course page (page.css): header with track pill, "one case study" cards, schedule paragraph,
                    one .day block per day (day-head + session table with lab links),
                    capstone + rubric bars, outcomes + setup, footer
slides/day1.html …  one deck per day (dayN.html; or D{d}_{n}_slug.html for one deck per session)
labs/               notebooks or lab pages, data, helpers, capstone kit, labs/README.md
README.md           English: title (bilingual), track, one-paragraph pitch, day table with slide links,
                    the session rhythm, the case study, "How the course is organised", repository tree, labs,
                    Sources (grouped, every claim's URL), licences of adapted material. About the course only:
                    nothing about the slide system, its keys or its checks, and no local paths
.gitattributes      *.html/*.css/*.js/*.md text eol=lf
.nojekyll           GitHub Pages serves the repo root of main
```

Commits: one per deliverable chunk, imperative subject ("Add Day 2: labs and slides"), `Co-Authored-By` trailer. `OUTLINE.md` is a working document: commit it early if useful, delete it before the final push. Never mention unpublished internal material (for example the SAMAI programme) in a published course.

## Quality gates (all of them, every time)

1. `node scripts/check.mjs <repo>` (every deck in headless Chrome, fragments revealed): "OK" or fix the overflow by tightening words, not by shrinking type below `.small`.
2. Screenshots of a sample of slides reviewed by eye (`scripts/check.mjs --shots`): logo visible, no overlaps, bidi glitches, contrast.
3. Lab arithmetic: each lab slide checklist sums to 25; lab-page step times match the slide.
4. Every link resolves (relative files, Colab URLs, external sources).
5. Every solution notebook runs end to end in quick mode; numbers quoted on slides match the run.
6. Phone-width check of the course page and lab pages (no horizontal scroll at 400px).
7. `node scripts/qa.mjs <repo>` and a grep for forbidden terms: clock times, break slides, break rows or durations in agendas, quiz answers piling on one letter, team wording when the capstone is individual, placeholders (`YOUR-ORG`), unpublished sources, local paths.
8. After pushing: Pages status "built", then load the live course page and one deck.

## Recurring problems to avoid

- Slide or table overflow after edits; code lines wider than the box; long titles. Split content or reword.
- Bidi: a leading "+" or "−" flips in RTL bars; mixed Latin/Arabic parentheticals in chips; `<code>` around Arabic.
- Duplicate SVG gradient ids when the logo repeats (the engine already renames them per slide).
- Library and API drift: check installed versions and official docs before writing code slides; use canonical model ids; legacy ids 404.
- Windows: `python` is not on PATH (use `uv run` with PEP 723 inline deps); long Bash heredocs with Arabic fail (write files with the Write tool or a script); CRLF breaks notebooks (`.gitattributes`); console emoji errors; read-only git objects on reset.
- Network: some hosts are unreachable from the machine (TLS or proxy); verify through headless Chrome or search snippets and say so in the report.

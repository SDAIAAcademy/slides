---
name: sdaia-course
description: Build a new SDAIA Academy course end to end on the Academy's shared slide system (https://sdaiaacademy.github.io/slides/): research the topic, check overlap with the existing Academy courses, propose outlines in the Academy format (teaching days of four sessions with a lab each, a capstone day), then build the repository (course page, decks, labs, README with sources), run the quality gates and publish it on GitHub Pages under SDAIAAcademy. Use whenever the user asks to create, plan, outline, scope or build an Academy course, bootcamp or workshop, add a day or session to one, convert existing material (an outline, old slides, story decks) into Academy slides, or asks which track a course belongs to. Also use for fixing or extending an existing Academy course deck so it stays consistent with the system.
---

# Building an SDAIA Academy course

An Academy course is a public repository `SDAIAAcademy/<repo>` served at `https://sdaiaacademy.github.io/<repo>/`. Its
decks, course page and lab pages load the shared slide system from `https://sdaiaacademy.github.io/slides/` (source:
https://github.com/SDAIAAcademy/slides). Content lives in the course repo; the engine, theme and track colours live in the
system. Read these before doing anything:

- `references/pacing-and-style.md`: the shape of a course, a deck and a lab; voice; quality gates; recurring problems.
- `references/catalog.md`: the five tracks (what each one is for) and every existing course, session by session (for the overlap check).
- `references/components.md`: every component of the slide system, the course page and the lab page.
- `templates/`: deck (en/ar), capstone deck (en/ar), course page (en/ar), lab page (en/ar), README, OUTLINE, `py2nb.py`.
- `scripts/`: `scaffold.mjs` (repo skeleton), `check.mjs` (layout self-check and screenshots), `qa.mjs` (content QA).

The work has five phases. Do not skip the overlap check or the outline approval: the user decides the outline, you build it.

## 1 · Intake

Settle these before research; ask the user once (one question with options) for whatever the request does not say:

| Item | Options and defaults |
|---|---|
| Title | English and Arabic (`رفع الإنتاجية بالذكاء الاصطناعي`); both appear on the title slide and the README |
| Track | `fluency` (using AI, no code) · `foundations` (the shared core of Python and mathematics that both AI Engineering and Data Science build on) · `ai-engineering` (NLP, agents, data engineering, deployment) · `data-science` (analysis, statistics, optimization, experimentation, advanced ML) · `executives` (strategy, governance, value, risk) |
| Language | Arabic RTL for fluency and executives, English for engineering and data science, unless told otherwise. One language per course; English courses show the Arabic title once |
| Shape | 3 or 4 teaching days × 4 sessions + 1 capstone day (the Academy default). Each session: 20–25 min concepts + 25-min lab |
| Audience | job roles and what they already know; whether undergraduates attend (then labs get a student variant) |
| Constraints | free tiers only, no local model downloads, no code, laptop CPU or Colab, tools to avoid (n8n, Power Automate), Saudi tools to prefer |
| Repo name | lowercase slug (`agentic-ai`, `applied-nlp`); the user pushes to `SDAIAAcademy/<repo>` or lets you |

## 2 · Research

Run three or four research agents in parallel (background), each returning a digest of at most 1,500 words with a URL per
claim and a tag: [V] verified on an official or primary page, [S] secondary coverage, [unverified]. Topics:

1. **The field now**: what practitioners do and teach in the current month; the ladder or pipeline that organises it; official docs of the tools and APIs; versions actually installed (`uv pip show`) and current model ids; renames, deprecations and shutdowns (NotebookLM → Gemini Notebook, Custom GPTs → plugins, Assistants API shutdown).
2. **Comparable courses and syllabi**: vendor academies (Anthropic, OpenAI, Google, DeepLearning.AI, Hugging Face), universities, bootcamps: structure, labs, what they leave out.
3. **Evidence and the Saudi context**: studies with numbers for the opening slides; SDAIA guidelines and ethics principles, PDPL, NDMO classification; Saudi tools (HUMAIN, ALLaM, Etlaq) and availability limits.
4. **Tools for the labs**: free tiers, quotas, Colab compatibility, licences of datasets and material to adapt (CC BY-NC-SA is adapted with attribution; all-rights-reserved is paraphrased only).

Verify yourself, against official pages, every claim that will appear on a slide about a vendor API or a product. Never cite
a source you did not open. Never use unpublished internal Academy material in a published course.

## 3 · Overlap check

From `references/catalog.md` plus the live `README.md` of every course in the same track and the neighbouring tracks
(`curl https://raw.githubusercontent.com/SDAIAAcademy/<repo>/main/README.md`), build a table: candidate topic → where it
already exists (course, day, session) → decision: **new** (teach fully), **recap** (one slide with a pointer "covered in
Applied NLP Day 2, session 3"), **prerequisite** (state it, point to the course, give a pre-reading), **cut**. Keep case
studies distinct from the existing ones (Qafila, Madar, Al-Waha, DemoMart). Say which Academy course comes before and after
this one in its track.

## 4 · Outline proposal (stop here for approval)

Write `OUTLINE.md` from `templates/OUTLINE.md`: the "why this outline" signals table, the overlap table, two candidate case
studies (fictional organisation, synthetic data, planted problems, undergraduate variant), one table per day (session title,
concepts, lab `D{d}_{n}_slug`, deliverable), the capstone (tracks, minimum requirements, rubric weights, talk and Q&A
minutes, individual or pairs), prerequisites, and what was cut. Offer **two outlines** that differ in a real way (emphasis,
day split, case study) and recommend one. Present the summary to the user and ask them to choose or adjust; build nothing
until they answer. Commit `OUTLINE.md` once approved; delete it before the final push.

## 5 · Build

Order of work, one commit per step, imperative subjects, the `Co-Authored-By` trailer:

1. **Scaffold**: `node scripts/scaffold.mjs --out <dir> --repo <repo> --title "…" --title-ar "…" --track <key> --lang en|ar --days N --labs notebooks|pages`, then `git init -b main`. Fill the course page and README headers from the outline.
2. **Labs infrastructure** (engineering courses): `labs/prepare_data.py` (stdlib only, fixed seed, planted defects, an instructor answer key), the helpers module, `00_setup_check.ipynb`, `requirements-colab.txt`, `.env.example`, `uv` project with `uv.lock`, a mock or cache so every lab runs without a paid key. Fluency courses: `labs/tools/prepare_files.py` renders the synthetic file pack (PDF via headless Chrome, DOCX, XLSX, TXT) and `labs/instructor/answer_keys.md`.
3. **Per day, labs first, then the deck**: write the lab sources (`labs/_src/D{d}_{n}_slug.py`, `# BEGIN SOLUTION` markers) or lab pages, build and **run every solution notebook in quick mode**, then write the deck from the real outputs. Delegate a day's labs to one agent with a strict spec (file names, helpers, checklist with minutes summing to 25, quick mode, safety-net cells, checkpoint questions, carry-forward); keep the decks with you or give the agent the exemplar deck and `components.md`. Tell running agents about shared-file changes. Fill speaker notes on at least a third of the slides. Use fragments (`class="frag"`) for build-ups instead of repeated slides. Never make a lab depend on the same day's earlier lab without a fallback.
4. **Capstone deck** from the capstone template: running order with editable inputs, "now presenting" slides with two timers, review, what next.
5. **Course page and README**: the day tables with Colab or lab links, rubric bars, outcomes, setup, and the README with a grouped **Sources** section containing every URL used.
6. **Quality gates**, all of them: `node scripts/check.mjs <repo> --shots` (OK on every deck; look at a dozen screenshots), `node scripts/qa.mjs <repo>` (lab minutes, links, forbidden strings, placeholders, break slides, agenda rows, the spread of quiz answers), every solution notebook end to end, phone-width check of the course page, a grep for clock times, team wording when the capstone is individual, `YOUR-ORG`, unpublished sources. Fix wording before shrinking type.
7. **Publish**: delete `OUTLINE.md`; `gh repo create SDAIAAcademy/<repo> --public --source . --push`; enable Pages (`gh api -X POST repos/SDAIAAcademy/<repo>/pages -f "source[branch]=main" -f "source[path]=/"`); set the homepage and description; wait for the build (`gh api repos/SDAIAAcademy/<repo>/pages/builds/latest`); load the live course page and one deck in headless Chrome. Then add the course to `references/catalog.md` in the skill (repo `SDAIAAcademy/slides`) and push that too.
8. **Report** honestly: what was run and verified, what was not (full-size notebooks on a GPU, live API runs without a key, pages unreachable from this machine), synthetic data, and the risks the instructor should check before the first cohort.

## Converting existing material

An outline from another LLM: treat it as a research input, not a plan; run phases 2–4 anyway. Old slides or story decks:
one old slide or board → one `section.slide`; consecutive boards that add one piece each → one slide with fragments; drawn
figures → cards with the caption and detail; positioned tables → `table.t.small`; takeaways → a `.callout.tip` at the bottom;
notes → `aside.notes` with a "Sources:" line; the deck gets `data-course`, `data-track`, `data-day`, loads the shared
`deck.css` and `deck.js` (plus the course's own `assets/course.css`/`course.js` when it needs a component the system lacks),
and passes `check.mjs`. Keep every fact, number and sentence.

## Rules that came from the Director's feedback

- Durations, never clock times. Breaks are not slides: the instructor presses `B` in any deck for the break screen (10 minutes by default, retyped live). Agenda slides list the four sessions only: no durations, no break rows.
- Quiz answers: `data-ok` lands on a different letter each time; across a deck the right answers spread over A–D (never "always B").
- Every lab is 25 minutes with a checklist that sums to 25 and one stretch item; labs never assume an earlier lab was finished.
- One case study per course, synthetic and deterministic; individual capstones for fluency audiences.
- Tool names are examples; re-verify names, renames and deprecations for the current month before writing them; prefer Saudi-relevant tools with real logos.
- Vendor API facts come from official docs; the README lists every source; nothing unpublished is cited.
- Free hosted models only unless told otherwise; no local model downloads; everything runs on a laptop CPU or Colab.
- Speaker notes are keyboard only (N) and carry the instructor's script; nothing is drawn on the slide for them.
- Changes to the shared engine or theme go to `SDAIAAcademy/slides`, never to a copy inside a course.
- A course README is about the course and its content only: title, track, pitch, day table, rhythm, case study, how it is organised, repository tree, labs, sources. It does not describe the slide system, its keys or its checks (the engine's own README does), and never contains local paths.

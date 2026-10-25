# SDAIA Academy slide system · نظام الشرائح

The shared shell for every SDAIA Academy course: one slide engine, one course-page style and one lab-page style, served
from this repository by GitHub Pages at **https://sdaiaacademy.github.io/slides/**. A course repository holds only its
content (decks, course page, labs) and links to these files, so a fix or a theme change here reaches every course, and a
course never has to copy the engine again.

Demo decks: [English](https://sdaiaacademy.github.io/slides/demo/en.html) · [Arabic](https://sdaiaacademy.github.io/slides/demo/ar.html).
Each shows every component; add `?check` to the URL to run the layout self-check.

## Files

| File | Used by | What it does |
|---|---|---|
| `deck.css` | slide decks | The 1600×900 stage, the chrome, every slide component, the track colours, the right-to-left mirror, print. Imports the fonts and the code theme. |
| `deck.js` | slide decks | Scaling, navigation, speaker notes, overview, help, break timers, quizzes, lazy syntax highlighting, the `?check` self-check. Embeds the logo and the track names. |
| `page.css` | course pages (`index.html`) | Header, cards, day tables, rubric bars, file lists, both directions. |
| `lab.css` | lab guide pages (`labs/*.html`) | Header, goal box, timed steps, prompts with copy buttons, callouts, tables, numbered checks. |
| `academy.js` | course and lab pages | `window.ACADEMY_LOGO`, fills `#logo`, adds a copy button to every `.prompt`. |
| `img/academy.svg` | all pages | The favicon. |
| `demo/` | this repo | The two demo decks. |
| `skill/` | Claude Code | The course-building skill (see below). |

## Using it in a course

A deck needs one stylesheet and one script:

```html
<!doctype html>
<html lang="en">                      <!-- Arabic: <html lang="ar" dir="rtl"> -->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Day 1 · My Course</title>
<link rel="icon" href="https://sdaiaacademy.github.io/slides/img/academy.svg">
<link rel="stylesheet" href="https://sdaiaacademy.github.io/slides/deck.css">
</head>
<body>
<div class="deck" data-course="My Course" data-track="ai-engineering" data-day="Day 1">
  <section class="slide title"> … </section>
  <section class="slide"> … <aside class="notes">…</aside></section>
</div>
<script src="https://sdaiaacademy.github.io/slides/deck.js"></script>
</body>
</html>
```

- `data-course`, `data-track`, `data-day` fill the chrome (footer and breadcrumb). `data-session` on a section slide labels the slides that follow it; `data-label` overrides one slide.
- `<html lang="ar" dir="rtl">` switches the interface strings to Arabic and mirrors the layout. In Arabic decks ← goes forward and → back, like the progress bar; ↓, PgDn and Space always go forward so presenter clickers keep working.
- Code blocks (`pre.code > code.language-x`) load highlight.js on demand; set `data-highlight="off"` on `.deck` to skip it.
- Course pages link `page.css` and `academy.js`; lab pages link `lab.css` and `academy.js`. Put `data-track` on `<html>` so the header takes the track colour.
- A course can extend the engine with its own `assets/course.css` and `assets/course.js` loaded after the shared files. `window.deck` exposes `slides`, `show`, `next`, `prev`, `index`, `check` and `checkSelectors`; the document fires `deckslide` on every slide change.

**Latest or pinned.** `https://sdaiaacademy.github.io/slides/…` always serves `main`. To freeze a course on a release, link to a tag through jsDelivr, for example `https://cdn.jsdelivr.net/gh/SDAIAAcademy/slides@v1.0.0/deck.css`, and move the pin when ready.

## Tracks

Every course belongs to one of the Academy's five tracks. `data-track` takes the key; the engine supplies the localized name and the accent colour (progress bar, bullets, title pill, timers, lab tags).

| Key | Track | المسار | Accent |
|---|---|---|---|
| `fluency` | Data & AI Fluency: using AI at work and in study | مسار الطلاقة في البيانات والذكاء الاصطناعي | teal |
| `foundations` | Data & AI Foundations: Python and mathematics for data and AI | مسار أساسيات البيانات والذكاء الاصطناعي | green |
| `ai-engineering` | AI Engineering, the main engineering track (includes data engineering) | مسار هندسة الذكاء الاصطناعي | amber |
| `data-science` | Data Science: analysis, statistics, optimization, experimentation, advanced ML | مسار علم البيانات | cyan |
| `executives` | Executives & Leaders | مسار التنفيذيين والقادة | coral |

## Keys

`F` fullscreen · `Esc` exit · `←` `→` / `↑` `↓` navigate · `Home` `End` · `N` speaker notes · `O` overview · `T` start/pause the break timer · `?` help. Swipe on touch screens.

## Theme

Every colour and font is a custom property on `:root` (`--navy`, `--teal`, `--coral`, `--green`, `--cyan`, `--amber`, `--purple`, `--ink`, `--paper`, `--line`, `--muted`, `--font`, `--mono`, `--track-color`). A course that needs a different accent overrides them in a `<style>` after the shared stylesheet.

## Course-building skill

`skill/` is a Claude Code skill for building a new Academy course: it researches the topic, checks overlap with the existing courses, proposes an outline in the Academy's format (days of four sessions, concepts then a lab, a capstone day), then builds the repository on this system and pushes it. Install it once:

```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\sdaia-course" -Target "C:\Users\Modar\work\slides\skill"
```

(macOS or Linux: `ln -s /path/to/slides/skill ~/.claude/skills/sdaia-course`.) Then, in a new empty course folder, ask Claude to build the course.

## Courses on this system

- [AI Productivity](https://github.com/SDAIAAcademy/productivity) · Data & AI Fluency · Arabic
- [Applied NLP Engineering](https://github.com/SDAIAAcademy/applied-nlp) · AI Engineering
- [Agentic AI Systems Engineering](https://github.com/SDAIAAcademy/agentic-ai) · AI Engineering
- [Modern Data Engineering](https://github.com/SDAIAAcademy/data-engineering) · AI Engineering

## Changing the system

Edit, open `demo/en.html?check` and `demo/ar.html?check` locally (they use relative paths), then push to `main`. GitHub Pages redeploys within a minute or two. Tag releases (`v1.x.y`) so a course can pin one.

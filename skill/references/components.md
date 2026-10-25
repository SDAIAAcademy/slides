# Slide system components

Everything a deck, a course page or a lab page can use. The live reference is the demo deck
(https://sdaiaacademy.github.io/slides/demo/en.html, Arabic: demo/ar.html); open it next to this file.
Source: https://github.com/SDAIAAcademy/slides (`deck.css`, `deck.js`, `page.css`, `lab.css`, `academy.js`).

## Deck skeleton

```html
<!doctype html>
<html lang="en">                       <!-- Arabic: <html lang="ar" dir="rtl"> -->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Day 1 · Course Name</title>
<link rel="icon" href="https://sdaiaacademy.github.io/slides/icon.svg">
<link rel="stylesheet" href="https://sdaiaacademy.github.io/slides/deck.css">
</head>
<body>
<div class="deck" data-course="Course Name" data-track="ai-engineering" data-day="Day 1">
  <section class="slide …" data-label="…"> … <aside class="notes">…</aside></section>
</div>
<script src="https://sdaiaacademy.github.io/slides/deck.js"></script>
</body>
</html>
```

- The stage is 1600×900 and scales to the window. The engine wraps each slide's content in `.body` (vertically centred; `.slide.top` aligns to the top) and adds the chrome: logo + breadcrumb (`data-day · label`) on top, `track · course` and `n / N` at the bottom, a progress bar.
- `data-track` keys: `fluency`, `foundations`, `ai-engineering`, `data-science`, `executives`. Free text also works (shown as is).
- `data-session="S1 · Title"` on a section slide sets the breadcrumb label for the slides that follow; `data-label` overrides one slide. `data-highlight="off"` on `.deck` disables highlight.js.
- Keys: → ↓ PgDn Space next · ← ↑ PgUp back (in RTL ← is next) · Home End · F fullscreen · Esc · N speaker notes (a panel at the bottom, keyboard only, nothing on screen) · O overview · B break screen · T start/pause a timer · ? help. Swipe on touch.
- **Breaks are not slides.** `B` lays a break screen over the current slide: navy, the course chrome, a 10-minute timer, a length field (already selected) and a "back at" field; Enter starts, T pauses, Esc or B ends it and the deck is where it was. Decks contain no `.slide.break` and agendas no break rows.
- **Fragments (build-up slides).** Give an element class `frag` and it stays hidden until the next key press reveals it (fade and rise); back hides the last one again. Elements sharing a `data-frag="2"` value appear together. Use fragments for "one piece per click" explanations instead of repeating a slide with one more element each time. Overview, print and the layout check show every fragment.
- The layout check is tooling, not a feature for instructors: `scripts/check.mjs` opens each deck with `?check` in headless Chrome, which makes `deck.js` measure every slide (fragments revealed, after the fonts load) and write the report to `<pre id="check-report">` and the console. `window.deck` = `{ slides, show(i), next(), prev(), openBreak(), closeBreak(), index, check(), checkSelectors, config, track, strings, rtl }`; `document` fires `deckslide` with `{index, slide}`.

## Slide types (classes on `section.slide`)

| Class | Use | Notes |
|---|---|---|
| `title` | first slide of a deck | navy gradient; `.kicker`, `h1`, `p.lead`, `.meta` with `<span class="track">` first; hides the slide number |
| `section` | opens a session | `data-session`, `.kicker`, `h1`, `ul.bullets.outcomes`, `<div class="sess-no">01</div>` |
| `lab` | the lab slide | `.cols.cols-2.mid`: left `.lab-tag`, `h2`, `p.lead.small`, `a.nb` (notebook or lab-page link); right `ul.checklist` with `span.min` per item and `li.stretch`. The right column sits on a paper panel that starts at the middle of the stage |
| `dark` | emphasis | navy background, white headings, kicker in the track colour |
| `order` | capstone running order | `table.t` with `<input>` cells, editable live |
| `dark presenting` | "now presenting" | `.center > input` for the name, `.timers` with two `.timer`s and `h3` labels (`T` starts the first; any `.timer[data-minutes]` on any slide gets start/reset buttons) |
| `top` | top-aligned content | when content grows or two slides share a heading |

## Typography and layout

- `h1` 84px (title 96px), `h2` 54px, `h3` 34px, `h4` 26px; body 30px. `.kicker` (small caps label above a heading), `.lead` (36px muted), `.small` 24px, `.xsmall` 20px, `.muted`, `.center`, `b`, `em` (coral emphasis), `code`, `a`.
- `.ar` Arabic inline run inside English; `.en` / `.ltr` Latin or LTR run inside Arabic.
- Lists: `ul.bullets` (track-coloured diamonds), `ol.bullets` (navy numbers), `.tight`, nested `ul` shrinks.
- Grids: `.cols.cols-2|cols-3|cols-4|cols-12|cols-21|cols-32`, `.gap-s`, `.mid` (vertically centred). Spacing: `.stack` (and `.stack.dense`), `.mt`, `.mt-s`, `.mb0`.

## Boxes

- `.card` with a colour class `c-teal | c-coral | c-cyan | c-purple | c-navy | c-amber | c-green`; `h3`/`h4` + `p`/`ul`; variants `.card.flat` (side border), `.card.tint` (tinted background). Cards in one `.cols` row share the row's height. `.pill.c-*` small label.
- `.callout.tip | .warn | .note` with `<b>Label.</b>` first. Use one callout at the bottom of a concept slide for the takeaway.
- `table.t` (`th.num`/`td.num` right-aligned numbers, `tr.hl` highlight, `table.t.small`).
- `pre.code[data-file="x.py"] > code.language-python` (highlight.js loads on demand; `.s` smaller, `.l` larger; `.hl-line` span to highlight a line). Keep lines short: the check flags lines wider than the box.
- `.figure > svg + .caption` for inline SVG figures (in RTL give the svg `direction:ltr`). `.matrix` grid of squares. `.tokens > span` token chips (`.tokens.ids`, `.tokens.ar`).

## Diagrams and numbers

- `.flow > .step.c-* (b + text) + .arrow(→)` horizontal; `.flow.v` vertical. In Arabic write `←`.
- `.stat > .big + .lbl`; `.big` alone for one huge number.
- `.bars > .row > span + .bar.c-*[style="--w:65%"] + span.val`.
- `.meter > i[style="--w:75%"]` thin rubric meter.
- `.agenda > .item(.now) > div(b + small)`: the sessions only, `.now` on the current one. No durations, no break rows, never clock times.

## Interaction and conversation

- Quiz: `<div class="quiz"><p class="lead">Question</p><div class="opts"><div class="opt" data-k="A">…</div><div class="opt" data-k="B" data-ok>…</div>…</div><div class="callout tip why"><b>Why.</b> …</div></div>`. Clicking any option reveals. Put `data-ok` on a different letter each time so a deck's right answers spread over A–D.
- `.prompt[data-tool="ChatGPT · Claude"]` a prompt participants can type; `.prompt.s`, `.prompt.dark`; inside, `span.seg.c-*` marks parts, with a `.legend > span.c-*` underneath.
- `.chat > .msg.user | .msg.ai(.good|.bad) > span.who + text`.
- `.tools > span(img + name)` tool chips, `.tools.s` smaller.
- `.trace > .ev.user|model|call|result|final|error|guard(.dim) > b + text` agent run, step by step; `.trace.s`.
- `.ladder > .rung.c-*(.on|.off) > b + text + small` rising rungs (set `--n` for a different count); `.ladder.s`.

## Course page (`page.css` + `academy.js`)

```html
<html lang="en" data-track="ai-engineering">
<link rel="stylesheet" href="https://sdaiaacademy.github.io/slides/page.css">
<header><div class="wrap"><div class="logo" id="logo"></div><div class="kicker">…</div><h1>…</h1>
  <span class="sub" lang="ar" dir="rtl">…</span><p>…</p><div class="meta"><span class="track">…</span><span>…</span></div></div></header>
<main class="wrap"> h2, p, .grid > .card.c-* (h3 + p), .day > .day-head.c-* (div(.t + h3) + a.btn) + .scroll > table (tr > th; td > b; td.brk),
  .two > div, .bar > span(+ i[style="--w:…"]) + b, .files > a (b + span), .note(.tip|.warn|.info), ul/ol </main>
<footer><div class="wrap">…</div></footer>
<script src="https://sdaiaacademy.github.io/slides/academy.js"></script>
```

`academy.js` fills every empty `.logo` / `#logo` with the Academy logo and adds a copy button to every `.prompt` (strings follow `html lang`).

## Lab page (`lab.css` + `academy.js`)

`<html lang="ar" dir="rtl" data-track="fluency">`, `header > .wrap > .top(.logo#logo + nav) + .tag + h1 + p + .meta`, `main.wrap` with `.box.goal`, `.files > a(b + span)`, `.step(.stretch) > h3(text + span.min) + …`, `.prompt[data-tool]` (copy button added automatically; `span.ph` for placeholders), `.callout.tip|warn|note`, `table` (`td.fill` for fill-in cells, `td.num`), `details(.instructor) > summary`, `ol.checks`, `.tools > span(img + name)`, `.pager > a + a`, `footer`.

## Theme and course extensions

All colours are custom properties on `:root`: `--navy #1c355e`, `--teal #00ae8d`, `--coral #e96852`, `--green #6abf4b`, `--cyan #00c1de`, `--amber #ffb548`, `--purple #625d9c`, `--ink`, `--paper`, `--paper-2`, `--line`, `--muted`, `--code-bg`, `--font`, `--font-ar`, `--mono`, and `--track-color` (set by `data-track`). Override in a `<style>` after the shared stylesheet; do not fork the engine.

A course that needs its own component (for example the data-engineering platform map, `.pmap`) puts it in `assets/course.css` and `assets/course.js`, loaded after the shared files. `course.js` can render into placeholder divs on load and should push its selectors into `window.deck.checkSelectors` so the layout check measures them. Put only truly course-specific things there; a component two courses want belongs in the shared system.

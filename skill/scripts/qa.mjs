#!/usr/bin/env node
// Content QA for a course repository. Usage: node qa.mjs [repo-dir]
// - every lab slide's checklist (.checklist li .min) sums to 25 minutes
// - relative links in HTML files resolve to files
// - forbidden strings: clock times, placeholders, unpublished sources
// - every deck loads the shared system, has data-course and data-track; breaks have timers; sections have data-session
import fs from "node:fs";
import path from "node:path";

const repo = path.resolve(process.argv[2] || ".");
const problems = [];
const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if ([".git", "node_modules", ".venv", ".shots", "files", "data", "cache", "artifacts", "html"].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (/\.html$/.test(e.name)) htmlFiles.push(p);
  }
})(repo);

const minutes = (s) => { const m = s.match(/(\d+)/); return m ? Number(m[1]) : 0; };
for (const f of htmlFiles) {
  const rel = path.relative(repo, f);
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/<section class="slide[^"]*\blab\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)) {
    const mins = [...m[1].matchAll(/<span class="min">([^<]*)<\/span>/g)].map((x) => minutes(x[1]));
    const sum = mins.reduce((a, b) => a + b, 0);
    const tag = (m[1].match(/<div class="lab-tag">([^<]*)<\/div>/) || [, "lab"])[1];
    if (sum !== 25) problems.push(`${rel}: "${tag.trim()}" checklist sums to ${sum} min (want 25): ${mins.join("+")}`);
  }
  if (t.includes('class="deck"')) {
    const deckTag = (t.match(/<div class="deck"[^>]*>/) || [""])[0];
    if (!/data-course=/.test(deckTag)) problems.push(`${rel}: .deck has no data-course`);
    if (!/data-track=/.test(deckTag)) problems.push(`${rel}: .deck has no data-track`);
    for (const m of t.matchAll(/<section class="slide[^"]*\bbreak\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)) if (!/class="timer"/.test(m[1])) problems.push(`${rel}: a break slide has no .timer`);
    const sections = (t.match(/<section class="slide[^"]*\bsection\b/g) || []).length;
    const sessions = (t.match(/data-session="/g) || []).length;
    if (sections > sessions + 2) problems.push(`${rel}: ${sections} section slides but only ${sessions} data-session labels`);
    if (!/sdaiaacademy\.github\.io\/slides\/deck\.(css|js)|cdn\.jsdelivr\.net\/gh\/SDAIAAcademy\/slides/.test(t)) problems.push(`${rel}: does not load the shared slide system`);
  }
  for (const m of t.matchAll(/(?:href|src)="([^"#?:]+)(?:[#?][^"]*)?"/g)) {
    const target = m[1];
    if (!target || target.startsWith("//") || target.startsWith("mailto") || target.startsWith("data:")) continue;
    const p = path.resolve(path.dirname(f), decodeURIComponent(target));
    if (!fs.existsSync(p)) problems.push(`${rel}: broken link ${target}`);
  }
  const text = t.replace(/<aside class="notes">[\s\S]*?<\/aside>/g, "").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<(pre|code)[\s\S]*?<\/\1>/g, "");
  for (const m of text.matchAll(/\b(?:[01]?\d|2[0-3]):[0-5]\d\s*(?:am|pm|AM|PM|صباح|مساء|ص|م)\b/g)) problems.push(`${rel}: clock time "${m[0].trim()}" (show durations, not times)`);
  for (const bad of ["YOUR-ORG", "SAMAI", "TODO", "lorem ipsum", "{{"]) if (text.includes(bad)) problems.push(`${rel}: contains "${bad}"`);
}
console.log(problems.length ? problems.join("\n") : `QA OK (${htmlFiles.length} HTML files)`);
process.exit(problems.length ? 1 : 0);

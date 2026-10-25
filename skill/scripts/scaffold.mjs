#!/usr/bin/env node
// Scaffold a new SDAIA Academy course repository from the skill's templates.
//   node scaffold.mjs --out <dir> --repo <github-repo-name> --title "Course Title" --title-ar "العنوان" \
//        --track ai-engineering --lang en|ar --days 4 --labs notebooks|pages [--case "Org name"] [--prereq "Applied NLP"]
// Creates: .gitattributes .gitignore .nojekyll README.md index.html slides/day1..N.html slides/day{N+1}.html (capstone)
//          labs/README.md and, for notebooks, labs/_tools/py2nb.py + labs/_src/. Placeholders left as {{…}} are for the author;
//          scripts/qa.mjs reports any that remain.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const T = path.join(here, "..", "templates");
const args = {};
for (let i = 2; i < process.argv.length; i++) if (process.argv[i].startsWith("--")) args[process.argv[i].slice(2)] = process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[++i] : "true";
const need = ["out", "repo", "title", "track", "lang", "days"];
for (const k of need) if (!args[k]) { console.error("missing --" + k + "\n" + fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 6).join("\n")); process.exit(2); }

const TRACKS = {
  "fluency": ["Data & AI Fluency Track", "مسار الطلاقة في البيانات والذكاء الاصطناعي"],
  "foundations": ["Data & AI Foundations Track", "مسار أساسيات البيانات والذكاء الاصطناعي"],
  "ai-engineering": ["AI Engineering Track", "مسار هندسة الذكاء الاصطناعي"],
  "data-science": ["Data Science Track", "مسار علم البيانات"],
  "executives": ["Executives & Leaders Track", "مسار التنفيذيين والقادة"],
};
if (!TRACKS[args.track]) { console.error("track must be one of " + Object.keys(TRACKS).join(", ")); process.exit(2); }
const days = Number(args.days), cap = days + 1, ar = args.lang === "ar";
const labs = args.labs || (ar ? "pages" : "notebooks");
const vars = {
  COURSE: args.title, COURSE_AR: args["title-ar"] || args.title, REPO: args.repo, TRACK: args.track,
  TRACK_NAME: TRACKS[args.track][0], TRACK_NAME_AR: TRACKS[args.track][1],
  TEACHING_DAYS: String(days), CAPSTONE_DAY: String(cap), LAB_COUNT: String(days * 4),
  CASE_ORG: args.case || "{{CASE_ORG}}", CASE_ORG_AR: args["case-ar"] || args.case || "{{CASE_ORG_AR}}", PREREQ: args.prereq || "{{PREREQ}}",
  LANG: ar ? "Arabic (RTL)" : "English", TALK_MIN: ar ? "5" : "8", QA_MIN: ar ? "2" : "4", PRESENTERS: "{{PRESENTERS}}",
  LAB_BASE: labs === "notebooks" ? `https://colab.research.google.com/github/SDAIAAcademy/${args.repo}/blob/main/labs/` : "../labs/",
  AUDIENCE_PILL: "{{AUDIENCE_PILL}}", AUDIENCE_PILL_AR: "{{AUDIENCE_PILL_AR}}", PITCH: "{{PITCH}}", PITCH_AR: "{{PITCH_AR}}",
};
const fill = (text, extra = {}) => text.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) => (extra[k] ?? vars[k] ?? m));
const out = path.resolve(args.out);
const write = (rel, content) => { const p = path.join(out, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); if (fs.existsSync(p)) { console.log("keep   " + rel); return; } fs.writeFileSync(p, content); console.log("create " + rel); };

write(".gitattributes", "* text=auto eol=lf\n*.html text eol=lf\n*.css text eol=lf\n*.js text eol=lf\n*.md text eol=lf\n*.py text eol=lf\n*.ipynb text eol=lf\n*.csv text eol=lf\n*.png binary\n*.webp binary\n*.pdf binary\n*.xlsx binary\n*.docx binary\n");
write(".gitignore", ".venv/\n__pycache__/\n.ipynb_checkpoints/\n.DS_Store\nThumbs.db\n.shots/\nlabs/.env\nlabs/artifacts/\nlabs/cache/\n");
write(".nojekyll", "");
write("README.md", fill(fs.readFileSync(path.join(T, "README.md"), "utf8"), { DAY1_TITLE: "{{DAY1_TITLE}}" }));
write("index.html", fill(fs.readFileSync(path.join(T, ar ? "index-ar.html" : "index-en.html"), "utf8")));
const deckT = fs.readFileSync(path.join(T, ar ? "deck-ar.html" : "deck-en.html"), "utf8");
for (let d = 1; d <= days; d++) write(`slides/day${d}.html`, fill(deckT, { DAY: String(d), NEXT_DAY: String(d + 1), NEXT_DAY_TITLE: d < days ? `{{DAY${d + 1}_TITLE}}` : "Capstone presentations", DAY_TITLE: `{{DAY${d}_TITLE}}`, DAY_SUBTITLE: `{{DAY${d}_SUBTITLE}}` }));
write(`slides/day${cap}.html`, fill(fs.readFileSync(path.join(T, ar ? "capstone-ar.html" : "capstone-en.html"), "utf8"), { S1_LAST: "2", S2_RANGE: "3–5", S3_RANGE: "6–8", S4_RANGE: "9–10", NEXT_COURSE: "{{NEXT_COURSE}}" }));
if (labs === "notebooks") {
  write("labs/_tools/py2nb.py", fs.readFileSync(path.join(T, "py2nb.py"), "utf8"));
  write("labs/_src/.gitkeep", "");
  write("labs/README.md", `# Labs\n\nEvery lab is a notebook built from a percent-format source in \`_src/\` (\`uv run python _tools/py2nb.py\` writes the student notebook here and the solution to \`solutions/\`). Run \`00_setup_check.ipynb\` before Day 1. Quick mode: set \`${args.repo.toUpperCase().replace(/-/g, "_")}_QUICK=1\`.\n\n| Lab | Notebook | Runs on |\n|---|---|---|\n| 1.1 · … | [D1_1_slug.ipynb](https://colab.research.google.com/github/SDAIAAcademy/${args.repo}/blob/main/labs/D1_1_slug.ipynb) | CPU |\n`);
} else {
  write("labs/README.md", `# Labs\n\nOne HTML page per lab (\`D{day}_{n}_slug.html\`, on the shared lab style), the synthetic file pack in \`files/\` (generated by \`tools/prepare_files.py\` from a fixed seed) and instructor answer keys in \`instructor/\`.\n`);
  write("labs/D1_1_slug.html", fill(fs.readFileSync(path.join(T, ar ? "lab-ar.html" : "lab-en.html"), "utf8"), { DAY: "1", N: "1", PREV: "0", NEXT: "2", LAB_TITLE: "{{LAB_TITLE}}" }));
}
console.log(`\nScaffolded ${args.title} (${days} + 1 days, ${labs}) in ${out}. Fill the remaining {{PLACEHOLDERS}}; node qa.mjs lists them.`);

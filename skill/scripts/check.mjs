#!/usr/bin/env node
// Layout check (and optional screenshots) for every deck of a course, in headless Chrome. Each deck is opened with
// ?check, which makes deck.js measure every slide (fragments revealed, after the fonts load) and write a report.
//   node check.mjs [repo-dir] [--shots] [--only day2]
// Prints one line per deck: "day1.html: CHECK 56 slides | OK" or the list of overflowing slides,
// plus the footer text (track · course) and whether the logo rendered. With --shots it saves
// PNGs of every slide of each deck to <repo>/.shots/<deck>/<n>.png (gitignored) for visual review.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const repo = path.resolve(args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--only") || ".");
const shots = args.includes("--shots");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const CHROME = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
].find((p) => p && fs.existsSync(p));
if (!CHROME) { console.error("Chrome not found; set CHROME=<path>"); process.exit(2); }

const fileUrl = (f) => "file:///" + path.resolve(f).replace(/\\/g, "/");
function run(extra) {
  return execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox", "--window-size=1600,900", "--virtual-time-budget=12000", ...extra],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
}

const slidesDir = [path.join(repo, "slides"), path.join(repo, "demo"), repo].find((d) => fs.existsSync(d) && fs.readdirSync(d).some((f) => f.endsWith(".html")));
const decks = fs.readdirSync(slidesDir).filter((f) => f.endsWith(".html") && (!only || f.includes(only))).sort();
let failed = 0;
for (const f of decks) {
  const html = fs.readFileSync(path.join(slidesDir, f), "utf8");
  if (!html.includes('class="deck"')) continue;
  const dom = run(["--dump-dom", fileUrl(path.join(slidesDir, f)) + "?check"]);
  const report = (dom.match(/<pre id="check-report">([\s\S]*?)<\/pre>/) || [])[1] || "NO REPORT (deck.js did not run: offline, or a script error)";
  const footer = (dom.match(/<div class="track"><i><\/i>([^<]*)</) || [])[1] || "NO FOOTER";
  const logos = (dom.match(/<div class="logo"><svg/g) || []).length - (dom.includes("slide break live") ? 1 : 0);  // the break screen has one too
  const n = Number((report.match(/CHECK (\d+)/) || [])[1] || 0);
  const ok = report.trim().endsWith("OK");
  if (!ok) failed++;
  console.log(`${f}: ${report.trim().replace(/\n/g, " | ")} · footer "${footer}" · logo on ${logos}/${n}`);
  if (shots && n) {
    const out = path.join(repo, ".shots", f.replace(/\.html$/, ""));
    fs.mkdirSync(out, { recursive: true });
    for (let i = 1; i <= n; i++) run([`--screenshot=${path.join(out, String(i).padStart(2, "0") + ".png")}`, fileUrl(path.join(slidesDir, f)) + "?check#" + i]);
    console.log(`  ${n} screenshots in ${path.relative(repo, out)} (fragments revealed)`);
  }
}
if (shots) {
  const gi = path.join(repo, ".gitignore");
  const t = fs.existsSync(gi) ? fs.readFileSync(gi, "utf8") : "";
  if (!/^\.shots\/$/m.test(t)) fs.writeFileSync(gi, t + (t && !t.endsWith("\n") ? "\n" : "") + ".shots/\n");
}
process.exit(failed ? 1 : 0);

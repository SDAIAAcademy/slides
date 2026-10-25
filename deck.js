/* SDAIA Academy slide system · deck.js
   Source: https://github.com/SDAIAAcademy/slides · served from https://sdaiaacademy.github.io/slides/deck.js
   Keys: → ↓ PgDn Space = next · ← ↑ PgUp = previous · Home/End · F = fullscreen · Esc = exit fullscreen / close
         N = speaker notes · O = overview · B = break screen · T = start/pause a timer · ? = help
   Markup: <div class="deck" data-course="…" data-track="…" data-day="…"> with one <section class="slide"> per slide.
   Language: <html lang="ar" dir="rtl"> switches the interface strings to Arabic and mirrors the layout (deck.css).
   In RTL the left/right arrows follow the reading direction (← = next, → = previous), like the progress bar.
   ↓ PgDn Space stay "next" in both directions, so presenter clickers keep working.
   Breaks are not slides: B opens a break screen over the current slide (10 minutes by default; the instructor types
   another length or a "back at" time, Enter starts it, Esc ends it).
   Extensions: window.deck exposes slides, show/next/prev, index and checkSelectors; the document fires "deckslide".
   Tooling: ?check in the URL runs the layout self-check (used by the course skill's check.mjs in headless Chrome) and
   writes the report to <pre id="check-report"> and the console. */
(function () {
  const LOGO = "<svg role=\"img\" aria-label=\"SDAIA Academy\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 513 120\"><defs><linearGradient id=\"acad-a\"><stop stop-color=\"#273470\"/><stop offset=\".5\" stop-color=\"#3c9\"/><stop offset=\"1\" stop-color=\"#99d633\"/></linearGradient><linearGradient id=\"acad-b\"><stop stop-color=\"#6cf\"/><stop offset=\".5\" stop-color=\"#6cf\"/><stop offset=\".75\" stop-color=\"#6258a6\"/><stop offset=\"1\" stop-color=\"#273470\"/></linearGradient><linearGradient id=\"acad-c\"><stop stop-color=\"#273470\"/><stop offset=\".5\" stop-color=\"#f63\"/><stop offset=\"1\" stop-color=\"#fdbd4d\"/></linearGradient></defs><path fill=\"url(#acad-a)\" d=\"m68.7 10.1 17.3 10V0zm36.3 0-17.4 10V0zm-6.3 100 17.2-10.2V120zm36.2 0-17.3-10.2V120z\"/><path fill=\"url(#acad-b)\" d=\"m30 33 26.8 15.5v-31zm56 0L59.5 48.5v-31zM0 50.4l26.9 15.4V34.9zm56 0L29.5 65.8V34.9zm-56 35 26.8-15.6v31zm56 0L29.5 69.7v31zm4 0L86.9 70v31zm56.2 0L89.3 70v31zM30 102.6 56.8 87v31zm56 0L59.5 87v31z\"/><path fill=\"url(#acad-c)\" d=\"m87.6 33 26.8 15.5v-31zm56.1 0L117 48.5v-31zm-26 17.4 26.7 15.4V34.9zm56 0L147 65.8V34.9zm-56 35 26.7-15.6v31zm56 0L147 69.7v31z\"/><path fill=\"currentColor\" d=\"M200.1 30.7v11.7c-.1 12.6 0 13.2.6 14.4q1.2 2 3.4 2.7h.5c.6.2 3 .3 14.5.3h13.5V43.2h-5.4v11.7h-10.4c-10.2 0-10.5 0-10.8-.3s-.7-1-.7-1.3V30.7zm37.3 14.5v14.6h5.5V30.7h-5.4zm225.3-14.4v11.6c0 12.7 0 13.2.7 14.6q.8 1.4 2.2 2c1.6.8 1 .8 15 .8l14-.1q1.7-.3 3.2-1a7 7 0 002.8-4.3q.2-1.5 0-3.2c-.2-1-1.1-2.7-1.8-3.7q-2.8-3.2-6.5-5.6l2.7-1.3 4-2 1.5-.7v-3.2l-.2-3-2 1.1-9 4.7-2.6 1.5-.7.2v6l.6.2q3 1.4 5.4 3.5 2.7 2.1 3 3.9c.1 1 0 1.2-.8 1.7l-.5.4h-12.2l-12.4-.1q-.5-.2-.6-.8l-.3-.7V30.6h-2.7l-2.7.2m42.4 0v29h5.3V30.6h-5.3m-169.6.3a3 3 0 00-1 5q.6.5 1.8.7c1.6.2 3.1-1.3 3.1-3 0-1.9-2-3.4-3.9-2.7m6.7 0q-1.6.8-1.8 2.7 0 2.7 2.7 3c1.5.2 3.2-1.3 3.2-2.9 0-.5-.5-1.5-.8-2-.8-.8-2.3-1.2-3.3-.8m-.8 9.8c-2 0-4 .2-4.2.3q-2.4.4-4 2.2a7 7 0 00-2 3.1q-.4 1.5-.3 3.1a7 7 0 003.8 6.4 9 9 0 006.9.7l.4.5q.8 1.3 2 2c1.5.8 1.2.8 13.3.8l11.6-.1a7 7 0 003.5-1.6l.3-.3.5.5q1 .9 2.3 1.2c.8.3 1 .3 9.2.3 7.5 0 8.6 0 9.3-.2q1-.2 1.9-.8l.5-.4.3-.3.7.5q2.7 1.6 6.3 1.6c2.7 0 4.2-.7 5.7-2.6l.2-.3.5.5c1 1.2 1.3 1.5 1.9 1.7.5.3.8.3 13.3.3h12.8V43h-5.5v11.8h-20l-.4-.4-1-1c-.2-.4-.2-.6-.2-1.5q0-5.7-4.2-7.6a8 8 0 00-3.8-.8q-3.4-.1-5.6 2.2a13 13 0 00-3 5.1c-1.1 3-1.8 3.7-3 3.9h-15.8q-.7 0-1-.6c-.8-.6-.8-1.2-.8-3.8V43H371l-2.7.1v5.5c0 5.7 0 5.5-1 6-.5.2-1 .2-10 .2l-9.9-.1-.5-.4c-.2-.3-.2-.6-.2-7V41h-5.3m0 8q0 2.7-.3 3h-1.5c-1.4 0-1.5 0-2.1-.3q-1.4-.6-1.4-2.5c0-1 0-1 .4-1.7a2 2 0 011-1q1.5-.6 3-.5h.9zm62.4 0q.8.3 1.4 1.5.3.4.3 1.6c0 1 0 1.2-.4 1.9q-.7 1.7-3.1 1.4c-1.1-.2-2.4-.7-2.8-1.2l-.4-.3.4-1c1-2.7 1.9-3.7 3.1-4q.8-.3 1.6 0M255.3 42l-1 .7-.9.5-1.3.9c-1.3.9-1.2.7-.5 2l1.5 2.2c3.4 5.2 3.4 5.2 3.4 5.7q0 .4-.6.6c-.4.3-.8.3-5 .3-3.3 0-4.4.1-4.4.3v4.6h1.6l8-.1q1.6-.3 2.8-1.3.7-.7.7-.2l.7.8c1 .8-.2.8 14.7.8h14q2-.4 3.7-1.6l.3-.3c.3-.2.3-.2.8.3q1.1 1 2.6 1.4a8 8 0 002.7.2l2.2-.1 1-.3q1-.5 2-1.3 0-.6.7.1 1.1.9 2.5 1.3c1 .3 1.2.3 4.9.3h3.9V43h-5.4v11.9h-1.7c-1.5 0-1.9 0-2.3-.3q-.9-.5-1.1-1.4-.2-.4-.2-4v-4.4h-5.4V49l-.2 4.5q-.2.8-1 1.3h-2.8q-.9-.4-1.4-1.3c-.2-.5-.2-.6-.2-3.8v-5h-2.8c-1.5 0-2.7.1-2.7.2v4.2q0 4.2-.2 4.5 0 .6-.7.8l-.6.4h-23l-.4-.3c-.4-.3-1.2-1.4-3-4.4l-1.6-2.5-.3-.7-.2-.3-.8-1.1v-.2h-.2l-2.1-3.6-.5.2M449 43.2l-2.5 1.6.8 1.3 4.1 6.5q1.2 1.7.2 2c-.4.3-.6.3-5 .3H442v4.9h3.6c8.2 0 8.4-.1 9.8-.7q1.3-.7 2.1-2.4.6-1.4.6-3.2c-.3-1-.5-1.7-1.9-4l-1.2-2-1-1.6-1.5-2.7-1-1.4q0-.2-2.4 1.4M223 64c-1 .4-2 1.7-2 3q0 1 1 2a3 3 0 004.2-.3c1.6-2 .2-4.8-2.4-4.7zm6.5.2q-1.1.6-1.6 1.8-.5 2.4 1.8 3.6c.7.2 1.8.1 2.4-.2 1.8-.9 2-3.4.5-4.8q-1.4-1-3.1-.4m136.1 0q-1.8.5-1.8 2.7c0 2.6 3 3.8 4.8 2q1.5-1.5.7-3.1-1.2-2.2-3.7-1.7m6.7 0c-1.3.5-2.2 2.4-1.6 4q.6.9 1.6 1.5a4 4 0 002.3 0c2.4-1.1 2.2-4.5-.1-5.5-.5-.2-1.6-.2-2.2 0m56.6 0a3 3 0 00-2.1 2.9c0 2 2.1 3.3 4.2 2.5a3 3 0 00-.2-5.3q-1-.4-2-.2m6.5.1q-1.7.9-1.8 2.8 0 2.5 2.6 2.8 2.3.1 3-2 .4-1.2-.3-2.5-1.4-1.6-3.5-1m-15 14v10l-1-.8a7 7 0 00-5-2q-2.7 0-5 1.6c-3.5 2.7-4.4 10-1.9 14.7q1 1.6 2.6 2.8l1.4.7c.8.3 1 .3 2.2.4a8 8 0 003.8-.6q1.1-.7 1.9-1.6l1-1v2.7h.4l3.1.1h2.6V102l.1-21.8v-2zM417.7 90c2 .6 3.2 4.3 2.3 7.5q-.8 3.3-3.4 3.4c-2.8.3-4.4-2-4.2-6q0-3.8 2.3-5c.6-.2.8-.2 1.6-.2zM208 78.9c-4 .4-6.2 1.4-7.6 3.6-.8 1.3-1 2.2-1 4.2 0 1.9 0 2.5.8 3.7.4.8 1.6 2 2.5 2.5q2.2 1 4.5 1.5c1.8.4 3.8 1 4.5 1.3q1.2.5 1.5 1.7.3 1.8-1.3 2.7c-2.3 1.2-7.4.5-11.4-1.6l-1-.4v5.7l1 .3q5.1 1.8 10.7 1.5l1.4-.1a9 9 0 005.6-3.1q1.5-2.3 1.4-5 0-3.9-2.6-5.8a17 17 0 00-6.6-2.4q-1.8-.4-3.6-1c-.8-.4-1.5-1.4-1.3-2q0-1 .4-1.3 1-1.2 3.7-1.2c1.2 0 3.1.2 4 .4q2.3.6 4.2 1.5V80l-.5-.2-3.9-.8c-1-.2-4.5-.3-5.4-.2m18 .4h-.6v13a99 99 0 00.1 12.9c.4.1 11.4 0 12.4-.2l4-1c4-1.4 6.7-4.8 7.2-8.9.3-1.4.3-4.9 0-6.2q-1.5-6-6.4-8.1c-2.7-1.3-4.4-1.6-11.3-1.6zm10.9 5.3a7 7 0 015 3.8 8 8 0 01.7 4.3q0 1.5-.5 2.8-.5 1.8-2 3c-1.7 1.3-3.4 1.7-7.1 1.6h-1V84.4h2zm27.5-5.2c-2.7 0-3.5 0-3.6.2l-2 5.7-2.7 7.3-1.4 3.9-1.5 4-1.7 4.6c-.2.2.2.3 3.5.3 2.6 0 3 0 3-.2l1.2-3 .3-1 .1-.6H270l.7 2 .7 2.2.3.5h3.2l3.3-.1-.7-2-1.4-3.9-2.1-5.6-1.6-4.3-.7-1.9-3-8zm2 10.8 1.8 5.5h-6.6c-.2 0 2.7-9 3-9.8q.3-.4.4.2zm15.4 2.1.1 13h6.3V79.4H282zM301 80.1l-.7 2.4-2.8 7.3-3.4 9.2-2 5.6-.3.6h.3l3.3.2h2.8l.2-.4q.3-.4.5-1.4l.8-2 .3-1h10.2l.5 1.3.9 2.3.4 1.1h3.3l3.3-.1-1-2.8-1.6-4.6-1.7-4.5L311 84l-1.1-3.2-.6-1.3h-7.8zm5.5 9.5 2 6h-6.8l1-2.6 2.5-7.3zm35.3-10-.8 1.8-2 5.8-1.5 3.9-1 2.6-4.2 11.5q0 .2 3.3.2c2.9 0 3.2 0 3.3-.2l.5-1.5.8-2.1.4-1H351l.3 1 .9 2.3.5 1.4h6.6l-.3-1-2.5-6.5-1.7-4.7-2-5.7-2.3-6-.7-1.7v-.3zm4.1 6.7.8 2.1 1.4 4.5 1 2.9-6.8-.2 2.6-7.7.8-2.1zm24.7-.7c-1.8.1-3.1.5-4.8 1.4q-2.5 1.3-4 4-1.3 3.5-.7 7.2c.7 3.4 3.1 6 6.4 7 2.6.9 6.5.9 9.3 0 1.2-.4 1.1-.1 1.1-2.8v-2.5l-1.4.5c-1 .6-1.3.6-2.5.8-1.3.2-1.5.2-2.3 0-2.5-.5-3.6-1.6-4.2-3.9-.3-1-.2-2.8.1-3.7Q369 90 373 90c1.5 0 2.5.2 4 1l.9.5v-5l-.6-.2q-3.2-1-6.5-.8m18.4 0-4.9 1h-.7v4.7l.6-.3c.6-.3 2-.7 3.3-1q1.3-.3 2.7-.2c2 0 2.1 0 3 .3q1.9.5 1.9 2.3v.6H393c-2.1 0-4.5.1-5.5.4q-1.3.2-2.5.9-3 1.4-3 4.8-.1 4.4 3.2 6.2c1.2.6 3.9.8 5.6.4a8 8 0 003.9-2.4l.4-.5.1 1.3.2 1.3h6v-5.7c0-6 0-7.2-.4-8.6a7 7 0 00-5.2-5q-3.2-.9-6.6-.4m6 12a4 4 0 01-4 4q-1.5 0-2.3-.5c-1-1-1-2.9.1-3.8.7-.5 1.5-.6 3.9-.6h2.2zm44.7-12q-5 .6-7.3 3.9a12 12 0 00-.2 12 9 9 0 005.7 3.9c1 .3 1.3.4 4 .4s3.2 0 4.2-.3l3.7-1.1.5-.3v-2.3l-.1-2.3-1.1.5a14 14 0 01-5.8 1.6q-3.6.2-5.2-1.6c-.7-.6-1.2-1.8-1.1-2.3v-.4h14.3v-2c0-2.1-.4-3.5-1.2-5.2a9 9 0 00-5.7-4.5q-2.2-.5-4.6-.3m2.7 4.3c.8.2 1.7 1.1 2 1.8l.4 1.2v.7h-7.9V93c0-.7.6-1.8 1.1-2.4q2-1.6 4.4-1m24.9-4.3q-2.6.2-4.4 2.1l-.8.9v-2.7h-6.1l-.2 9.8v9.8h6c.2 0 .2-.4.2-5.3v-5.7q.5-2.4 1.5-3.3t2.4-.9c.7 0 1.6.5 1.7 1 .6 1 .6 1.3.6 7.8l.1 6.2c.2.2 6 .2 6.1 0v-5.7c0-5.3.2-5.6.4-6.4q1.2-3.2 3.6-2.9 1.9.3 2.3 2.8v12.3h6.2v-5.8c0-7.9-.1-8.8-1-10.7a5 5 0 00-3.4-3.1c-1.2-.3-3.3-.3-4.6 0a7 7 0 00-3.6 2.6l-.5.6-.6-.7q-2-3-6-2.7m23.7.3q-.2 0 .4 1.4l1.2 2.7 3.1 7 .2.7.9 2q1.5 3.2 2.6 6.5 0 .5-.7 1.5c-.6.9-1.2 1.1-3.1 1.2h-1.6v4h1.9c2.4.2 3.6 0 4.9-.5q1.5-.7 2.4-2 1-1.5 4.4-10.6l1-2.9 1-2.6 2.4-6.2.6-1.3.2-.8h-6l-.5 1.1-.6 2-1.6 4.5-1.6 4.3q0 .7-.3.7 0 .1-.3-.4l-1.4-3.5-1.2-3.2c-.3-.7-.8-2.1-1.3-3l-.7-2.2q0-.3-.3-.4zm12.4-61.1h1.4c-.4-4.5 2-6.5 6-5.4v2.7c-1.9-.3-3.6-.5-3 2.7h3.4v2.9h-7.8\"/></svg>";
  const deck = document.querySelector('.deck');
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll(':scope > section.slide'));
  const html = document.documentElement;
  const rtl = html.dir === 'rtl';
  const ar = (html.lang || 'en').toLowerCase().startsWith('ar');
  /* The Academy tracks. data-track takes a key (localized name and colour from the system) or any free text. */
  const TRACKS = {
    'fluency': { en: 'Data & AI Fluency Track', ar: 'مسار الطلاقة في البيانات والذكاء الاصطناعي' },
    'foundations': { en: 'Data & AI Foundations Track', ar: 'مسار أساسيات البيانات والذكاء الاصطناعي' },
    'ai-engineering': { en: 'AI Engineering Track', ar: 'مسار هندسة الذكاء الاصطناعي' },
    'data-science': { en: 'Data Science Track', ar: 'مسار علم البيانات' },
    'executives': { en: 'Executives & Leaders Track', ar: 'مسار التنفيذيين والقادة' },
  };
  const cfg = Object.assign({ course: '', track: '', day: '' }, deck.dataset);
  const trackName = TRACKS[cfg.track] ? TRACKS[cfg.track][ar ? 'ar' : 'en'] : (cfg.track || (ar ? 'أكاديمية سدايا' : 'SDAIA Academy'));
  if (TRACKS[cfg.track] && !html.dataset.track) html.dataset.track = cfg.track;  // the body-level panels take the track colour too
  const T = Object.assign(ar ? {
    notes: 'ملاحظات المدرّب · الشريحة ', noNotes: 'لا توجد ملاحظات لهذه الشريحة.',
    keys: 'لوحة المفاتيح', next: 'الشريحة التالية', prev: 'الشريحة السابقة', ends: 'الأولى / الأخيرة',
    full: 'ملء الشاشة / الخروج منه', esc: 'الخروج من ملء الشاشة · إغلاق اللوحات', notesKey: 'ملاحظات المدرّب',
    overview: 'نظرة عامة على الشرائح', timerKey: 'تشغيل / إيقاف المؤقّت', helpKey: 'هذه المساعدة',
    hint: 'F ملء الشاشة · ← → التنقّل · ? مساعدة', go: 'تشغيل / إيقاف', reset: 'إعادة', back: 'العودة الساعة ',
    length: 'المدة', min: 'دقيقة', or: 'أو', backAt: 'العودة الساعة', step: 'الخطوة التالية في الشريحة',
    breakKey: 'شاشة الاستراحة (اكتب المدة أو وقت العودة ثم Enter)', breakLabel: 'استراحة',
    breakHint: 'Enter للبدء · T إيقاف مؤقت · Esc لإنهاء الاستراحة',
    breakText: (m) => 'استراحة ' + m + (m >= 3 && m <= 10 ? ' دقائق' : ' دقيقة'),
  } : {
    notes: 'Speaker notes · slide ', noNotes: 'No notes for this slide.',
    keys: 'Keyboard', next: 'Next slide', prev: 'Previous slide', ends: 'First / last slide',
    full: 'Enter / leave fullscreen', esc: 'Leave fullscreen · close panels', notesKey: 'Speaker notes',
    overview: 'Slide overview', timerKey: 'Start / pause a timer', helpKey: 'This help',
    hint: 'F fullscreen · ← → navigate · ? help', go: 'Start / pause', reset: 'Reset', back: 'Back at ',
    length: 'Length', min: 'min', or: 'or', backAt: 'back at', step: 'next step on the slide',
    breakKey: 'Break screen (type a length or a return time, then Enter)', breakLabel: 'Break',
    breakHint: 'Enter to start · T to pause · Esc to end the break',
    breakText: (m) => m + '-minute break',
  }, window.DECK_STRINGS || {});
  let idx = 0;

  /* ---------- chrome ---------- */
  const footer = [trackName, cfg.course].filter(Boolean).join(' · ');
  let session = '';
  slides.forEach((s, i) => {
    if (s.dataset.session !== undefined) session = s.dataset.session;
    const label = s.dataset.label !== undefined ? s.dataset.label : session;
    if (!s.querySelector(':scope > .body')) {
      const body = document.createElement('div');
      body.className = 'body';
      while (s.firstChild) body.appendChild(s.firstChild);
      s.appendChild(body);
    }
    s.querySelectorAll('aside.notes').forEach((n) => s.appendChild(n));
    const top = document.createElement('div');
    top.className = 'chrome-top';
    top.innerHTML = '<div class="logo">' + LOGO.replace(/acad-/g, 'acad' + i + '-') + '</div>' +
      '<div class="crumb">' + (cfg.day ? '<b>' + cfg.day + '</b>' : '') +
      (label ? (cfg.day ? '<span>·</span>' : '') + '<span>' + label + '</span>' : '') + '</div>';
    const bot = document.createElement('div');
    bot.className = 'chrome-bottom';
    bot.innerHTML = '<div class="track"><i></i>' + footer + '</div><div class="no">' + (i + 1) + ' / ' + slides.length + '</div>';
    s.prepend(top);
    s.appendChild(bot);
    if (s.classList.contains('title')) bot.querySelector('.no').textContent = '';
  });
  const progress = document.createElement('div');
  progress.className = 'progress';
  deck.appendChild(progress);

  /* ---------- scaling ---------- */
  function fit() {
    if (document.body.classList.contains('overview')) return;
    const s = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    deck.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  }
  window.addEventListener('resize', fit);
  fit();

  /* ---------- navigation ---------- */
  const notesPanel = document.createElement('div');
  notesPanel.className = 'notes-panel';
  document.body.appendChild(notesPanel);

  /* Fragments: elements with class "frag" appear one step at a time (next reveals the next one, back hides the last).
     Elements that share a data-frag value appear together. Overview, print and ?check show every fragment. */
  const frags = (s) => Array.from(s.querySelectorAll('.frag'));
  const groups = (s) => { const g = []; frags(s).forEach((f) => { const k = f.dataset.frag; const last = g[g.length - 1]; if (k !== undefined && last && last[0].dataset.frag === k) last.push(f); else g.push([f]); }); return g; };
  function show(i, revealAll) {
    const forward = i > idx;
    idx = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, j) => s.classList.toggle('active', j === idx));
    frags(slides[idx]).forEach((f) => f.classList.toggle('on', !!revealAll));
    if (forward && !revealAll) slides[idx].classList.remove('entered'), void slides[idx].offsetWidth, slides[idx].classList.add('entered');
    progress.style.width = (slides.length > 1 ? (idx / (slides.length - 1)) * 100 : 100) + '%';
    history.replaceState(null, '', '#' + (idx + 1));
    const n = slides[idx].querySelector('aside.notes');
    notesPanel.innerHTML = '<h5>' + T.notes + (idx + 1) + '</h5>' + (n ? n.innerHTML : '<i>' + T.noNotes + '</i>');
    const timer = slides[idx].querySelector('.timer');
    if (timer && !timer.dataset.started) resetTimer(timer);
    document.dispatchEvent(new CustomEvent('deckslide', { detail: { index: idx, slide: slides[idx] } }));
  }
  const next = () => {
    const g = groups(slides[idx]).find((grp) => !grp[0].classList.contains('on'));
    if (g && !document.body.classList.contains('overview')) g.forEach((f) => f.classList.add('on'));
    else show(idx + 1);
  };
  const prev = () => {
    const g = groups(slides[idx]).filter((grp) => grp[0].classList.contains('on')).pop();
    if (g && !document.body.classList.contains('overview')) g.forEach((f) => f.classList.remove('on'));
    else show(idx - 1, true);
  };

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else html.requestFullscreen().catch(() => {});
  }

  function toggleOverview(force) {
    const on = force !== undefined ? force : !document.body.classList.contains('overview');
    document.body.classList.toggle('overview', on);
    if (on) { deck.style.transform = ''; slides[idx].scrollIntoView({ block: 'center' }); }
    else fit();
  }
  slides.forEach((s, i) => s.addEventListener('click', (e) => {
    if (document.body.classList.contains('overview')) { e.preventDefault(); toggleOverview(false); show(i); }
  }));

  const fwd = rtl ? '←' : '→', back = rtl ? '→' : '←';  // arrow keys follow the reading direction
  const help = document.createElement('div');
  help.className = 'help';
  help.innerHTML = '<div class="box"><h5>' + T.keys + '</h5><table>' +
    '<tr><td><kbd>' + fwd + '</kbd><kbd>↓</kbd><kbd>Space</kbd></td><td>' + T.next + (document.querySelector('.frag') ? ' · ' + T.step : '') + '</td></tr>' +
    '<tr><td><kbd>' + back + '</kbd><kbd>↑</kbd></td><td>' + T.prev + '</td></tr>' +
    '<tr><td><kbd>Home</kbd><kbd>End</kbd></td><td>' + T.ends + '</td></tr>' +
    '<tr><td><kbd>F</kbd></td><td>' + T.full + '</td></tr>' +
    '<tr><td><kbd>Esc</kbd></td><td>' + T.esc + '</td></tr>' +
    '<tr><td><kbd>N</kbd></td><td>' + T.notesKey + '</td></tr>' +
    '<tr><td><kbd>O</kbd></td><td>' + T.overview + '</td></tr>' +
    '<tr><td><kbd>B</kbd></td><td>' + T.breakKey + '</td></tr>' +
    '<tr><td><kbd>T</kbd></td><td>' + T.timerKey + '</td></tr>' +
    '<tr><td><kbd>?</kbd></td><td>' + T.helpKey + '</td></tr></table></div>';
  help.addEventListener('click', () => help.classList.remove('on'));
  document.body.appendChild(help);

  const hint = document.createElement('div');
  hint.className = 'hint';
  hint.textContent = T.hint;
  document.body.appendChild(hint);
  setTimeout(() => (hint.style.opacity = 0), 5000);

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    if (breakOn()) {  // during a break only the break keys work; the deck underneath stays where it is
      if (e.key === 'Escape' || e.key === 'b' || e.key === 'B') { e.preventDefault(); closeBreak(); }
      else if (e.key === 't' || e.key === 'T') toggleTimer(brkTimer);
      else if (e.key === 'Enter') { e.preventDefault(); run(brkTimer); }
      return;
    }
    switch (e.key) {
      case 'ArrowRight': case 'ArrowLeft':
        e.preventDefault(); ((e.key === 'ArrowLeft') === rtl ? next : prev)(); break;
      case 'ArrowDown': case 'PageDown': case ' ': case 'Enter':
        e.preventDefault(); next(); break;
      case 'ArrowUp': case 'PageUp': case 'Backspace':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); show(0); break;
      case 'End': e.preventDefault(); show(slides.length - 1); break;
      case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break;
      case 'Escape':
        if (document.fullscreenElement) document.exitFullscreen();
        help.classList.remove('on'); notesPanel.classList.remove('on'); toggleOverview(false); break;
      case 'n': case 'N': notesPanel.classList.toggle('on'); break;
      case 'o': case 'O': toggleOverview(); break;
      case 'b': case 'B': if (!document.body.classList.contains('overview')) openBreak(); break;
      case '?': help.classList.toggle('on'); break;
      case 't': case 'T': {
        const timer = slides[idx].querySelector('.timer');
        if (timer) toggleTimer(timer);
        break;
      }
    }
  });

  /* touch swipe */
  let tx = null;
  document.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) ((rtl ? dx > 0 : dx < 0) ? next : prev)();  // RTL pages turn the other way
    tx = null;
  });

  /* ---------- timers ---------- */
  /* A .timer counts down from data-minutes (the capstone's "now presenting" slides have two; T starts the first).
     The break screen (B) has one too, with a length editor: minutes, or a "back at" clock time. */
  const timers = new WeakMap();
  const pad = (n) => String(n).padStart(2, '0');
  const clock = (d) => pad(d.getHours()) + ':' + pad(d.getMinutes());
  const digits = (s) => s.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  function render(el, secs) {
    el.textContent = pad(Math.floor(secs / 60)) + ':' + pad(secs % 60);
    el.classList.toggle('done', secs === 0);
    const st = timers.get(el);
    if (st && st.back) st.back.textContent = st.end ? T.back + clock(new Date(st.end)) : '';
  }
  function stop(st) { if (st.h) clearInterval(st.h); st.h = null; }
  function tick(el) {
    const st = timers.get(el);
    st.left = Math.max(0, Math.round((st.end - Date.now()) / 1000));
    render(el, st.left);
    if (st.left === 0) stop(st);
  }
  function run(el) {
    const st = timers.get(el);
    stop(st);
    st.end = Date.now() + st.left * 1000;
    el.dataset.started = '1';
    st.h = setInterval(() => tick(el), 250);
    tick(el);
  }
  function resetTimer(el) {
    const st = timers.get(el);
    stop(st);
    st.left = st.minutes * 60;
    st.end = null;
    delete el.dataset.started;
    render(el, st.left);
  }
  function toggleTimer(el) {
    const st = timers.get(el);
    if (st.h) { stop(st); st.end = null; render(el, st.left); } else run(el);
  }
  function setMinutes(el, minutes) {
    const st = timers.get(el);
    st.minutes = Math.max(1, Math.min(180, Math.round(minutes)));
    if (st.input) st.input.value = st.minutes;
    if (st.title) st.title.textContent = T.breakText(st.minutes);
    resetTimer(el);
  }

  /* ---------- the break screen: B ---------- */
  /* Not a slide: a break section laid over the current slide, outside the navigation, with a 10-minute timer.
     The length field is focused and selected when it opens, so typing a number and Enter changes the length and
     starts the countdown; "back at" counts down to a clock time; Esc or B ends the break. */
  const brk = document.createElement('section');
  brk.className = 'slide break live';
  brk.innerHTML = '<div class="chrome-top"><div class="logo">' + LOGO.replace(/acad-/g, 'acadb-') + '</div>' +
    '<div class="crumb">' + (cfg.day ? '<b>' + cfg.day + '</b><span>·</span>' : '') + '<span>' + T.breakLabel + '</span></div></div>' +
    '<div class="body"><div class="kicker">' + T.breakLabel + '</div><h1></h1><div class="timer" data-minutes="10"></div>' +
    '<div class="timer-edit"><label>' + T.length + ' <input class="mins" type="text" inputmode="numeric" maxlength="3" lang="en"> ' + T.min + '</label>' +
    '<span class="or">' + T.or + '</span><label>' + T.backAt + ' <input type="time"></label><span class="back"></span></div>' +
    '<p class="lead small">' + T.breakHint + '</p></div>' +
    '<div class="chrome-bottom"><div class="track"><i></i>' + footer + '</div><div class="no"></div></div>';
  deck.appendChild(brk);
  const brkTimer = brk.querySelector('.timer');
  const brkMins = brk.querySelector('input.mins');
  const breakOn = () => brk.classList.contains('active');
  function openBreak() {
    help.classList.remove('on'); notesPanel.classList.remove('on');
    setMinutes(brkTimer, 10);  // every break starts from the default; the instructor retypes it
    brk.classList.add('active');
    brkMins.focus(); brkMins.select();
  }
  function closeBreak() {
    stop(timers.get(brkTimer));
    brk.classList.remove('active');
    if (document.activeElement && brk.contains(document.activeElement)) document.activeElement.blur();
  }
  brkMins.addEventListener('change', () => setMinutes(brkTimer, parseInt(digits(brkMins.value), 10) || timers.get(brkTimer).minutes));
  brk.querySelector('input[type=time]').addEventListener('change', (e) => {
    const [h, m] = e.target.value.split(':').map(Number);
    if (Number.isNaN(h)) return;
    const end = new Date();
    end.setHours(h, m, 0, 0);
    if (end <= new Date()) end.setDate(end.getDate() + 1);
    const secs = Math.round((end - Date.now()) / 1000);
    setMinutes(brkTimer, Math.ceil(secs / 60));
    timers.get(brkTimer).left = secs;  // count down to the exact clock time
    run(brkTimer);
    e.target.value = '';
    e.target.blur();
  });
  brk.addEventListener('keydown', (e) => {  // keys typed inside the fields
    if (e.key === 'Enter') { e.preventDefault(); if (e.target === brkMins) brkMins.dispatchEvent(new Event('change')); run(brkTimer); e.target.blur(); e.stopPropagation(); }
    else if (e.key === 'Escape' || ((e.key === 'b' || e.key === 'B') && e.target === brkMins)) { e.preventDefault(); closeBreak(); e.stopPropagation(); }
    else if ((e.key === 't' || e.key === 'T') && e.target === brkMins) { e.preventDefault(); toggleTimer(brkTimer); e.stopPropagation(); }
  });

  document.querySelectorAll('.timer').forEach((el) => {
    const st = { minutes: Number(el.dataset.minutes || 10), left: 0, h: null, end: null };
    timers.set(el, st);
    if (el === brkTimer) {
      st.input = brkMins;
      st.back = brk.querySelector('.back');
      st.title = brk.querySelector('h1');
    } else {
      const btns = document.createElement('div');
      btns.className = 'timer-btns';
      btns.innerHTML = '<button data-a="go">' + T.go + '</button><button data-a="reset">' + T.reset + '</button>';
      btns.addEventListener('click', (e) => {
        const a = e.target.dataset.a;
        if (a === 'go') toggleTimer(el);
        if (a === 'reset') resetTimer(el);
      });
      el.after(btns);
    }
    setMinutes(el, st.minutes);
  });

  /* ---------- quizzes: click an option to reveal ---------- */
  document.querySelectorAll('.quiz').forEach((q) => {
    q.querySelectorAll('.opt').forEach((o) => o.addEventListener('click', () => q.classList.add('revealed')));
  });

  /* ---------- syntax highlighting: highlight.js is fetched only when a deck has code ---------- */
  function highlight() { document.querySelectorAll('pre.code code').forEach((c) => window.hljs.highlightElement(c)); }
  if (document.querySelector('pre.code code') && cfg.highlight !== 'off') {
    if (window.hljs) highlight();
    else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
      s.onload = highlight;
      document.head.appendChild(s);
    }
  }

  /* ---------- layout self-check (tooling): ?check lists overflowing slides ---------- */
  const checkSelectors = ['pre', 'table', '.card', '.flow', '.callout', '.prompt', '.chat', '.trace', '.ladder', '[data-check]'];
  function check() {
    const issues = [];
    const was = idx;
    slides.forEach((s, i) => {
      show(i, true);  // every fragment revealed: measure the final state
      const body = s.querySelector('.body');
      if (body.scrollHeight > body.clientHeight + 2) issues.push((i + 1) + ': body overflows by ' + (body.scrollHeight - body.clientHeight) + 'px');
      s.querySelectorAll(checkSelectors.join(', ')).forEach((el) => {
        const name = el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\s+/).join('.') : '');
        if (el.scrollHeight > el.clientHeight + 2) issues.push((i + 1) + ': ' + name + ' overflows y by ' + (el.scrollHeight - el.clientHeight) + 'px');
        if (el.scrollWidth > el.clientWidth + 2) issues.push((i + 1) + ': ' + name + ' overflows x by ' + (el.scrollWidth - el.clientWidth) + 'px');
      });
      s.querySelectorAll('pre.code > code').forEach((c) => {  // long lines can hide in the pre's padding
        const pre = c.parentElement, cs = getComputedStyle(pre);
        const inner = pre.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        if (c.scrollWidth > inner + 2) issues.push((i + 1) + ': code line too long by ' + Math.round(c.scrollWidth - inner) + 'px');
      });
    });
    show(was, true);  // stay on the starting slide with its fragments revealed (screenshots show the final state)
    const out = document.getElementById('check-report') || document.createElement('pre');
    out.id = 'check-report';
    out.textContent = 'CHECK ' + slides.length + ' slides\n' + (issues.join('\n') || 'OK');
    document.body.appendChild(out);
    console.log(out.textContent);
    return issues;
  }
  if (/[?&]check\b/.test(location.search)) {
    // measured after the page and the web fonts load: fallback fonts are narrower and hide overflow
    const ready = () => (document.fonts ? document.fonts.ready : Promise.resolve()).then(check);
    if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready);
  }

  const start = parseInt(location.hash.slice(1), 10);
  show(Number.isFinite(start) ? start - 1 : 0);
  window.deck = { slides, show, next, prev, openBreak, closeBreak, check, checkSelectors, get index() { return idx; }, config: cfg, track: trackName, tracks: TRACKS, strings: T, rtl, logo: LOGO };
})();

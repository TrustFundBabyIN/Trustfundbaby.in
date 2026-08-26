/* ============================================================
   TRUST FUND BABY — prototype interactions
   Motion choreography mirrors the framer-motion variants used
   in the Next.js build (see components/motion.ts).
   ============================================================ */

const THIS_YEAR = 2026;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- scroll reveal (staggered, once) ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    const d = reduce ? 0 : Math.min(i * 70, 280);
    setTimeout(() => e.target.classList.add('in'), d);
    io.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px' });

function observeAll(root = document) {
  root.querySelectorAll('[data-rv]:not(.in)').forEach(el => io.observe(el));
}

/* ---------- nav shadow on scroll ---------- */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 8), { passive: true });

/* ============================================================
   THE YEAR LEDGER — the signature element
   One tick per year from birth to vesting. Filled ticks are
   years elapsed, hollow ticks are years remaining. Time, not money.
   ============================================================ */
function drawLedger(el, birthYear, vestAge, animate = true) {
  const endYear = birthYear + vestAge;
  const total = Math.max(1, endYear - birthYear);
  const elapsed = Math.max(0, Math.min(total, THIS_YEAR - birthYear));

  el.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const t = document.createElement('div');
    t.className = 'tick';
    el.appendChild(t);

    const cls = i < elapsed - 1 ? 'done' : i === elapsed - 1 ? 'now' : 'left';
    if (reduce || !animate) {
      t.classList.add(cls);
    } else {
      // ripple outward from the present moment rather than left-to-right:
      // the ledger reads as "here is now, here is what's behind and ahead"
      setTimeout(() => t.classList.add(cls), Math.abs(i - elapsed) * 26 + 60);
    }
  }
  return { total, elapsed, remaining: total - elapsed, endYear };
}

/* hero ledger + its controls */
const lgTicks = document.getElementById('lg-ticks');
let vestAge = 25;

function syncHero(animate = true) {
  const birth = Math.max(2008, Math.min(2026, +document.getElementById('in-year').value || 2022));
  const r = drawLedger(lgTicks, birth, vestAge, animate);
  document.getElementById('lg-done').textContent = r.elapsed;
  document.getElementById('lg-left').textContent = r.remaining;
  document.getElementById('lg-born').textContent = 'BORN ' + birth;
  document.getElementById('lg-end').textContent = 'AGE ' + vestAge;
  document.getElementById('lg-vest').textContent = 'VESTS ' + r.endYear;
}

if (lgTicks) {
  document.getElementById('in-year').addEventListener('input', () => syncHero(false));
  document.querySelectorAll('#seg-age button').forEach(b => {
    b.addEventListener('click', () => {
      vestAge = +b.dataset.age;
      document.querySelectorAll('#seg-age button')
        .forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      syncHero(true);
    });
  });
  syncHero(true);
}

/* dashboard ledger */
const dashTicks = document.getElementById('dash-ticks');

/* ============================================================
   The irrevocability screen — types itself, then waits.
   It should feel like a person hesitating over the keyboard.
   ============================================================ */
const WORD = 'IRREVOCABLE';
const out = document.getElementById('typed-out');
if (out) {
  if (reduce) {
    out.textContent = WORD;
  } else {
    out.textContent = WORD;   // static renders should never catch an empty field
    let i = 0;
    const typeLoop = () => {
      const step = () => {
        out.textContent = WORD.slice(0, ++i);
        if (i < WORD.length) {
          // slow down over the last few letters — the pause is the point
          setTimeout(step, i > WORD.length - 4 ? 260 : 110);
        } else {
          setTimeout(() => { i = 0; out.textContent = ''; setTimeout(typeLoop, 900); }, 4200);
        }
      };
      step();
    };
    const t = new IntersectionObserver(e => {
      if (e[0].isIntersecting) { out.textContent = ''; typeLoop(); t.disconnect(); }
    }, { threshold: .4 });
    t.observe(out.closest('.irrev'));
  }
}

/* ============================================================
   EDUCATION — 9 years × 12 modules
   Year 1 module 1 has a film; everything else is blog + lab + quiz
   while video production catches up. The UI states that plainly
   rather than implying video exists everywhere.
   ============================================================ */
const YEARS = [
  { y: 1, age: 13, name: 'Money Basics', mods: ['What is Money?', 'Barter & Trade', 'History of Currency',
    'How Banks Work', 'Saving vs Spending', 'Needs vs Wants', 'Your First Budget',
    'The Power of Compounding', 'Digital Money & UPI', 'Inflation: Why Money Shrinks',
    'Setting Financial Goals', 'Year 1 Review'] },
  { y: 2, age: 14, name: 'How Markets Work', mods: ['What is a Market?', 'Shares Explained', 'What a Company Is',
    'Supply and Demand', 'Who Sets the Price', 'Stock Exchanges in India', 'Reading a Ticker',
    'Bulls and Bears', 'What SEBI Does', 'Mutual Funds, Simply', 'Index Funds', 'Year 2 Review'] },
  { y: 3, age: 15, name: 'Risk & Reward', mods: ['What Risk Means', 'Risk vs Volatility', 'Diversification',
    'Time in the Market', 'The Cost of Panic', 'Debt vs Equity', 'Gold and Property',
    'Insurance Basics', 'Emergency Funds', 'Scams and Red Flags', 'Risk Appetite', 'Year 3 Review'] },
  { y: 4, age: 16, name: 'Personal Finance', mods: ['Your First Bank Account', 'Budgeting for Real',
    'Tracking Spending', 'Credit and Debit', 'What a Loan Costs', 'Credit Scores',
    'Saving for a Goal', 'Lifestyle Creep', 'Money and Friends', 'Negotiating', 'First Job Money',
    'Year 4 Review'] },
  { y: 5, age: 17, name: 'Taxes & Law in India', mods: ['Why Tax Exists', 'Income Tax Basics', 'Slabs and Regimes',
    'What is a PAN', 'Filing an ITR', 'GST, Simply', 'Capital Gains', 'TDS Explained',
    'What a Trust Is', 'Wills and Nominees', 'Your Rights', 'Year 5 Review'] },
  { y: 6, age: 18, name: 'Investing as an Adult', mods: ['You Are Legally an Adult', 'Opening a Demat',
    'KYC and Why', 'Your First SIP', 'Reading a Fact Sheet', 'Expense Ratios',
    'Direct vs Regular', 'SIP vs Lump Sum', 'Rebalancing', 'Tax on Investments',
    'Advisers and Distributors', 'Year 6 Review'] },
  { y: 7, age: 19, name: 'Advanced Topics', mods: ['Asset Allocation', 'Bonds and Yields', 'REITs',
    'International Investing', 'Currency Risk', 'Derivatives, Carefully', 'Behavioural Finance',
    'Reading an Annual Report', 'Valuation Basics', 'Bubbles in History', 'When Not to Invest',
    'Year 7 Review'] },
  { y: 8, age: 20, name: 'Wealth Management', mods: ['What Wealth Is For', 'Goal-Based Planning',
    'Retirement, Early', 'Buying a Home', 'Debt as a Tool', 'Protecting What You Have',
    'Estate Planning', 'Giving and Zakat/Daan', 'Family Money Conversations',
    'Choosing Professionals', 'Building a System', 'Year 8 Review'] },
  { y: 9, age: 21, name: 'Life After the Trust', mods: ['The Corpus is Yours', 'The First 90 Days',
    'Not Spending It', 'Deploying a Lump Sum', 'Lifestyle Decisions', 'Career vs Capital',
    'Starting Something', 'Helping Family', 'What Your Parents Did', 'Paying It Forward',
    'Your Own Trust One Day', 'Year 9 Review'] },
];

/* Live external content. Replace these with the real Vercel URLs. */
const LINKS = {
  video: { '1-1': '#VIDEO_URL_Y1M1' },              // only Chapter 1 is filmed so far
  blog:  (y, m) => `#BLOG_URL_Y${y}M${m}`,
  lab:   (y, m) => `#LAB_URL_Y${y}M${m}`,
  quiz:  (y, m) => `#QUIZ_URL_Y${y}M${m}`,
};

const rail = document.getElementById('year-rail');
const grid = document.getElementById('mod-grid');
let activeYear = 1;

function renderYears() {
  if (!rail) return;
  rail.innerHTML = '';
  YEARS.forEach(Y => {
    const b = document.createElement('button');
    b.className = 'year-chip';
    b.type = 'button';
    b.setAttribute('aria-pressed', String(Y.y === activeYear));
    b.innerHTML = `<div class="y">YEAR ${Y.y}</div><span class="a">Age ${Y.age}</span>`;
    b.addEventListener('click', () => { activeYear = Y.y; renderYears(); renderMods(); });
    rail.appendChild(b);
  });
}

function renderMods() {
  if (!grid) return;
  const Y = YEARS.find(x => x.y === activeYear);
  grid.innerHTML = '';
  Y.mods.forEach((title, idx) => {
    const n = idx + 1;
    const hasVideo = LINKS.video[`${Y.y}-${n}`] !== undefined;
    const a = document.createElement('a');
    a.className = 'mod';
    a.href = LINKS.blog(Y.y, n);
    a.setAttribute('data-rv', '');
    a.innerHTML = `
      <span class="num">${String(n).padStart(2, '0')} · YEAR ${Y.y}</span>
      <div class="t">${title}</div>
      <div class="steps">
        <i class="${hasVideo ? 'video' : ''}" title="Watch"></i>
        <i class="on" title="Learn"></i>
        <i class="on" title="Lab"></i>
        <i class="on" title="Quiz"></i>
      </div>
      <div class="mod-note">${hasVideo ? 'Film · blog · lab · quiz' : 'Blog · lab · quiz · film soon'}</div>`;
    grid.appendChild(a);
  });
  document.getElementById('edu-note').textContent =
    `Year ${Y.y} · ${Y.name} · age ${Y.age}. Blogs, labs and quizzes are live for every module. ` +
    `Film production is under way — Chapter 1, Module 1 is the first one finished.`;
  observeAll(grid);
}

/* ============================================================
   Page switching (the Next.js build uses real routes)
   ============================================================ */
function go(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });

  if (page === 'education') { renderYears(); renderMods(); }
  if (page === 'dashboard' && dashTicks) drawLedger(dashTicks, 2022, 25, true);
  requestAnimationFrame(() => observeAll());
}

document.addEventListener('click', e => {
  const a = e.target.closest('[data-go]');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#') && href.length > 1 && a.dataset.go === 'home') {
    go('home');
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 60);
    e.preventDefault();
    return;
  }
  e.preventDefault();
  go(a.dataset.go);
});

/* fund selection in the dashboard preview */
document.querySelectorAll('#funds .fundrow').forEach(row => {
  const pick = () => {
    document.querySelectorAll('#funds .fundrow')
      .forEach(r => r.setAttribute('aria-selected', String(r === row)));
  };
  row.addEventListener('click', pick);
  row.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); }
  });
});

observeAll();

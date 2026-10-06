export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO, for sorting and <time>
  displayDate: string;
  /** Plain-text body. Kept as paragraphs so it can be rendered without a parser. */
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "investing-for-a-child-in-india",
    title: "Investing for a child in India: what actually changes the outcome",
    summary:
      "The amount matters far less than the start date, whose name the money sits in, and whether anything is locked. A plain look at the four decisions that matter.",
    date: "2026-10-02",
    displayDate: "2 October 2026",
    body: [
      "Most parents who want to invest for a child get stuck on the same question: how much? It is the least important of the four decisions in front of you. The other three are the ones that change the outcome.",
      "The first is the start date. Money set aside for a child compounds for as long as it is invested. Twenty-one years is a long time, and the arithmetic rewards the earliest years disproportionately — which is why a modest amount started at birth usually beats a larger amount started at ten.",
      "The second is whose name the money sits in. In India you have broadly three options. Money in your own name, tagged to your child, is the simplest and most flexible: it is legally yours, you control it, and it can be redirected if life goes wrong. Money in a minor's name is possible but comes with operational friction and, importantly, does not stop you from spending it. A trust is the third option, and the only one where the money genuinely stops being yours.",
      "That difference matters more than people expect. Parents assume a minor account protects the money. It does not — a natural guardian can operate it, and the funds remain within reach. If the protection is the point, only a trust delivers it.",
      "The third decision is whether anything is locked. Flexibility and protection pull in opposite directions. A flexible account can be paused, changed, or withdrawn from, which is exactly what makes it useful when life intervenes — and exactly what makes it possible to spend. An irrevocable trust cannot be undone by anyone, including you, which is the whole reason it works.",
      "The fourth decision is the amount. Start with what you will not miss. A small SIP that survives twenty-one years beats a large one abandoned in month four, and the habit is the thing being built as much as the corpus is.",
      "One practical note on tax: investments held in a parent's own name are taxed in the parent's hands. Where a minor's income is involved, clubbing provisions can apply. Tax rules change and depend on your circumstances, so treat this as a prompt to ask a chartered accountant rather than as advice.",
      "The short version: start early, decide whose name it is in, decide whether you want it locked, and then pick a number small enough that you will actually keep going.",
    ],
  },
  {
    slug: "sip-for-a-child-how-much-to-start",
    title: "How much do you need to start a SIP for a child?",
    summary:
      "Entry amounts for child investing in India are far lower than most parents assume. What the minimum really is, and why starting tiny usually wins.",
    date: "2026-09-28",
    displayDate: "28 September 2026",
    body: [
      "The most common reason parents give for not starting is that the amount they could spare feels too small to be worth the paperwork. That instinct is understandable and, arithmetically, wrong.",
      "Mutual fund SIPs in India can begin at a very low monthly amount. Several schemes accept SIPs of a few hundred rupees a month, and platforms increasingly allow daily frequencies that make the entry even smaller. The barrier was never the minimum — it was the setup.",
      "What makes a small SIP work is time rather than size. A monthly amount held for two decades benefits from compounding on every contribution, and the earliest contributions do the heaviest lifting. Two parents contributing the same total over different periods end up with materially different results, and the difference is entirely about when they started.",
      "There is also a behavioural case. An amount small enough to be painless is an amount you will not cancel in a tight month. A commitment you keep for twenty-one years beats a larger one you abandon, and abandoning is the normal failure mode.",
      "If you want a starting point: pick a figure you would not notice leaving your account. Set the frequency to monthly or daily. Leave it alone. Increase it when your income rises, not before.",
      "One caution worth stating plainly. Any figure you see on a website — including ours — showing what a SIP grows into is an illustration, not a forecast. It uses an assumed rate that you choose. Actual returns depend on the schemes you pick and on markets, and they can be lower.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

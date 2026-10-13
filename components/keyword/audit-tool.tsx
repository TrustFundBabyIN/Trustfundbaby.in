"use client";

/**
 * Whose-Name Audit. The visitor ticks what the family holds for the child and
 * sees, for each one, whose money it is, who runs it today, what happens at 18
 * and whether it can be spent before it reaches the child.
 * Nothing is saved or sent anywhere.
 *
 * Facts checked October 2026 against: SEBI circular of 24 Sep 2019 and AMFI
 * guidance on minor folios; the PPF and Sukanya Samriddhi scheme rules as
 * published by India Post and banks. Keep wording general; this page explains,
 * it never recommends one option over another.
 */

import { useState } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Small } from "@/components/keyword/kit";

type Spend = "yes" | "limited";

const ITEMS: {
  id: string;
  name: string;
  whose: string;
  runs: string;
  at18: string;
  spend: Spend;
  spendNote: string;
}[] = [
  {
    id: "savings",
    name: "Savings account in the child's name",
    whose: "The child's.",
    runs: "A parent, as guardian. Some banks let children over 10 use a limited account themselves.",
    at18: "It has to be converted to a regular account. After that, your child alone runs it.",
    spend: "yes",
    spendNote: "The guardian can withdraw, as long as it is for the child.",
  },
  {
    id: "fd",
    name: "FD in the child's name",
    whose: "The child's.",
    runs: "A parent, as guardian.",
    at18: "Your child takes over, and decides what happens on renewal.",
    spend: "yes",
    spendNote: "The guardian can break it early, usually with a penalty.",
  },
  {
    id: "ppf",
    name: "PPF for the child",
    whose: "The child's.",
    runs: "One parent, as guardian. Deposits count inside that parent's ₹1.5 lakh yearly PPF limit.",
    at18: "The account must be changed to major status with your child's KYC. Then your child runs it.",
    spend: "limited",
    spendNote: "15-year lock, with loans and partial withdrawals only as the scheme rules allow.",
  },
  {
    id: "ssy",
    name: "Sukanya Samriddhi (for a daughter)",
    whose: "Your daughter's.",
    runs: "A parent, as guardian.",
    at18: "Your daughter runs it. Up to half can be withdrawn for her education; it matures 21 years after opening.",
    spend: "limited",
    spendNote: "Withdrawals only for the reasons the scheme allows.",
  },
  {
    id: "mf",
    name: "Mutual fund folio in the child's name",
    whose: "The child's.",
    runs: "A parent, as guardian. Money must come from the child's bank account, or one held jointly with the guardian.",
    at18: "SIPs and all transactions stop until the folio is changed to major with your child's KYC and bank details. Then your child controls it.",
    spend: "yes",
    spendNote: "The guardian can redeem; the money goes to the child's bank account, which the guardian runs.",
  },
  {
    id: "gold",
    name: "Gold kept aside for the child",
    whose: "Whoever holds it. Jewellery and coins carry no name.",
    runs: "Whoever has the locker key.",
    at18: "Nothing changes. It reaches your child only if someone hands it over.",
    spend: "yes",
    spendNote: "It can be sold, pledged or gifted at any time.",
  },
  {
    id: "own",
    name: "Money in my name, 'for the child'",
    whose: "Yours. Legally, the child has no claim to it.",
    runs: "You.",
    at18: "Nothing changes. It stays yours until you choose to give it.",
    spend: "yes",
    spendNote: "It can be used for anything, including an emergency at home.",
  },
];

const CHECKS = [
  {
    title: "Write down whose name, who signs, and who the nominee is",
    body: "For every account above. Most families find at least one they are unsure about.",
  },
  {
    title: "Put your child's 18th birthday in the calendar",
    body: "Accounts in a child's name need a change of status at 18. In a mutual fund folio, SIPs stop until it is done.",
  },
  {
    title: "Decide which money should stay flexible and which should be locked",
    body: "Money in your name, or run by you as guardian, can be spent before it reaches your child. Only an irrevocable trust takes that choice away from everyone, including you.",
  },
];

export function AuditTool() {
  const [picked, setPicked] = useState<string[]>([]);
  const [shown, setShown] = useState(false);

  const chosen = ITEMS.filter((i) => picked.includes(i.id));
  const spendable = chosen.filter((i) => i.spend === "yes").length;
  const handover = chosen.filter((i) => i.whose.startsWith("The child") || i.whose.startsWith("Your daughter")).length;

  function toggle(id: string) {
    setShown(false);
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardContent className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-medium tracking-tight">What have you set aside for your child?</h2>
            <Small className="mt-1">Tap everything that applies. Nothing is saved.</Small>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {ITEMS.map((i) => {
              const on = picked.includes(i.id);
              return (
                <button
                  key={i.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(i.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    on ? "border-trust-blue bg-trust-blue text-paper" : "bg-background hover:bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md border",
                      on ? "border-paper bg-paper text-trust-blue" : ""
                    )}
                  >
                    {on && <CheckIcon className="size-3.5" />}
                  </span>
                  {i.name}
                </button>
              );
            })}
          </div>
          <Button
            disabled={picked.length === 0}
            onClick={() => setShown(true)}
            className="bg-primary-gradient h-11 self-start rounded-full px-6"
          >
            Run my audit
          </Button>
        </CardContent>
      </Card>

      {shown && (
        <>
          <Card className="bg-trust-blue text-paper">
            <CardContent className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="font-heading text-4xl font-medium">{chosen.length}</p>
                <Small className="text-paper/70">places you&apos;ve set money aside</Small>
              </div>
              <div>
                <p className="font-heading text-4xl font-medium">{spendable}</p>
                <Small className="text-paper/70">can be spent before it reaches your child</Small>
              </div>
              <div>
                <p className="font-heading text-4xl font-medium">{handover}</p>
                <Small className="text-paper/70">pass fully to your child at 18, to use as they like</Small>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            {chosen.map((i) => (
              <Card key={i.id}>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-medium">{i.name}</h3>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1 font-mono text-[0.7rem] tracking-wider uppercase",
                        i.spend === "yes" ? "bg-marigold/30" : "bg-growth-green"
                      )}
                    >
                      {i.spend === "yes" ? "Can be spent" : "Partly locked"}
                    </span>
                  </div>
                  <dl className="grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">Whose money</dt>
                      <dd className="mt-1">{i.whose}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">Who runs it now</dt>
                      <dd className="mt-1">{i.runs}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] tracking-wider text-muted-foreground uppercase">At 18</dt>
                      <dd className="mt-1">{i.at18}</dd>
                    </div>
                  </dl>
                  <Small>{i.spendNote}</Small>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-stamp-sage/60">
            <CardContent className="flex flex-col gap-5">
              <h2 className="text-xl font-medium tracking-tight">Your top 3 checks</h2>
              <ol className="flex flex-col gap-4">
                {CHECKS.map((c, n) => (
                  <li key={c.title} className="flex gap-4">
                    <span className="font-mono text-lg">{n + 1}</span>
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-sm text-muted-foreground">{c.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Small>
                General information, not advice. Rules can change; check with your bank, post
                office or fund house. Income on money in a minor&apos;s name is usually added to a
                parent&apos;s income for tax until 18.
              </Small>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

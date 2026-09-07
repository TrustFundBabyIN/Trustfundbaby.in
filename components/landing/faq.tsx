import { Section, SectionHeader } from "@/components/landing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "I can invest in my child's name directly.",
    answer:
      "You can — but money held in your name, or in a minor account you operate, stays legally yours. It can be redirected, spent in a difficult year, or contested later. An irrevocable trust cannot be undone, which is the whole point. Seed and Harvest give you room to start before you're ready to commit to that.",
  },
  {
    question: "What's the difference between Seed, Harvest and Deed?",
    answer:
      "Seed is a monthly SIP account, from ₹1,000. Harvest is a lump-sum account, from ₹5,00,000 — both stay flexible: pause, change the amount, or withdraw. A Deed is what either one becomes once you convert it: an irrevocable trust with a locked vesting age and payout plan. Nothing is a Deed until you choose to make it one.",
  },
  {
    question: "PPF and Sukanya are safer — government backed.",
    answer:
      "They are, and they are a sensible part of most families' plans. They are also capped and fixed-rate. Over a 21-year horizon the gap between a fixed 7.1% and long-run equity returns compounds significantly — try the calculator above. TFB does not choose your investments; you decide what the trust holds, including safer instruments.",
  },
  {
    question: "Why pay for something I can do myself?",
    answer:
      "Opening a Seed or Harvest account, the dashboard, and all 108 education modules are ₹0. Converting to an irrevocable deed is a one-time ₹20,000 — deed drafting, trust PAN application, e-stamping and e-sign are all included. Doing the same paperwork through a chartered accountant is typically quoted at ₹40,000 and several months.",
  },
  {
    question: "What if Trust Fund Baby shuts down?",
    answer:
      "The trust is a legal entity that exists independently of us. The deed is executed, the PAN belongs to your child's trust, and the investments sit with your mutual fund and your bank — never with TFB. If this platform disappeared tomorrow, the trust and the corpus continue.",
  },
  {
    question: "Can I withdraw for emergencies?",
    answer:
      "Not from a Deed — once executed, it is irrevocable by design, with no discretionary withdrawal at any age before vesting. That is the entire point: the corpus is provably out of anyone's reach, including yours. If you want that flexibility, keep the money in a Harvest account instead, which supports withdrawals on your terms and can still be converted to a Deed later, whenever you're ready to make it permanent.",
  },
  {
    question: "What does my child get at vesting?",
    answer:
      "The corpus, released on the plan you chose — in full, as a monthly allowance, an annual cap, or a graduated release — at the vesting age you selected: 18, 21 or 25. Plus however many years of financial education they've completed by then — up to 108 modules, labs and quizzes. And a contributor wall naming every family member who helped build it.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Honest answers to the questions every parent has."
        className="mx-auto max-w-2xl items-center text-center"
      />

      <Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

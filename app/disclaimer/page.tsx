import type { Metadata } from "next";

import { LegalSection, LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Statutory and regulatory disclosures for Trust Fund Baby (TFB EduVest LLP), an AMFI-registered mutual fund distributor. ARN-368678.",
};

const CONTACT_EMAIL = "sanchit@trustfundbaby.in";

export default function DisclaimerPage() {
  return (
    <LegalShell
      title="Disclaimer"
      updated="2 October 2026"
      intro="This page sets out the disclosures that apply to everything we publish. Please read it before acting on anything you see on this website or in our social channels."
    >
      <LegalSection heading="Regulatory status">
        <p>
          Trust Fund Baby is a brand operated by <strong>TFB EduVest LLP</strong>,
          an AMFI-registered mutual fund distributor holding{" "}
          <strong>ARN-368678</strong>. We distribute mutual fund schemes as an
          empanelled distributor and earn trail commission from the asset
          management companies whose schemes you invest in. We do not charge you
          a management or advisory fee on your investments.
        </p>
        <p>
          We are a <strong>distributor, not an adviser</strong>. Nothing on this
          website, in our Academy, in our social media content, or in any
          conversation with us constitutes investment advice, a recommendation
          to buy or sell any security, or an offer to sell or a solicitation to
          buy any product.
        </p>
      </LegalSection>

      <LegalSection heading="Mutual fund investments">
        <p>
          <strong>
            Mutual fund investments are subject to market risks. Read all
            scheme-related documents carefully before investing.
          </strong>
        </p>
        <p>
          Past performance of any scheme is not indicative of future results.
          The value of investments and the income from them may go down as well
          as up, and you may get back less than you invested. There is no
          assured or guaranteed return from any mutual fund scheme.
        </p>
      </LegalSection>

      <LegalSection heading="About the numbers on this website">
        <p>
          Our calculator and any figures shown on this website are{" "}
          <strong>illustrative only</strong>. They use an assumed rate of return
          that you control, so you can see how compounding behaves over time.
          They are not a projection, forecast, or promise of what your
          investment will do.
        </p>
        <p>
          Actual returns depend on the schemes you choose, market conditions,
          expense ratios, taxes, and how long you stay invested. Your results
          will differ, and they may differ materially. Comparisons with other
          instruments such as PPF use published fixed rates for illustration and
          are not a recommendation.
        </p>
      </LegalSection>

      <LegalSection heading="Taxation">
        <p>
          Tax treatment depends on your individual circumstances and on the
          scheme you invest in, and it may change. Tax rules referenced anywhere
          on this website are stated as we understand them at the time of
          publication. We are not tax advisers. Please consult a qualified
          chartered accountant or tax adviser before acting on anything tax
          related.
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy and availability">
        <p>
          Product features, entry amounts, and fees are shown as they stand at
          the time of publication. Some products described on this website are{" "}
          <strong>not yet open for sign-up</strong>, and where that is the case
          we say so. We may change features, amounts, or availability at any
          time. Nothing here is a binding offer.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party links">
        <p>
          Where we link to third-party websites or services, we do so for
          convenience. We do not control them and are not responsible for their
          content, accuracy, or privacy practices.
        </p>
      </LegalSection>

      <LegalSection heading="Questions">
        <p>
          Write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with any
          question about this disclaimer.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

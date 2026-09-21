import type { Metadata } from "next";

import { LegalSection, LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms on which TFB EduVest LLP provides the Trust Fund Baby website, Academy, TFB Seed, TFB Harvest and TFB Deed.",
};

const CONTACT_EMAIL = "hello@trustfundbaby.in";

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of service"
      updated="19 September 2026"
      intro="These are the terms on which Trust Fund Baby provides its website, its free Academy lessons, and its products. By using any of them, you agree to these terms. Please read the sections on mutual fund risk and on irrevocability before you open an account."
    >
      <LegalSection heading="Who we are">
        <p>
          Trust Fund Baby is operated by <strong>TFB EduVest LLP</strong>, an LLP
          incorporated in India (LLPIN ACX-6787), registered office at
          1901/1902 Sahyadri Tower, Upper Govind Nagar, Malad East, Mumbai
          400097. We are an AMFI-registered mutual fund distributor,{" "}
          <strong>ARN-368678</strong>.
        </p>
        <p>
          &ldquo;We&rdquo; and &ldquo;TFB&rdquo; mean TFB EduVest LLP.
          &ldquo;You&rdquo; means the person using our website or products.
        </p>
      </LegalSection>

      <LegalSection heading="Eligibility">
        <p>
          You must be at least 18 years old and competent to contract, with an
          Indian bank account and PAN, to open an account. If you open a fund for
          a child, you must be the child&rsquo;s parent or legal guardian, and
          the account is opened in your name and under your PAN. We do not open
          accounts for minors.
        </p>
      </LegalSection>

      <LegalSection heading="What we do, and what we do not do">
        <p>
          We are a <strong>distributor, not an adviser</strong>. We do not
          provide investment advice, we do not recommend a scheme, and nothing on
          this website or in our Academy is investment, tax or legal advice.
          Decide on the basis of your own judgement or a registered investment
          adviser.
        </p>
        <p>
          We earn a commission from the asset management company whose schemes
          you invest in, which is how the platform stays free to use. We do not
          charge you for opening or holding a TFB Seed or TFB Harvest account.
        </p>
      </LegalSection>

      <LegalSection heading="The products">
        <ul>
          <li>
            <strong>TFB Seed</strong> &mdash; a systematic investment plan into
            a mutual fund folio in your own name, from{" "}
            <strong>&#8377;100 a month</strong> (or the daily equivalent). You may
            invest monthly or daily. We do not support weekly or quarterly
            frequencies.
          </li>
          <li>
            <strong>TFB Harvest</strong> &mdash; a lump-sum folio with a minimum
            of <strong>&#8377;21,000</strong>, from which you may set up a
            systematic withdrawal.{" "}
            <strong>
              One year is the long-term capital gains tax boundary, not a lock.
            </strong>{" "}
            You may withdraw earlier, but you will be shown a short-term capital
            gains disclosure first and must acknowledge it. A seven-year horizon
            is what makes a lasting monthly payout plausible.
          </li>
          <li>
            <strong>TFB Deed</strong> &mdash; an{" "}
            <strong>irrevocable</strong> trust for your child, at a fee of{" "}
            <strong>&#8377;50,000</strong>, which includes a keepsake gift. It
            is arranged through a founder-led discovery call. Booking that call
            carries a <strong>&#8377;500 fee</strong>, which is fully adjusted
            against the &#8377;50,000 fee when you proceed.
          </li>
        </ul>
        <p>
          Product mechanics &mdash; payout templates, vesting ages, funding
          routes and what can be converted into what &mdash; are described on the
          product pages of this site. Where anything here conflicts with the deed
          document you sign, the signed deed governs.
        </p>
      </LegalSection>

      <LegalSection heading="Mutual fund risk">
        <p>
          <strong>
            Mutual fund investments are subject to market risks. Read all
            scheme-related documents carefully before investing.
          </strong>{" "}
          The value of your investment can go down as well as up, and you may get
          back less than you put in. Past performance is not indicative of future
          results.
        </p>
        <p>
          We do not project, promise or guarantee any return, any corpus, or any
          payout amount, and we never will. Where we show a withdrawal, we show
          it as a share of the amount you actually invested &mdash; never as a
          forecast of what you will receive.
        </p>
      </LegalSection>

      <LegalSection heading="Your account and your data">
        <p>
          You agree to give us accurate, current information, and to keep it
          updated. Your transactions are placed through our mutual fund
          transaction partner and are subject to that partner&rsquo;s, the
          asset management company&rsquo;s and the registrar&rsquo;s
          acceptance, cut-off timings and NAV rules. A SIP or mandate can fail
          if there are insufficient funds, if your bank blocks it, or if the
          scheme stops accepting subscriptions.
        </p>
        <p>
          We handle personal data as described in our{" "}
          <a href="/privacy">Privacy policy</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Fees and payments">
        <ul>
          <li>
            TFB Seed and TFB Harvest cost you nothing to open or hold.
          </li>
          <li>
            The TFB Deed fee is <strong>&#8377;50,000</strong>, payable before
            the deed is drafted. The &#8377;500 discovery-call booking fee is{" "}
            <strong>non-refundable</strong>, and is adjusted against that
            &#8377;50,000 when you proceed. It is waived at the founder&rsquo;s
            discretion in some cases.
          </li>
          <li>
            Well-wisher contributions are gifts made by a third party to the
            child&rsquo;s fund. Once made, a contribution cannot be refunded to
            the contributor.
          </li>
          <li>
            Investment amounts you pay are allotted by the asset management
            company at the applicable NAV. They are not refunded at will:
            getting money back means redeeming units, which attracts applicable
            exit loads and tax.
          </li>
        </ul>
        <p>
          Asking us to stop an ongoing SIP or mandate is always allowed and we
          will action it before the next instalment date.
        </p>
      </LegalSection>

      <LegalSection heading="Irrevocability of a TFB Deed">
        <p>
          <strong>An executed TFB Deed is irrevocable.</strong> Once you sign it,
          the money in the trust belongs to the trust for your child&rsquo;s
          benefit. You cannot take it back, change your mind, or reverse it, and
          the vesting age and payout mode you choose at creation are frozen.
          This is the whole point of the product, and it is enforced twice: you
          must type the word IRREVOCABLE after reading the disclosure, and the
          system refuses to create a deed record without it. Do not proceed with
          a Deed unless you are certain.
        </p>
      </LegalSection>

      <LegalSection heading="Academy">
        <p>
          The Academy&rsquo;s 108 lessons are free educational content for
          families. They are general in nature and are not advice, and they do
          not take your circumstances into account. Do not rely on them as a
          substitute for advice from a registered adviser, a chartered
          accountant or a lawyer.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>break any law, or help anyone else break one, using our services;</li>
          <li>give us false identity or financial information, or use someone else&rsquo;s PAN or bank account;</li>
          <li>launder money, fund anything unlawful, or route another person&rsquo;s undisclosed money through an account;</li>
          <li>scrape, probe, overload or attempt to break into our systems or those of our partners; or</li>
          <li>copy our content, brand or Academy material for commercial use.</li>
        </ul>
        <p>
          We may suspend or close an account that breaches these terms, or where
          the law requires it.
        </p>
      </LegalSection>

      <LegalSection heading="Our content">
        <p>
          The Trust Fund Baby name and mark, the website, the Academy lessons,
          and the TFB documents are ours or licensed to us. You may read, share
          and print them for your own family&rsquo;s use. You may not sell them
          or present them as your own.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party services">
        <p>
          Your transactions run through our mutual fund transaction partner,
          your bank, the asset management company and its registrar. Payments
          run through our payment gateway. Our Instagram and Facebook pages sit
          on Meta Platforms. Those providers have their own terms and privacy
          practices, and we are not responsible for them.
        </p>
      </LegalSection>

      <LegalSection heading="Our responsibility to you">
        <p>
          We will run the platform with reasonable skill and care, and we will
          keep it available as far as we reasonably can. We are not responsible
          for market movements, for a scheme&rsquo;s performance, for a
          decision you made on your own, for a bank or registrar failing, for a
          network or platform outage outside our control, or for indirect losses.
        </p>
        <p>
          Nothing in these terms limits any right you have under the consumer
          protection laws of India, or any liability that cannot lawfully be
          limited. Our total liability to you in connection with a product is
          limited to the fees we actually received from you for that product.
        </p>
      </LegalSection>

      <LegalSection heading="Stopping your use of TFB">
        <p>
          You may close your Seed or Harvest account or stop a mandate at any
          time; closing an account means you redeem your units, with the tax and
          exit-load consequences that follow. A Deed cannot be closed or undone.
          We may end our services to you with notice, or immediately if you
          breach these terms or we are required to by law.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms as our products change. The current version
          always sits on this page with the date at the top. Material changes
          affecting account holders will be notified by email before they take
          effect. Continuing to use TFB after a change means you accept it.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of India. The courts at Mumbai,
          Maharashtra have exclusive jurisdiction over any dispute, subject to
          any right you have to approach a consumer forum or a regulator such as
          SEBI or AMFI.
        </p>
      </LegalSection>

      <LegalSection heading="Contact and grievance officer">
        <p>
          Questions about these terms, or a complaint, go to our Grievance
          Officer at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or
          by post to TFB EduVest LLP, 1901/1902 Sahyadri Tower, Upper Govind
          Nagar, Malad East, Mumbai 400097.
        </p>
        <p>
          Mutual fund investments are subject to market risks. Read all
          scheme-related documents carefully. ARN-368678.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

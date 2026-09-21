import type { Metadata } from "next";

import { LegalSection, LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How TFB EduVest LLP collects, uses, shares and protects personal data across the Trust Fund Baby website, Academy, products, and Instagram and Facebook conversations.",
};

const CONTACT_EMAIL = "hello@trustfundbaby.in";

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy policy"
      updated="19 September 2026"
      intro="This policy explains what personal data Trust Fund Baby collects, why we collect it, who we share it with, and the choices you have. We have written it in plain language on purpose. If anything is unclear, write to us and we will explain it."
    >
      <LegalSection heading="Who we are">
        <p>
          Trust Fund Baby is operated by <strong>TFB EduVest LLP</strong>, an
          LLP incorporated in India (LLPIN ACX-6787), with its registered office
          at 1901/1902 Sahyadri Tower, Upper Govind Nagar, Malad East, Mumbai
          400097. We are an AMFI-registered mutual fund distributor
          (<strong>ARN-368678</strong>).
        </p>
        <p>
          In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
          &ldquo;TFB&rdquo; mean TFB EduVest LLP. &ldquo;You&rdquo; means the
          person visiting our website, opening an account, or talking to us on
          social media. For the purposes of the Digital Personal Data Protection
          Act, 2023, we are the Data Fiduciary for the personal data described
          below.
        </p>
      </LegalSection>

      <LegalSection heading="What this policy covers">
        <p>It applies to personal data we handle when you:</p>
        <ul>
          <li>visit trustfundbaby.in or use our free Academy lessons;</li>
          <li>create an account, or start a TFB Seed, TFB Harvest or TFB Deed;</li>
          <li>comment on or message our Instagram or Facebook pages;</li>
          <li>book a discovery call, email us, or call us; or</li>
          <li>contribute to a child&rsquo;s fund as a well-wisher.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Personal data we collect">
        <p>
          <strong>Data you give us.</strong> Your name, email address, mobile
          number, city and, where you open an account, your PAN. For TFB Deed,
          the intake also includes the child&rsquo;s name and date of birth, the
          vesting age and payout instructions you choose, and the name of the
          trustee you appoint. If you book a discovery call, we hold your
          booking details and anything you tell us on that call.
        </p>
        <p>
          <strong>Identity and financial data collected for regulatory
          checks.</strong> To open a mutual fund folio we, through our
          transaction partner, collect and verify the identity and bank details
          the law requires: your Aadhaar-based KYC through DigiLocker, your PAN,
          your bank account details and cancelled cheque or bank statement, and
          your signature. Your SIP mandate, UPI AutoPay or eNach details are
          held by the payment rail and your bank, not by us.
        </p>
        <p>
          <strong>Payment data.</strong> Card, UPI and netbanking details used
          for the TFB Deed fee, the discovery-call booking fee or well-wisher
          contributions are entered directly with our payment provider. We
          receive only the outcome of the payment plus a reference, never your
          full card number.
        </p>
        <p>
          <strong>Social media data.</strong> If you comment a keyword such as
          SEED, HARVEST or DEED on our Instagram or Facebook posts, or message
          us there, Meta Platforms shares your public username, your comment or
          message, and the platform identifiers we need to reply or to send you
          a direct message. We use this only to answer you and to follow up on
          the enquiry you started.
        </p>
        <p>
          <strong>Technical data.</strong> IP address, device and browser type,
          pages viewed, referring links and timestamps, collected through
          cookies and similar technologies. See &ldquo;Cookies and
          analytics&rdquo; below.
        </p>
      </LegalSection>

      <LegalSection heading="Why we use your data">
        <ul>
          <li>
            <strong>To provide the service.</strong> Open and operate your
            account, place and track mutual fund transactions, generate Academy
            progress, and process Deed paperwork.
          </li>
          <li>
            <strong>To meet legal obligations.</strong> KYC, anti-money
            laundering checks, tax reporting, and the record-keeping that
            applies to a registered mutual fund distributor.
          </li>
          <li>
            <strong>To take payments</strong> and reconcile fees you owe or
            contributions you make.
          </li>
          <li>
            <strong>To answer you,</strong> including replying to comments and
            direct messages on Instagram and Facebook.
          </li>
          <li>
            <strong>To keep the service safe and honest,</strong> including
            fraud prevention, security monitoring, and enforcing our terms.
          </li>
          <li>
            <strong>To tell you about TFB,</strong> where you have asked us to
            or where the law permits it. Every such message carries a way to
            opt out.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal data, and we do not use
          it for automated decision-making that produces legal effects about
          you.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          We share personal data only where it is needed for the purposes above,
          and only with parties bound to protect it. Depending on what you use,
          that can include:
        </p>
        <ul>
          <li>
            <strong>Our mutual fund transaction partner</strong> (Fintech
            Primitives / Cybrilla), which runs KYC, folio onboarding, mandates
            and order placement.
          </li>
          <li>
            <strong>Asset management companies and registrars and transfer
            agents,</strong> which hold your folio and process your
            transactions and any redemption.
          </li>
          <li>
            <strong>Banks and payment providers,</strong> including our
            payment gateway for non-mutual-fund money, and the UPI or netbanking
            rails used for your mandate.
          </li>
          <li>
            <strong>Document execution vendors</strong> used for e-stamping and
            e-signing, where a Deed is being executed.
          </li>
          <li>
            <strong>Meta Platforms</strong>, in respect of the Instagram and
            Facebook pages we operate, so that comments and messages can be
            delivered and answered.
          </li>
          <li>
            <strong>Service providers</strong> who host our website, send our
            email, SMS or WhatsApp messages, and run our analytics, under
            contracts that limit them to our instructions.
          </li>
          <li>
            <strong>Professional advisers</strong> such as our chartered
            accountant, auditors and legal counsel.
          </li>
          <li>
            <strong>Authorities,</strong> including AMFI, SEBI, the Income Tax
            Department and courts, where we are required by law to disclose, or
            where it is necessary to establish or defend a legal claim.
          </li>
        </ul>
        <p>
          If TFB is ever reorganised or its business transferred, personal data
          may move with it. We would tell you before that happened, and the same
          protections would continue to apply.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep personal data only as long as we need it, or as long as the
          law requires. Investment, KYC and transaction records are kept for the
          period prescribed for registered distributors and under anti-money
          laundering rules, which is up to eight years after the end of the
          relationship. Enquiries that never became an account &mdash; including
          Instagram and Facebook conversations &mdash; are kept for up to 24
          months and then deleted. Website analytics are kept in aggregated or
          de-identified form.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and analytics">
        <p>
          We use cookies that are necessary to run the site and, where you
          accept them, cookies that tell us how the site is used so we can
          improve it. You can block or clear cookies in your browser settings;
          the essential ones are needed for the site to work properly.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>Under the Digital Personal Data Protection Act, 2023, you can:</p>
        <ul>
          <li>ask for a summary of the personal data we hold about you;</li>
          <li>ask us to correct, complete or update it;</li>
          <li>ask us to erase it, where we are not required to keep it;</li>
          <li>withdraw a consent you gave, at any time;</li>
          <li>nominate someone to exercise your rights if you die or are incapacitated;</li>
          <li>complain to us, and to the Data Protection Board of India.</li>
        </ul>
        <p>
          Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with
          the subject line &ldquo;Data request&rdquo;. We will acknowledge it
          within seven days and complete the request within thirty days. Some
          rights are limited where we must keep records for legal reasons, and
          we will tell you if that is the case and why.
        </p>
      </LegalSection>

      <LegalSection id="data-deletion" heading="Deleting your data">
        <p>
          You can ask us to delete the personal data we hold about you at any
          time. Here is exactly how:
        </p>
        <ul>
          <li>
            <strong>Email us.</strong> Write to{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=Data%20deletion%20request`}>
              {CONTACT_EMAIL}
            </a>{" "}
            with the subject line &ldquo;Data deletion request&rdquo;. Tell us
            the email address, mobile number, or Instagram or Facebook username
            you used with us, so we can find your record.
          </li>
          <li>
            <strong>Or ask us on social.</strong> Send a direct message to{" "}
            <a
              href="https://instagram.com/trustfundbabyin"
              target="_blank"
              rel="noreferrer"
            >
              @trustfundbabyin
            </a>{" "}
            on Instagram or to our Facebook page saying you want your data
            deleted, and we will action it the same way.
          </li>
          <li>
            <strong>Revoke our access.</strong> To remove the permissions you
            granted us through Facebook or Instagram, go to your Facebook
            settings, then <em>Apps and websites</em>, then{" "}
            <em>Business integrations</em>, and remove Trust Fund Baby. You can
            also review and remove apps inside the Instagram app under{" "}
            <em>Settings &rarr; Website permissions &rarr; Apps and websites</em>.
          </li>
        </ul>
        <p>
          We confirm every deletion request within seven days and complete it
          within thirty days. We will delete or anonymise what we hold, except
          the records we are legally required to retain &mdash; for example a
          folio you still hold, a transaction we must report, or records we must
          keep under anti-money laundering rules. If you are still an investor
          with us, deleting everything would mean we could no longer operate
          your account; we will tell you that before we act, and you can choose
          to close the account instead.
        </p>
      </LegalSection>

      <LegalSection heading="Children's data">
        <p>
          A TFB account is opened and controlled by a parent or legal guardian.
          We do not create accounts for minors and we do not accept personal
          data directly from a child. Where a Deed names a child as beneficiary,
          we hold the child&rsquo;s name and date of birth because the trust
          requires it, and we hold it for the duration of the Deed.
        </p>
      </LegalSection>

      <LegalSection heading="Keeping data safe">
        <p>
          We use encryption in transit, access controls, and vendors that hold
          industry certifications to protect your data. No system is
          perfectly secure, so if a breach ever affects your data we will tell
          you and the Data Protection Board of India as the law requires.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If we change how we handle personal data we will update this page and
          move the &ldquo;last updated&rdquo; date. Material changes will be
          notified to account holders by email before they take effect.
        </p>
      </LegalSection>

      <LegalSection heading="Contact and grievance officer">
        <p>
          For any question about this policy, or a complaint about how we have
          handled your data, contact our Grievance Officer:
        </p>
        <p>
          <strong>Grievance Officer, TFB EduVest LLP</strong>
          <br />
          1901/1902 Sahyadri Tower, Upper Govind Nagar, Malad East, Mumbai
          400097
          <br />
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          We aim to resolve every complaint within thirty days. If you are not
          satisfied, you can escalate to the Data Protection Board of India, and
          for matters relating to your mutual fund folio, to AMFI or SEBI.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

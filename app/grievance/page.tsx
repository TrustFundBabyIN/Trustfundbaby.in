import type { Metadata } from "next";

import { LegalSection, LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Grievance redressal",
  description:
    "How to raise a complaint with Trust Fund Baby (TFB EduVest LLP) and escalate it to SEBI SCORES or AMFI, including the named grievance officer and response timelines.",
};

const GRIEVANCE_OFFICER = "Sanchit Kedia";
const EMAIL = "sanchit@trustfundbaby.in";
const PHONE = "+91 98190 10129";
const ADDRESS =
  "1901/1902 Sahyadri Tower, Upper Govind Nagar, Malad East, Mumbai 400097, Maharashtra, India";

export default function GrievancePage() {
  return (
    <LegalShell
      title="Grievance redressal"
      updated="2 October 2026"
      intro="If something has gone wrong, we want to hear about it directly. This page explains who to contact, how long we take, and how to escalate if we do not resolve it to your satisfaction."
    >
      <LegalSection heading="Grievance officer">
        <ul>
          <li>
            <strong>Name:</strong> {GRIEVANCE_OFFICER}
          </li>
          <li>
            <strong>Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            <strong>Phone:</strong> {PHONE}
          </li>
          <li>
            <strong>Address:</strong> {ADDRESS}
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How to raise a complaint">
        <p>
          Email the grievance officer with a clear description of the issue.
          Please include your name, contact details, any account or folio
          reference, and dates if you have them. If you would rather speak to
          someone, call the number above during business hours.
        </p>
      </LegalSection>

      <LegalSection heading="What happens next">
        <ul>
          <li>
            We acknowledge every complaint within <strong>2 working days</strong>
            .
          </li>
          <li>
            We aim to resolve it within <strong>30 days</strong> of receipt. If
            we need longer, we will tell you why and keep you updated.
          </li>
          <li>
            Every complaint is recorded, and the record is available to you on
            request.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="If you are not satisfied">
        <p>
          If we do not resolve your complaint within 30 days, or you are not
          satisfied with the outcome, you can escalate it:
        </p>
        <ul>
          <li>
            <strong>SEBI SCORES</strong> — the online complaint system of the
            Securities and Exchange Board of India, at{" "}
            <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer">
              scores.sebi.gov.in
            </a>
            .
          </li>
          <li>
            <strong>AMFI</strong> — the Association of Mutual Funds in India,
            for complaints relating to a mutual fund distributor, at{" "}
            <a href="https://www.amfiindia.com" target="_blank" rel="noreferrer">
              amfiindia.com
            </a>
            .
          </li>
          <li>
            <strong>AMC grievance redressal</strong> — every asset management
            company has its own grievance officer, whose details appear on the
            scheme documents and the AMC website.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Our registration">
        <p>
          TFB EduVest LLP is an AMFI-registered mutual fund distributor. Our
          registration number is <strong>ARN-368678</strong>. You can verify it
          on the AMFI website.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

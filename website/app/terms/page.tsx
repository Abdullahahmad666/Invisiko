import Link from "next/link";
import { EmailLink } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

/*
 * No terms of service exist yet, and the app's sign-up flow already references them
 * (PRODUCT_BLUEPRINT.md §9.10, §14 Q6). Terms must be written and legally reviewed by a person —
 * they are deliberately not drafted here. Until they exist this page says so plainly and is kept
 * out of search results. [[TERMS]]
 */

export const metadata = pageMetadata("/terms");

export default function TermsPage() {
  return (
    <>
      <PageHero path="/terms" eyebrow="Legal" title="Terms of service" lead="Being finalised." />
      <Section tone="light" labelledBy="terms-status">
        <Prose>
          <h2 id="terms-status" className="!mt-0">
            Not published yet
          </h2>
          <p>
            Invisiko&apos;s terms of service are being prepared and will be published here, with the date they take
            effect.
          </p>
          <p>
            If you have a question about the terms in the meantime, email <EmailLink address={site.contactEmail} />. For how
            data is handled, see the <Link href="/privacy">privacy page</Link>.
          </p>
        </Prose>
      </Section>
    </>
  );
}

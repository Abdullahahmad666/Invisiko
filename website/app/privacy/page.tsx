import { EmailLink, ExternalLink, Fill } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { DraftNotice, Prose } from "@/components/Prose";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/privacy");

/*
 * Canonical decision (PRODUCT_BLUEPRINT.md §9.10, option a): the app's own privacy policy, served
 * by the product and dated 8 October 2026, stays canonical. This page covers the website itself
 * and summarises the app's policy without contradicting it — it must be updated whenever that
 * policy changes, and legally reviewed (not by an AI) before launch.
 */

const LAST_UPDATED = "19 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero path="/privacy" eyebrow="Legal" title="Privacy" lead={`Last updated ${LAST_UPDATED}.`} />

      <Section tone="light" labelledBy="privacy-website">
        <DraftNotice>
          This page has not yet been reviewed by a lawyer. It will be before the site launches.
        </DraftNotice>
        <Prose>
          <p>
            This page covers two things: what happens to the details you send us through this website, and a summary of
            how the Invisiko app handles data. The app&apos;s full privacy policy is the one that applies to the app:{" "}
            <ExternalLink href={site.appPrivacyUrl}>read the Invisiko app privacy policy</ExternalLink>.
          </p>

          <h2 id="privacy-website">This website</h2>
          <p>
            This website is run by <Fill value={site.legalName} />. It is separate from the Invisiko app: it has no access
            to the app or to any restaurant&apos;s data.
          </p>
          <h3>What we collect</h3>
          <p>If you request access, the form asks for:</p>
          <ul>
            <li>your name and email address</li>
            <li>your restaurant&apos;s name</li>
            <li>optionally, how many staff you have and what is hardest for you right now</li>
          </ul>
          <h3>What we do with it</h3>
          <p>
            We use it only to reply to your request. It is sent to us as an email through our email delivery provider,
            Resend, and is not stored in a database by this website. We do not add you to a mailing list, and we do not sell
            or share your details.
          </p>
          <h3>Cookies and analytics</h3>
          <p>
            This website sets no cookies and runs no analytics or advertising trackers. If that changes, this page will say
            so first.
          </p>
          <h3>Your rights</h3>
          <p>
            You can ask what we hold about you, ask us to correct it, or ask us to delete it, by emailing{" "}
            <EmailLink address={site.privacyEmail} />.
          </p>

          <h2 id="privacy-app">The Invisiko app, in summary</h2>
          <p>
            This is a plain-English summary. The app&apos;s{" "}
            <ExternalLink href={site.appPrivacyUrl}>full privacy policy</ExternalLink> is the authoritative version.
          </p>
          <ul>
            <li>
              <strong className="text-fg">Your restaurant controls the account and the data.</strong> Invisiko provides
              the app and the infrastructure it runs on.
            </li>
            <li>
              <strong className="text-fg">Location is read once</strong>, when someone checks in or out, and is never
              tracked continuously.
            </li>
            <li>
              <strong className="text-fg">Invoice photos are sent to OpenAI to be read.</strong> What is read is always a
              draft that a person reviews.
            </li>
            <li>
              <strong className="text-fg">Personal data is not sold</strong> and is not used for advertising.
            </li>
            <li>
              <strong className="text-fg">Records are kept after an account is deactivated</strong>, as employment
              records.
            </li>
            <li>
              <strong className="text-fg">Sub-processors:</strong> Render (hosting), Neon (database), Amazon Web Services
              S3 (uploaded files) and OpenAI (invoice reading).
            </li>
          </ul>

          <h2 id="privacy-contact">Contact</h2>
          <p>
            For anything about privacy — on this website or in the app — email <EmailLink address={site.privacyEmail} />.
          </p>
        </Prose>
      </Section>
    </>
  );
}

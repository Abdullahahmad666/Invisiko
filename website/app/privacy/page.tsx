import Link from "next/link";
import { EmailLink } from "@/components/Fill";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { Section } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/privacy");

/*
 * The canonical privacy policy for the Invisiko app and this website. The app's text is the owner's
 * (dated 7 November 2026); the "This website" section is added here, so the page carries the later
 * date. If the app's policy changes, change it here — the app should link to this page.
 */

const LAST_UPDATED = "8 November 2026";

const sections = [
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-its-used", label: "Use" },
  { id: "invoice-photos-and-ai", label: "AI" },
  { id: "who-we-share-with", label: "Sharing" },
  { id: "how-long-we-keep-it", label: "Keeping" },
  { id: "your-rights", label: "Rights" },
  { id: "deleting-your-account", label: "Deleting" },
  { id: "this-website", label: "This website" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        path="/privacy"
        eyebrow="Legal"
        title="Privacy policy"
        lead={`Last updated ${LAST_UPDATED}. Covers the Invisiko app and this website.`}
      />

      <SectionNav items={sections} />

      <Section tone="light" labelledBy="what-we-collect">
        <Prose>
          <p>
            Invisiko (&ldquo;the app&rdquo;) is a staff management app used by a restaurant or takeaway (&ldquo;the
            business&rdquo;) to run attendance, payroll, food-safety compliance and stock management for its own
            employees. This policy explains what personal data the app collects, why, and how it is handled.
          </p>
          <p>
            The business you work for (or that employs your staff, if you are a manager) controls the account and decides
            who is invited to use it. Invisiko provides the app and the infrastructure it runs on.
          </p>

          <h2 id="what-we-collect">What we collect</h2>
          <ul>
            <li>
              <strong className="text-fg">Account details</strong> — name, email address, phone number, and your role
              (staff or manager).
            </li>
            <li>
              <strong className="text-fg">Location</strong> — your device&apos;s GPS position is read once, at the moment
              you check in or out of a shift, to confirm you were at the venue. It is not tracked continuously or
              collected at any other time.
            </li>
            <li>
              <strong className="text-fg">Attendance and schedule</strong> — clock-in and clock-out times, rota shifts,
              and shift-swap requests.
            </li>
            <li>
              <strong className="text-fg">Pay information</strong> — hourly rates and calculated pay, visible to you and
              to managers at your restaurant.
            </li>
            <li>
              <strong className="text-fg">Photos you upload</strong> — fridge and freezer photos, food-safety checklist
              records, and supplier invoice photos, used only for the compliance and stock features you choose to use.
            </li>
            <li>
              <strong className="text-fg">Profile picture</strong> — optional, set by you.
            </li>
          </ul>

          <h2 id="how-its-used">How it&apos;s used</h2>
          <p>
            Data is used only to operate the app&apos;s own features for your employer: recording attendance,
            calculating pay, running food-safety checks, and tracking stock and invoices. We do not sell personal data,
            and we do not use it for advertising.
          </p>

          <h2 id="invoice-photos-and-ai">Invoice photos and AI</h2>
          <p>
            When a manager or staff member photographs a supplier invoice, the photo is sent to a third-party AI service
            (OpenAI) to read the items, quantities and prices off it automatically. That reading is always a draft — a
            person reviews and corrects it before anything is saved to stock records.
          </p>

          <h2 id="who-we-share-with">Who we share data with</h2>
          <p>
            We use a small number of service providers to run the app. None of them use your data for their own purposes
            — they process it only to provide their service to us:
          </p>
          <ul>
            <li>
              <strong className="text-fg">Render</strong> — hosts the backend application.
            </li>
            <li>
              <strong className="text-fg">Neon</strong> — hosts the database.
            </li>
            <li>
              <strong className="text-fg">Amazon Web Services (S3)</strong> — stores uploaded photos.
            </li>
            <li>
              <strong className="text-fg">OpenAI</strong> — reads invoice photos, as described above.
            </li>
          </ul>

          <h2 id="how-long-we-keep-it">How long we keep it</h2>
          <p>
            Data is kept for as long as your account is active with your employer&apos;s restaurant. If a manager
            deactivates your account, your historical attendance and payroll records are retained for the business&apos;s
            own record-keeping (standard practice for employment records), but your account can no longer sign in.
          </p>

          <h2 id="your-rights">Your rights</h2>
          <p>
            You can ask your manager (who controls the account) or contact us directly to access, correct, or request
            deletion of your personal data, subject to the business&apos;s own legal obligations to retain employment
            records.
          </p>

          <h2 id="deleting-your-account">Deleting your account</h2>
          <p>
            You can delete your account yourself, from inside the app: open <strong className="text-fg">Profile</strong>{" "}
            and choose <strong className="text-fg">Delete my account</strong>. You will be asked for your password to
            confirm. It is permanent and cannot be undone.
          </p>
          <p>
            Your email address, phone number, profile photo and password are destroyed, every signed-in session ends, and
            you will not be able to sign in again.
          </p>
          <p>
            What stays, and why: the hours you worked and the food-safety checks you recorded remain on your
            restaurant&apos;s record, <em>under your name</em>, marked as a former member. Those are your employer&apos;s
            employment records, which the law requires them to keep for a period after you leave — HMRC requires payroll
            records to be kept for three years, and requires the employee they belong to to be identifiable. Your employer
            has to be able to say whose hours and whose pay those were, so the name on them is not ours to remove on
            request. Everything that made the record an <em>account</em> is gone.
          </p>
          <p>
            If your account has no such records against it, nothing is kept at all — the account, and your name with it,
            is erased outright.
          </p>
          <p>
            If you are the only manager of a restaurant, deleting your account also permanently deletes that restaurant,
            its staff accounts, and all of its attendance, payroll and food-safety records. The app tells you this first
            and asks you to type the restaurant&apos;s name to confirm.
          </p>

          <h2 id="children">Children</h2>
          <p>Invisiko is a workplace tool and is not intended for use by children.</p>

          <h2 id="this-website">This website</h2>
          <p>
            This website, invisiko.app, tells people about Invisiko and lets them request access. It is separate from the
            app: it has no access to the app or to any restaurant&apos;s data.
          </p>
          <ul>
            <li>
              <strong className="text-fg">Requesting access</strong> — the{" "}
              <Link href="/contact">request-access form</Link> asks for your name, email address and restaurant name, and
              optionally how many staff you have and what is hardest for you right now. We use these details only to reply
              to you. They reach us by email through our email provider, Resend, and the website does not store them in a
              database. We do not add you to a mailing list, and we do not sell or share your details.
            </li>
            <li>
              <strong className="text-fg">Cookies and analytics</strong> — this website sets no cookies and runs no
              analytics or advertising trackers. If that changes, this page will say so first.
            </li>
            <li>
              <strong className="text-fg">Hosting</strong> — our hosting provider serves the pages and may keep short-lived
              technical logs, such as IP addresses, to keep the site running securely.
            </li>
          </ul>
          <p>You have the same rights over anything you send through this website as over data in the app.</p>

          <h2 id="changes">Changes to this policy</h2>
          <p>If this policy changes, the date at the top of this page will be updated.</p>

          <h2 id="contact">Contact</h2>
          <p>
            Questions about this policy or your data: <EmailLink address={site.privacyEmail} className="text-fg" />.
          </p>
        </Prose>
      </Section>
    </>
  );
}

import { footerColumns, primaryCta, site } from "@/content/site";
import { ButtonLink } from "./Button";
import { EmailLink, Fill } from "./Fill";
import { FooterLink } from "./FooterLink";
import { Logo } from "./Logo";
import { StoreBadges } from "./StoreBadges";

export function Footer() {
  return (
    <footer className="tone-dark border-t border-line">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {footerColumns.map((column) => (
              <li key={column.title}>
                <h2 className="label-caps text-muted">{column.title}</h2>
                <ul className="mt-4 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[28rem]">
            <Logo />
            <p className="mt-3 text-[0.9375rem] text-muted">
              The back of house for independent takeaways and small restaurants — staff hours, food-safety records, pay
              and delivery invoices, on one phone.
            </p>
            <p className="mt-2 text-sm text-muted">App screens shown on this site use demo data for a fictional restaurant.</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <ButtonLink href={primaryCta.href} block>
              {primaryCta.label}
            </ButtonLink>
            <StoreBadges />
            <p className="text-[0.9375rem] text-muted">
              Questions? <EmailLink address={site.contactEmail} className="text-fg" />
            </p>
            <p className="text-sm text-muted">
              © {site.copyrightYear} <Fill value={site.legalName} /> · {site.location.locality}, {site.location.country}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

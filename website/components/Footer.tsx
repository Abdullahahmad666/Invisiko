import Link from "next/link";
import { footerColumns, site } from "@/content/site";
import { Fill } from "./Fill";
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
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-[0.9375rem] text-fg/90 hover:text-accent-text sm:min-h-9"
                      >
                        {link.label}
                      </Link>
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
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <StoreBadges />
            <p className="text-sm text-muted">
              © {site.copyrightYear} <Fill value={site.legalName} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

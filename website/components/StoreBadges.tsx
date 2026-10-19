import { IoLogoApple, IoLogoGooglePlaystore } from "react-icons/io5";
import { isPlaceholder, site } from "@/content/site";

/**
 * App-store links render only once the apps are listed (§9 footer; §14 Q10). Until both URLs are
 * real, nothing is shown — a badge that goes nowhere would be a control pretending to work.
 */
export function StoreBadges() {
  const stores = [
    { href: site.appStoreUrl, label: "Download on the App Store", Icon: IoLogoApple },
    { href: site.playStoreUrl, label: "Get it on Google Play", Icon: IoLogoGooglePlaystore },
  ].filter((store) => !isPlaceholder(store.href));

  if (stores.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {stores.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold hover:border-fg"
          >
            <Icon aria-hidden="true" className="size-5" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

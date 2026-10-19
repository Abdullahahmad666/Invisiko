import Link from "next/link";
import { breadcrumbTrail, type PagePath } from "@/content/pages";

/**
 * The visible breadcrumb trail. Rendered alongside BreadcrumbList structured data built from the
 * same registry, so the markup always describes what the visitor can see (§12).
 */
export function Breadcrumbs({ path }: { path: PagePath }) {
  const trail = breadcrumbTrail(path);
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {trail.map((page, index) => {
          const current = index === trail.length - 1;
          return (
            <li key={page.path} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
              ) : null}
              {current ? (
                <span aria-current="page" className="text-fg/90">
                  {page.name}
                </span>
              ) : (
                <Link href={page.path} className="inline-flex min-h-6 items-center hover:text-fg hover:underline">
                  {page.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

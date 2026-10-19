import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Invisiko" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="That page isn't here."
      lead="It may have moved, or the link may be wrong. These will get you back on track."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" block>
          Go to the home page
        </ButtonLink>
        <ButtonLink href="/features" variant="secondary" block>
          See the features
        </ButtonLink>
      </div>
    </PageHero>
  );
}

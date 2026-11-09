import type { CSSProperties } from "react";
import { IoMailOutline } from "react-icons/io5";
import { site } from "@/content/site";
import { ButtonLink } from "./Button";
import { EmailLink, Fill } from "./Fill";

/**
 * Sits beside a short list of questions: where to go when yours isn't on it. Every question section
 * then ends with a next step, not a dead end.
 */
export function AskUsCard({ allQuestions = true }: { allQuestions?: boolean }) {
  return (
    <div className="space-y-6 lg:mt-8">
      <div className="lift rounded-2xl border border-line bg-surface p-6" data-reveal style={{ "--stagger": 1 } as CSSProperties}>
        <span className="grid size-10 place-items-center rounded-xl bg-amber text-ink">
          <IoMailOutline aria-hidden="true" className="size-5" />
        </span>
        <p className="mt-4 font-semibold">Not on the list?</p>
        <p className="mt-1.5 text-muted">
          Email <EmailLink address={site.contactEmail} className="text-fg" />. A person replies within{" "}
          <Fill value={site.replyTime} />.
        </p>
      </div>
      {allQuestions ? (
        <div data-reveal style={{ "--stagger": 2 } as CSSProperties}>
          <ButtonLink href="/faq" variant="text" arrow>
            All questions
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}

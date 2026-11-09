import type { ReactNode } from "react";
import { Fill } from "@/components/Fill";
import { site } from "./site";

/** What happens after someone requests access. Shown on /contact and in every closing CTA band. */
export const nextSteps: { title: string; body: ReactNode }[] = [
  { title: "A person reads it", body: "Not an automated system — someone who will actually reply." },
  {
    title: "We reply by email",
    body: (
      <>
        Within <Fill value={site.replyTime} />, to the address you give us.
      </>
    ),
  },
  { title: "Access isn't instant", body: "We'll reply first, answer your questions, and take it from there." },
];

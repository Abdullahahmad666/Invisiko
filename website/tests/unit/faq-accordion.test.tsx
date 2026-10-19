import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqsById } from "@/content/faq";

const items = faqsById(["till", "offline"]);

describe("FaqAccordion", () => {
  it("renders each question as a collapsed button", () => {
    render(<FaqAccordion items={items} />);
    for (const item of items) {
      const button = screen.getByRole("button", { name: item.question });
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("opens with the keyboard and exposes the answer as a labelled region", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    await user.tab();
    const first = screen.getByRole("button", { name: items[0].question });
    expect(first).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(first).toHaveAttribute("aria-expanded", "true");
    const region = screen.getByRole("region", { name: items[0].question });
    expect(region).toHaveTextContent(items[0].answer[0]);

    await user.keyboard(" ");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps the honest negative answers", () => {
    const [till, offline] = items;
    expect(till.answer[0]).toMatch(/^No\./);
    expect(offline.answer[0]).toMatch(/^Not today\./);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/ContactForm";

async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Name/), "Sam Patel");
  await user.type(screen.getByLabelText(/^Email/), "sam@example.co.uk");
  await user.type(screen.getByLabelText(/^Restaurant name/), "The Clay Oven");
  await user.click(screen.getByRole("checkbox"));
}

afterEach(() => vi.unstubAllGlobals());

describe("ContactForm", () => {
  it("starts with consent unticked", () => {
    render(<ContactForm />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("shows inline errors tied to their fields and focuses the first one", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Request access" }));

    const name = screen.getByLabelText(/^Name/);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Enter your name.");
    expect(name).toHaveFocus();
  });

  it("keeps every typed value when sending fails, and offers another route", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillRequired(user);
    await user.type(screen.getByLabelText(/hardest/i), "The fridge log");
    await user.click(screen.getByRole("button", { name: "Request access" }));

    expect(await screen.findByText(/didn.t send/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Sam Patel");
    expect(screen.getByLabelText(/^Email/)).toHaveValue("sam@example.co.uk");
    expect(screen.getByLabelText(/hardest/i)).toHaveValue("The fridge log");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("disables submit while sending, then says what happens next", async () => {
    let resolve!: (response: Response) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>((r) => (resolve = r))));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: "Request access" }));

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    expect(await screen.findByText(/we have your request/)).toBeInTheDocument();
    expect(screen.getByText(/A person will read it/)).toBeInTheDocument();
  });
});

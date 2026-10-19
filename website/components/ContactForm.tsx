"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";
import { site } from "@/content/site";
import {
  emptyContactInput,
  limits,
  staffSizes,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
} from "@/lib/contact";
import { EmailLink, Fill } from "./Fill";

type Status = "idle" | "sending" | "sent" | "failed";

const fieldOrder: ContactField[] = ["name", "email", "restaurant", "staffSize", "hardest", "consent"];

const inputClass =
  "block min-h-12 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/80 aria-[invalid=true]:border-danger-ink aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-danger-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.9375rem] font-semibold text-danger-ink">
      <IoAlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

function Label({ htmlFor, children, optional = false }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-semibold">
      {children}
      {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : null}
    </label>
  );
}

/**
 * Request access (§9.8). Validates inline, disables submit while sending, says what happens
 * next on success, and on failure keeps every typed value and offers an email address instead.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(emptyContactInput);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first attempt, re-check as the visitor corrects things.
    if (submitted) setErrors(validateContact(next));
    if (status === "failed") setStatus("idle");
  }

  function focusFirstError(found: ContactErrors) {
    const first = fieldOrder.find((field) => found[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setSubmitted(true);

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setStatus("sent");
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }
      if (response.status === 422) {
        const data = (await response.json().catch(() => null)) as { errors?: ContactErrors } | null;
        if (data?.errors) {
          setErrors(data.errors);
          setStatus("idle");
          focusFirstError(data.errors);
          return;
        }
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-line bg-surface p-6 outline-none sm:p-8"
      >
        <IoCheckmarkCircle aria-hidden="true" className="size-8 text-[#1F8A57]" />
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.01em]">Thanks — we have your request.</h2>
        <p className="mt-3 text-muted">
          A person will read it and reply to <strong className="text-fg">{values.email.trim()}</strong> within{" "}
          <Fill value={site.replyTime} />. Access isn&apos;t instant: we&apos;ll reply first, and take it from there.
        </p>
        <p className="mt-6">
          <Link href="/features" className="font-semibold text-accent-text underline underline-offset-4">
            Read about the features while you wait
          </Link>
        </p>
      </div>
    );
  }

  const describedBy = (field: ContactField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby="form-note">
      <p id="form-note" className="text-[0.9375rem] text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">
            Name <span aria-hidden="true">*</span>
          </Label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={limits.name}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="email">
            Email <span aria-hidden="true">*</span>
          </Label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={limits.email}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="restaurant">
            Restaurant name <span aria-hidden="true">*</span>
          </Label>
          <input
            id="restaurant"
            name="restaurant"
            type="text"
            autoComplete="organization"
            required
            maxLength={limits.restaurant}
            value={values.restaurant}
            onChange={(event) => update("restaurant", event.target.value)}
            aria-invalid={Boolean(errors.restaurant)}
            aria-describedby={describedBy("restaurant")}
            className={inputClass}
          />
          <FieldError id="restaurant-error" message={errors.restaurant} />
        </div>

        <div>
          <Label htmlFor="staffSize" optional>
            Number of staff
          </Label>
          <select
            id="staffSize"
            name="staffSize"
            value={values.staffSize}
            onChange={(event) => update("staffSize", event.target.value as ContactInput["staffSize"])}
            aria-invalid={Boolean(errors.staffSize)}
            aria-describedby={describedBy("staffSize")}
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2355555C%22><path d=%22M5.5 7.5 10 12l4.5-4.5%22 stroke=%22%2355555C%22 stroke-width=%221.8%22 fill=%22none%22 stroke-linecap=%22round%22/></svg>')] bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Choose…</option>
            {staffSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <FieldError id="staffSize-error" message={errors.staffSize} />
        </div>
      </div>

      <div>
        <Label htmlFor="hardest" optional>
          What&apos;s hardest right now?
        </Label>
        <p id="hardest-hint" className="-mt-1 mb-2 text-[0.9375rem] text-muted">
          The rota, the checks, pay, deliveries — whatever eats your evenings.
        </p>
        <textarea
          id="hardest"
          name="hardest"
          rows={5}
          maxLength={limits.hardest}
          value={values.hardest}
          onChange={(event) => update("hardest", event.target.value)}
          aria-invalid={Boolean(errors.hardest)}
          aria-describedby={describedBy("hardest", "hardest-hint")}
          className={`${inputClass} resize-y`}
        />
        <FieldError id="hardest-error" message={errors.hardest} />
      </div>

      {/* Honeypot: off-screen, unlabelled for assistive tech, skipped by keyboard. Real people never see it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div>
        {/* Unticked by default (§9.8 I). */}
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-6 shrink-0 cursor-pointer accent-[#0B0B0D]"
          />
          <label htmlFor="consent" className="cursor-pointer">
            You can use these details to reply to my request. <span aria-hidden="true">*</span>{" "}
            <span className="text-muted">
              See the{" "}
              <Link href="/privacy" className="font-semibold text-fg underline underline-offset-4">
                privacy notice
              </Link>
              .
            </span>
          </label>
        </div>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <div aria-live="polite" role="status">
        {status === "failed" ? (
          <div className="flex gap-3 rounded-2xl border border-danger-ink/40 bg-[#FDECEA] p-5 text-[#3B0A06]">
            <IoAlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger-ink" />
            <p>
              <strong className="font-semibold">Your request didn&apos;t send.</strong> Everything you typed is still
              here — try again, or email us at <EmailLink address={site.contactEmail} />.
            </p>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber px-8 text-base font-semibold text-ink transition-colors duration-200 hover:bg-amber-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Request access"}
      </button>
    </form>
  );
}

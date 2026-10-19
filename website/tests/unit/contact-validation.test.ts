import { describe, expect, it } from "vitest";
import { emptyContactInput, parseContactInput, validateContact, type ContactInput } from "@/lib/contact";

const valid: ContactInput = {
  ...emptyContactInput(),
  name: "Sam Patel",
  email: "sam@example.co.uk",
  restaurant: "The Clay Oven",
  consent: true,
};

describe("validateContact", () => {
  it("accepts the required fields alone", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires name, email, restaurant and consent", () => {
    const errors = validateContact(emptyContactInput());
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "name", "restaurant"]);
  });

  it("rejects a malformed email address", () => {
    expect(validateContact({ ...valid, email: "sam@" }).email).toBeDefined();
    expect(validateContact({ ...valid, email: "sam example.com" }).email).toBeDefined();
  });

  it("treats whitespace-only values as empty", () => {
    expect(validateContact({ ...valid, name: "   " }).name).toBeDefined();
  });

  it("only allows the listed staff sizes", () => {
    expect(validateContact({ ...valid, staffSize: "6–15" })).toEqual({});
    expect(validateContact({ ...valid, staffSize: "lots" as ContactInput["staffSize"] }).staffSize).toBeDefined();
  });

  it("does not require consent to be anything but an explicit tick", () => {
    expect(validateContact({ ...valid, consent: false }).consent).toBeDefined();
  });
});

describe("parseContactInput", () => {
  it("never trusts field types from untrusted JSON", () => {
    const parsed = parseContactInput({ name: 42, email: ["x"], consent: "true", website: null });
    expect(parsed).toEqual({ ...emptyContactInput() });
  });

  it("only accepts consent as the boolean true", () => {
    expect(parseContactInput({ consent: true }).consent).toBe(true);
    expect(parseContactInput({ consent: 1 }).consent).toBe(false);
  });
});

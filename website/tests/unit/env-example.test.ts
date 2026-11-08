import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * .env.example is committed and public. Secrets belong in .env.local (gitignored) and in the
 * hosting provider's settings — never here. This fails the tests if one is pasted in by mistake.
 */
const SECRET_KEYS = ["SMTP_PASS", "RESEND_API_KEY"];

describe(".env.example", () => {
  const lines = readFileSync(join(__dirname, "..", "..", ".env.example"), "utf8").split(/\r?\n/);

  it.each(SECRET_KEYS)("leaves %s empty", (key) => {
    const line = lines.find((entry) => entry.startsWith(`${key}=`));
    expect(line?.slice(key.length + 1).trim() ?? "", `${key} must stay empty in the committed template`).toBe("");
  });
});

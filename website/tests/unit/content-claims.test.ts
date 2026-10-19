import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guards against the claims PRODUCT_BLUEPRINT.md §7 forbids. Scans every page, section, component
 * and content file for wording that would describe something the product does not do, or a
 * guarantee nobody has given.
 */

const root = join(__dirname, "..", "..");
const scanned = ["app", "components", "sections", "content"];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(tsx?|mdx?)$/.test(entry) ? [path] : [];
  });
}

const sources = scanned.flatMap((dir) => files(join(root, dir))).map((path) => ({
  path,
  // Ignore comments: they explain the rules, and so name the forbidden words.
  text: readFileSync(path, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'])\/\/.*$/gm, "$1"),
}));

const forbidden: [RegExp, string][] = [
  [/tamper[- ]?proof/i, "position check is not tamper-proof (§7)"],
  [/fraud[- ]?proof|anti[- ]?fraud/i, "no anti-fraud claim (§9.4)"],
  [/proof of (attendance|presence)/i, "not proof of presence (§2 B1)"],
  [/biometric|facial recognition|fingerprint (scan|login)/i, "no biometrics exist (§9.4)"],
  [/\b(HACCP|SFBB|EHO)\b|safer food better business/i, "no compliance-scheme wording without owner sign-off (§9.5)"],
  [/GDPR[- ]compliant|certified/i, "no certification claims (§7)"],
  [/\bNI\b|national insurance|\bcash\b|20[- ]hour/i, "payroll model must not be described (§7, §14 Q12)"],
  [/works offline|offline mode (is|works)|without (a|an internet) connection/i, "no offline use (§2)"],
  [/multi[- ]site support|manage (all )?your (sites|locations)/i, "no multi-site (§2)"],
  [/corrective action(s)? (are|is) (logged|tracked|required)/i, "corrective actions are not built (§2 C6)"],
  [/shift reminders?/i, "shift reminders are unscheduled (§2 F)"],
  [/sign in with google|google sign[- ]in/i, "Google sign-in is not reachable (§2 A3)"],
  [/\d+\s?% (accurate|accuracy)|accuracy of \d+/i, "no accuracy percentages (§9.3)"],
  [/trusted by|used by \d+|testimonial/i, "no social proof exists (§10)"],
  [/free trial|start (your )?trial/i, "no trial exists (§11)"],
  [/\b(our|the|your) web dashboard\b/i, "there is no web dashboard (§9.6)"],
];

describe("website copy", () => {
  it.each(forbidden)("never says %s", (pattern, reason) => {
    const hits = sources.filter((source) => pattern.test(source.text)).map((source) => source.path);
    expect(hits, reason).toEqual([]);
  });
});

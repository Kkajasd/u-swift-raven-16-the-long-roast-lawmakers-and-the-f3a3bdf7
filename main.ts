// The Long Roast: Lawmakers and the File They Cannot Convert.
// Writes one satirical sentence (1-320 chars) to /output/entry.txt.
// Node 22+, no dependencies. Run: node main.ts
import { mkdirSync, writeFileSync } from "node:fs";

const ROAST =
  "They will write four hundred pages of law to regulate AI, crypto, and the internet, but ask them to convert a Word document to PDF and suddenly the hearing needs a recess, an IT intern, and a printed copy with the problem circled in pen.";

// Gate: UTF-8 text, 1-320 chars, not only whitespace, exactly one line.
// The file holds the sentence and nothing else (no trailing newline).
const chars = [...ROAST].length;
if (chars < 1 || chars > 320 || !ROAST.trim() || ROAST.includes("\n")) {
  throw new Error(`invalid roast: ${chars} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST, "utf8");
console.log(`wrote ${chars} chars to /output/entry.txt`);

// Revision note: the roast above is a fixed literal, chosen once for
// determinism — no randomness, no environment input, no clock, and no I/O
// feeds into it, so every run writes the same bytes to /output/entry.txt.
// The check below pins the sealed gate to the run itself: the file must hold
// a single line of 1-320 characters, not only whitespace, with no trailing
// newline. It fails loudly instead of silently leaving an invalid entry.
void (async () => {
  const { readFileSync } = await import("node:fs");
  const written = readFileSync("/output/entry.txt", "utf8");
  if (
    written.length < 1 ||
    written.length > 320 ||
    written.includes("\n") ||
    written.trim().length === 0
  ) {
    throw new Error(
      `entry.txt failed post-write validation: ${written.length} chars, single line 1-320 expected`,
    );
  }
})();

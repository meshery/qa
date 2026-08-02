#!/usr/bin/env bash
#
# Bound the Allure trend history file so it can never cross GitHub's 100 MB
# per-file push limit (which previously broke every "Publish Report to GitHub
# Pages" run once history.jsonl reached ~101 MB).
#
# history.jsonl is JSONL: one run snapshot per line, oldest line first, each
# snapshot carrying the full knownTestCaseIds set - so it grows both per run and
# per test. `allure generate` (historyPath: ./history.jsonl in allurerc.mjs)
# reads it to seed the trend and rewrites it with the current run appended.
#
# This script keeps only the most recent runs, bounded by BOTH a run count and a
# hard byte budget, and is run on BOTH sides of `make report-build`:
#   - before: the report is generated from an already-bounded seed
#   - after:  the file committed back to the repo (the one that gets pushed) is
#             bounded regardless of the run appended during generation
#
# Tunable via env (with safe defaults):
#   HISTORY_MAX_RUNS  - max run snapshots (lines) to retain             [25]
#   HISTORY_MAX_BYTES - hard byte ceiling, strictly enforced; drop oldest
#                       lines until under it, and if even a single snapshot
#                       still exceeds it, reset to a fresh history rather than
#                       commit an over-budget file                      [90 MiB]
#
# HISTORY_MAX_BYTES is a strict maximum: the file written back is always at or
# below it (well under GitHub's 100 MB per-file limit). Default leaves headroom.
#
# Usage: cap-history.sh [path-to-history.jsonl]   (default: history.jsonl)

set -euo pipefail

HIST="${1:-history.jsonl}"
MAX_RUNS="${HISTORY_MAX_RUNS:-25}"
MAX_BYTES="${HISTORY_MAX_BYTES:-$((90 * 1024 * 1024))}"

if [ ! -f "$HIST" ]; then
  echo "cap-history: no $HIST to cap (fresh history)."
  exit 0
fi

before_lines=$(wc -l < "$HIST")
before_bytes=$(wc -c < "$HIST")

# 1) Cap by run count: keep the last MAX_RUNS lines (newest are last).
tail -n "$MAX_RUNS" "$HIST" > "$HIST.capped"

# 2) Cap by size (strict): keep the newest complete lines whose cumulative bytes
#    are <= MAX_BYTES, in a single pass. If even the newest snapshot alone
#    exceeds MAX_BYTES it cannot be trimmed further, so this yields an empty file
#    - a reset to fresh history, which is the intended strict-enforcement
#    failsafe (a lone snapshot near 100 MB is pathological; losing it beats
#    re-breaking every deploy). LC_ALL=C makes awk count bytes, not characters,
#    so the budget is byte-accurate against GitHub's per-file limit.
LC_ALL=C awk -v max="$MAX_BYTES" '
  { line[NR] = $0; len[NR] = length($0) + 1 }   # +1 for the newline
  END {
    total = 0; start = NR + 1
    for (i = NR; i >= 1; i--) { total += len[i]; if (total > max) break; start = i }
    for (i = start; i <= NR; i++) print line[i]
  }
' "$HIST.capped" > "$HIST.sized"

if [ ! -s "$HIST.sized" ] && [ -s "$HIST.capped" ]; then
  echo "cap-history: WARNING - newest snapshot exceeds ${MAX_BYTES} bytes; reset to fresh history."
fi

mv "$HIST.sized" "$HIST"
rm -f "$HIST.capped"
echo "cap-history: ${before_lines} runs/${before_bytes}B -> $(wc -l < "$HIST") runs/$(wc -c < "$HIST")B"

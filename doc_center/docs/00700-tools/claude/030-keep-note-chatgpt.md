
Short answer: **keep notes like a working engineer, not like a student**. Notes should help you *resume work fast*, *justify decisions*, and *avoid re-learning*.
Below is a **battle-tested system** that works especially well when you’re using Claude alongside a real codebase.

---

## Core principle (this matters)

Your notes should answer **future-you’s questions**:

1. *What did I learn?*
2. *Why did I choose this?*
3. *What’s still unclear?*
4. *What’s the next concrete step?*

If a note doesn’t help with at least one of those, don’t write it.

---

## Recommended structure (simple, scalable)

### 📁 1. One top-level `notes/` or `docs/work-notes/` folder

Keep notes **with the project**, not in a random app.

```
notes/
├── README.md
├── architecture.md
├── decisions.md
├── investigations/
│   ├── 2026-02-04-parser-bug.md
│   └── 2026-02-06-performance.md
├── TODO.md
└── scratch.md
```

---

## 1️⃣ `notes/README.md` — your index (5 minutes to save hours)

This is your **entry point** when you come back after a break.

Example:

```md
# Project Notes Index

## High-level understanding
- See architecture.md

## Important decisions
- See decisions.md

## Current focus
- Performance investigation in investigations/2026-02-06-performance.md

## Open questions
- How to handle edge case X?
- Is module Y safe to refactor?

## Next actions
- Benchmark alternative Z
- Add regression test for bug #123
```

Keep this short and current.

---

## 2️⃣ `architecture.md` — evolving mental model

This is **not a design doc**, it’s your *understanding* of the system.

Structure:

```md
# Architecture Notes

## High-level flow
Request → Parser → Normalizer → Encoder → Output

## Key modules
### parser/
- Responsibility:
- Assumptions:
- Known quirks:

### normalizer/
- ...

## Data contracts
- Input format:
- Output guarantees:

## Pain points
- Tight coupling between X and Y
- Hard to test Z
```

Update this when:

* You realize something was wrong
* You finally “get” a confusing part

---

## 3️⃣ `decisions.md` — this one is critical 🔥

Any non-trivial choice goes here.

Template:

```md
# Decisions

## 2026-02-04: Keep FST-based approach for French numbers
**Context**
- Considered replacing with rule-based logic

**Decision**
- Keep FST, refactor graph composition

**Why**
- Already handles pluralization
- Performance acceptable after pruning

**Trade-offs**
- Harder to debug
- Requires better tests

**Revisit if**
- We add language X
```

This prevents:

* Second-guessing
* Re-litigating old debates
* Claude (or humans) undoing past work

---

## 4️⃣ `investigations/` — where real thinking happens

Use **one file per question / bug / idea**.

Name it with date + topic:

```
2026-02-04-fst-mille-cent.md
```

Template:

```md
# Investigation: mille-cent parsing bug

## Problem
"mille-cent" produces 1000 instead of 1100

## Observations
- graph_thousands eats "cent"
- Order of composition matters

## Hypotheses
- Missing weight on "cent"
- Incorrect epsilon transition

## Experiments
- Tried swapping compose order → fixes case A, breaks case B

## Conclusion
Root cause: cent is optional in thousands graph

## Next step
- Split thousands vs hundreds graph
```

This pairs *extremely* well with Claude:
You can paste sections in and say:

> “Given this investigation, what would you try next?”

---

## 5️⃣ `TODO.md` — keep it brutal and actionable

Avoid fluffy tasks.

Bad ❌:

```
- Improve parser
```

Good ✅:

```
- [ ] Add test for "mille-cent-un"
- [ ] Remove epsilon loop in graph_thousands
- [ ] Benchmark after change
```

Bonus:

* Mark blockers explicitly
* Cross-reference investigations

---

## 6️⃣ `scratch.md` — guilt-free dumping ground

This is where:

* Half thoughts go
* Claude answers you might reuse later
* Links, commands, snippets

No structure needed.
You can delete it anytime.

---

## 7️⃣ How to integrate Claude into your notes (important)

### Pattern 1: Notes → Claude

Paste:

* Problem
* Observations
* Hypotheses

Ask:

```
Based on these notes, what am I missing?
```

### Pattern 2: Claude → Notes

After a good Claude explanation, summarize in **your own words** and store:

* Key insight
* One diagram or bullet list

Never paste raw AI output verbatim — future-you hates that.

---

## 8️⃣ What NOT to do

❌ Over-document
❌ Write textbook explanations
❌ Keep notes only in chat history
❌ Mix decisions with raw brainstorming
❌ Rely on memory (“I’ll remember this”)

---

## 9️⃣ Minimal version (if you want ultra-light)

If all this feels heavy, do just this:

```
notes.md
```

With repeating sections:

```md
## What I learned today
## Decisions made
## Open questions
## Next step
```

That alone puts you ahead of 90% of engineers.

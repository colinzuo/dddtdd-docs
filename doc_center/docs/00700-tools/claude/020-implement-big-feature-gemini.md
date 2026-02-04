
Implementing a large feature with **Claude Code** requires moving away from "chatting" and toward **agentic management**. Because large features can exhaust the context window and lead to "hallucinations" or technical debt, a structured workflow is essential.

## 1. The "Plan First" Rule

Never let Claude start coding a large feature immediately. It will often take the path of least resistance, which leads to messy architecture.

* **Activate Plan Mode:** Press `Shift + Tab` twice to enter **Plan Mode**. This puts Claude in a "read-only" state where it can research the codebase and propose logic without changing files.
* **The "Thinking" Hierarchy:** For complex architecture, use "thinking" keywords to trigger deeper reasoning:
* `think`: For standard logic.
* `think hard` / `ultrathink`: For heavy architectural decisions or security-sensitive changes.


* **Refine the Plan:** Don't accept the first draft. Ask it: *"Challenge this plan based on SOLID principles and YAGNI (You Ain't Gonna Need It). Is there a simpler way?"*

---

## 2. Documentation as "Memory"

Claude Code sessions are ephemeral. If you close the terminal or the context window fills up, Claude "forgets" the high-level goal. You must use files as its long-term memory.

### The "Big Three" Files

Create these in your project root to keep the agent on track:

1. **`CLAUDE.md`**: The source of truth for project rules. Include your tech stack, indentation rules, and "never do" patterns (e.g., "Never use deprecated library X").
2. **`plan.md`**: A living checklist. Ask Claude: *"Write our agreed-upon plan into plan.md with checkboxes. We will check these off as we go."*
3. **`progress.md` (or `todo.md`)**: A log of what has been completed. This is crucial if you need to run `/compact` or start a new session.

---

## 3. The Implementation Workflow

Break the "Big Feature" into tiny, verifiable chunks.

| Phase | Claude Command / Action | Why? |
| --- | --- | --- |
| **Research** | `Explore the codebase and find all files related to [Feature]` | Ensures Claude understands dependencies. |
| **Scaffold** | `Create the basic types and interfaces in plan.md step 1` | Sets the contract before implementation. |
| **TDD** | `Write a test for [Sub-feature]. Run it and show it failing.` | Prevents "hallucinated" logic that doesn't actually work. |
| **Build** | `Implement the logic to make the test pass.` | Focuses the AI on one specific goal. |
| **Checkpoint** | `Commit these changes with a descriptive message.` | Allows you to rollback easily if the next step fails. |

---

## 4. Keeping the Context Clean

As you work, the "conversation" gets long, making Claude slower and more prone to errors.

* **Use `/compact`:** This summarizes the current progress and clears the "fluff" from the history while keeping the core context.
* **Start Fresh Sessions:** Once a sub-task is committed and noted in `plan.md`, it’s often better to start a new session (`claude`) and tell it: *"Read plan.md and progress.md to see where we are, then start on task #4."*

> [!IMPORTANT]
> **The "Reviewer" Pattern:** For very critical parts of a big feature, open a second terminal window. Use one Claude to write the code and the second Claude to review it for bugs or architectural flaws.

**Would you like me to help you draft an initial `plan.md` or a `CLAUDE.md` file for the specific feature you're planning?**

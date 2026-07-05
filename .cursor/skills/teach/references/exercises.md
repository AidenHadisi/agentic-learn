# Coding Exercises

Exercises are runnable projects the student solves themselves. You scaffold, they code, you review. Never write the solution.

## Layout

Each exercise is a directory: `topics/<slug>/exercises/<ch>-<sec>-<slug>/` containing:

- `README.md` — three sections:
  - **Goal** — what the finished program does and why it matters for the section.
  - **Requirements** — concrete, checkable behaviors ("handles an empty input file", "exits nonzero on bad flags").
  - **Rubric** — the criteria the review will grade against: correctness, edge cases, idiomatic use of the section's concepts, and code clarity. The student sees the rubric up front.
- A starter scaffold — just enough to remove setup friction: entry-point file with a `TODO` where the work goes, module/manifest file if the language needs one, maybe a stub test. The scaffold must run (or fail with a clear "not implemented") out of the box.

## Scoping

- One exercise targets one section's concepts. It should force the student to use what was just taught, not everything they know.
- Sized for one sitting: roughly 30–90 minutes of student effort.
- Prefer a small real thing (a CLI, a parser, a worker pool) over an abstract toy when the topic allows.

## Grading

Grading is a rubric-based review that produces feedback, never a solution:

1. Read the student's code and run it if possible.
2. Walk the rubric criterion by criterion: met / partially met / missed, with the evidence (file, behavior, line).
3. Point at problems and ask questions that lead the student to the fix — "what happens here when the channel is closed?" — instead of writing the fix.
4. Record the outcome and any gaps in `progress.md`; recurring confusions go to `misconceptions.md`.
5. If the attempt misses the goal, let the student revise and re-review. Don't grade on a curve — say plainly what is missing.

## Anti-Patterns

- Writing the solution, "reference implementation", or fixed-up version of the student's code — in the scaffold, in review, or when they're stuck. Hints only.
- Scaffolding so much that the exercise is fill-in-the-blank.
- Vague requirements ("make it robust") that can't be checked against the rubric.
- Rubric criteria invented at grading time — the README's rubric is the contract.
- Marking an exercise complete when requirements are unmet just because effort was high.

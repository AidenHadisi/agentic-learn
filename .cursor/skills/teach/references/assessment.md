# Assessment

How to design quizzes, grade them, and decide when a unit is mastered.

## Quiz composition

6–10 questions per quiz, mixed by cognitive level:

| Share | Level | Question style |
| --- | --- | --- |
| ~40% | Recall | Define, state, identify — "What does X mean?" |
| ~40% | Application | Apply to a new case — "Given this scenario, what happens?" |
| ~20% | Synthesis | Combine ideas, evaluate trade-offs — "When would you choose X over Y, and why?" |

Rules:

- Cover the target unit plus at least one question from an earlier unit (interleaving).
- Always include one question targeting any unresolved misconception in `progress.md`.
- Application questions use scenarios *not* seen in the lecture or notes — recognition is not retrieval.
- Calibrate to recent scores: previous quiz >90% → harder synthesis questions; <60% → don't quiz again, re-teach first.

## Grading rubric

Score each question 0 / 0.5 / 1:

- **1** — correct and the reasoning (where asked) is sound.
- **0.5** — right direction, but imprecise, incomplete, or correct answer with flawed reasoning.
- **0** — wrong, or "correct" by luck with reasoning that reveals a misconception.

Per-question feedback is mandatory: what was right, what was missing, and — for 0s — *why* the student likely went wrong. Wrong answers that reveal a misconception get logged in `progress.md`.

Be honest. A generous 8/10 that papers over a real gap sabotages the next session's plan. When in doubt between two scores, give the lower one and say why.

## Mastery criterion

A unit moves to **mastered** in `syllabus.md` when **both**:

1. Two quiz attempts scoring ≥85%, taken at least 2 days apart (same-day retakes don't count — that's short-term memory, not learning).
2. No unresolved misconceptions for that unit in `progress.md`.

One score ≥85% → status stays `taught`, schedule the confirming quiz for a later session.

## Misconception re-tests

When a misconception is corrected, it isn't resolved — it's *pending re-test*:

1. Log it in `progress.md` with the date and the modality used to correct it.
2. Next session's warm-up includes one question targeting it.
3. Answered correctly → strike through in `progress.md` with the re-test date. Wrong → re-teach with a different modality and repeat.

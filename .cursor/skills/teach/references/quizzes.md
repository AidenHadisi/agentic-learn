# How to Write a Quiz

A quiz tests whether the student actually understood the section. It's multiple choice, taken in markdown: the student fills answers into the quiz file, and grading appends the results.

## Fresh-Context Authorship

Quizzes and exams are written and graded by the `quiz-master` agent from **lecture + syllabus only — never the chat**. The teaching conversation biases assessment: an author who watched the student learn unconsciously writes questions the student can answer. Fresh context keeps the test honest.

## Two Files Per Quiz

- `quizzes/<ch>-<sec>-<slug>.md` — the questions, each followed by an `Answer:` blank. **No answer key anywhere in this file.**
- `quizzes/<ch>-<sec>-<slug>-key.md` — the correct letter plus a brief explanation for each question.

Both carry frontmatter per the schema in [lectures.md](lectures.md) (`type: quiz`; the quiz file gains `score: "8/10"` once graded).

Question format in the quiz file:

```markdown
## Q1

<question text>

- A. <option>
- B. <option>
- C. <option>
- D. <option>

Answer:
```

## Taking and Grading

1. The student opens the quiz file, fills in each `Answer:` line, and says "done".
2. `quiz-master` (grade mode) reads the filled-in quiz and the key, compares, and appends a `## Results` section to the quiz file: score, then per-question verdict (correct/incorrect, the right answer, and the explanation). It also sets `score` in the frontmatter.
3. **Quiz-master grading report** (consumed by orchestrator): score, per-question verdict with explanation, and a `Gaps:` list the orchestrator copies into `misconceptions.md` and `progress.md`. Each gap names the misunderstood concept and the evidence (which question, what they picked).

## Chapter Exams

When a chapter completes, a cumulative exam covers all its sections: 12–20 questions, weighted toward concepts the student got wrong before. Written to `exams/` with the same two-file flow (`<chapter>-exam.md` + `<chapter>-exam-key.md`, `type: exam`), taken and graded the same way.

## Optional Practice HTML

After the graded markdown run, an interactive practice version (`quizzes/<name>.html`, per the [HTML style guide](html-style.md)) may be generated for re-drilling. It is extra practice only — the graded markdown record is the source of truth, and no scores from the HTML are recorded.

## Making Good Questions

Ask about understanding, not just memorization. "Why does X happen?" and "What would go wrong if Y?" are better than "What is the definition of Z?"

Mix difficulty. Some questions should be straightforward; others should require thinking through a scenario.

## Avoiding Common AI Pitfalls

These are the things you must actively watch for:

**Randomize the correct answer position.** Don't default to C or B. Spread correct answers across A, B, C, and D. Check yourself after writing and fix any obvious pattern.

**Make wrong answers plausible.** Each incorrect option should sound reasonable to someone who partially understands the material. Base distractors on real misconceptions, common mistakes, or ideas that are true in related-but-different contexts.

**Don't signal the answer through length or specificity.** If the correct answer is a detailed sentence and the others are short phrases, it's obvious. Keep all options at similar length and detail level.

**Don't use "all of the above" or "none of the above."** They usually test guessing strategy more than understanding.

**Don't use absolute language as a tell.** Words like "always" and "never" in wrong answers make them obviously wrong. Either avoid absolutes entirely or use them in correct answers too.

**Never leak the key.** The quiz file must contain no correct letters, no explanations, no ordering hints. If the student could deduce answers from the quiz file alone, the split failed.

## Length

5–10 questions per quiz depending on section complexity; 12–20 for chapter exams. Enough to cover the key concepts without dragging on.

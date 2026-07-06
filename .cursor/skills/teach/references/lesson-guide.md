# Lesson Guide

One self-contained HTML file per section — content, visuals, practice, quiz, references. For the `lesson-builder` agent.

## Research

Web-research the section first. Prefer official docs, specs, and recognized authors. Cite inline with `[S<n>]` markers; list all sources in a `## References` section at the bottom. No uncited nontrivial factual claims.

## Content

Let the subject decide the structure. Every lesson has:

- A table of contents (`.toc`)
- Worked examples keyed to the student profile
- Visuals where they help — hand-written inline SVG using design tokens so they adapt to light/dark
- A Key takeaways callout (`.callout-key`)
- A practice section (topic-appropriate — scenarios, spot-the-flaw, code only when the topic is code; use `<details>` for hints)
- A self-scored quiz at the end (5–10 questions, score shown to student only, never recorded)
- A `## References` section

Match length to complexity. Don't pad, don't rush.

## Quiz Quality

- Test understanding, not memorization
- Randomize correct answer positions; check for patterns
- Plausible wrong answers based on real misconceptions; similar length to the correct one
- No "all/none of the above"; no absolute-language tells
- Every explanation teaches

## Assembly

- Start from `templates/lesson.html` — copy its `<style>` and skeleton, replace demo content, copy the quiz/stepper scripts with real data
- One file: `topics/<slug>/lessons/<n>-<slug>.html`. Inline everything. No external requests. Must work from `file://`
- Inline `templates/vendor/highlight.min.js` + theme CSS pair only when the lesson has code
- Use design tokens only — no hard-coded colors. No gradients, shadows, or emoji

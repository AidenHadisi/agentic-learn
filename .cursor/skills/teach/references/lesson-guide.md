# Lesson Guide

How to build one lesson: a single self-contained HTML file that teaches one syllabus section — content, visuals, practice, and quiz together. Written for the `lesson-builder` agent.

## Research First

Never teach from training data alone. Web-research the section before writing:

- Prefer, in order: official documentation and specs; peer-reviewed papers; books and posts by recognized domain authors; well-maintained project wikis. Avoid content farms, SEO listicles, and unattributed tutorials.
- For fast-moving subjects (tools, frameworks, security, cloud), verify claims against sources from the last year or two and say which version or date the lesson describes.
- Cite inline with `[S<n>]` markers right after the claim they support, and list every source in a `## References` section at the bottom (id, title, publisher/author, URL). No uncited nontrivial factual claims — definitions, numbers, version-specific behavior, and historical facts all get a citation. Universally known trivia and the lesson's own worked examples need none.
- Never cite a source you didn't read for the claim it supports.

## Lesson Anatomy

Let the content decide the structure — theory may need prose and figures, processes need walkthroughs, skills need scenarios. Every lesson has:

- A sticky table of contents (`.toc`).
- **Worked examples keyed to the student profile** — read the profile provided in the dispatch and anchor new concepts to what this student already knows.
- **Visuals where structure or flow appears** — hand-written inline SVG using the design tokens (`currentColor`, `var(--accent)`) so figures adapt to light/dark. If the section has structure, draw it.
- A **Key takeaways** callout (`.callout-key`) near the end — the handful of things the student must retain.
- A **Practice** section (see below).
- A **Quiz** at the end (see below).
- A `## References` section.

Match length to complexity: a simple concept might be one screen; a dense one several. Don't pad, don't rush. Cover edge cases, common mistakes, and nuances.

## Practice Is Topic-Appropriate

Practice takes whatever form fits the material — never assume code:

- Scenario judgment: "here are four setups — which one is vulnerable, and why?"
- Spot-the-flaw: a flawed design, argument, or configuration to critique.
- Apply-it: a small real task using what was just taught (code only when the topic is code).
- Walkthrough prediction: a stepper that pauses and asks what happens next.

Use collapsible `<details>` blocks for hints and sample answers so the student commits before peeking.

## Quiz Rules

The quiz is embedded, interactive, and **self-scored — the score is shown to the student only and never recorded anywhere**. 5–10 questions covering the section's key concepts. Quality rules:

- Ask about understanding, not memorization: "why does X happen?", "what breaks if Y?"
- Randomize correct answer positions across A–D — check for patterns after writing.
- Make wrong answers plausible: base distractors on real misconceptions or things true in adjacent contexts.
- Keep all options at similar length and detail — don't signal the answer.
- No "all/none of the above"; no absolute-language tells ("always", "never") in wrong answers only.
- Every explanation teaches: say why the right answer is right and what misconception each wrong pick reflects.

## Assembly Rules

- Start from `templates/lesson.html`: copy its full `<style>` block and skeleton, replace the demo content, and copy only the script snippets the lesson uses (quiz engine with real data, stepper if used).
- One self-contained file at `topics/<slug>/lessons/<n>-<slug>.html`. Inline everything; no CDN links, no external requests of any kind; must work opened directly from `file://`.
- Code blocks: inline `templates/vendor/highlight.min.js` plus the light/dark theme CSS pair (scoped per `templates/vendor/VERSIONS.md`) **only when the lesson contains code**. Otherwise plain `<pre><code>`.
- Everything you add uses the design tokens — no hard-coded colors. Check both color schemes.
- No gradients, no shadows, no emoji decoration, one accent color.

## Anti-Patterns

- Writing content first and back-filling citations after.
- A generic lesson that ignores the student profile in the dispatch.
- Code-shaped practice for a non-code topic.
- Quiz answers detectable by length, position, or absolute language.
- Linking anything from the network — the file must render with wifi off.
- Inlining highlight.js into a lesson with no code blocks.
- Hand-rolling new styles or a new quiz engine instead of copying from the template.

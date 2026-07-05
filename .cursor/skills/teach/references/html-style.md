# HTML Style Guide

Every HTML artifact in this repo shares one visual language and one assembly method. Follow this guide whenever you generate a lecture page, quiz, flashcard viewer, tutorial, cheatsheet, or the dashboard.

## Hard Rules

- **One self-contained file.** Inline all CSS and JS. No CDN links, no external requests of any kind, no build step. The file must work opened directly from `file://`.
- **Assemble, don't invent.** Every artifact starts from `templates/html/base.html`: copy its full `<style>` block and document skeleton, keep the `<!-- TITLE -->` / `<!-- CONTENT -->` slot convention, and replace the demo content with the artifact's content. Never write styles or interaction logic from scratch.
- **Interaction comes from `templates/html/components.js`.** Copy only the snippets the artifact uses (quiz engine, flashcard viewer, stepper, tabs) into its `<script>` block and swap in real data. Collapsibles use native `<details>` — no JS.
- **Vendor libraries are inlined only when used.** `templates/html/vendor/` holds Chart.js, highlight.js (+ light/dark theme CSS pair), and mermaid — see `vendor/VERSIONS.md` for versions and the light/dark theme pairing pattern. Inline a library's contents into a `<script>`/`<style>` block only in artifacts that actually need it. Never fetch at view time.
- **Light and dark.** base.html's tokens follow `prefers-color-scheme`. Anything you add must use the tokens (`var(--bg)`, `var(--accent)`, …), never hard-coded colors. Check both schemes.
- **Restraint.** One accent color. No gradients, no shadows, no emoji decoration.

## Chart Rule

Static charts are hand-written inline SVG using the design tokens. Inline Chart.js only when interaction itself teaches something — exploring data, toggling series, hovering for values. A bar chart that never changes is SVG, not a library.

## Structural Requirements Per Artifact

- **Lectures** — sticky table of contents (`.toc`), highlighted code (inline highlight.js + theme pair), callouts for notes/key-takeaways/pitfalls, mermaid diagrams where the markdown lecture has them, and a `## References` section listing every cited source. Content-identical to the markdown lecture.
- **Quizzes (practice HTML)** — one question at a time, instant feedback on selection, explanation reveal, score summary at the end. Use the quiz engine snippet. Practice HTML is optional extra practice, never the graded record.
- **Flashcard viewer** (`flashcards/index.html`) — flip interaction, filter by due/box. Embeds the current deck state from `deck.md` at generation time; passive review only, never mutates state.
- **Tutorials** — stepper or animation controls so the student moves through the material at their own pace.
- **Dashboard** (`dashboard.html`) — per-topic completion bars, quiz/exam score history, weak-spot list drawn from misconceptions.

## Anti-Patterns

- Linking a stylesheet, font, or script from the network — the file must render with wifi off.
- Writing new CSS for something base.html already has a class for.
- Hand-rolling a quiz engine or card flip instead of copying the snippet.
- Inlining all three vendor libraries "just in case" — mermaid alone is ~3.4 MB; pay that cost only where a diagram exists.
- Using Chart.js for a static figure.
- Hard-coded hex colors that break in the other color scheme.
- Diverging content between a lecture's `.md` and `.html` versions.

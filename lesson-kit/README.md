# Lesson Kit — Component Catalog

Write lessons in MDX using only these components. See `gallery.mdx` (built via
`npm run gallery:build`) for live examples.

## Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `Callout` | `variant`: key/warn/info/tip, `title?` | Highlight important points |
| `Quiz` | `questions`: array of `{ q, options, answer, explain }` | Self-scored quiz |
| `Stepper` | children: `<Step>` elements | Ordered process walkthrough |
| `Reveal` | `prompt?`, children | Hide-then-show for predictions |
| `Scenario` | `start`, `nodes[]` with choices | Branching decision tree |
| `Playground` | `controls[]`, `outputs[]` | Parameter sliders with computed output |
| `Tabs` | children: `<Tab label="...">` | Side-by-side views |
| `Mermaid` | `chart`: mermaid string | Diagrams |
| `Chart` | `type`, `data`, `options` | Chart.js charts |
| `CodeBlock` | `language`, `code`, `title?` | Syntax-highlighted code |
| `Sources` | `list[]`: `{ author?, year?, title?, url? }` | Numbered reference list (required at end of every lesson) |

## Math (KaTeX)

Use **dollar delimiters only**:

- Inline: `$s = \sqrt{s^2}$`
- Display: `$$\bar{x} = \frac{1}{n}\sum x_i$$`

**Do not** use `\(...\)` or `\[...\]`. MDX treats `{...}` as JSX, so `\bar{x}` and `\frac{1}{n}` become `ReferenceError: x is not defined` (or `1` / `n`) at runtime. Dollar math is protected by `remark-math` before JSX runs.

Also avoid raw `|` inside table cells (even in math) — it splits the table. Prefer `\mid`, `\lvert`/`\rvert`, or rephrase.

## Rules

- Only use components from this catalog + standard markdown.
- No custom CSS, raw HTML widgets, or one-off components in lessons.
- Keep lessons under ~300 lines. If longer, split the syllabus section.
- Every lesson **must** end with a `<Sources>` component listing all cited references. Use superscript markers (e.g. `[¹]`) inline to link claims to sources.
- Math: `$...$` / `$$...$$` only — see **Math (KaTeX)** above.

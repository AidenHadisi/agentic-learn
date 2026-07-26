# Lesson Kit — Component Catalog

Write lessons in MDX using only these components. See `gallery.mdx` (built via
`npm run gallery:build`) for live examples.

## Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `Meta` | children | One-line subtitle under the lesson title (reading time is added automatically) |
| `Callout` | `variant`: key/warn/info/tip, `title?` | Highlight important points |
| `Quiz` | `questions`: array of `{ q, options, answer, explain }` (`answer`: option index **or** exact option string) | Self-scored quiz |
| `Blank` | `answer`: string/number/array of accepted answers, `tolerance?` (numeric answers), `hint?` | Inline fill-in-the-gap input |
| `Flashcards` | `cards[]`: `{ front, back }` (both accept JSX) | Flip-to-recall deck with shuffle and a review pass |
| `Stepper` | children: `<Step>` elements | Ordered process walkthrough |
| `Reveal` | `prompt?`, children | Hide-then-show for predictions |
| `Scenario` | `start`, `nodes[]` with choices | Branching decision tree |
| `Playground` | `controls[]`: `{ id, label, type: range/select/toggle, value, ... }`, `outputs[]`: `{ label, compute(values), precision?, unit? }`, `chart?`: `(values) => { type, data, options }` | Live parameter exploration |
| `Tabs` | children: `<Tab label="...">` | Side-by-side views |
| `Mermaid` | `chart`: mermaid string in a plain template literal | Diagrams (pre-rendered at build time) |
| `Chart` | `type`, `data`, `options` | Chart.js charts |
| `CodeBlock` | `language`, `code`, `title?` | Syntax-highlighted code |
| `Figure` | `src`, `alt`, `caption?` | Image with an auto-numbered caption |
| `Sources` | `list[]`: `{ author?, year?, title?, url? }` | Numbered reference list (required at end of every lesson) |
| `Ref` | `n`: source number or array of numbers | Inline superscript citation linking into `Sources` |

## Math (KaTeX)

Use **dollar delimiters only**:

- Inline: `$s = \sqrt{s^2}$`
- Display: `$$\bar{x} = \frac{1}{n}\sum x_i$$`

**Do not** use `\(...\)` or `\[...\]`. MDX treats `{...}` as JSX, so `\bar{x}` and `\frac{1}{n}` become `ReferenceError: x is not defined` (or `1` / `n`) at runtime. Dollar math is protected by `remark-math` before JSX runs.

Also avoid raw `|` inside table cells (even in math) — it splits the table. Prefer `\mid`, `\lvert`/`\rvert`, or rephrase.

## Rules

- Only use components from this catalog + standard markdown.
- No custom CSS, raw HTML, or one-off components in lessons — every element a lesson renders comes from this catalog (`Meta` covers the subtitle line, `Figure` covers images).
- Keep lessons under ~300 lines. If longer, split the syllabus section.
- Every lesson **must** end with a `<Sources>` component listing all cited references. Link claims to sources with `<Ref n={1}/>` (or `<Ref n={[1, 2]}/>`), not hand-written superscripts.
- Math: `$...$` / `$$...$$` only — see **Math (KaTeX)** above.
- Mermaid diagrams are rendered to SVG during the build, so `chart` must be a plain template literal with no `${}` interpolation. The build fails on anything it can't render.

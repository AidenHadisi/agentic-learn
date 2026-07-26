# Lesson Kit — Component Catalog

Write lessons in MDX using only these components. See `gallery.mdx` (built via
`npm run gallery:build`) for live examples.

## Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `Meta` | children | One-line subtitle under the lesson title (reading time is added automatically) |
| `Callout` | `variant`: key/warn/info/tip, `title?` | Highlight important points |
| `Quiz` | `questions`: array of `{ q, options, answer, explain }` (`answer`: option index **or** exact option string) | Self-scored quiz |
| `Flashcards` | `cards[]`: `{ front, back }` (both accept JSX) | Flip-to-recall deck with shuffle and a review pass |
| `Stepper` | children: `<Step>` elements | Ordered process walkthrough |
| `Reveal` | `prompt?`, children | Hide-then-show for predictions |
| `Scenario` | `start`, `nodes[]` with choices | Branching decision tree |
| `Playground` | `controls[]`: `{ id, label, type: range/select/toggle, value, ... }`, `outputs[]`: `{ label, compute(values), precision?, unit? }`, `chart?`: `(values) => { type, data, options }` | Live parameter exploration |
| `Tabs` | children: `<Tab label="...">` | Side-by-side views |
| `Mermaid` | `chart`: mermaid string in a plain template literal | Diagrams (pre-rendered at build time) |
| `Chart` | `type`, `data`, `options`, `height?` | Charts — see **Charts** below for the types and when to use each |
| `CodeBlock` | `language`, `code`, `title?` | Syntax-highlighted code |
| `Figure` | `src`, `alt`, `caption?` | Image with an auto-numbered caption |
| `Sources` | `list[]`: `{ author?, year?, title?, url? }` | Numbered reference list (required at end of every lesson) |
| `Ref` | `n`: source number or array of numbers | Inline superscript citation linking into `Sources` |

## Charts

Pick the chart from what the data **is**, not from what's quickest to type. A bar
chart is the right answer far less often than it gets used.

| Your data is… | Use | `type` |
|---|---|---|
| Two variables that may be related | Scatter, optionally with a fitted line | `"scatter"` |
| A function you want to show across its domain | Line over a computed range | `"line"` |
| A quantity changing over an ordered index | Line | `"line"` |
| A probability, interval, or area under a curve | Line with `fill` on the shaded series | `"line"` |
| Magnitudes across unordered categories | Bar | `"bar"` |
| Parts that sum to a meaningful whole | Pie or doughnut | `"pie"` / `"doughnut"` |

**Available:** `line`, `bar`, `scatter`, `pie`, `doughnut`; linear and
logarithmic axes; area fills via `fill`; mixed charts (set `type` on an
individual dataset to overlay a line on a scatter).

**Not available** — the controllers aren't registered, so these render nothing:
radar, polar area, bubble, and real time-scale axes. Pass pre-formatted date
strings as labels instead of `Date` objects.

Notes:

- **Colors are automatic.** Series get theme-matched colors in order. Only pass
  `borderColor` / `backgroundColor` when a specific color carries meaning.
- **Compute curve data, don't type it.** Use an `export const` helper above the
  chart (`Array.from({ length: 29 }, (_, i) => -3.5 + i * 0.25)`) rather than
  hand-writing coordinates.
- **Label both axes**, with units, via `scales.x.title` / `scales.y.title`. A
  figure a student can't read unaided isn't teaching anything.
- **Shade a region with real area.** A far distribution tail is a few pixels
  tall and reads as nothing — shade something visible, like ±1 SD.
- Charts are `22rem` tall by default. Override with `height="16rem"` when a
  figure needs to be shorter.

## Math (KaTeX)

Use **dollar delimiters only**:

- Inline: `$s = \sqrt{s^2}$`
- Display: `$$\bar{x} = \frac{1}{n}\sum x_i$$`

**Do not** use `\(...\)` or `\[...\]`. MDX treats `{...}` as JSX, so `\bar{x}` and `\frac{1}{n}` become `ReferenceError: x is not defined` (or `1` / `n`) at runtime. Dollar math is protected by `remark-math` before JSX runs.

Also avoid raw `|` inside table cells (even in math) — it splits the table. Prefer `\mid`, `\lvert`/`\rvert`, or rephrase.

## Saved progress

`Quiz` and `Flashcards` save the student's place in `localStorage`, so a reload
resumes mid-quiz or mid-deck instead of starting over and reshuffling. Keys are
namespaced by topic, lesson, and a hash of the authored content, which means
editing a quiz's questions or options — or a deck's cards — discards the old
saved run rather than replaying it against content that no longer exists.
Nothing leaves the browser, and no score is recorded anywhere.

## Rules

- Only use components from this catalog + standard markdown.
- No custom CSS, raw HTML, or one-off components in lessons — every element a lesson renders comes from this catalog (`Meta` covers the subtitle line, `Figure` covers images).
- Keep lessons under ~300 lines. If longer, split the syllabus section.
- Every lesson **must** end with a `<Sources>` component listing all cited references. Link claims to sources with `<Ref n={1}/>` (or `<Ref n={[1, 2]}/>`), not hand-written superscripts.
- Math: `$...$` / `$$...$$` only — see **Math (KaTeX)** above.
- Mermaid diagrams are rendered to SVG during the build, so `chart` must be a plain template literal with no `${}` interpolation. The build fails on anything it can't render.

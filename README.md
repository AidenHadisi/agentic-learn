# learn

A personal learning environment where an AI agent acts as a teacher. Each topic lives in its own directory with a syllabus, journal, and interactive MDX lessons built to self-contained HTML — everything needed to continue learning across sessions.

## How it works

The teacher interviews you, dispatches research subagents, writes a compact MDX lesson using a closed component library, builds it to offline HTML, and teaches from it in chat. Quiz scores stay in the browser and are never recorded.

Chat is ephemeral; the syllabus and journal carry state.

## Getting started

```sh
npm install
```

Open Cursor in this repo and say:

> I want to learn X



## Common requests

- "I want to learn X" — interview, syllabus, first lesson
- "Teach the next section" — research, build lesson, teach
- "Review" — re-teach and probe weak spots



## Layout

```
index.html              # Generated topic index (npm run index:build)

lesson-kit/
├── components/         # React components for lessons
├── styles/             # Design tokens, component CSS, self-hosted fonts
├── fonts/              # woff2 files inlined into every lesson
├── gallery.mdx         # Visual component reference
└── vite.config.js      # MDX + single-file build

topics/<topic-slug>/
├── syllabus.md         # Mission, success criteria, sections
├── journal.md          # Profile, evidence, log, weak spots
├── sources.md          # Running bibliography of everything researched
└── lessons/
    ├── <n>-<slug>.mdx  # Source (compact, agent-authored)
    └── <n>-<slug>.html # Built artifact (open in browser)
```



## Lesson tooling

```sh
npm run lesson:new -- topics/<slug>/lessons/<n>-<slug>.mdx
npm run lesson:build -- topics/<slug>/lessons/<n>-<slug>.mdx
npm run gallery:build
npm run index:build
npm run check
```

`index:build` regenerates `index.html` at the repo root — one card per topic with its summary, progress, linked lessons, and current weak spots. It is derived entirely from the syllabus and journal files, so rerun it after finishing a section.

Lessons are fully offline: fonts are self-hosted and Mermaid diagrams are pre-rendered to SVG at build time (cached in `.cache/mermaid/`), so the mermaid library never ships in the output.

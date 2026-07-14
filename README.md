# learn

A personal learning environment where an AI agent acts as a teacher. Each topic lives in its own directory with a syllabus, a journal, and one self-contained HTML lesson per section — everything needed to continue learning across sessions.

## How it works

The teaching protocol and canonical state templates live in
`.cursor/skills/teach/`. Research agents gather
evidence from distinct angles; the teacher reconciles it and maintains the source
ledger and research briefs. `lesson-builder` turns a completed brief into a
standalone interactive lesson, which the teacher works through with you in chat.
Quiz scores stay inside the page and are never recorded.

Chat is ephemeral; the syllabus, journal, source ledger, and research briefs
carry state.

## Getting started

Open Cursor in this repo and say:

> I want to learn X

## Common requests

- "I want to learn X" — interview, syllabus, first lesson
- "Teach the next section" — build (or reuse) the next lesson and teach it
- "Review" — re-teach and probe the journal's weak spots

## Layout

```
templates/
├── lesson.html             # canonical lesson design system
├── COMPONENTS.md           # declarative interactions and optional capabilities
├── component-gallery.html  # built visual and interaction reference
├── runtime/                # core runtime + Mermaid/Chart/KaTeX/Cytoscape adapters
└── vendor/                 # vendored highlight.js

topics/<topic-slug>/
├── syllabus.md             # mission, success criteria, and taught sections
├── journal.md              # profile, evidence, log, and weak spots
├── sources.md              # deduplicated source ledger with stable IDs
├── research/               # topic overview and section briefs
└── lessons/<n>-<slug>.html # one per section: lecture, visuals, practice, quiz, references
```

## Lesson tooling

```sh
npm install
npm run lesson:new -- topics/<slug>/lessons/<n>-<slug>.html
npm run lesson:build -- topics/<slug>/lessons/<n>-<slug>.html
npm run check
```

The build bundles only capabilities used by the lesson and inlines all runtime
assets, so lessons work from `file://` without network requests.

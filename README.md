# learn

A personal learning environment where an AI agent acts as a teacher. Each topic lives in its own directory with a syllabus, a journal, and one self-contained HTML lesson per section — everything needed to continue learning across sessions.

## How it works

The teaching protocol lives in `.cursor/skills/teach/`. The agent interviews you, writes a syllabus, then teaches one section at a time: a `lesson-builder` subagent researches the section and produces a beautiful standalone HTML lesson (content, visuals, practice, and an embedded quiz with cited sources), and the agent teaches it interactively in chat. Quizzes are self-scored inside the lesson — your score is yours alone. Works for any subject, not just coding.

Chat is ephemeral; the syllabus checkboxes and the journal carry all state.

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
├── lesson.html             # design system + quiz/stepper JS, the base for every lesson
└── vendor/                 # highlight.js (inlined only into lessons with code)

topics/<topic-slug>/
├── syllabus.md             # goal + checkbox sections (= progress)
├── journal.md              # student profile + dated teaching log + weak spots
└── lessons/<n>-<slug>.html # one per section: lecture, visuals, practice, quiz, references
```

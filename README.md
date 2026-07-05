# learn

A personal learning environment where AI agents act as teachers. Each topic lives in its own directory with the syllabus, progress, lectures, notes, and quizzes needed to continue learning across sessions.

## How it works

The teaching protocol lives in `.cursor/skills/teach/`. The main agent orchestrates learning in chat and dispatches specialized subagents for production work: `researcher`, `lecture-writer`, `lecture-reviewer`, `quiz-master`, and `interactive-builder`. Lectures are researched first, cited from a per-topic source ledger, and ship as markdown plus a standalone HTML twin. Chat is ephemeral; anything important should be captured in topic files.

## Getting started

Open Cursor in this repo and say:

> I want to learn X

The agent will interview you, build a syllabus, create a progress tracker, and prepare the first lecture.

## Common requests

- "Let's continue" — resume from the topic's progress table
- "Teach the next section" — prepare or use the next lecture and teach it interactively
- "Quiz me" — write and grade a multiple-choice quiz
- "Drill me" — run due flashcards from the Leitner deck
- "Chapter exam" — cumulative exam at chapter completion
- "Review" — focus on weak spots from notes, quizzes, and progress
- "Show my dashboard" — open `dashboard.html` for cross-topic progress and scores

## Layout

```
dashboard.html              # cross-topic progress, scores, weak spots (regenerated each session)
templates/html/             # design-system base, components, vendored libs for HTML artifacts
├── base.html
├── components.js
└── vendor/

topics/<topic-slug>/
├── syllabus.md
├── progress.md
├── sources.md          # research ledger, cited by lectures
├── misconceptions.md   # wrong answers + confusions, open/resolved
├── lectures/           # <ch>-<sec>-<slug>.md + .html
├── tutorials/          # optional interactive HTML companions
├── notes/              # session records
├── cheatsheets/        # one per chapter, md + html
├── quizzes/            # quiz records (md) + optional practice html
├── exams/              # cumulative chapter exams
├── exercises/          # runnable coding projects
└── flashcards/
    ├── deck.md         # cards + Leitner scheduling state
    └── index.html      # standalone viewer, deck embedded
```

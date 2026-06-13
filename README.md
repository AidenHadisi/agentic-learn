# learn

A personal learning environment where AI agents act as teachers. Each topic lives in its own directory with the syllabus, progress, lectures, notes, and quizzes needed to continue learning across sessions.

## How it works

The teaching protocol lives in `.cursor/skills/teach/`. Agents use it to orient from files, choose the right learning activity, and keep durable state up to date. Chat is ephemeral; anything important should be captured in topic files.

## Getting started

Open Cursor in this repo and say:

> I want to learn X

The agent will interview you, build a syllabus, create a progress tracker, and prepare the first lecture.

## Common requests

- "Let's continue" - resume from the topic's progress table
- "Teach the next section" - prepare or use the next lecture and teach it interactively
- "Quiz me" - write and grade a multiple-choice quiz
- "Review" - focus on weak spots from notes, quizzes, and progress

## Layout

```
topics/<topic-slug>/
├── syllabus.md      # topic overview, chapters, and sections
├── progress.md      # student profile, activity table, and observations
├── lectures/        # prepared textbook-style material, one section at a time
├── notes/           # concise session records
└── quizzes/         # multiple-choice quizzes and answer explanations
```

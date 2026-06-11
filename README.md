# learn

A personal learning environment where AI agents act as teachers. Each topic lives in its own directory with a syllabus, progress tracker, notes, lectures, quizzes, flashcards, and projects — all written and maintained by the agent as we go.

## How it works

The teaching protocol lives in `.cursor/skills/teach/`. Any agent opened in this repo reads it before responding, so teaching style, file formats, and progress tracking stay consistent across sessions and models. Chat is ephemeral; everything durable lives in topic files.

## Getting started

Open Cursor in this repo and say:

> I want to learn X

The agent will interview you (current level, goals, time budget), scaffold `topics/x/` from the template, and start the first lesson.

## Everyday commands

- "Let's continue" — resume the active topic where the last session left off
- "Quiz me on \<unit\>" — blind quiz written to a file; fill in answers, agent grades
- "Review" — spaced-repetition pass over due flashcards
- "Give me a project" — hands-on exercise with acceptance criteria; agent reviews, never solves

## Layout

```
topics/<topic-slug>/
├── syllabus.md      # units, ordering, status
├── progress.md      # mastery, misconceptions, preferences — the agent's memory
├── glossary.md      # terms introduced so far
├── flashcards.md    # spaced-repetition deck
├── notes/           # one file per unit, written during lessons
├── lectures/        # prepared lecture material
├── quizzes/         # quizzes + graded attempts
└── projects/        # hands-on exercises with their own code
```

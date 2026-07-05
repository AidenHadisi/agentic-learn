# Flashcards and Spaced Repetition

Flashcards engineer retention: concepts the student learned (and especially ones they got wrong) come back on a schedule until they stick. State lives in `topics/<slug>/flashcards/deck.md`; the Drill activity runs in chat.

## Deck Card Schema

**Deck card schema** (`flashcards/deck.md`): one card per `### Card <n>` block with `Q:`, `A:`, `Section:`, `Box: 1-5`, `Due: <date>`; Leitner intervals 1/3/7/14/30 days, wrong answer returns the card to box 1.

Card block shape:

```markdown
### Card <n>
Q: <question — prompts recall>
A: <answer>
Section: <chapter>.<section>
Box: 1-5
Due: <date>
```

- `Box` is the card's Leitner box, 1–5.
- `Due` is the next date the card should be drilled (YYYY-MM-DD).
- Card numbers are sequential and never reused.

## Leitner Scheduling

Intervals per box: **1 / 3 / 7 / 14 / 30 days** for boxes 1–5.

- Correct answer: move the card up one box (max 5) and set `Due` to today + the new box's interval.
- Wrong answer: the card returns to box 1 and is due tomorrow.
- New cards start in box 1, due the next day.

## Writing Good Cards

- **Atomic — one fact per card.** If the answer has two independent parts, write two cards.
- **Prompt recall, not recognition.** "What does `select` do when multiple channels are ready?" beats "Does `select` pick randomly? (yes/no)". Never multiple choice.
- Front is a question the student must answer from memory; back is short and checkable.
- Add cards for: key facts from each taught section, and every concept the student missed on a quiz or exam.
- Tag each card with its `Section` so drills and reviews can target weak areas.

## The Drill Flow (in chat)

1. Read `deck.md` and collect cards with `Due` today or earlier. If none, say so and suggest another activity.
2. Present one card's `Q:` at a time. The student answers in chat.
3. Grade honestly — a partial answer that misses the core idea is wrong. Say what the full answer is.
4. Update the card's `Box` and `Due` per the Leitner rules immediately.
5. After the last due card, summarize: cards drilled, right/wrong, anything that should become a misconception entry.

## The HTML Viewer

`flashcards/index.html` is passive review only: it embeds a snapshot of the deck at generation time with flip and due/box filtering (per the [HTML style guide](html-style.md)). It **never mutates state** — `Box` and `Due` change only through chat drills. Regenerate it after drills so the snapshot stays fresh.

## Anti-Patterns

- Cards that quiz recognition (multiple choice, true/false) instead of recall.
- Compound cards ("list the five…") — split them.
- Showing the answer before the student commits to one.
- Marking a shaky "sort of knew it" answer as correct — that defeats the scheduling.
- Editing `Box`/`Due` from the HTML viewer or anywhere outside a drill.
- Forgetting to add cards for quiz misses — those are the highest-value cards in the deck.

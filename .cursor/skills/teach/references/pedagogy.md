# Pedagogy

Techniques behind the hard rules in SKILL.md. When a rule says *what*, this file says *how*.

## Socratic method

When the student asks a question, your first response is a guiding question or a narrowing hint — something that lets them take the next step themselves.

- Aim the question at the gap, not the whole answer. "What happens to the leader's term number when it sees a higher one?" beats "Think about Raft."
- One Socratic round only. If they answer wrong twice or say they're stuck, explain fully and clearly — Socratic teaching is a tool, not a hazing ritual.
- After explaining, ask them to restate the idea in their own words. Restating is itself retrieval practice.

## Retrieval practice

Recalling beats re-reading. Engineer recall moments constantly:

- Warm-up questions at session start target material from previous sessions, not today's.
- Check-questions after each teaching chunk target the chunk just taught.
- Prefer "what would happen if…" over "do you remember…" — application questions force deeper retrieval than recognition.
- When the student gets a retrieval question wrong, don't just correct it — log it as a misconception in `progress.md` and re-test it next session.

## Spaced repetition

`flashcards.md` is the deck. Each card carries `last-reviewed` and `interval-days` (format in file-formats.md).

**A card is due when** `today >= last-reviewed + interval-days`.

**After review, update the interval:**

| Result | New interval |
| --- | --- |
| Correct, fast | `interval * 2` (cap 60 days) |
| Correct, hesitant | `interval` unchanged |
| Wrong | reset to 1 day |

New cards start at `interval-days: 1`. In **review** mode, present due cards one at a time, wait for the answer, then grade and update the card's metadata. In **teach** mode, fold 2–3 due cards into the warm-up.

## Desirable difficulty

Learning sticks when it's effortful. Default to problem-first:

1. Pose a problem the student can't yet solve.
2. Let them struggle briefly (a real attempt, not token hesitation).
3. Teach the idea that unlocks it.
4. Have them apply it immediately.

Use worked examples instead when material is brand new and complex — walk one example fully, then have the student do the next one with the scaffolding removed (faded worked examples).

## Modality switching

If a unit isn't landing (quiz <60%, repeated confusion), don't repeat the same explanation louder. Switch modality:

- **Analogy** — map to something the student already knows (check `progress.md` preferences for their background).
- **Diagram** — mermaid diagrams for structures, flows, state machines.
- **Code** — a small runnable example in the student's preferred language.
- **Extremes** — show degenerate/boundary cases; misconceptions often live at the edges.
- **Contrast** — put the confused concept side-by-side with the one it's being confused with.

Record which modality finally worked in `progress.md` under "Preferences learned".

## Hint escalation

When the student is stuck on an exercise, escalate gradually:

1. Re-orient: point at the relevant concept ("this is a fold, not a map").
2. Narrow: point at the location of the problem ("look at your base case").
3. Reveal structure: give the shape of the answer with a blank in it.
4. Answer, fully explained — then schedule a similar exercise for next session.

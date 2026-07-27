import React, { useCallback } from "react";
import { contentKey, usePersistentState } from "../persist.js";

// Answers are validated at build time by lesson-kit/scripts/lesson.mjs. Tagging
// the correct option before shuffling keeps the authored index from remapping.
function prepareQuestion({ answer, options, ...rest }) {
	const correctIndex = typeof answer === "number" ? answer : options.indexOf(answer);
	const prepared = options.map((text, i) => ({ text, correct: i === correctIndex }));
	for (let i = prepared.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[prepared[i], prepared[j]] = [prepared[j], prepared[i]];
	}
	return { ...rest, options: prepared };
}

function QuizQuestion({ question, selected, onSelect, onNext }) {
	const answered = selected !== null;
	const isCorrect = answered && question.options[selected].correct;

	return (
		<div className="quiz__question">
			<h3 className="quiz__prompt">{question.q}</h3>
			<div className="quiz__options">
				{question.options.map((opt, i) => {
					let cls = "quiz__option";
					if (answered) {
						if (opt.correct) cls += " quiz__option--correct";
						else if (i === selected) cls += " quiz__option--incorrect";
					}
					return (
						<button
							key={i}
							className={cls}
							disabled={answered}
							onClick={() => onSelect(i)}
						>
							<span className="quiz__letter">{String.fromCharCode(65 + i)}</span>
							{opt.text}
						</button>
					);
				})}
			</div>
			{answered && (
				<>
					<div className="quiz__explain">
						<strong>{isCorrect ? "Correct!" : "Not quite."}</strong>{" "}
						{question.explain}
					</div>
					<button className="btn btn--primary" onClick={onNext}>Next</button>
				</>
			)}
		</div>
	);
}

export function Quiz({ questions: rawQuestions }) {
	// Keyed by the full question content so a lesson's quizzes stay distinct from
	// each other, and so editing any of them discards the saved run rather than
	// replaying a shuffle of options that no longer exist.
	const key = contentKey("quiz", rawQuestions.map((q) => [q.q, ...q.options].join("|")));
	const [state, setState, reset] = usePersistentState(key, () => ({
		questions: rawQuestions.map(prepareQuestion),
		selections: rawQuestions.map(() => null),
		cursor: 0,
	}));

	const { questions, selections, cursor } = state;

	const select = useCallback((option) => {
		setState((prev) => ({
			...prev,
			selections: prev.selections.map((s, i) => (i === cursor ? option : s)),
		}));
	}, [setState, cursor]);

	const next = useCallback(() => {
		setState((prev) => ({ ...prev, cursor: prev.cursor + 1 }));
	}, [setState]);

	if (cursor >= questions.length) {
		const correct = selections.filter(
			(selected, i) => selected !== null && questions[i].options[selected].correct,
		).length;
		return (
			<div className="quiz__score">
				<h3>Score: {correct} / {questions.length}</h3>
				<p className="text-muted">This score stays in your browser and is never recorded.</p>
				<button className="btn btn--sm btn--ghost" onClick={reset}>Retake</button>
			</div>
		);
	}

	return (
		<div className="quiz">
			<p className="quiz__progress">Question {cursor + 1} of {questions.length}</p>
			<QuizQuestion
				key={cursor}
				question={questions[cursor]}
				selected={selections[cursor]}
				onSelect={select}
				onNext={next}
			/>
		</div>
	);
}

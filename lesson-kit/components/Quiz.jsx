import React, { useState, useCallback } from "react";

function shuffleOptions(question) {
	const order = question.options.map((_, i) => i);
	for (let i = order.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[order[i], order[j]] = [order[j], order[i]];
	}
	return {
		...question,
		options: order.map((i) => question.options[i]),
		answer: order.indexOf(question.answer),
	};
}

function QuizQuestion({ question, onAnswer }) {
	const [selected, setSelected] = useState(null);
	const answered = selected !== null;
	const isCorrect = selected === question.answer;

	const handleSelect = (i) => {
		if (answered) return;
		setSelected(i);
	};

	return (
		<div className="quiz__question">
			<h3 className="quiz__prompt">{question.q}</h3>
			<div className="quiz__options">
				{question.options.map((opt, i) => {
					let cls = "quiz__option";
					if (answered) {
						if (i === question.answer) cls += " quiz__option--correct";
						else if (i === selected) cls += " quiz__option--incorrect";
					}
					return (
						<button
							key={i}
							className={cls}
							disabled={answered}
							onClick={() => handleSelect(i)}
						>
							<span className="quiz__letter">{String.fromCharCode(65 + i)}</span>
							{opt}
						</button>
					);
				})}
			</div>
			{answered && (
				<div className="quiz__explain">
					<strong>{isCorrect ? "Correct!" : "Not quite."}</strong>{" "}
					{question.explain}
				</div>
			)}
			{answered && (
				<button className="btn btn--primary" onClick={() => onAnswer(isCorrect)}>
					Next
				</button>
			)}
		</div>
	);
}

export function Quiz({ questions: rawQuestions }) {
	const [questions] = useState(() => rawQuestions.map(shuffleOptions));
	const [current, setCurrent] = useState(0);
	const [correct, setCorrect] = useState(0);
	const [finished, setFinished] = useState(false);

	const handleAnswer = useCallback((wasCorrect) => {
		if (wasCorrect) setCorrect((c) => c + 1);
		if (current + 1 >= questions.length) {
			setFinished(true);
		} else {
			setCurrent((c) => c + 1);
		}
	}, [current, questions.length]);

	if (finished) {
		return (
			<div className="quiz__score">
				<h3>Score: {correct} / {questions.length}</h3>
				<p className="text-muted">This score stays in your browser and is never recorded.</p>
			</div>
		);
	}

	return (
		<div className="quiz">
			<p className="quiz__progress">Question {current + 1} of {questions.length}</p>
			<QuizQuestion
				key={current}
				question={questions[current]}
				onAnswer={handleAnswer}
			/>
		</div>
	);
}

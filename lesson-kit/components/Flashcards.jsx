import React, { useState } from "react";

function shuffled(cards) {
	const next = [...cards];
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}

export function Flashcards({ cards }) {
	const [deck, setDeck] = useState(cards);
	const [index, setIndex] = useState(0);
	const [flipped, setFlipped] = useState(false);
	const [again, setAgain] = useState([]);
	const [finished, setFinished] = useState(false);

	const restart = () => {
		setDeck(cards);
		setIndex(0);
		setFlipped(false);
		setAgain([]);
		setFinished(false);
	};

	const advance = (keepForReview) => {
		const pending = keepForReview ? [...again, deck[index]] : again;
		setFlipped(false);
		if (index + 1 < deck.length) {
			setAgain(pending);
			setIndex(index + 1);
		} else if (pending.length > 0) {
			setDeck(pending);
			setAgain([]);
			setIndex(0);
		} else {
			setFinished(true);
		}
	};

	const go = (delta) => {
		setFlipped(false);
		setIndex((i) => Math.min(deck.length - 1, Math.max(0, i + delta)));
	};

	if (finished) {
		return (
			<div className="flashcards">
				<p className="flashcards__done">Deck finished — every card marked "got it".</p>
				<button className="btn btn--primary" onClick={restart}>Start over</button>
			</div>
		);
	}

	const card = deck[index];

	return (
		<div className="flashcards">
			<p className="flashcards__progress">
				Card {index + 1} of {deck.length}
				{again.length > 0 && ` · ${again.length} queued for review`}
			</p>
			<button className="flashcards__card" onClick={() => setFlipped((f) => !f)}>
				<span className="flashcards__side">{flipped ? "Back" : "Front"}</span>
				<span className="flashcards__face">{flipped ? card.back : card.front}</span>
				{!flipped && <span className="flashcards__hint">Click to flip</span>}
			</button>
			{flipped && (
				<div className="flashcards__grade">
					<button className="btn" onClick={() => advance(true)}>Review again</button>
					<button className="btn btn--primary" onClick={() => advance(false)}>Got it</button>
				</div>
			)}
			<div className="flashcards__controls">
				<button className="btn btn--sm" disabled={index === 0} onClick={() => go(-1)}>
					Previous
				</button>
				<button
					className="btn btn--sm"
					disabled={index === deck.length - 1}
					onClick={() => go(1)}
				>
					Next
				</button>
				<button
					className="btn btn--sm btn--ghost"
					onClick={() => {
						setDeck(shuffled(deck));
						setIndex(0);
						setFlipped(false);
					}}
				>
					Shuffle
				</button>
			</div>
		</div>
	);
}

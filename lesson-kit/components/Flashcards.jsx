import React, { useState } from "react";
import { contentKey, usePersistentState } from "../persist.js";

function shuffled(items) {
	const next = [...items];
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[next[i], next[j]] = [next[j], next[i]];
	}
	return next;
}

export function Flashcards({ cards }) {
	const key = contentKey("flashcards", cards.map((card) => card.front));
	// Card faces may be JSX, which will not survive JSON, so the saved deck is
	// positions into `cards` rather than the cards themselves.
	const [state, setState, reset] = usePersistentState(key, () => ({
		deck: cards.map((_, i) => i),
		position: 0,
		again: [],
	}));
	const [flipped, setFlipped] = useState(false);

	const { deck, position, again } = state;

	const restart = () => {
		setFlipped(false);
		reset();
	};

	const advance = (keepForReview) => {
		const pending = keepForReview ? [...again, deck[position]] : again;
		setFlipped(false);
		if (position + 1 < deck.length) {
			setState({ deck, position: position + 1, again: pending });
		} else if (pending.length > 0) {
			setState({ deck: pending, position: 0, again: [] });
		} else {
			setState({ deck, position: deck.length, again: [] });
		}
	};

	const go = (delta) => {
		setFlipped(false);
		setState((prev) => ({
			...prev,
			position: Math.min(prev.deck.length - 1, Math.max(0, prev.position + delta)),
		}));
	};

	if (position >= deck.length) {
		return (
			<div className="flashcards">
				<p className="flashcards__done">Deck finished — every card marked "got it".</p>
				<button className="btn btn--primary" onClick={restart}>Start over</button>
			</div>
		);
	}

	const card = cards[deck[position]];

	return (
		<div className="flashcards">
			<p className="flashcards__progress">
				Card {position + 1} of {deck.length}
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
				<button className="btn btn--sm" disabled={position === 0} onClick={() => go(-1)}>
					Previous
				</button>
				<button
					className="btn btn--sm"
					disabled={position === deck.length - 1}
					onClick={() => go(1)}
				>
					Next
				</button>
				<button
					className="btn btn--sm btn--ghost"
					onClick={() => {
						setFlipped(false);
						setState({ deck: shuffled(deck), position: 0, again: [] });
					}}
				>
					Shuffle
				</button>
			</div>
		</div>
	);
}

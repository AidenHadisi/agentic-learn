import React, { useState } from "react";

export function Scenario({ start, nodes }) {
	const [currentId, setCurrentId] = useState(start);
	const [history, setHistory] = useState([]);

	const node = nodes.find((n) => n.id === currentId);
	if (!node) return null;

	const isEnd = !node.choices || node.choices.length === 0;

	const reset = () => {
		setCurrentId(start);
		setHistory([]);
	};

	return (
		<div className="scenario">
			<div className="scenario__node">
				<h4 className="scenario__title">{node.title}</h4>
				<p className="scenario__body">{node.body}</p>
				{node.feedback && (
					<div className="scenario__feedback">{node.feedback}</div>
				)}
			</div>
			{node.choices && (
				<div className="scenario__choices">
					{node.choices.map((choice) => (
						<button
							key={choice.next}
							className="btn"
							onClick={() => {
								setHistory([...history, currentId]);
								setCurrentId(choice.next);
							}}
						>
							{choice.label}
						</button>
					))}
				</div>
			)}
			{(isEnd || history.length > 0) && (
				<button className="btn btn--ghost" onClick={reset}>
					Start over
				</button>
			)}
		</div>
	);
}

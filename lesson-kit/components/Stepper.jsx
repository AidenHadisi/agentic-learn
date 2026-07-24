import React, { useState } from "react";

export function Stepper({ children }) {
	const steps = React.Children.toArray(children);
	const [current, setCurrent] = useState(0);

	return (
		<div className="stepper">
			<div className="stepper__content">{steps[current]}</div>
			<div className="stepper__controls">
				<button
					className="btn"
					disabled={current === 0}
					onClick={() => setCurrent((c) => c - 1)}
				>
					Back
				</button>
				<span className="stepper__progress">
					{current + 1} / {steps.length}
				</span>
				<button
					className="btn btn--primary"
					disabled={current === steps.length - 1}
					onClick={() => setCurrent((c) => c + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export function Step({ children }) {
	return <div className="stepper__step">{children}</div>;
}

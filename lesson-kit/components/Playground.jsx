import React, { useState } from "react";

export function Playground({ controls, outputs }) {
	const [values, setValues] = useState(() =>
		Object.fromEntries(controls.map((c) => [c.id, c.value])),
	);

	const compute = (output) => {
		let result = output.intercept || 0;
		for (const [key, coeff] of Object.entries(output.terms)) {
			result += coeff * (values[key] || 0);
		}
		return result.toFixed(output.precision ?? 1);
	};

	return (
		<div className="playground">
			<div className="playground__controls">
				{controls.map((ctrl) => (
					<label key={ctrl.id} className="playground__control">
						<span>{ctrl.label}: {values[ctrl.id]}</span>
						<input
							type="range"
							min={ctrl.min}
							max={ctrl.max}
							step={ctrl.step}
							value={values[ctrl.id]}
							onChange={(e) =>
								setValues({ ...values, [ctrl.id]: Number(e.target.value) })
							}
						/>
					</label>
				))}
			</div>
			<div className="playground__outputs">
				{outputs.map((out, i) => (
					<div key={i} className="playground__output">
						<strong>{out.label}:</strong> {compute(out)}{out.unit || ""}
					</div>
				))}
			</div>
		</div>
	);
}

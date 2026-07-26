import React, { useState } from "react";
import { Chart } from "./Chart.jsx";

function selectOptions(options) {
	return options.map((o) =>
		typeof o === "object" ? o : { label: String(o), value: o },
	);
}

function formatOutput(output, values) {
	let result;
	try {
		result = output.compute(values);
	} catch {
		return "—";
	}
	if (typeof result !== "number") return result;
	if (!Number.isFinite(result)) return "—";
	return result.toFixed(output.precision ?? 2);
}

function Control({ control, value, onChange }) {
	const type = control.type ?? "range";

	if (type === "select") {
		const options = selectOptions(control.options);
		return (
			<label className="playground__control">
				<span className="playground__label">{control.label}</span>
				<select
					className="playground__select"
					value={String(value)}
					onChange={(e) =>
						onChange(options.find((o) => String(o.value) === e.target.value).value)
					}
				>
					{options.map((o) => (
						<option key={String(o.value)} value={String(o.value)}>{o.label}</option>
					))}
				</select>
			</label>
		);
	}

	if (type === "toggle") {
		return (
			<label className="playground__control playground__control--toggle">
				<input
					type="checkbox"
					checked={Boolean(value)}
					onChange={(e) => onChange(e.target.checked)}
				/>
				<span className="playground__label">{control.label}</span>
			</label>
		);
	}

	return (
		<label className="playground__control">
			<span className="playground__label">
				{control.label}
				<span className="playground__value">{value}</span>
			</span>
			<input
				type="range"
				min={control.min}
				max={control.max}
				step={control.step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
		</label>
	);
}

export function Playground({ controls, outputs, chart }) {
	const initial = Object.fromEntries(controls.map((c) => [c.id, c.value]));
	const [values, setValues] = useState(initial);

	let chartConfig = null;
	if (chart) {
		try {
			chartConfig = chart(values);
		} catch {
			chartConfig = null;
		}
	}

	return (
		<div className="playground">
			<div className="playground__controls">
				{controls.map((control) => (
					<Control
						key={control.id}
						control={control}
						value={values[control.id]}
						onChange={(next) => setValues((prev) => ({ ...prev, [control.id]: next }))}
					/>
				))}
			</div>
			<div className="playground__outputs">
				{outputs.map((out, i) => (
					<div key={i} className="playground__output">
						<span className="playground__output-label">{out.label}</span>
						<span className="playground__output-value">
							{formatOutput(out, values)}{out.unit ?? ""}
						</span>
					</div>
				))}
			</div>
			{chartConfig && (
				<Chart
					{...chartConfig}
					options={{ animation: false, ...chartConfig.options }}
				/>
			)}
			<button className="btn btn--sm btn--ghost" onClick={() => setValues(initial)}>
				Reset
			</button>
		</div>
	);
}

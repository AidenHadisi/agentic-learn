import React, { useState } from "react";

function normalize(text) {
	return String(text).trim().toLowerCase().replace(/\s+/g, " ");
}

function isCorrect(input, answer, tolerance) {
	const accepted = Array.isArray(answer) ? answer : [answer];
	return accepted.some((candidate) => {
		if (typeof candidate === "number") {
			const n = Number(input);
			return Number.isFinite(n) && Math.abs(n - candidate) <= (tolerance ?? 0);
		}
		return normalize(input) === normalize(candidate);
	});
}

export function Blank({ answer, tolerance, hint }) {
	const [value, setValue] = useState("");
	const [status, setStatus] = useState("idle");
	const [missed, setMissed] = useState(false);
	const [revealed, setRevealed] = useState(false);

	const expected = Array.isArray(answer) ? answer[0] : answer;
	const solved = status === "correct";
	const inputClass = [
		"blank__input",
		status === "correct" && "blank__input--correct",
		status === "incorrect" && "blank__input--incorrect",
	].filter(Boolean).join(" ");

	const check = () => {
		if (!value.trim() || solved) return;
		if (isCorrect(value, answer, tolerance)) {
			setStatus("correct");
		} else {
			setStatus("incorrect");
			setMissed(true);
		}
	};

	const reveal = () => {
		setValue(String(expected));
		setStatus("idle");
		setRevealed(true);
	};

	return (
		<span className="blank">
			<input
				className={inputClass}
				type="text"
				size={Math.max(6, String(expected).length + 2)}
				value={value}
				disabled={solved || revealed}
				aria-label="Fill in the blank"
				onChange={(e) => {
					setValue(e.target.value);
					setStatus("idle");
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						check();
					}
				}}
			/>
			{!solved && !revealed && (
				<button className="btn btn--sm" onClick={check}>Check</button>
			)}
			{solved && <span className="blank__mark blank__mark--correct">✓</span>}
			{revealed && <span className="blank__mark">answer shown</span>}
			{status === "incorrect" && (
				<span className="blank__note blank__note--incorrect">
					Not quite.{hint ? ` ${hint}` : ""}
				</span>
			)}
			{missed && !solved && !revealed && (
				<button className="btn btn--ghost btn--sm" onClick={reveal}>Show answer</button>
			)}
		</span>
	);
}

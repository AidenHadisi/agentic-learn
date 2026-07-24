import React, { useEffect, useRef, useState } from "react";

let mermaidReady = null;

function getMermaid() {
	if (!mermaidReady) {
		mermaidReady = import("mermaid").then((m) => {
			m.default.initialize({
				startOnLoad: false,
				theme: window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "default",
			});
			return m.default;
		});
	}
	return mermaidReady;
}

export function Mermaid({ chart }) {
	const ref = useRef(null);
	const [svg, setSvg] = useState("");

	useEffect(() => {
		let cancelled = false;
		const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
		getMermaid().then(async (mermaid) => {
			if (cancelled) return;
			const { svg: rendered } = await mermaid.render(id, chart.trim());
			if (!cancelled) setSvg(rendered);
		});
		return () => { cancelled = true; };
	}, [chart]);

	return (
		<div
			className="mermaid-wrapper"
			ref={ref}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

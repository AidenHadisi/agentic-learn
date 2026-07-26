import React, { useEffect, useState } from "react";
import svgs from "virtual:mermaid-svgs";
import { chartHash } from "../mermaid-hash.js";

const darkQuery = "(prefers-color-scheme: dark)";

export function Mermaid({ chart }) {
	const [dark, setDark] = useState(() => window.matchMedia(darkQuery).matches);

	useEffect(() => {
		const mq = window.matchMedia(darkQuery);
		const onChange = (e) => setDark(e.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	const rendered = svgs[chartHash(chart)];
	if (!rendered) {
		return (
			<pre className="mermaid-wrapper">
				{`Mermaid diagram was not pre-rendered — rebuild this lesson.\n\n${chart.trim()}`}
			</pre>
		);
	}

	return (
		<div
			className="mermaid-wrapper"
			dangerouslySetInnerHTML={{ __html: dark ? rendered.dark : rendered.light }}
		/>
	);
}

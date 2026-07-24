export { Callout } from "./Callout.jsx";
export { Quiz } from "./Quiz.jsx";
export { Stepper, Step } from "./Stepper.jsx";
export { Reveal } from "./Reveal.jsx";
export { Scenario } from "./Scenario.jsx";
export { Playground } from "./Playground.jsx";
export { Tabs, Tab } from "./Tabs.jsx";
export { Mermaid } from "./Mermaid.jsx";
export { Chart } from "./Chart.jsx";
export { CodeBlock } from "./CodeBlock.jsx";
export { Sources } from "./Sources.jsx";

import { CodeBlock } from "./CodeBlock.jsx";
import React from "react";

export const components = {
	pre: ({ children }) => children,
	code: ({ className, children, ...rest }) => {
		const match = /language-(\w+)/.exec(className || "");
		if (match) {
			return <CodeBlock language={match[1]} code={String(children).trimEnd()} />;
		}
		return <code className={className} {...rest}>{children}</code>;
	},
};

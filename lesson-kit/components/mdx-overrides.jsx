import React from "react";
import { CodeBlock } from "./CodeBlock.jsx";

// Used when the lesson has fenced code or an explicit <CodeBlock>.
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

import React from "react";

// Used when the lesson has no fenced code and no <CodeBlock>, so highlight.js
// stays out of the single-file bundle.
export const components = {
	pre: ({ children }) => children,
	code: ({ className, children, ...rest }) => (
		<code className={className} {...rest}>{children}</code>
	),
};

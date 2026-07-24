import React from "react";

export function CodeBlock({ language, code, title }) {
	return (
		<div className="codeblock">
			{title && <div className="codeblock__title">{title}</div>}
			<pre>
				<code className={language ? `language-${language}` : ""}>{code}</code>
			</pre>
		</div>
	);
}

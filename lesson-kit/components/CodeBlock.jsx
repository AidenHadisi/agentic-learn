import React, { useMemo } from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import go from "highlight.js/lib/languages/go";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("go", go);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);

function highlight(code, language) {
	if (language && hljs.getLanguage(language)) {
		return hljs.highlight(code, { language }).value;
	}
	return hljs.highlightAuto(code).value;
}

export function CodeBlock({ language, code, title }) {
	const html = useMemo(() => highlight(code, language), [code, language]);

	return (
		<div className="codeblock">
			{title && <div className="codeblock__title">{title}</div>}
			<pre>
				<code
					className={language ? `hljs language-${language}` : "hljs"}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</pre>
		</div>
	);
}

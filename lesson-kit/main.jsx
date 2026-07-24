import React from "react";
import { createRoot } from "react-dom/client";
import { MDXProvider } from "@mdx-js/react";
import Lesson from "@learn/lesson";
import { components } from "@learn/components";
import { LessonShell } from "./LessonShell.jsx";
import "katex/dist/katex.min.css";
import "./styles/tokens.css";
import "./styles/components.css";

createRoot(document.getElementById("root")).render(
	<MDXProvider components={components}>
		<LessonShell>
			<Lesson />
		</LessonShell>
	</MDXProvider>,
);

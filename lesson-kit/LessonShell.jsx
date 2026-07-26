import React, { useEffect, useRef, useState } from "react";

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

function TocList({ headings, active }) {
	return (
		<ol className="toc__list">
			{headings.map((h) => (
				<li key={h.id}>
					<a
						className={`toc__link ${h.id === active ? "toc__link--active" : ""}`}
						href={`#${h.id}`}
					>
						{h.text}
					</a>
				</li>
			))}
		</ol>
	);
}

export function LessonShell({ children }) {
	const articleRef = useRef(null);
	const [headings, setHeadings] = useState([]);
	const [active, setActive] = useState(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const article = articleRef.current;
		if (!article) return;

		const found = [...article.querySelectorAll("h2")].map((h) => {
			if (!h.id) h.id = slugify(h.textContent);
			return { id: h.id, text: h.textContent };
		});
		setHeadings(found);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			{ rootMargin: "0px 0px -75% 0px" },
		);
		for (const h of article.querySelectorAll("h2")) observer.observe(h);

		const words = article.textContent.trim().split(/\s+/).length;
		const readtime = document.createElement("div");
		readtime.className = "lesson__readtime";
		readtime.textContent = `${Math.max(1, Math.round(words / 200))} min read`;
		article.querySelector("h1")?.after(readtime);

		return () => {
			observer.disconnect();
			readtime.remove();
		};
	}, []);

	useEffect(() => {
		const onScroll = () => {
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return (
		<>
			<div className="progress">
				<div className="progress__fill" style={{ transform: `scaleX(${progress})` }} />
			</div>
			<div className="lesson-layout">
				{headings.length > 1 && (
					<nav className="toc" aria-label="Table of contents">
						<details className="toc__collapsed">
							<summary className="toc__summary">Contents</summary>
							<TocList headings={headings} active={active} />
						</details>
						<div className="toc__sidebar">
							<div className="toc__heading">Contents</div>
							<TocList headings={headings} active={active} />
						</div>
					</nav>
				)}
				<article className="lesson" ref={articleRef}>
					{children}
				</article>
			</div>
		</>
	);
}

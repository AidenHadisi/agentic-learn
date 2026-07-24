import React from "react";

export function Sources({ list }) {
	if (!list || list.length === 0) return null;

	return (
		<section className="sources">
			<h2 className="sources__heading">References</h2>
			<ol className="sources__list">
				{list.map((s, i) => (
					<li key={s.id ?? i} id={`ref-${s.id ?? i + 1}`} className="sources__item">
						{s.author && <span className="sources__author">{s.author}</span>}
						{s.year && <span className="sources__year"> ({s.year})</span>}
						{s.title && <>. <cite className="sources__title">{s.title}</cite></>}
						{s.url && (
							<>
								.{" "}
								<a href={s.url} target="_blank" rel="noopener noreferrer" className="sources__link">
									{new URL(s.url).hostname.replace(/^www\./, "")}
								</a>
							</>
						)}
					</li>
				))}
			</ol>
		</section>
	);
}

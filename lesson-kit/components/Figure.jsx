import React from "react";

export function Figure({ src, alt, caption }) {
	return (
		<figure className="figure">
			<img className="figure__img" src={src} alt={alt ?? caption ?? ""} />
			{caption && <figcaption className="figure__caption">{caption}</figcaption>}
		</figure>
	);
}

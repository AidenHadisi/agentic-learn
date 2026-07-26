import React from "react";

export function Ref({ n }) {
	const ids = Array.isArray(n) ? n : [n];

	return (
		<sup className="ref">
			{ids.map((id, i) => (
				<React.Fragment key={id}>
					{i > 0 && ","}
					<a className="ref__link" href={`#ref-${id}`}>{id}</a>
				</React.Fragment>
			))}
		</sup>
	);
}

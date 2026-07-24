import React, { useState } from "react";

export function Reveal({ prompt = "Reveal explanation", children }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="reveal">
			{!open && (
				<button className="btn btn--primary" onClick={() => setOpen(true)}>
					{prompt}
				</button>
			)}
			{open && <div className="reveal__content">{children}</div>}
		</div>
	);
}

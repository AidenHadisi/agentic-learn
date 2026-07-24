import React from "react";

const variants = {
	key: { label: "Key Takeaway", className: "callout--key" },
	warn: { label: "Warning", className: "callout--warn" },
	info: { label: "Note", className: "callout--info" },
	tip: { label: "Tip", className: "callout--tip" },
};

export function Callout({ variant = "info", title, children }) {
	const v = variants[variant] || variants.info;
	return (
		<aside className={`callout ${v.className}`}>
			<div className="callout__title">{title || v.label}</div>
			<div className="callout__body">{children}</div>
		</aside>
	);
}

import React, { useState } from "react";

export function Tabs({ children }) {
	const tabs = React.Children.toArray(children);
	const [active, setActive] = useState(0);

	return (
		<div className="tabs">
			<div className="tabs__list" role="tablist">
				{tabs.map((tab, i) => (
					<button
						key={i}
						role="tab"
						className={`tabs__tab ${i === active ? "tabs__tab--active" : ""}`}
						aria-selected={i === active}
						onClick={() => setActive(i)}
					>
						{tab.props.label || `Tab ${i + 1}`}
					</button>
				))}
			</div>
			<div className="tabs__panel" role="tabpanel">
				{tabs[active]}
			</div>
		</div>
	);
}

export function Tab({ children }) {
	return <div>{children}</div>;
}

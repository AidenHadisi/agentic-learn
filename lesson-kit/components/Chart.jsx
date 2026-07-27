import React, { useEffect, useRef } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	PointElement,
	LineElement,
	LineController,
	BarElement,
	BarController,
	ArcElement,
	DoughnutController,
	PieController,
	ScatterController,
	Filler,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register inside the component so this module has no top-level side effects.
// Otherwise Rollup keeps Chart.js in every lesson even when Chart is unused.
let registered = false;
function ensureRegistered() {
	if (registered) return;
	ChartJS.register(
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		PointElement,
		LineElement,
		LineController,
		BarElement,
		BarController,
		ArcElement,
		DoughnutController,
		PieController,
		ScatterController,
		Filler,
		Title,
		Tooltip,
		Legend,
	);
	registered = true;
}

/** Legible against both the light and dark lesson backgrounds. */
const SERIES_COLORS = ["#0d9488", "#6366f1", "#f59e0b", "#db2777", "#0891b2", "#84cc16"];

const SLICE_TYPES = new Set(["pie", "doughnut"]);

function cssToken(name, fallback) {
	const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	return value || fallback;
}

/**
 * Give every dataset a series color so lessons don't hand-write palettes.
 * Anything the author set explicitly wins — hence the trailing spread.
 */
function withSeriesColors(type, data) {
	if (!data?.datasets) return data;
	const datasets = data.datasets.map((dataset, index) => {
		if (SLICE_TYPES.has(dataset.type ?? type)) {
			return {
				backgroundColor: dataset.data.map(
					(_, slice) => SERIES_COLORS[slice % SERIES_COLORS.length],
				),
				...dataset,
			};
		}
		const color = SERIES_COLORS[index % SERIES_COLORS.length];
		return {
			borderColor: color,
			// A filled dataset shades an area, so it needs to stay readable
			// underneath the curve rather than obscure it.
			backgroundColor: dataset.fill ? `${color}33` : color,
			...dataset,
		};
	});
	return { ...data, datasets };
}

export function Chart({ type = "line", data, options, height }) {
	const canvasRef = useRef(null);
	const chartRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		ensureRegistered();
		ChartJS.defaults.color = cssToken("--text-muted", "#57534e");
		ChartJS.defaults.borderColor = cssToken("--border", "#e7e5e4");
		ChartJS.defaults.font.family = cssToken("--font-body", "system-ui, sans-serif");
		// Chart.js hardcodes white arc borders, which glare on the dark theme.
		ChartJS.defaults.elements.arc.borderColor = cssToken("--bg", "#fdfcfa");

		chartRef.current = new ChartJS(canvasRef.current, {
			type,
			data: withSeriesColors(type, data),
			options: {
				responsive: true,
				// The wrapper supplies a definite height, so the canvas fills it.
				// Letting Chart.js derive its own size makes it latch onto the
				// transient pre-TOC layout width and never grow back.
				maintainAspectRatio: false,
				...options,
			},
		});
		return () => {
			chartRef.current?.destroy();
		};
	}, [type, data, options]);

	return (
		<div className="chart-wrapper" style={height ? { height } : undefined}>
			<canvas ref={canvasRef} />
		</div>
	);
}

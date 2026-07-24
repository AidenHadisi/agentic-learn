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
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	PointElement,
	LineElement,
	LineController,
	BarElement,
	BarController,
	Title,
	Tooltip,
	Legend,
);

export function Chart({ type = "line", data, options }) {
	const canvasRef = useRef(null);
	const chartRef = useRef(null);

	useEffect(() => {
		if (!canvasRef.current) return;
		chartRef.current = new ChartJS(canvasRef.current, {
			type,
			data,
			options: {
				responsive: true,
				...options,
			},
		});
		return () => {
			chartRef.current?.destroy();
		};
	}, [type, data, options]);

	return (
		<div className="chart-wrapper">
			<canvas ref={canvasRef} />
		</div>
	);
}

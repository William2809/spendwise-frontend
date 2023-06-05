import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";

export const ChartComponent = ({
	weeklySpending,
}: {
	weeklySpending: number[];
}) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const myChartRef = useRef<Chart<"bar", number[], string> | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			const maxDataValue =
				Math.max(...weeklySpending) + Math.max(...weeklySpending) * 0.2;
			const trackData = new Array(weeklySpending.length).fill(maxDataValue);

			const config: ChartConfiguration<"bar", number[], string> = {
				type: "bar",
				data: {
					labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					datasets: [
						{
							label: "Spending",
							data: weeklySpending,
							backgroundColor: "#ffffff",
							barPercentage: 0.7,
							categoryPercentage: 0.7,
							order: 1,
						},
						{
							label: "Track",
							data: trackData,
							backgroundColor: "#3D8D53",
							order: 2,
							barPercentage: 0.7,
							categoryPercentage: 0.7,
						},
					],
				},
				options: {
					scales: {
						y: {
							border: {
								display: false,
							},
							position: "right",
							beginAtZero: true,
							grid: {
								color: "transparent",
								drawOnChartArea: false,
							},
							ticks: {
								color: "white", // set text color
								font: {
									size: 16, // set font size
									// you can add more properties to style the font
								},
							},
						},
						x: {
							border: {
								display: false,
							},
							stacked: true,
							grid: {
								color: "transparent",
							},
							ticks: {
								color: "white", // set text color
								font: {
									size: 16,
									weight: "normal",
								},
							},
						},
					},
					plugins: {
						legend: {
							display: false,
						},
						tooltip: {
							filter: function (tooltipItem) {
								return tooltipItem.dataset.label !== "Track";
							},
						},
					},
					elements: {
						bar: {
							borderRadius: 12,
							borderSkipped: false,
						},
					},
					layout: {
						padding: 20,
					},
				},
			};

			myChartRef.current = new Chart(chartRef.current, config);

			return () => {
				myChartRef.current?.destroy();
			};
		}
	}, [weeklySpending]);

	return <canvas ref={chartRef}></canvas>;
};

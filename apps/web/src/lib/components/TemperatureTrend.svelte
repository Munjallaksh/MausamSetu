<script lang="ts">
	import { Sun, Cloud, CloudSun, Droplets } from '@lucide/svelte';
	import type { CityWeather } from '$lib/data/weatherData';

	let { weather }: { weather?: CityWeather } = $props();

	// 24-Hour Prediction Telemetry Data
	const hourlyData = [
		{ time: '12 AM', icon: 'Cloud', temp: 25, rainProb: 10, humidity: 70 },
		{ time: '1 AM', icon: 'Cloud', temp: 24, rainProb: 10, humidity: 72 },
		{ time: '2 AM', icon: 'Cloud', temp: 24, rainProb: 15, humidity: 74 },
		{ time: '3 AM', icon: 'Cloud', temp: 24, rainProb: 15, humidity: 75 },
		{ time: '4 AM', icon: 'Cloud', temp: 24, rainProb: 20, humidity: 75 },
		{ time: '5 AM', icon: 'Cloud', temp: 25, rainProb: 20, humidity: 73 },
		{ time: '6 AM', icon: 'Cloud', temp: 26, rainProb: 15, humidity: 70 },
		{ time: '7 AM', icon: 'CloudSun', temp: 27, rainProb: 10, humidity: 65 },
		{ time: '8 AM', icon: 'CloudSun', temp: 29, rainProb: 5, humidity: 60 },
		{ time: '9 AM', icon: 'CloudSun', temp: 31, rainProb: 5, humidity: 55 },
		{ time: '10 AM', icon: 'CloudSun', temp: 33, rainProb: 0, humidity: 48 },
		{ time: '11 AM', icon: 'CloudSun', temp: 34, rainProb: 0, humidity: 45 },
		{ time: '12 PM', icon: 'CloudSun', temp: 35, rainProb: 0, humidity: 42 },
		{ time: '1 PM', icon: 'Sun', temp: 35, rainProb: 0, humidity: 40 },
		{ time: '2 PM', icon: 'Sun', temp: 35, rainProb: 0, humidity: 38 },
		{ time: '3 PM', icon: 'Sun', temp: 34, rainProb: 5, humidity: 40 },
		{ time: '4 PM', icon: 'Sun', temp: 33, rainProb: 10, humidity: 44 },
		{ time: '5 PM', icon: 'Sun', temp: 31, rainProb: 15, humidity: 50 },
		{ time: '6 PM', icon: 'CloudSun', temp: 29, rainProb: 20, humidity: 56 },
		{ time: '7 PM', icon: 'Cloud', temp: 27, rainProb: 25, humidity: 62 },
		{ time: '8 PM', icon: 'Cloud', temp: 26, rainProb: 30, humidity: 65 },
		{ time: '9 PM', icon: 'Cloud', temp: 26, rainProb: 30, humidity: 68 },
		{ time: '10 PM', icon: 'Cloud', temp: 25, rainProb: 20, humidity: 70 },
		{ time: '11 PM', icon: 'Cloud', temp: 25, rainProb: 15, humidity: 70 }
	];

	const minTemp = 20;
	const maxTemp = 38;

	// Map 24 columns to viewBox coordinate space [0, 24] x [0, 100]
	const points = hourlyData.map((pt, i) => {
		const x = i + 0.5;
		const y = 85 - ((pt.temp - minTemp) / (maxTemp - minTemp)) * 65;
		return { x, y, ...pt };
	});

	function getSplinePath(pts: { x: number; y: number }[]) {
		if (pts.length < 2) return '';
		let d = `M ${pts[0].x},${pts[0].y}`;
		for (let i = 0; i < pts.length - 1; i++) {
			const p0 = pts[i === 0 ? i : i - 1];
			const p1 = pts[i];
			const p2 = pts[i + 1];
			const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

			const cp1x = p1.x + (p2.x - p0.x) / 6;
			const cp1y = p1.y + (p2.y - p0.y) / 6;
			const cp2x = p2.x - (p3.x - p1.x) / 6;
			const cp2y = p2.y - (p3.y - p1.y) / 6;

			d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
		}
		return d;
	}

	const curvePath = getSplinePath(points);
	const areaPath = `${curvePath} L ${points[points.length - 1].x},100 L ${points[0].x},100 Z`;

	let hoverIdx = $state<number | null>(null);
</script>

<div class="w-full space-y-2">
	<!-- Section Header -->
	<div class="flex items-center justify-between px-1">
		<div class="flex items-center gap-2">
			<h3 class="text-sm font-bold text-slate-900 tracking-tight">Hourly Weather Prediction</h3>
			<span class="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
				Google Weather Model
			</span>
		</div>
		{#if hoverIdx !== null}
			<div class="text-xs font-semibold text-slate-700 flex items-center gap-3 animate-fade-in">
				<span>{hourlyData[hoverIdx].time}</span>
				<span class="text-amber-600 font-bold">{hourlyData[hoverIdx].temp}°C</span>
				<span class="text-blue-600 flex items-center gap-1">
					<Droplets class="w-3 h-3" /> {hourlyData[hoverIdx].rainProb}% Rain
				</span>
			</div>
		{:else}
			<span class="text-xs font-medium text-slate-400">Hover for Prediction Telemetry</span>
		{/if}
	</div>

	<!-- Hourly Forecast Card container -->
	<div class="w-full bg-white rounded-[20px] border border-slate-200/80 shadow-2xs px-4 py-3.5 overflow-hidden">
		<div class="w-full select-none">
			<!-- Top Row: Time Labels, Icons, and Temperature values (24 Equal Columns) -->
			<div class="grid grid-cols-24 w-full gap-0 text-center mb-1">
				{#each hourlyData as item, idx (idx)}
					<button
						class="flex flex-col items-center space-y-1 transition-transform duration-150 cursor-pointer rounded-lg p-0.5
							{hoverIdx === idx ? 'bg-blue-50/80 scale-105' : ''}"
						onmouseenter={() => (hoverIdx = idx)}
						onmouseleave={() => (hoverIdx = null)}
						onfocus={() => (hoverIdx = idx)}
						onblur={() => (hoverIdx = null)}
					>
						<span class="text-[9px] font-bold text-slate-600 tracking-tight">{item.time}</span>
						<div class="h-4 flex items-center justify-center">
							{#if item.icon === 'Sun'}
								<Sun class="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
							{:else if item.icon === 'CloudSun'}
								<CloudSun class="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
							{:else}
								<Cloud class="w-3.5 h-3.5 text-slate-300 fill-slate-200" />
							{/if}
						</div>
						<span class="text-[11px] font-bold text-slate-800">{item.temp}°</span>
					</button>
				{/each}
			</div>

			<!-- Bottom Row: Smooth Full-Width Orange Spline Curve -->
			<div class="w-full relative h-[50px]">
				<svg
					viewBox="0 0 24 100"
					preserveAspectRatio="none"
					class="w-full h-full overflow-visible"
					aria-label="Hourly Temperature Spline Curve"
				>
					<defs>
						<linearGradient id="hourlyOrangeGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="#ffb800" stop-opacity="0.45" />
							<stop offset="80%" stop-color="#ffb800" stop-opacity="0.08" />
							<stop offset="100%" stop-color="#ffffff" stop-opacity="0.0" />
						</linearGradient>
					</defs>

					<!-- Gradient Fill under spline -->
					<path d={areaPath} fill="url(#hourlyOrangeGrad)" />

					<!-- Orange Spline Curve spanning 100% width -->
					<path
						d={curvePath}
						fill="none"
						stroke="#f59e0b"
						stroke-width="2.5"
						stroke-linecap="round"
						vector-effect="non-scaling-stroke"
					/>

					<!-- Yellow Node Dots -->
					{#each points as pt, idx (idx)}
						<circle
							cx={pt.x}
							cy={pt.y}
							r={hoverIdx === idx ? '0.9' : '0.45'}
							fill={hoverIdx === idx ? '#f59e0b' : '#ffffff'}
							stroke="#f59e0b"
							stroke-width="0.35"
							class="transition-all duration-150 cursor-pointer"
						/>
					{/each}
				</svg>
			</div>
		</div>
	</div>
</div>

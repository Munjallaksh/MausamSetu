<script lang="ts">
	import { Sun, Cloud, CloudSun, CloudRain, CloudLightning, Droplets } from '@lucide/svelte';
	import type { ForecastDay } from '$lib/data/weatherData';

	let { forecast }: { forecast?: ForecastDay[] } = $props();

	const forecastDays = [
		{ day: 'Fri', date: '30 May', icon: 'CloudRain', high: 33, low: 26, condition: 'Light Rain', rainfall: 18 },
		{ day: 'Sat', date: '31 May', icon: 'CloudLightning', high: 32, low: 25, condition: 'Thunderstorm', rainfall: 25 },
		{ day: 'Sun', date: '01 Jun', icon: 'Cloud', high: 31, low: 25, condition: 'Cloudy', rainfall: 8 },
		{ day: 'Mon', date: '02 Jun', icon: 'CloudRain', high: 30, low: 24, condition: 'Light Rain', rainfall: 15 },
		{ day: 'Tue', date: '03 Jun', icon: 'CloudSun', high: 31, low: 24, condition: 'Partly Cloudy', rainfall: 6 },
		{ day: 'Wed', date: '04 Jun', icon: 'Sun', high: 32, low: 25, condition: 'Sunny', rainfall: 2 },
		{ day: 'Thu', date: '05 Jun', icon: 'CloudRain', high: 32, low: 26, condition: 'Light Rain', rainfall: 12 }
	];
</script>

<div class="w-full space-y-1.5">
	<!-- Section Title -->
	<h3 class="text-xs font-bold text-slate-900 tracking-tight">7-Day Forecast</h3>

	<!-- 7 Days Cards Row -->
	<div class="grid grid-cols-7 gap-2">
		{#each forecastDays as card, idx (idx)}
			<div class="bg-white rounded-[16px] border border-slate-200/80 shadow-2xs p-2.5 flex flex-col items-center justify-between text-center space-y-1.5 transition-all duration-200 hover:shadow-xs cursor-pointer">
				<!-- Day & Date -->
				<div class="space-y-0">
					<h4 class="text-xs font-bold text-slate-900 leading-tight">{card.day}</h4>
					<p class="text-[10px] font-medium text-slate-400 leading-none">{card.date}</p>
				</div>

				<!-- Weather Condition Icon -->
				<div class="my-0.5 flex items-center justify-center h-7">
					{#if card.icon === 'Sun'}
						<Sun class="w-6 h-6 text-amber-500 fill-amber-400" />
					{:else if card.icon === 'CloudRain'}
						<CloudRain class="w-6 h-6 text-blue-500 fill-blue-100" />
					{:else if card.icon === 'CloudLightning'}
						<CloudLightning class="w-6 h-6 text-indigo-600 fill-indigo-100" />
					{:else if card.icon === 'Cloud'}
						<Cloud class="w-6 h-6 text-slate-400 fill-slate-200" />
					{:else}
						<CloudSun class="w-6 h-6 text-amber-500 fill-amber-400" />
					{/if}
				</div>

				<!-- High & Low Temperatures -->
				<div class="flex items-center gap-1 text-xs font-bold leading-none">
					<span class="text-orange-500">{card.high}°</span>
					<span class="text-slate-300">/</span>
					<span class="text-blue-600">{card.low}°</span>
				</div>

				<!-- Condition Text -->
				<p class="text-[10px] font-semibold text-slate-700 leading-tight truncate max-w-full">
					{card.condition}
				</p>

				<!-- Rainfall Indicator -->
				<div class="flex items-center justify-center gap-0.5 text-[10px] font-semibold text-blue-600 leading-none">
					<Droplets class="w-3 h-3 fill-blue-500/20" />
					<span>{card.rainfall} mm</span>
				</div>
			</div>
		{/each}
	</div>
</div>

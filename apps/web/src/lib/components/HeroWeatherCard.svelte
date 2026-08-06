<script lang="ts">
	import { MapPin, Sun, Cloud, Sparkles } from '@lucide/svelte';
	import type { CityWeather } from '$lib/data/weatherData';
	import indiaGateImg from '$lib/assets/india_gate.png';

	let { weather }: { weather: CityWeather } = $props();
</script>

<div class="w-full bg-white rounded-[22px] border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-row items-stretch justify-between h-[210px] min-h-[210px]">
	<!-- Left Weather Content Block -->
	<div class="flex-1 p-6 z-10 flex flex-col justify-between h-full bg-gradient-to-r from-white via-white/95 via-50% to-transparent">
		<!-- Location, Date & AI Badge -->
		<div class="space-y-1">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2 text-slate-900 font-bold text-lg leading-tight">
					<MapPin class="w-5 h-5 text-blue-600 fill-blue-600/20" />
					<span>{weather.formattedLocation.replace('📍 ', '')}</span>
				</div>
				<!-- AI Prediction Badge -->
				<span class="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
					<Sparkles class="w-3 h-3 text-blue-600" />
					<span>98.6% AI Prediction Match</span>
				</span>
			</div>
			<p class="text-xs font-medium text-slate-500">
				Thursday, 29 May 2025 | 10:30 AM
			</p>
		</div>

		<!-- Main Temperature & Icon -->
		<div class="space-y-1 my-auto">
			<div class="flex items-center gap-4">
				<span class="text-5xl md:text-6xl font-black tracking-tight text-slate-900 font-sans">
					{weather.current.temp}°<span class="text-4xl font-extrabold text-slate-900">C</span>
				</span>

				<!-- 3D Weather Icon -->
				<div class="relative w-14 h-14 flex items-center justify-center">
					<Sun class="w-10 h-10 text-amber-400 fill-amber-400 absolute -top-1 -right-1 drop-shadow-md" />
					<Cloud class="w-10 h-10 text-slate-100 fill-white stroke-slate-300 absolute bottom-0 left-0 drop-shadow-md" />
				</div>
			</div>

			<!-- Weather Condition -->
			<h3 class="text-base font-bold text-slate-900 leading-tight">
				{weather.current.condition}
			</h3>

			<!-- Feels Like -->
			<p class="text-xs font-medium text-slate-500">
				Feels like {weather.current.feelsLike}°C
			</p>
		</div>
	</div>

	<!-- Right Scenic India Gate Image on Right Side matching original reference -->
	<div class="w-[45%] md:w-[48%] relative h-full overflow-hidden">
		<img
			src={indiaGateImg}
			alt="India Gate New Delhi Scenic View"
			class="w-full h-full object-cover object-center scale-105"
		/>

		<!-- Left Fade Blending Overlay -->
		<div class="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
		<div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>

		<!-- Bottom Right Min / Max Dark Translucent Pills -->
		<div class="absolute bottom-4 right-4 flex items-center gap-2 z-20">
			<div class="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-md">
				Min 26°C
			</div>
			<div class="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-md">
				Max 35°C
			</div>
		</div>
	</div>
</div>

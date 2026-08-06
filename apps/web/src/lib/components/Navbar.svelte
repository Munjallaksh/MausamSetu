<script lang="ts">
	import { MapPin, Sun, ChevronDown } from '@lucide/svelte';
	import IsroLogo from '$lib/components/IsroLogo.svelte';
	import { activeCityId, setCity } from '$lib/stores/weatherStore';
	import { CITIES_WEATHER_DATA } from '$lib/data/weatherData';

	let currentCityId = $state(activeCityId.get());
	let isDropdownOpen = $state(false);

	$effect(() => {
		const unsubscribe = activeCityId.subscribe((val) => {
			currentCityId = val;
		});
		return unsubscribe;
	});

	function handleSelectCity(id: string) {
		setCity(id);
		isDropdownOpen = false;
	}

	let activeCity = $derived(CITIES_WEATHER_DATA[currentCityId] ?? CITIES_WEATHER_DATA['new-delhi']);
</script>

<header class="w-full bg-[#F7FAFC] px-6 py-2.5 flex items-center justify-between z-20 border-b border-slate-200/60">
	<!-- Left: Brand Title & Subtitle -->
	<div class="space-y-0">
		<h1 class="text-xl font-black tracking-tight text-[#0F172A] font-sans uppercase leading-tight">
			MAUSAMSETU
		</h1>
		<p class="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">
			AI-POWERED CLIMATE DIGITAL TWIN OF INDIA
		</p>
	</div>

	<!-- Center: ISRO Logo & ISRO DIGITAL TWIN Branding -->
	<div class="flex items-center gap-2.5">
		<IsroLogo class="h-8" />
		<div class="flex flex-col text-left">
			<h2 class="text-base font-black text-[#0F172A] tracking-tight uppercase leading-none">
				ISRO DIGITAL TWIN
			</h2>
			<p class="text-[10px] font-medium text-slate-500 mt-0.5 leading-none">
				Powered by India's National Dataset
			</p>
		</div>
	</div>

	<!-- Right Controls: Country Dropdown & Sun Toggle Button -->
	<div class="flex items-center gap-2.5">
		<!-- Location Pill Dropdown -->
		<div class="relative">
			<button
				onclick={() => (isDropdownOpen = !isDropdownOpen)}
				class="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-2xs transition-all duration-200 cursor-pointer"
				aria-expanded={isDropdownOpen}
				aria-haspopup="true"
			>
				<MapPin class="w-3.5 h-3.5 text-blue-600 fill-blue-600/20" />
				<span>{activeCity.country}</span>
				<ChevronDown class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 {isDropdownOpen ? 'rotate-180' : ''}" />
			</button>

			{#if isDropdownOpen}
				<div class="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-50 animate-fade-in">
					<div class="px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
						Select Indian Telemetry Region
					</div>
					{#each Object.values(CITIES_WEATHER_DATA) as city (city.id)}
						<button
							onclick={() => handleSelectCity(city.id)}
							class="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between cursor-pointer
								{city.id === currentCityId ? 'bg-blue-50/70 text-blue-600 font-bold' : ''}"
						>
							<span>{city.name}, {city.state}</span>
							<span class="text-[11px] text-slate-400 font-mono">{city.current.temp}°C</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Sun Light Theme Button -->
		<button class="bg-white text-amber-500 p-2 rounded-full border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer" title="Light Mode Active">
			<Sun class="w-4 h-4 fill-amber-400" />
		</button>
	</div>
</header>

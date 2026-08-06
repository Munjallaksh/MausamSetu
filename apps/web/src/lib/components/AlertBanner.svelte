<script lang="ts">
	import { CloudRain, ChevronRight } from '@lucide/svelte';
	import type { WeatherAlert } from '$lib/data/weatherData';
	import { toggleAlertModal } from '$lib/stores/weatherStore';

	let { alert }: { alert?: WeatherAlert } = $props();
</script>

<div class="w-full bg-[#EBF3FF] border border-blue-100/90 rounded-[16px] px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xs">
	<!-- Left Alert Icon & Message -->
	<div class="flex items-center gap-2.5">
		<CloudRain class="w-5 h-5 text-blue-600 fill-blue-600/20 flex-shrink-0" />
		<p class="text-xs font-semibold text-slate-800">
			Light rain expected on Friday in several parts of North India.
		</p>
	</div>

	<!-- Right Link Button -->
	<button
		onclick={() => toggleAlertModal(true)}
		class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors flex-shrink-0"
	>
		<span>View Alert</span>
		<ChevronRight class="w-3.5 h-3.5" />
	</button>
</div>

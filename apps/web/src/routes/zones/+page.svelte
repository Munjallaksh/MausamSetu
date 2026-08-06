<script lang="ts">
	import { ZONE_POINTS } from '$lib/components/map/zones';
</script>

<svelte:head><title>Zones · MausamSetu</title></svelte:head>
<section>
	<p class="text-sm font-semibold text-cyan-700">Zones</p>
	<h1 class="mt-2 text-3xl font-bold">Nine regional zones</h1>
	<div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each ZONE_POINTS as zone (zone.id)}<div
				class="rounded-xl border border-slate-200 bg-white p-4"
			>
				<p class="font-semibold">{zone.name}</p>
				<p class="mt-1 text-xs text-slate-500">
					{zone.latitude.toFixed(1)}°, {zone.longitude.toFixed(1)}°
				</p>
			</div>{/each}
	</div>
</section>

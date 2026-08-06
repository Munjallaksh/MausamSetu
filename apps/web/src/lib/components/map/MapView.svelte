<script lang="ts">
	import { onMount } from 'svelte';

	import { INDIA_VIEW, ZONE_POINTS } from './zones';

	let container: HTMLDivElement;
	let mapError = $state<string | null>(null);

	onMount(() => {
		let map: import('maplibre-gl').Map | undefined;
		void Promise.all([import('maplibre-gl'), import('@deck.gl/mapbox'), import('@deck.gl/layers')])
			.then(([maplibregl, { MapboxOverlay }, { ScatterplotLayer }]) => {
				map = new maplibregl.Map({
					container,
					style: 'https://demotiles.maplibre.org/style.json',
					center: INDIA_VIEW,
					zoom: 4.2
				});
				const overlay = new MapboxOverlay({
					interleaved: false,
					layers: [
						new ScatterplotLayer({
							id: 'zone-centroids',
							data: ZONE_POINTS,
							getPosition: (point) => [point.longitude, point.latitude],
							getRadius: 50_000,
							getFillColor: [14, 116, 144, 210],
							pickable: true
						})
					]
				});
				map.addControl(overlay);
			})
			.catch((error: unknown) => {
				mapError = error instanceof Error ? error.message : 'Unable to initialize MapLibre.';
			});

		return () => map?.remove();
	});
</script>

<div
	class="relative h-full min-h-125 overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
	aria-label="Map of India"
>
	<div bind:this={container} class="absolute inset-0"></div>
	<div
		class="pointer-events-none absolute top-3 left-3 rounded bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow"
	>
		MapLibre + deck.gl · 9 zone centroids
	</div>
	{#if mapError}
		<p class="absolute inset-x-3 bottom-3 rounded bg-red-50 p-3 text-sm text-red-700">{mapError}</p>
	{/if}
</div>

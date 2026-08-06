<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	let globeError = $state<string | null>(null);

	onMount(() => {
		let viewer: import('cesium').Viewer | undefined;
		void import('cesium')
			.then(async ({ Cartesian3, Ion, Terrain, Viewer }) => {
				window.CESIUM_BASE_URL = '/cesium';
				if (import.meta.env.PUBLIC_CESIUM_ION_ACCESS_TOKEN) {
					Ion.defaultAccessToken = import.meta.env.PUBLIC_CESIUM_ION_ACCESS_TOKEN;
				}
				let terrain: import('cesium').Terrain | undefined;
				try {
					terrain = await Terrain.fromWorldTerrain();
				} catch {
					// Terrain remains optional until an Ion token is configured.
				}
				viewer = new Viewer(container, {
					terrain,
					animation: false,
					timeline: false,
					geocoder: false,
					baseLayerPicker: false
				});
				viewer.camera.setView({ destination: Cartesian3.fromDegrees(79, 22, 3_000_000) });
			})
			.catch((error: unknown) => {
				globeError = error instanceof Error ? error.message : 'Unable to initialize Cesium.';
			});

		return () => viewer?.destroy();
	});
</script>

<div
	class="relative h-full min-h-125 overflow-hidden rounded-xl border border-slate-200 bg-slate-950"
	aria-label="3D globe centered on India"
>
	<div bind:this={container} class="absolute inset-0"></div>
	<div
		class="pointer-events-none absolute top-3 left-3 rounded bg-slate-950/75 px-3 py-2 text-xs font-medium text-white"
	>
		CesiumJS · India · 3,000 km altitude
	</div>
	{#if globeError}
		<p class="absolute inset-x-3 bottom-3 rounded bg-red-50 p-3 text-sm text-red-700">
			{globeError}
		</p>
	{/if}
</div>

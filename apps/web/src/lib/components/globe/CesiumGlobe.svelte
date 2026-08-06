<script lang="ts">
	import { onMount } from 'svelte';

	let viewerContainer: HTMLDivElement;
	let status = $state('Loading CesiumJS…');

	onMount(() => {
		let viewer: import('cesium').Viewer | undefined;

		async function start(): Promise<void> {
			window.CESIUM_BASE_URL = '/cesium';
			const Cesium = await import('cesium');
			viewer = new Cesium.Viewer(viewerContainer, {
				animation: false,
				baseLayerPicker: false,
				geocoder: false,
				homeButton: false,
				infoBox: false,
				navigationHelpButton: false,
				sceneModePicker: false,
				timeline: false,
				terrainProvider: new Cesium.EllipsoidTerrainProvider()
			});
			viewer.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(79, 22, 3_000_000),
				duration: 0
			});
			status = 'CesiumJS globe positioned over India';
		}

		void start().catch((error: unknown) => {
			status = error instanceof Error ? `Globe failed: ${error.message}` : 'Globe failed to start';
		});

		return () => viewer?.destroy();
	});
</script>

<div class="globe-shell">
	<div
		bind:this={viewerContainer}
		class="globe-canvas"
		aria-label="Cesium globe centered over India"
	></div>
	<p class="globe-status" aria-live="polite">{status}</p>
</div>

<style>
	.globe-shell {
		position: relative;
		height: min(68vh, 680px);
		overflow: hidden;
		border-radius: 1rem;
		border: 1px solid var(--color-border);
		background: #060d19;
	}
	.globe-canvas {
		height: 100%;
		width: 100%;
	}
	.globe-status {
		position: absolute;
		bottom: 0.75rem;
		left: 0.75rem;
		margin: 0;
		border-radius: 0.5rem;
		background: rgb(15 23 42 / 85%);
		color: white;
		padding: 0.4rem 0.65rem;
		font-size: 0.75rem;
	}
</style>

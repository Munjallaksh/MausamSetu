<script lang="ts">
	import MapView from '$lib/components/map/MapView.svelte';
</script>

<svelte:head><title>2D Map · MausamSetu</title></svelte:head>
<section class="space-y-4">
	<div>
		<p class="text-sm font-semibold text-cyan-700">2D Map</p>
		<h1 class="text-3xl font-bold">India zone overview</h1>
	</div>
	<MapView />
</section>

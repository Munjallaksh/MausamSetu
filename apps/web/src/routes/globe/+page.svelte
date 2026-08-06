<script lang="ts">
	import GlobeView from '$lib/components/globe/GlobeView.svelte';
</script>

<svelte:head><title>3D Globe · MausamSetu</title></svelte:head>
<section class="space-y-4">
	<div>
		<p class="text-sm font-semibold text-cyan-700">3D Globe</p>
		<h1 class="text-3xl font-bold">Earth system view</h1>
	</div>
	<GlobeView />
</section>

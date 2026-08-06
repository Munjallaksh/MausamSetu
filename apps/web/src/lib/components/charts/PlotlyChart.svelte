<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	let chartError = $state<string | null>(null);

	let { title = 'Chart placeholder' }: { title?: string } = $props();

	onMount(() => {
		void import('plotly.js-dist-min')
			.then((module) =>
				module.default.newPlot(container, [], {
					title: { text: title },
					margin: { t: 40, r: 20, b: 35, l: 45 }
				})
			)
			.catch((error: unknown) => {
				chartError = error instanceof Error ? error.message : 'Unable to load Plotly.';
			});
	});
</script>

<div class="rounded-xl border border-slate-200 bg-white p-4">
	<div bind:this={container} class="h-64"></div>
	{#if chartError}<p class="text-sm text-red-700">{chartError}</p>{/if}
</div>

<script lang="ts">
	import Heartbeat from '$lib/components/Heartbeat.svelte';
	import PlotlyChart from '$lib/components/charts/PlotlyChart.svelte';
</script>

<svelte:head><title>Overview · MausamSetu</title></svelte:head>

<section class="overview">
	<p class="eyebrow">MausamSetu मौसम सेतु</p>
	<h1>Climate digital-twin platform</h1>
	<p class="intro">
		A verified frontend, API, CUDA runtime, and visualization scaffold. Domain modeling, forecasts,
		training, and validation remain deliberately unimplemented for the next phase.
	</p>
	<div class="cards">
		<article>
			<h2>API health</h2>
			<p>The sidebar validates the live API response using TanStack Query and Zod.</p>
		</article>
		<article>
			<h2>Real-time path</h2>
			<Heartbeat />
		</article>
	</div>
	<PlotlyChart title="Future forecast chart" />
</section>

<style>
	.overview {
		max-width: 70rem;
	}
	.eyebrow {
		color: var(--color-brand);
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		margin: 0.35rem 0 0.75rem;
	}
	.intro {
		color: var(--color-muted);
		line-height: 1.7;
		max-width: 62rem;
	}
	.cards {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		margin: 2rem 0;
	}
	article {
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		background: var(--color-panel);
		padding: 1.25rem;
	}
	h2 {
		margin-top: 0;
		font-size: 1rem;
	}
	article p {
		color: var(--color-muted);
		line-height: 1.6;
	}
</style>

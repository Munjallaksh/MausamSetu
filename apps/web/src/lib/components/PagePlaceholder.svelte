<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();
</script>

<svelte:head><title>{title} · MausamSetu</title></svelte:head>

<section class="page-placeholder">
	<p class="eyebrow">Scaffold route</p>
	<h1>{title}</h1>
	<p>{description}</p>
</section>

<style>
	.page-placeholder {
		max-width: 48rem;
	}
	.eyebrow {
		color: var(--color-brand);
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
	}
	h1 {
		margin: 0.25rem 0 0.75rem;
		font-size: clamp(2rem, 5vw, 3rem);
	}
	p {
		color: var(--color-muted);
		line-height: 1.65;
	}
</style>

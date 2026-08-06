<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { resolve } from '$app/paths';

	import DeviceBadge from '$lib/components/DeviceBadge.svelte';
	import { selectedRegion, setSearchState } from '$lib/stores/url-state';
	import './layout.css';

	const queryClient = new QueryClient();
	const navigation = [
		['/', 'Overview'],
		['/map', '2D Map'],
		['/globe', '3D Globe'],
		['/forecast', 'Forecast'],
		['/training', 'Training'],
		['/validation', 'Validation'],
		['/registry', 'Registry'],
		['/zones', 'Zones']
	] as const;

	let { children } = $props();
</script>

<svelte:head>
	<title>MausamSetu मौसम सेतु</title>
	<meta name="description" content="MausamSetu climate digital-twin platform scaffold" />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="app-shell">
		<aside class="sidebar">
			<a class="brand" href={resolve('/')}>MausamSetu <span>मौसम सेतु</span></a>
			<p class="brand-copy">Climate digital-twin scaffold</p>
			<nav aria-label="Main navigation">
				{#each navigation as [href, label] (href)}
					<a href={resolve(href)}>{label}</a>
				{/each}
			</nav>
			<label class="region-control" for="region"
				>Region
				<select
					id="region"
					value={selectedRegion()}
					onchange={(event) => void setSearchState('region', event.currentTarget.value)}
				>
					<option value="india">India</option>
					<option value="cauvery">Cauvery</option>
				</select>
			</label>
			<DeviceBadge />
		</aside>
		<main>{@render children()}</main>
	</div>
</QueryClientProvider>

<style>
	.app-shell {
		display: grid;
		grid-template-columns: 17rem minmax(0, 1fr);
		min-height: 100vh;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		background: #0b172a;
		color: white;
		padding: 1.5rem;
	}
	.brand {
		color: white;
		font-size: 1.25rem;
		font-weight: 800;
		text-decoration: none;
	}
	.brand span {
		color: #a5f3fc;
	}
	.brand-copy {
		margin: -0.8rem 0 0;
		color: #94a3b8;
		font-size: 0.8125rem;
	}
	nav {
		display: grid;
		gap: 0.25rem;
	}
	nav a {
		border-radius: 0.5rem;
		color: #cbd5e1;
		padding: 0.5rem 0.65rem;
		text-decoration: none;
	}
	nav a:hover {
		background: #173254;
		color: white;
	}
	.region-control {
		display: grid;
		gap: 0.35rem;
		color: #cbd5e1;
		font-size: 0.8125rem;
	}
	select {
		border: 1px solid #334155;
		border-radius: 0.5rem;
		background: #172554;
		color: white;
		padding: 0.5rem;
	}
	main {
		padding: clamp(1.25rem, 4vw, 3rem);
	}
	@media (max-width: 760px) {
		.app-shell {
			grid-template-columns: 1fr;
		}
		.sidebar {
			gap: 0.75rem;
		}
		nav {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>

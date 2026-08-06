<script lang="ts">
	import { useHealth } from '$lib/api/queries';

	const health = useHealth();
</script>

<section class="device-badge" aria-live="polite">
	<p>Device status</p>
	{#if health.isPending}
		<strong>Checking API…</strong>
	{:else if health.isError}
		<strong>API unavailable</strong>
	{:else if health.data}
		<strong>{health.data.gpu_name ?? 'CUDA unavailable'}</strong>
		<span>{(health.data.vram_total_gb ?? 0).toFixed(2)} GB VRAM · {health.data.status}</span>
	{/if}
</section>

<style>
	.device-badge {
		margin-top: auto;
		border: 1px solid #155e75;
		border-radius: 0.75rem;
		background: #083344;
		padding: 0.8rem;
	}
	.device-badge p {
		margin: 0 0 0.4rem;
		color: #a5f3fc;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
	}
	.device-badge strong,
	.device-badge span {
		display: block;
	}
	.device-badge span {
		color: #bae6fd;
		font-size: 0.75rem;
		margin-top: 0.25rem;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	let status = $state('Connecting…');
	let lastHeartbeat = $state<string | null>(null);

	onMount(() => {
		const baseUrl = env.PUBLIC_WS_BASE_URL || 'ws://localhost:8000/api/v1';
		const socket = new WebSocket(`${baseUrl}/runs/scaffold/events`);
		socket.addEventListener('open', () => (status = 'Connected'));
		socket.addEventListener('message', (event) => {
			const payload: unknown = JSON.parse(String(event.data));
			if (typeof payload === 'object' && payload !== null && 'ist_time' in payload) {
				lastHeartbeat = String(payload.ist_time);
				status = 'Heartbeat received';
			}
		});
		socket.addEventListener('error', () => (status = 'Unavailable'));
		return () => socket.close();
	});
</script>

<div class="rounded-xl border border-slate-200 bg-white p-4" aria-live="polite">
	<p class="text-sm font-semibold">Run events WebSocket</p>
	<p class="mt-1 text-sm text-slate-600">{status}</p>
	{#if lastHeartbeat}<p class="mt-1 text-xs text-slate-500">
			Last IST heartbeat: {lastHeartbeat}
		</p>{/if}
</div>

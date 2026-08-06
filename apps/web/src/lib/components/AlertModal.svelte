<script lang="ts">
	import { X, Satellite, Radio, CheckCircle2 } from '@lucide/svelte';
	import type { WeatherAlert } from '$lib/data/weatherData';
	import { isAlertModalOpen, toggleAlertModal } from '$lib/stores/weatherStore';

	let { alert }: { alert: WeatherAlert } = $props();

	let isOpen = $state(false);

	$effect(() => {
		const unsubscribe = isAlertModalOpen.subscribe((val) => {
			isOpen = val;
		});
		return unsubscribe;
	});
</script>

{#if isOpen}
	<!-- Backdrop Blur Overlay -->
	<div
		class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
		role="button"
		tabindex="0"
		aria-label="Close modal background"
		onclick={() => toggleAlertModal(false)}
		onkeydown={(e) => {
			if (e.key === 'Escape' || e.key === 'Enter') toggleAlertModal(false);
		}}
	>
		<!-- Modal Window -->
		<div
			class="bg-white rounded-[22px] max-w-xl w-full p-7 border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in-delayed"
			role="dialog"
			aria-modal="true"
			aria-labelledby="alert-modal-title"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<!-- Top Banner Accent -->
			<div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600"></div>

			<!-- Header -->
			<div class="flex items-start justify-between">
				<div class="flex items-center gap-3">
					<div class="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600">
						<Satellite class="w-6 h-6 animate-pulse" />
					</div>
					<div>
						<div class="flex items-center gap-2">
							<span class="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
								{alert.id}
							</span>
							<span class="text-xs text-slate-400 font-medium">{alert.timestamp}</span>
						</div>
						<h3 id="alert-modal-title" class="text-lg font-bold text-slate-900 mt-1">{alert.title}</h3>
					</div>
				</div>

				<button
					onclick={() => toggleAlertModal(false)}
					class="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
					aria-label="Close telemetry alert modal"
				>
					<X class="w-5 h-5" />
				</button>
			</div>

			<!-- Telemetry Content -->
			<div class="space-y-4 text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-[16px] border border-slate-100">
				<p class="font-medium text-slate-800">
					{alert.description}
				</p>

				<div class="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-200/80">
					<div>
						<span class="text-slate-400 font-medium block">Satellite Constellation</span>
						<span class="font-bold text-slate-700">INSAT-3DS & OceanSat-3</span>
					</div>
					<div>
						<span class="text-slate-400 font-medium block">Data Resolution</span>
						<span class="font-bold text-slate-700">1.0 km / 15-min interval</span>
					</div>
					<div>
						<span class="text-slate-400 font-medium block">Issuing Body</span>
						<span class="font-bold text-slate-700">{alert.issuingAuthority}</span>
					</div>
					<div>
						<span class="text-slate-400 font-medium block">Confidence Level</span>
						<span class="font-bold text-emerald-600 flex items-center gap-1">
							<CheckCircle2 class="w-3.5 h-3.5" /> 98.4% AI Match
						</span>
					</div>
				</div>
			</div>

			<!-- Modal Footer Actions -->
			<div class="flex items-center justify-between pt-2">
				<span class="text-xs text-slate-400 font-medium flex items-center gap-1.5">
					<Radio class="w-3.5 h-3.5 text-blue-600 animate-ping" /> MOSDAC Telemetry Broadcast Active
				</span>

				<button
					onclick={() => toggleAlertModal(false)}
					class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-[14px] shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
				>
					<span>Acknowledge</span>
				</button>
			</div>
		</div>
	</div>
{/if}

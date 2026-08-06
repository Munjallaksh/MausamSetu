<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Home, Globe, HelpCircle, BarChart3, Info } from '@lucide/svelte';

	const menuItems = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/map', label: 'Explorer', icon: Globe },
		{ href: '/forecast', label: 'What If', icon: HelpCircle },
		{ href: '/training', label: 'Analytics', icon: BarChart3 }
	] as const;
</script>

<aside class="w-[245px] min-w-[245px] flex flex-col justify-between p-4 select-none">
	<!-- Navigation Menu -->
	<nav class="space-y-1.5" aria-label="Sidebar main navigation">
		{#each menuItems as item (item.href)}
			{@const isActive = page.url.pathname === item.href}
			<a
				href={resolve(item.href)}
				class="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer
					{isActive 
						? 'bg-[#EBF3FF] text-[#2563EB] shadow-xs' 
						: 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'}"
			>
				<item.icon class="w-5 h-5 {isActive ? 'text-[#2563EB] fill-[#2563EB]/10' : 'text-slate-600'}" />
				<span class="tracking-tight">{item.label}</span>
			</a>
		{/each}
	</nav>

	<!-- Bottom Section: Data Source Info Card & About Button -->
	<div class="space-y-3 pt-4">
		<!-- Data Source & Last Updated Card -->
		<div class="bg-white border border-slate-200/90 rounded-[18px] p-4 space-y-3 shadow-xs">
			<div>
				<h4 class="text-xs font-bold text-slate-900 leading-tight">Data Source</h4>
				<p class="text-xs font-medium text-slate-500 mt-1 leading-snug">IMD • IITM • ISRO • MoES</p>
			</div>

			<div>
				<h4 class="text-xs font-bold text-slate-900 leading-tight">Last Updated</h4>
				<p class="text-xs font-medium text-slate-500 mt-1 leading-snug">29 May 2025, 10:30 AM</p>
			</div>
		</div>

		<!-- About Mausamsetu Pill Button -->
		<button class="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs px-4 py-3 rounded-[18px] border border-slate-200/90 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
			<Info class="w-4 h-4 text-slate-600" />
			<span>About Mausamsetu</span>
		</button>
	</div>
</aside>

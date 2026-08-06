<script lang="ts">
	let { class: className = 'h-8' }: { class?: string } = $props();
</script>

<div class="flex items-center gap-2 select-none {className}">
	<!-- ISRO Rocket & Text Emblem -->
	<svg viewBox="0 0 160 50" class="h-full w-auto overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
		<!-- Orange Arrow/Rocket vector -->
		<path d="M 5 45 L 35 5 L 42 12 L 20 45 Z" fill="#FF9933" />
		<path d="M 35 5 L 60 45 L 48 45 L 32 18 Z" fill="#0066CC" />
		<circle cx="35" cy="5" r="3" fill="#FF9933" />
		<!-- Hindi & English Text -->
		<text x="65" y="24" fill="#FF9933" font-size="14" font-weight="800" font-family="sans-serif">इसरो</text>
		<text x="65" y="42" fill="#0066CC" font-size="16" font-weight="900" font-family="sans-serif">isro</text>
	</svg>
</div>

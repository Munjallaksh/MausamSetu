<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	const queryClient = new QueryClient();

	let { children } = $props();
</script>

<svelte:head>
	<title>MAUSAMSETU · AI-Powered Climate Digital Twin of India</title>
	<meta name="description" content="ISRO AI-Powered Climate Digital Twin Platform of India" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="h-screen max-h-screen bg-[#F7FAFC] flex flex-col text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
		<!-- Top Navbar (Full Width Header) -->
		<Navbar />

		<!-- Main Content Shell below Header -->
		<div class="flex-1 flex min-w-0 max-w-[1600px] w-full mx-auto overflow-hidden">
			<!-- Sidebar (245px Fixed Width) -->
			<Sidebar />

			<!-- Main Page View Container -->
			<main class="flex-1 p-4 md:p-5 min-w-0 overflow-y-auto space-y-4">
				{@render children()}
			</main>
		</div>
	</div>
</QueryClientProvider>

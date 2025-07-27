<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';

	import { QueryClient } from '@tanstack/query-core';
	let { children } = $props();
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Sidebar from '../components/Sidebar/Sidebar.svelte';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<Navbar />
	<div class=" flex">
		<Sidebar />
		{@render children?.()}
	</div>
</QueryClientProvider>

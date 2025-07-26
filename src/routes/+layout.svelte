<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';

	import { QueryClient } from '@tanstack/query-core';
	let { children } = $props();
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<Navbar />
	{@render children?.()}
</QueryClientProvider>

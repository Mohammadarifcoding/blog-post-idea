<script lang="ts">
	import { onMount } from 'svelte';
	import CategoryItem from '../Category/CategoryItem.svelte';
	import { getCollectionNames } from '../../stores/collection';

	// export let isOpen: boolean = false;
	let openCreateForm = $state(false);
	// const dispatch = createEventDispatcher();
	let categoryName = $state('');
	let isOpen = $state(true);

	const close = () => {
		categoryName = '';
		isOpen = false;
	};

	const submit = () => {
		if (categoryName.trim() === '') return;
		// dispatch('submit', { name: categoryName.trim() });
		close();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') close();
	};

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
	const categoryNames = ['Personal', 'Work', 'Facebook'];
	const collectionNames = getCollectionNames();
</script>

<!-- {#if isOpen} -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
	<div class="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-xl font-semibold text-zinc-800">Category list</h2>
			<button class="text-zinc-500 hover:text-zinc-800" onclick={close}>&times;</button>
		</div>
		<div class="mb-4 flex items-center justify-between gap-2">
			<input
				bind:value={categoryName}
				type="text"
				class="w-full rounded-lg border border-zinc-300 bg-white px-3 py-[6px] text-zinc-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				placeholder="New Category"
			/>

			<button
				class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
				onclick={submit}
				disabled={categoryName.trim().length === 0}
			>
				Create
			</button>
		</div>
		{#if $collectionNames.length === 0}
			<p>No collection available</p>
		{:else}
			<div class="flex flex-col gap-1 text-black">
				{#each $collectionNames as categoryN}
					<CategoryItem {categoryN} />
				{/each}
			</div>
		{/if}
	</div>
</div>
<!-- {/if} -->

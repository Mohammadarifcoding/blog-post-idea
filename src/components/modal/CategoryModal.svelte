<script lang="ts">
	import { onMount } from 'svelte';
	import CategoryItem from '../Category/CategoryItem.svelte';
	import { addNewCollection, getCollectionNames } from '../../stores/collection';
	let { isOpen = $bindable(), selectedName = $bindable('Ideas') } = $props();
	// export let isOpen: boolean = false;
	console.log(isOpen);
	// const dispatch = createEventDispatcher();
	let categoryName = $state('');
	// let isOpen = $state(true);

	const close = () => {
		categoryName = '';
		isOpen = false;
	};

	const submit = () => {
		if (categoryName.trim() === '') return;
		addNewCollection(categoryName);
		close();
	};

	const selectCollection = (name: string) => {
		console.log('i am here');
		selectedName = name;
		close();
		console.log('i am here');
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') close();
	};

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
	const collectionNames = getCollectionNames();
</script>

<!-- {#if isOpen} -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
	<div class="mx-4 w-full max-w-sm rounded-2xl bg-white shadow-xl">
		<div class="mb-4 flex items-center justify-between px-6 pt-6">
			<h2 class="text-xl font-semibold text-zinc-800">Category list</h2>
			<button class="text-zinc-500 hover:text-zinc-800" onclick={close}>&times;</button>
		</div>
		<div class="mb-4 flex items-center justify-between gap-2 px-6">
			<input
				bind:value={categoryName}
				onkeypress={(e) => {
					if (e.key === 'Enter') submit();
				}}
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
			<p class="pt-3 pb-5 text-center font-semibold">No collection available</p>
		{:else}
			<div class="flex flex-col text-black">
				{#each $collectionNames as categoryN}
					<CategoryItem onSelect={selectCollection} {categoryN} />
				{/each}
			</div>
		{/if}
	</div>
</div>
<!-- {/if} -->

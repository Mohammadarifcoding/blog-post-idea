<script lang="ts">
	import type { TResult } from '../../stores/aimodel';
	import { addDataToCollection } from '../../stores/collection';
	import CategoryModal from '../modal/CategoryModal.svelte';

	let { data }: { data: TResult } = $props();
	const date = new Date();
	let isOpen = $state(false);
	let selectedName = $state('Ideas');
	const addToStore = () => {
		console.log(selectedName);
		isOpen = true;
		console.log(selectedName);
		const final = {
			text: data.text,
			description: data.description,
			important_points: data.important_points,
			tags: data.tags,
			date: date.toISOString(),
			type: 'pending',
			collectionName: selectedName
		};

		addDataToCollection(final);
		selectedName = 'Ideas';
	};
</script>

<div
	class="w-full max-w-2xl space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-sm"
>
	{#if data.tags.length > 0}
		<ul class="flex flex-wrap gap-2">
			{#each data.tags as point}
				<li class="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-700">
					{point}
				</li>
			{/each}
		</ul>
	{/if}
	<div class="flex items-end justify-between">
		<div class="flex flex-col gap-2">
			<h2 class="text-2xl font-bold text-gray-900">{data.text}</h2>
			<p class="text-gray-600">{data.description}</p>

			<div class="mt-2 flex flex-wrap items-center gap-2">
				<span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">New</span
				>
				<time class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
					{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
				</time>
			</div>
		</div>
		<div class="flex justify-end gap-3">
			<button
				onclick={addToStore}
				aria-label="Save"
				class="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
					/>
					<path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
					<path d="M7 3v4a1 1 0 0 0 1 1h7" />
				</svg>
			</button>

			<button
				aria-label="Delete"
				class="rounded-lg bg-red-600 p-2 transition hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M10 11v6" />
					<path d="M14 11v6" />
					<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
					<path d="M3 6h18" />
					<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
				</svg>
			</button>
		</div>
	</div>
	{#if isOpen}
		<CategoryModal bind:selectedName bind:isOpen />
	{/if}
</div>

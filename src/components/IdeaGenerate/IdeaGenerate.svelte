<script lang="ts">
	import { onMount } from 'svelte';
	import { preventDefault } from 'svelte/legacy';
	import type { TModel } from '../../types/Model';

	let generatePrompt = $state('');
	let model: TModel = $state({
		name: '',
		displayName: '',
		description: ''
	}); // Default model
	let models: TModel[] = $state([]);
	let loading = $state(false);
	$inspect(generatePrompt);
	const generateIdes = async () => {
		loading = true;
		// Placeholder for the function to generate blog post ideas
		console.log('Generating ideas for:', generatePrompt);
		setTimeout(() => {
			loading = false;
			alert('Ideas generated!'); // Replace with actual idea generation logic
		}, 2000); // Simulate a delay for generating ideas
	};
	function autoResize(e: any) {
		e.target.style.height = 'auto'; // Reset height
		e.target.style.height = `${Math.min(e.target.scrollHeight, 170)}px`; // Cap at 240px
	}
	onMount(async () => {
		try {
			const res = await fetch('http://localhost:5173/api/model');
			const json = await res.json();
			models = json;

			// Set default selected model to first model in array
			if (json.length > 0) {
				model = json[0]; // ✅ Proper default model
			}
		} catch (err) {
			alert('Cannot fetch data');
		}
	});
</script>

<div class="mx-auto max-w-4xl p-6 pt-24">
	<div class="mb-12 text-center">
		<div class="mb-6 flex items-center justify-center">
			<div class="rounded-full bg-blue-100 p-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-lightbulb-icon lucide-lightbulb"
					><path
						d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
					/><path d="M9 18h6" /><path d="M10 22h4" /></svg
				>
			</div>
		</div>
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Smart Blog Post Idea Generator</h1>
		<p class="mb-8 text-xl text-gray-600">
			Generate creative blog post ideas instantly and organize them efficiently
		</p>

		<form
			onsubmit={preventDefault(generateIdes)}
			class="mx-auto flex max-w-4xl flex-col items-center gap-2 rounded-xl bg-[#2c2c2f] p-4 shadow-md ring-1 ring-gray-700"
		>
			<textarea
				rows="3"
				oninput={autoResize}
				bind:value={generatePrompt}
				placeholder="Ask anything"
				class="custom-scroll h-[80px] w-full overflow-auto bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
			></textarea>
			<!-- Left: Tools Dropdown -->
			<div class="flex w-full flex-row items-center justify-between pl-3">
				<div class="flex items-center gap-1 text-gray-300">
					<select
						onchange={(e) => {
							if (e.target) {
								const selectedName = (e.target as HTMLSelectElement).value;
								const selected = models.find((m) => m.name === selectedName);
								if (selected) model = selected;
							}
						}}
						class="bg-transparent text-sm text-white focus:outline-none"
					>
						{#each models as model}
							<option value={model.name} class="bg-[#2c2c2f]">{model.displayName}</option>
						{/each}
					</select>
				</div>
				<div class="flex items-center gap-3 text-gray-300">
					<button
						type="submit"
						class="flex items-center gap-1 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
						disabled={loading}
					>
						{#if loading}
							<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="white">
								<circle cx="12" cy="12" r="10" stroke-opacity="0.3" stroke-width="4" />
								<path d="M12 2a10 10 0 0 1 10 10" stroke-width="4" stroke-linecap="round" />
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									d="M5 12h14M12 5l7 7-7 7"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
								/>
							</svg>
						{/if}
					</button>
				</div>
			</div>

			<!-- Center: Text Input -->

			<!-- Right: Microphone + Voice Icon -->
		</form>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { addLanguages, AiModel, selectModel, type TAiModel } from '../../stores/aimodel';
	import { preventDefault } from 'svelte/legacy';
	import type { TModel } from '../../types/Model';
	import axios from 'axios';

	let generatePrompt = $state('');
	let models: TModel[] = $state([]);
	let { language, model, loading: resultLoading } = $AiModel;
	let loading = $state(false);
	$inspect(generatePrompt);
	const generateIdes = async () => {
		try {
			loading = true;
			resultLoading = true;
			// Placeholder for the function to generate blog post ideas
			console.log('Generating ideas for:', generatePrompt);
			const res = await axios.post('/api/generate', {
				prompt: generatePrompt,
				model: $AiModel.model.name,
				language: $AiModel.language
			});
			let cleaned = res.data.result
				.replace(/^```json\s*/i, '') // remove starting ```json
				.replace(/```$/, '') // remove ending ```
				.trim();
			let data = JSON.parse(cleaned);
			console.log(data);

			setTimeout(() => {
				loading = false;
				resultLoading = false;
				alert('Ideas generated!'); // Replace with actual idea generation logic
			}, 3000); // Simulate a delay for generating ideas
		} catch (err) {
			console.log(err);
			resultLoading = false;
			loading = false;
		}
	};
	function autoResize(e: any) {
		e.target.style.height = 'auto'; // Reset height
		e.target.style.height = `${Math.min(e.target.scrollHeight, 170)}px`; // Cap at 240px
	}
	onMount(async () => {
		try {
			const res = await fetch('/api/model');
			const json = await res.json();
			let singleModel = json[0];
			console.log(singleModel);
			models = json;
			// Set default selected model to first model in array
			if (json.length > 0) {
				selectModel({
					name: singleModel.name,
					displayName: singleModel.displayName,
					description: singleModel.description
				});
			}
		} catch (err) {
			alert('Cannot fetch data');
		}
	});
	const languages = ['Bangla', 'English'];
</script>

<form
	onsubmit={preventDefault(generateIdes)}
	class="mx-auto flex max-w-4xl flex-col items-center gap-2 rounded-xl bg-[#2c2c2f] p-4 shadow-md ring-1 ring-gray-700"
>
	<textarea
		rows="3"
		oninput={autoResize}
		bind:value={generatePrompt}
		placeholder="Ask anything"
		class="custom-scroll h-[80px] w-full resize-none overflow-auto bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
	></textarea>
	<!-- Left: Tools Dropdown -->
	<div class="flex w-full flex-row items-center justify-between pl-2">
		<div class="flex items-center gap-1 text-gray-300">
			<div class="flex gap-2">
				<select
					onchange={(e) => {
						if (e.target) {
							const selectedName = (e.target as HTMLSelectElement).value;
							const selected = models.find((m) => m.name === selectedName);
							if (selected)
								selectModel({
									name: selected.name,
									displayName: selected.displayName,
									description: selected.description
								});
						}
					}}
					value={model.name}
					class="rounded-xl border border-gray-700 bg-transparent px-4 py-2 text-sm text-white focus:outline-none"
				>
					{#each models as model}
						<option value={model.name} class="bg-[#2c2c2f]">{model.displayName}</option>
					{/each}
				</select>
				<select
					onchange={(e) => {
						if (e.target) {
							const selectedLanguage = (e.target as HTMLSelectElement).value;
							addLanguages(selectedLanguage);
						}
					}}
					value={language}
					class="rounded-xl border border-gray-700 bg-transparent px-4 py-2 text-sm text-white focus:outline-none"
				>
					{#each languages as language}
						<option value={language} class="bg-[#2c2c2f]">{language}</option>
					{/each}
				</select>
			</div>
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
</form>

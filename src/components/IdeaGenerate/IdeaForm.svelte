<script lang="ts">
	import { onMount } from 'svelte';
	import {
		addLanguages,
		AiModel,
		selectModel,
		setLoading,
		setResult,
		type TAiModel
	} from '../../stores/aimodel';
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
			setLoading(true);
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
			setLoading(false);
			setResult(data);
			loading = false;
		} catch (err) {
			console.log(err);
			setLoading(false);
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
	class="mx-auto w-full max-w-2xl space-y-4 rounded-2xl border border-blue-200 bg-white/30 p-6 shadow-lg backdrop-blur-md transition hover:shadow-xl"
>
	<!-- Prompt Textarea -->
	<textarea
		rows="3"
		oninput={autoResize}
		bind:value={generatePrompt}
		placeholder="💬 What's on your mind?"
		class="custom-scroll focus:ring--1 w-full resize-none rounded-xl border border-blue-300 bg-white/80 px-4 py-3 text-base text-gray-800 shadow-inner placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-400 focus:outline-none"
	></textarea>

	<!-- Controls -->
	<div class="flex w-full flex-wrap items-center justify-between gap-4">
		<!-- Dropdowns -->
		<div class="flex flex-wrap gap-3">
			<select
				onchange={(e) => {
					const selectedName = (e.target as HTMLSelectElement).value;
					const selected = models.find((m) => m.name === selectedName);
					if (selected)
						selectModel({
							name: selected.name,
							displayName: selected.displayName,
							description: selected.description
						});
				}}
				value={model.name}
				class="rounded-xl border border-gray-400 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
			>
				{#each models as model}
					<option value={model.name}>{model.displayName}</option>
				{/each}
			</select>

			<select
				onchange={(e) => {
					const selectedLanguage = (e.target as HTMLSelectElement).value;
					addLanguages(selectedLanguage);
				}}
				value={language}
				class="rounded-xl border border-gray-400 bg-white px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
			>
				{#each languages as language}
					<option value={language}>{language}</option>
				{/each}
			</select>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			disabled={loading}
			class="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 text-white transition hover:scale-105 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50"
		>
			{#if loading}
				<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="white">
					<circle cx="12" cy="12" r="10" stroke-opacity="0.3" stroke-width="4" />
					<path d="M12 2a10 10 0 0 1 10 10" stroke-width="4" stroke-linecap="round" />
				</svg>
				<span>Generating...</span>
			{:else}
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						d="M5 12h14M12 5l7 7-7 7"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					/>
				</svg>
				<span>Generate</span>
			{/if}
		</button>
	</div>
</form>

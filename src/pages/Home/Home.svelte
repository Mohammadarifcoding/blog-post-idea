<script>
	import { preventDefault } from 'svelte/legacy';

	let generatePrompt = $state('');
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

		<div class="mx-auto max-w-2xl">
			<form onsubmit={preventDefault(generateIdes)} class="flex flex-col gap-4 sm:flex-row">
				<input
					bind:value={generatePrompt}
					type="text"
					placeholder="Enter blog topic or keyword..."
					class="h-14 flex-1 rounded-xl border-2 border-gray-200 bg-white px-6 text-lg focus:border-blue-500"
				/>
				<button
					class="h-14 rounded-xl bg-blue-600 px-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
				>
					<!-- {islo ? (
                      <>
                        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles class="w-5 h-5 mr-2" />
                        Generate Ideas
                      </>
                    )} -->
					{#if loading}
						<div class="flex flex-row-reverse items-center gap-1">
							<div class="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
							Generating...
						</div>
					{:else}
						Generate Ideas
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>

<script lang="ts">
	import IdeaForm from './IdeaForm.svelte';
</script>

<div class="mx-auto max-w-4xl p-6 pt-16">
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

		<IdeaForm />
	</div>
</div>

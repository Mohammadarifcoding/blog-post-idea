<script>
	import { AiModel, getLoadingStaus, getResults } from '../../stores/aimodel';
	import IdeaBox from './IdeaBox.svelte';
	const results = getResults();
	const loading = getLoadingStaus();
</script>

{#if $loading}
	<div class="flex items-center justify-center py-10">
		<div
			class="h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
		></div>
	</div>
{:else}
	<div class="flex flex-col gap-3">
		{#each $results as result}
			<IdeaBox data={result} />
		{/each}
	</div>
{/if}

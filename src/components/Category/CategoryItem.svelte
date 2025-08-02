<script>
	import { getDataFromCollection } from '../../stores/collection';

	let { categoryN, onSelect } = $props();
	const data = getDataFromCollection(categoryN);
</script>

<button
	onclick={() => {
		onSelect(categoryN);
	}}
	class="flex cursor-pointer items-center justify-between gap-2 border-t border-gray-200 px-6 py-2 text-lg font-medium hover:text-blue-800"
>
	{categoryN}
	<span class="rounded-full bg-blue-100 px-2 py-0 text-sm text-blue-800">{$data.length}</span>
</button>

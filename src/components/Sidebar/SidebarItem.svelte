<script>
	let { item } = $props();
	let isActive = $state(false);
	const toggleActive = () => (isActive = !isActive);
</script>

<li class="px-4 py-3">
	{#if item.underRoutes.length > 0}
		<button
			onclick={toggleActive}
			class="hover:text-primary flex w-full items-center justify-between text-left font-medium transition-colors"
		>
			<span>{item.title}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class={`transition-transform duration-300 ${isActive ? 'rotate-90' : 'rotate-0'}`}
			>
				<path d="m9 18 6-6-6-6" />
			</svg>
		</button>

		<ul
			class={`mt-2 space-y-1 overflow-hidden pl-4 transition-all duration-300 ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
		>
			{#each item.underRoutes as subItem}
				<li>
					<a
						href={subItem.link}
						class="hover:bg-muted hover:text-primary block rounded px-2 py-1 transition-colors"
					>
						{subItem.title}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<a href={item.link} class="hover:text-primary block w-full font-medium transition-colors">
			{item.title}
		</a>
	{/if}
</li>

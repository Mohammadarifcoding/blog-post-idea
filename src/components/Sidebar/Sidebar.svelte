<script>
	import SidebarItem from './SidebarItem.svelte';

	const navItems = [
		{
			title: 'Saved',
			link: '/saved',
			underRoutes: [
				{ title: 'Personal', link: '/category/category-1' },
				{ title: 'Work', link: '/category/category-2' },
				{ title: 'Blog', link: '/category/category-3' }
			]
		}
	];
</script>

<div class="h-screen w-64 border-r border-gray-300">
	<nav>
		<ul>
			{#each navItems as item}
				<SidebarItem {item} />
			{/each}
		</ul>
	</nav>
</div>

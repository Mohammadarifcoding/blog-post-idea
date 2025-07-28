<script>
	import Category from '../Category/Category.svelte';
	import CategoryModal from '../modal/CategoryModal.svelte';
	import SidebarItem from './SidebarItem.svelte';
	let modalOpen = $state(false);

	const handleSubmit = (e) => {
		const newCategory = e.detail.name;
		console.log('Creating category:', newCategory);
		// Add to your store or call a function
	};
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

<div class=" h-[calc(100vh-70px)] max-h-screen w-64 border-r border-gray-300">
	<nav>
		<ul>
			{#each navItems as item}
				<SidebarItem {item} />
			{/each}
		</ul>
	</nav>
	<Category />
</div>

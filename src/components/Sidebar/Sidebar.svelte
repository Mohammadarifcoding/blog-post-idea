<script lang="ts">
	import { getCollectionNames } from '../../stores/collection';
	import { toSlug } from '../../utils/textToRoute';

	// import Category from '../Category/Category.svelte';
	import SidebarItem from './SidebarItem.svelte';

	const handleSubmit = (e) => {
		const newCategory = e.detail.name;
		console.log('Creating category:', newCategory);
		// Add to your store or call a function
	};
	// let underRoutes = $state([]);

	const unsubscribe = getCollectionNames();
	const navItems = [
		{
			title: 'Saved',
			link: '/saved',
			underRoutes: $unsubscribe.map((name) => ({
				title: name,
				link: `/saved${toSlug(name)}`
			}))
		}
	];
	console.log(navItems);
</script>

<div class=" h-[calc(100vh-70px)] max-h-screen w-64 border-r border-gray-300">
	<nav>
		<ul>
			{#each navItems as item}
				<SidebarItem {item} />
			{/each}
		</ul>
	</nav>
	<!-- <Category /> -->
</div>

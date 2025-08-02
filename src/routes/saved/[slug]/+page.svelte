<script lang="ts">
	import { page } from '$app/stores';
	import { getCollectionNames, getDataFromCollection } from '../../../stores/collection';
	import { fromSlug } from '../../../utils/textToRoute';
	$: params = $page.params;
	$: readableName = fromSlug(slug);
	$: data = getDataFromCollection(readableName);
	console.log(params);
	let slug = params?.slug;
	// let data = getDataFromCollection(fromSlug(slug));
	console.log(fromSlug(slug));
	console.log('Slug:', slug);
	console.log('Readable:', readableName);
	console.log('Data:', data);
	console.log('Full $page:', getCollectionNames(slug));
</script>

{params.slug}

export function toSlug(str: string): string {
	return (
		'/' +
		str
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '') // remove non-word characters
			.replace(/\s+/g, '-') // replace spaces with -
			.replace(/--+/g, '-')
	); // collapse multiple dashes
}
export function fromSlug(slug: string): string {
	return slug
		?.replace(/^\//, '')
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

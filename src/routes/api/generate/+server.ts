import { redis } from '$lib/server/redis.js';

export const GET = async ({ request }) => {
	// const data = await request.json();
	const set = await redis.get('idea');

	return new Response(set, {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

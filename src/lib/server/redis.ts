import { createClient } from 'redis';

export const redis = createClient({
	username: 'default',
	password: '8uofGx1Iznq7KLoljEK5ICMD4ajWfT9T',
	socket: {
		host: 'redis-11841.c330.asia-south1-1.gce.redns.redis-cloud.com',
		port: 11841
	}
});

redis.on('error', (err: any) => console.error('Redis Error', err));

await redis.connect();

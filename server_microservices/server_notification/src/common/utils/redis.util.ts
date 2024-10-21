import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',  // Thay đổi nếu cần
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

(async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
})();

export default redisClient;

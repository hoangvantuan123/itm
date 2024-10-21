import { createClient } from 'redis';

// Khởi tạo client Redis với URL
const redisClient = createClient({
  url: 'redis://localhost:6379',  // Thay đổi URL nếu cần
});

// Bắt lỗi khi Redis gặp sự cố
redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// Kết nối Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (err) {
    console.error('Could not connect to Redis:', err);
  }
})();

export default redisClient;

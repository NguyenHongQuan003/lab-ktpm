const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;

// 🎯 Cấu hình Rate Limiter: Max 5 requests trong 30 giây
const limiter = rateLimit({
    windowMs: 30 * 1000,  // Thời gian cửa sổ: 30 giây
    max: 5,               // Số lượng tối đa request cho phép trong thời gian này
    message: '🚫 Too many requests in 30 seconds. Please try again later.', // Thông điệp lỗi khi quá giới hạn
});

// Áp dụng rate limiter cho toàn bộ ứng dụng
app.use(limiter);

// API Gateway endpoint
app.get('/gateway', async (req, res) => {
    try {
        console.log('🚀 Gửi request đến /api...');

        // Gửi request đến service ở /api
        const { data } = await axios.get('http://localhost:4000/api'); // Gọi đến service API

        // Trả về dữ liệu từ service
        res.json(data);
    } catch (err) {
        // Nếu có lỗi trong quá trình gọi API
        console.log('❌ Lỗi khi gọi đến service:', err.message);
        res.status(500).json({ message: '⚠️ Error calling the service' });
    }
});

// API Service mà bạn gọi đến (được cấu hình sẵn trong phần trước)
app.get('/api', (req, res) => {
    res.json({ message: 'Service OK', time: new Date() });
});

// Khởi động server cho API Gateway
app.listen(PORT, () => {
    console.log(`🚀 API Gateway đang chạy tại http://localhost:${PORT}/gateway`);
});

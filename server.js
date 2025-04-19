const express = require('express');
const axios = require('axios');
const CircuitBreaker = require('opossum');

const app = express();
const PORT = 3000;

// Hàm gọi đến dịch vụ backend giả lập
async function callBackendService() {
    // Đổi URL này sang endpoint thật hoặc giả lập lỗi để test circuit breaker
    const res = await axios.get('http://localhost:4000/api');
    return res.data;
}

// Tạo circuit breaker
const breaker = new CircuitBreaker(callBackendService, {
    timeout: 3000,
    errorThresholdPercentage: 20,
    resetTimeout: 10000,
    rollingCountBuckets: 5,
    rollingCountTimeout: 10000
});

// API Gateway endpoint
app.get('/gateway', async (req, res) => {
    try {
        const result = await breaker.fire();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Có lỗi xảy ra.' });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway đang chạy tại http://localhost:${PORT}/gateway`);
});
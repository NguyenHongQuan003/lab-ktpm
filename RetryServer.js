const express = require('express');
const axios = require('axios');
const axiosRetry = require('axios-retry').default; // <- CỰC KỲ QUAN TRỌNG!


const app = express();
const PORT = 3000;

// Thiết lập retry cho axios
axiosRetry(axios, {
    retries: 3,
    retryDelay: retryCount => {
        console.log(`⏳ Retry lần ${retryCount}`);
        return retryCount * 1000;
    },
    retryCondition: error => {
        const retryableCodes = ['ECONNABORTED', 'ECONNREFUSED', 'ENOTFOUND', 'EHOSTUNREACH', 'ETIMEDOUT'];

        return (
            error.response?.status >= 500 ||
            retryableCodes.includes(error.code)
        );
    },
});

// API Gateway endpoint
app.get('/gateway', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/api');
        res.json({
            status: 'success',
            data: response.data,
        });
    } catch (err) {
        console.log('❌ Lỗi sau khi retry:', err.message);
        res.status(500).json({
            status: 'error',
            message: 'Không thể truy cập backend sau khi retry',
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Gateway đang chạy tại http://localhost:${PORT}/gateway`);
});

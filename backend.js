// backend.js
const express = require('express');
const app = express();
const PORT = 4000;

let count = 0;

app.get('/api', (req, res) => {
    count++;
    if (count % 5 === 0 || count == 6) {
        res.status(500).send('Lỗi backend!');
    } else {
        res.json({ message: 'Service OK', time: new Date() });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server chạy tại http://localhost:${PORT}/api`);
});

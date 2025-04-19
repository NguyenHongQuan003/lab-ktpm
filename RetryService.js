// backend.js
const express = require('express');
const app = express();
const PORT = 4000;

let count = 0;

app.get('/api', (req, res) => {
    // res.status(500).send('Lỗi 500 - Server Error');

    res.json({ message: 'Service OK', time: new Date() });

});


app.listen(PORT, () => {
    console.log(`Backend server chạy tại http://localhost:${PORT}/api`);
});

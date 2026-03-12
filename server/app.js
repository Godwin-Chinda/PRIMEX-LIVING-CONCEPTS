const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*', methods: ['GET','POST','DELETE','PATCH','PUT'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', require('./routes/products'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => res.json({ message: 'Primex Living Concepts API running' }));
app.use((err, req, res, next) => res.status(500).json({ message: 'Internal Server Error' }));

module.exports = app;

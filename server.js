const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.log("❌ Connection Error:", err));

// Order Schema 
const OrderSchema = new mongoose.Schema({
    id: Number,
    customer: String,
    item: String,
    price: Number,
    status: String,
    payType: String,
    type: String,
    address: String,
    securityOTP: Number,
    orderTime: String,
    handledBy: String,
    deliveredBy: String,
    completionTime: String
});

const Order = mongoose.model('Order', OrderSchema);

// API Routes
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.json({ message: "Order Saved to MongoDB!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        await Order.findOneAndUpdate({ id: req.params.id }, req.body);
        res.json({ message: "Status Updated!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
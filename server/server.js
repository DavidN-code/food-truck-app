const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRoute = require('./routes/orders');
const menuRoutes = require('./routes/menu');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Base route to confirm server is running
app.get('/', (req, res) => {
  console.log('✅ GET / route was hit by a browser!');
  res.send('API is running');
});

// 👇 Register routes before DB connect
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoute);

const startServer = async () => {
  try {
    console.log('🔥 Starting server...');
    console.log('🔎 MONGO_URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5050;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`🌐 Deployed URL: https://food-truck-backend-lfmn.onrender.com`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

startServer();

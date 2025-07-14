const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRoute = require('./routes/orders');
const menuRoutes = require('./routes/menu');
require('dotenv').config();




const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/menu', menuRoutes);

const startServer = async () => {
    try {
// Connect to MongoDB and set up routes
console.log('🔥 Starting server...');
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Reached after Mongo connect');



  
    console.log('✅ MongoDB connected');
    app.use('/api/menu', menuRoutes);
    app.use('/api/orders', ordersRoute);
    const PORT = process.env.PORT || 5050;

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`🌐 Deployed URL (if on Render): https://food-truck-backend-lfmn.onrender.com`);

    });

}
  catch(err) {
    console.error('❌ MongoDB connection error:', err);
  }
};
  


startServer();



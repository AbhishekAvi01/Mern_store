const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const connectDB = require('./config/db');

dotenv.config({ path: '../.env' });
connectDB();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express(); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('API is running...'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
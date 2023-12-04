const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('database connected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port = ${process.env.PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

const app = express();

if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());

connectDB();


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/order', orderRoutes);
app.use('/upload', uploadRoutes);

app.get('/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`)
})
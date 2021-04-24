const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const users = require('./data/users');
const products = require('./data/products');

const User = require('./models/userModel');
const Product = require('./models/productModel');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return {
                ...product,
                user: adminUser
            }
        });

        await Product.insertMany(sampleProducts);

        console.log('Data imported!')
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

const destoryData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data destroyed!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

if(process.argv[2] == '-d') {
    destoryData();
} else {
    importData();
}
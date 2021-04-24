const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const getProducts = asyncHandler (async (req, res) => {
    const pageSize = 3
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page-1));
    res.json({ products, page, pages: Math.ceil(count / pageSize)});
})

 const getProductById = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
}) 

const deleteProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
       await product.remove()
       res.json({ message: 'Prodcut removed' })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

const createProduct = asyncHandler (async (req, res) => {
    const product = new Product({
        title: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        rating: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler (async (req, res) => {
   const { title, price, description, image, brand, category, rating, countInStock } = req.body

   const product = await Product.findById(req.params.id);

   if(product) {
       product.title = title;
       product.price = price;
       product.description = description;
       product.image = image;
       product.brand = brand;
       product.category = category;
       product.rating = rating;
       product.countInStock = countInStock;

       const updatedProduct = await product.save();
       res.json(updatedProduct)
   } else {
    res.status(404)
    throw new Error('Product not found');
   }

})

module.exports = {
    getProducts, 
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct
}
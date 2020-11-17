const productDetailsModel = require('../models/productDetailsModel');

exports.index = (req, res, next) => {
    // Get books from model
    const productDetails = productDetailsModel.list();
    // Pass data to view to display list of books
    res.render('product-details', {productDetails});
};
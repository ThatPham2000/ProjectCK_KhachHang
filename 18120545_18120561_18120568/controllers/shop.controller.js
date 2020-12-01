const shopModel = require('../models/shopModel');

exports.index = (req, res, next) => {
    // Get books from model
    
    // Pass data to view to display list of books
    res.render('shop', {shop});
    res.render('product-details', {shop});
};
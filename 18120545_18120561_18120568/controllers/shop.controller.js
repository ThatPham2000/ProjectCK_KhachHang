const Product = require('../models/product.model');

exports.displayShop = (req, res, next) => {
    
    Product.find({})
    .then(products => {
        res.render('shop', {products});
   
    })
    
};
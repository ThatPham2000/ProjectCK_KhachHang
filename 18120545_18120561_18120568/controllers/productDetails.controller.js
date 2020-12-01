const {laptop, pc, monitor, vga, camera} = require('../models/productDetailsModel');

exports.detail = (req, res, next) => {
    // Get books from model
    console.log(req.params.id);
    laptop.findById(req.params.id)
    .then(product =>{
        // Pass data to view to display list of books
        console.log(product.pathImages);
        res.render('product-details', {
            pathImages: product.pathImages,
            price: product.price,
            title: product.title
        });
        
    })

    
};
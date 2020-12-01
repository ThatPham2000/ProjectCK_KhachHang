const {laptop, pc, monitor, vga, camera} = require('../models/productDetailsModel');

exports.index = (req, res, next) => {
    // Get books from model

    //check auth

    laptop.find({})
    .then(product =>{
        
        res.render('index', {
            product
        })
    })
    
};
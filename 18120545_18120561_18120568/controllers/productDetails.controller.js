const { isValidObjectId } = require('mongoose');
const Product= require('../models/product.model');

exports.detail = (req, res, next) => {
    const commentsPerPage = 3;
    // Get books from model
    Product.findById(req.params.id)
    .then(product =>{
        if (!product.countView){
	         product.countView = 1;
         }else{
	          product.countView++;
         }
        //Pass data to view to display list of books
        res.render('product-details', {
            id: product._id,
            pathImages: product.images,
            price: product.price,
            title: product.name
        });
    })
    
};

exports.postComment = (req, res, next) => {
    var cmt = { username: req.body.username, comment: req.body.comment };
    Product.findById(req.body.post_id.slice(0,-1))
    .then(product =>{
        product.comments.push(cmt);
        console.log(product.comments);
    })
};
    

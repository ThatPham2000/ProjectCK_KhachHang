const { isValidObjectId } = require('mongoose');
const Product= require('../models/product.model');

module.exports.getRelatedProduct = product => 
  Product.find({$or : [{producer: product.producer}]}).limit(16);
exports.detail = async(req, res, next) => {
    const commentsPerPage = 3;
    // Get books from model
    console.log(req.params.slugname)
    Product.findOne({"slugName" : req.params.slugname})
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
            title: product.name,
            comments: product.comments.reverse(),
            product: product,
            related_products : Product.find({or: [{producer: product.producer}, {category: product.category}]}).limit(3)
        });
    })
    
};

exports.postComment = async(req, res, next) => {
    var cmt = { username: req.body.username, comment: req.body.comment };
    console.log(req.body.post_id);
    let product = await Product.findOneAndUpdate(
      {_id: req.body.post_id},
      {$push: {comments: cmt}}  
    );
    console.log(product.comments);
};
    

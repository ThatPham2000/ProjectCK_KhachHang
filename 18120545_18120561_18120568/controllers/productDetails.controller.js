const { isValidObjectId } = require('mongoose');
const productModel = require('../models/product.model');
const Product= require('../models/product.model');
const { statistic, parsePrice } = require('../utils/statistics');
function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
exports.detail = async(req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const comment_per_page = 3;
  var start = (page - 1) * comment_per_page;
  var end = page * comment_per_page;
  try{
    
    const {slugname} = req.params;
    const product = await Product.findOne({
      slugName : slugname
    });
    
    const{category, producer, comments} = product;
    const relativeProducts = await Product.find({
      category,
      producer
    }).limit(9);
    if (product.countView){
      product.countView = 1;
    }else{
      product.countView++;
    }
   
    return res.render('product-details',{
      msg: 'success',
      id: product._id,
      pathImages: product.images,
      price: product.price,
      title: product.name,
      comments: comments.reverse(),
      product: product,
      relatedProducts: relativeProducts || null,
    });
  }
  catch (error){
    console.log(error);
		res.render('error', {
			message: error.message,
			error,
		});
  }
  //  const commentsPerPage = 3;
    // Get books from model
  
  /*const dataProduct = await Product.findOne({"slugName" : req.params.slugname})
  if(!dataProduct.countView){
    dataProduct.countView = 1;
  }else{
    dataProduct.countView++;
  }
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
        product: product
    });
    })*/
    
};

exports.postComment = async(req, res, next) => {
    var cmt = { username: req.body.username, comment: req.body.comment };
    console.log(req.body.post_id);
    let product = await Product.findOneAndUpdate(
      {_id: req.body.post_id},
      {$push: {comments: cmt}}  
    );
    console.log(product.comments);
    res.status(201).json({
      msg: "success",
      user: `Your comment has been public!`,
      data: comment
    });
};

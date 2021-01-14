const { findOneAndDelete } = require("./cart.model");
const { find } = require("./product.model");
const ProdMongoose = require("./product.model");

function parsePrice(strPrice){
    return parseInt(strPrice.replace(/[\.dđ]/g, ""));
  };
  
module.exports.listAllProduct = async() => {
    ProdMongoose.updateMany({}, {priceInt : parseInt(price)}, 
    function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Updated Docs : ", docs); 
    } 
}); 
    return ProdMongoose;
}

module.exports.listProdPagination = async(filter ,pageNumber, itemPerPage, arr) => {
   
    let listProd = await ProdMongoose.paginate(filter, {
        page: pageNumber,
        limit: itemPerPage,
        sort: {price: arr}
    });
    return listProd;
};

module.exports.findbySlugname = async(sl) =>{

    return ProdMongoose.findOne({slugName: sl});
}

module.exports.countProducts =  async (_id) =>{

    ProdMongoose.findById(_id)
    .then(product =>{

        product.soldQuantity += 1;

        product.save();
    })
}



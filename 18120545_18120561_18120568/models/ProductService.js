const ProdMongoose = require("./product.model");

module.exports.listAllProduct = async() => {
    return await ProdMongoose.find({});
}

module.exports.listProdPagination = async(filter, pageNumber, itemPerPage) => {
    let listProd = await ProdMongoose.paginate(filter, {
        page: pageNumber,
        limit: itemPerPage,
    });
    return listProd;
};
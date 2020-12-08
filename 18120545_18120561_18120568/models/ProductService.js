const ProdMongoose = require("./product.model");

module.exports.listAllProduct = async() => {
    return await ProdMongoose.find({});
}

module.exports.listProdPagination = async(pageNumber, itemPerPage) => {
    let listProd = await ProdMongoose.paginate({}, {
        page: pageNumber,
        limit: itemPerPage,
    });
    return listProd;
};
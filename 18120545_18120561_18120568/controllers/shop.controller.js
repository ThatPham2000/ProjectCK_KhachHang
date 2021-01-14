const ProductService = require('../models/ProductService.js');
const Product = require("../models/product.model");
const ITEM_PER_PAGE = 12;
const {parsePrice} = require('../utils/statistics');
module.exports.index = async(req, res, next) => {
    const products = await ProductService.listAllProduct();

    res.render('shop', { title: "Products", subtitle: "List product", products });
}

module.exports.listProductPagination = async(req, res) => {
    
    const page = +req.query.page || 1;
    const Category = req.query.category;
    const Name = req.query.name;
    const Producer = req.query.producer;
    const Rating = req.query.rating;
    const sort = req.query.sort;
    const Query = {};
    if (Category) {
        Query.category = Category;
    }
    if (Name) {
        const regex = new RegExp(escapeRegex(Name), 'gi');
        Query.name = regex;
    }
    if (Producer) {
        const regex = new RegExp(escapeRegex(req.query.producer), 'gi');
        Query.producer = regex;
    }
    if (Rating) {
        Query.rating = Rating;
    }

    // const Products = await ProductService.listAllProduct();
    // res.send(Products);
    const pagination = await ProductService.listProdPagination(Query, page, 12, sort);
    if(sort && sort === 'asc'){
        pagination = pagination.sort((a, b) => {
            return parsePrice(a.price) - parsePrice(b.price);
        });
    }else if(sort && sort === 'desc'){
        pagination = pagination.sort((a,b) => {
            return -parsePrice(a.price) + parsePrice(b.price);
        });
    }
    res.locals.sort = sort || '';
    res.render('shop', {
        title: 'Shop',
        products: pagination.docs,
        hasNextPage: pagination.hasNextPage,
        hasPrevPage: pagination.hasPrevPage,
        nextPage: pagination.nextPage,
        prevPage: pagination.prevPage,
        lastPage: pagination.totalPages,
        currentPage: pagination.page,


        //index page
        hasPrevPage1: (pagination.page - 2 > 0 ? true : false),
        prevPage1: pagination.page - 2,
        hasPrevPage2: (pagination.page - 1 > 0 ? true : false),
        prevPage2: pagination.page - 1,
        hasNextPage1: (pagination.page + 1 < pagination.totalPages ? true : false),
        nextPage1: pagination.page + 1,
        hasNextPage2: (pagination.page + 2 < pagination.totalPages ? true : false),
        nextPage2: pagination.page + 2,

        //Category
        Category: Category,
        producer: Producer,
        Name: Name
    })
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
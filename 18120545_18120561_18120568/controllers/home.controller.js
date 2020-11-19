const shopModel = require('../models/shopModel');

exports.index = (req, res, next) => {
    // Get books from model
    const shop = shopModel.list();

    //check auth
    if (req.isAuthenticated()){

        // Pass data to view to display list of books
        res.render('index', {shop});
    }
    else{

        res.render('index', {shop});
    }
    
};
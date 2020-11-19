const mongoose = require('mongoose');

const ProductsChema = new mongoose.Schema({ //schema of item displayed on fron page
    pathImages: {
        type: String, 
        required: false,
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
   
});

module.exports = mongoose.model('Product', ProductsChema);//accessing a model
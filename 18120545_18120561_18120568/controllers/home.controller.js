const Product = require('../models/product.model');

exports.index = async (req, res, next) => {
    const laptop = await Product.find({ category: 'laptop' }).skip(0).limit(6);
    const PC = await Product.find({ category: 'PC' }).skip(0).limit(6);
    const mobile = await Product.find({ category: 'mobile' }).skip(0).limit(6);
    const component = await Product.find({ category: 'Components' }).skip(0).limit(6);
    const network = await Product.find({ category: 'Network equipment - Security' }).skip(0).limit(6);
    res.render('index', {
        laptop: laptop,
        pc: PC,
        mobile,
        component: component,
        network: network
    })

  
};

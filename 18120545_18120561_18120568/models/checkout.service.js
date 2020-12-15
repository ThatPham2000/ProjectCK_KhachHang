const { checkout } = require("../routes/checkout");
const Checkout = require("./checkout.model");



module.exports.saveNewCheckout = async (checkoutOfuser) => {

    const checkout = new Checkout(checkoutOfuser);

    return await checkout.save();
}
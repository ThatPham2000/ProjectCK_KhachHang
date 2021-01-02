const cartService = require("../models/cart.service");
const userSevice = require("../models/user.Service");
const checkoutService = require("../models/checkout.service");
const { response } = require("../app");


module.exports.getCheckout = async(req, res, next) =>{

    const {user} = req;
    try{

        const userCart = await cartService.findIdbyStatus(user._id, "waiting");


        res.render("checkout", {
            title: "Checkout",
            cart: userCart,
            user: user,
        })
    }catch(err){
        res.render("error", {
            message: "Checkout fail!",
            err,
          });
    } 
}


module.exports.postCheckout = async (req, res, next) =>{

    
    const {user} = req;

    try{
        const {newName, newPhone, newCity, newDistrict, newAddress} = req.body;
        const cart = await cartService.findIdbyStatus(user._id, "waiting");
        
        if(cart.totalQuantity == 0){

            return res.redirect("/checkout");
        }

        const { userId, _id, status, items, totalQuantity, totalCost } = cart;
        const {address, city, district, phone, name} = user;
        
        if (address === '' && city === ''  && district === ''){
            
            await userSevice.updateAddress(user.email, newAddress, newDistrict, newCity);
            
        }
       
        const checkoutObj = {
            userId : userId,
            cartId: _id,
            status: status,
            items: items,
            totalQuantity: totalQuantity,
            totalCost: totalCost,
            address: newAddress,
            city: newCity,
            district: newDistrict,
            phone: newPhone,
            receiver: newName,
            shippingFee: 0,
            paymentMethod: "cod",
            totalPayment: totalCost,
        };

       
        await cartService.saveStatus(_id, "checked");
        await checkoutService.saveNewCheckout(checkoutObj);
        
        delete req.session.cart;

        
        res.redirect('/');

    }catch(err){
        res.render("error", {
            message: "Checkout fail!",
            err,
          });
    }


}
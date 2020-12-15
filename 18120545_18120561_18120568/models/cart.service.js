const Cart = require("./cart.model")


module.exports.findIdbyStatus = (id, status) =>{

    return Cart.findOne({
        userId: id,
        status: status ,
      });
}

module.exports.updateOne = (id, cart) =>{

    return Cart.updateOne(
            { userId: id },
            {
             $set: cart,
            }
        );
}

module.exports.findCartbyUserId =  (userId) =>{

    return Cart.findOne({userId : userId})
}

module.exports.saveStatus = (id, status) =>{

   return Cart.findById(id)
            .then(cart =>{
                cart.status = status;
                cart.save();
            })
}


module.exports.initCart = {
    userId: null,
    status: "waiting",
    items: [],
    totalQuantity: 0,
    totalCost: 0,
  };
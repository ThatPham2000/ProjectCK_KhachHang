const User = require('./user.model');


module.exports.FindCloudinaryEmail = async(email) =>{

    return await User.findOne({email: email})
}

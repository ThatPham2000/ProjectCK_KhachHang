const User = require('../models/user.model');
var cookieParser = require('cookie-parser')

module.exports.auth = async (req, res, next) =>{


    if (!req.isAuthenticated()){

        res.redirect('/');
        return;
    }
    let id = req.session.passport.user;
    
    User.findById(id, (err, result) => {

        //console.log(result);
        if (!result){
            res.redirect('/');
            return;   
        }
        else{
            if (!result.isVerify){
                res.send("Please Verify");
                return;
            }
            else{
                //req.userData = result;
                
                return next();
            }
        }
        
    })
    
    
}

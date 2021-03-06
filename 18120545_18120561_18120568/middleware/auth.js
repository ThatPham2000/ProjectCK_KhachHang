const User = require('../models/user.model');
var cookieParser = require('cookie-parser')

module.exports.auth = async (req, res, next) =>{


    if (!req.isAuthenticated()){

        res.redirect('/buyer/login');
        return;
    }
    let id = req.session.passport.user;
    
    User.findById(id, (err, result) => {

        
        if (!result){
            res.redirect('/buyer/login');
            return;   
        }
        else{
           
                
                return next();
           
        }
        
    })
    
    
}

module.exports.noAuth = async (req, res, next) =>{

    if (req.isAuthenticated()){

        return res.redirect('/');
        
    }
    next();

}

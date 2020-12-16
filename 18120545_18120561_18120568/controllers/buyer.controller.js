const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");

const User = require('../models/user.model');
const {sendEmail} =  require('../config/nodemailer');

const tokenLife = process.env.TOKEN_LIFE
const jwtKey = process.env.JWT_KEY


exports.getLogin = (req, res, next) =>{
    const message = req.flash("error")[0];
    
    console.log(req.isAuthenticated());
    
    res.render("login", {
        message: message,
        });
    
}

exports.getRegister = (req, res, next) =>{

    res.render('signup');
}

exports.getForgot = (req, res, next) =>{

    res.render('forgot');
}




module.exports.getOne = async (req, res) => {

    const _id = req.session.passport.user;
    
  
    User.findById(_id)
    .then(user => {
        if(!user){
            return res.status(404).json({
                msg: 'User not found!'
            })
        }else{
            res.render('user', {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                });
        }
    })
    .catch(error => {
        res.status(500).json({
            msg: 'Server error!',
            error
        })
    })
}

module.exports.postForgot = async (req, res) =>{

    try{
        User.findOne({email: req.body.email}, (err, user)=>{

            if (user){
                
                
                const token = jwt.sign( {_id: user._id}, jwtKey, {
                            expiresIn: 86400,
                });
                
                sendEmail(req, user.email, user.passwordReset, 'recovery');
                   
                
                res.redirect('checkforgot/' + token);
                

            }

        });
    }catch (error) {
        res.status(404).json({
           error
        })
    }
}

module.exports.forgot = async (req, res) => {

    const { token} = req.params;
    const code = req.body.code;
    console.log(code);
    if(!token){
        return res.status(404).json({
            msg: 'Invalid!'
        })
    }


    try {
        
        const decoded = jwt.verify(token, jwtKey)
        const {_id} = decoded;
     
        User.findById(_id)
        .then(async user =>  {
            if(!user) {
                
                return res.status(404).json({
                msg: 'Email not found!'
                });  
            }
            else{
            
                if (code == user.passwordReset){

                    res.render('resetPassword', {token: token});

                    //sinh ma xac nhan
                    let confirmPass = randomstring.generate({
                        length: 6
                      });
                    user.passwordReset = confirmPass;

                    user.save();
                }
                else{
                    return res.status(404).json({
                        msg: 'khong khop',
                    })
                }
                
            }
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Server error!',
                error
            })
        })


    }catch (error) {
        res.status(404).json({
           error
        })
    }

}

module.exports.postResetPassword = async (req, res) =>{

    const { token} = req.params;

    if(!token){
        return res.status(404).json({
            msg: 'Invalid!'
        })
    }

    try{
        const decoded = jwt.verify(token, jwtKey)
        const {_id} = decoded;
        User.findById({_id})
        .then(user => {

            if (!user){
                return res.status(404).json({
                    msg: 'user does not exists'
                })
            }

            bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), function(err, hashPass){ //Mã hóa mật khẩu trước khi lưu vào db
                if (err) {
                    //res.status(404).json({err});
                }
                
                user.password = hashPass;
                
            
                user.save();
                
                
                        
                res.redirect('/buyer/login');
            })
        });
    }catch(err){
        res.status(404).json({
            err
        })
    }
}

module.exports.confirm = (req, res) =>{

    const { token} = req.params;

    if(!token){
        return res.status(404).json({
            msg: 'Invalid!'
        })
    }

    try {
        
        const decoded = jwt.verify(token, jwtKey)
        const {_id} = decoded;

        User.findOne({_id})
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    msg: 'User not found!'
                })
            }
            
            if(user.isVerify){
                return res.status(200).json({
                    msg: 'success'
                })
            }

            user.isVerify = true
            
            user.save((error) => {
                if(error) {
                    throw error;
                }
            })
         
            res.redirect('/buyer/login');
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Server error!',
                error
            })
        })

    } catch (error) {
        res.status(404).json({
           error
        })
    }
    
}

exports.getCheckFogot = (req, res) => {

    const { token} = req.params;
    console.log(token);
    res.render('checkforgot', {token: token});
}

//check forgot
exports.checkFogot = (req, res) => {

    const {token} = req.params;
    
    res.redirect('buyer/resetPassword/' + token);

    
}






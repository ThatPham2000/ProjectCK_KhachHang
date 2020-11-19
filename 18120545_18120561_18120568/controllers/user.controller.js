const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");

const User = require('../models/user.model');
const {sendEmail} =  require('../config/nodemailer');

const tokenLife = process.env.TOKEN_LIFE
const jwtKey = process.env.JWT_KEY

module.exports.getOne = async (req, res) => {

    const _id = req.session.passport.user;
    
  
    User.findById(_id)
    .then(user => {
        if(!user){
            return res.status(404).json({
                message: 'User not found!'
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
            message: 'Server error!',
            error
        })
    })
}

//log out
exports.logout = (req, res, next) => {
    if (req.session.cart) {
      req.session.cart = null;
    }
    req.session.isVerify = false;
    req.logout();
    res.redirect("/");
  };

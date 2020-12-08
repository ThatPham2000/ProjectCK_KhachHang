const jwt =  require('jsonwebtoken')
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const fs = require("fs")
const formidable = require("formidable");

const User = require('../models/user.model');
const UserSevice = require('../models/user.Service');
const {sendEmail} =  require('../config/nodemailer');
const upload = require('../config/multer')
const cloudinary = require('../config/cloudinary');
const { fields } = require('../config/multer');



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
            
            var error = req.session.error;
            const errorPhone = req.session.errorPhone;
            delete req.session.errorPhone
            delete req.session.error;
            
            //get lengh and modify phone number

           
            let str = String(user.phone);
            let phone = '';
            for (let i = 0; i < str.length - 1; i++){
                   phone  += '*';
            }
            phone = phone + str[str.length - 1];
            
            res.render('user', {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    phone: phone,
                    sex: user.sex,
                    birthday: user.birthday,
                    error: error,
                    errorPhone: errorPhone,
                });

            //delete res.session.error;
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Server error!',
            error
        })
    })
}

exports.saveInfor = async (req, res, next) =>{

    const form = formidable({multiples : true});

    form.parse(req, async (err, fields, files) => {
        if (err){
            return next(err);
        }

        const {name, email, image,  phone, sex, birthday} = fields;
        
        var newImage;
        var pathHost;
        let ret;

        const fileUpload = files.image;
        
        if (fileUpload && fileUpload.size > 0){
            const filepath = fileUpload.path.split('\\').pop() + '.' + fileUpload.name.split('.').pop();
            
            fs.renameSync(fileUpload.path, __dirname + '/../public/uploads/' + filepath)
            pathHost =  __dirname + '/../public/uploads/' + filepath;
            newImage  = "/uploads/" + filepath;

            ret = await cloudinary.uploadSingleAvatar(pathHost);
           
            if (ret) {
                const user = await UserSevice.FindCloudinaryEmail(email);
                
                if (user.cloudinary_id){
                    await cloudinary.destroySingle(user.cloudinary_id);
                }
                
                
            }
        }
        
        

        User.findOne({email: email})
        .then(user => {
            user.name = name;
            user.sex = sex;


            if (ret){
                user.image = ret.url;
                user.cloudinary_id = ret.id;
            }

            user.birthday = birthday;
            user.save();
            res.redirect('/user/account/profile');
    
        })
    })
    

}


exports.changePassword = (req, res) =>{

    const {password, newpass, confirmpass} = req.body;

    const _id = req.session.passport.user;

    User.findById(_id)
    .then(user =>{

        if (!user){
            return res.status(404).json({
                message: "User does not exists",
            })
        }
        else{
            console.log(password);
            
                bcrypt.compare(password, user.password)
                .then(result =>{
                    console.log(result);
                    if (!result) {
                        req.session.error = 'Wrong password';
                        return res.redirect('/user/account/profile');
                    } else {
                        if (newpass === confirmpass){

                            bcrypt.hash(newpass, bcrypt.genSaltSync(10))
                            .then(newhash =>{
                                user.password = newhash;

                                user.save();
                                return res.redirect('/user/account/logout');
                            })
                        }
                        else{
                         
                            req.session.error = 'confirm password does not match';
                            return res.redirect('/user/account/profile');
                        }
                    }
               
                })
            
        }

        
    })

    
}

exports.changeTel = (req, res) =>{

    const {curPhone, newPhone} = req.body;

    const _id = req.session.passport.user;

    
    User.findById(_id)
    .then(user =>{

        if (!user){
            return res.status(404).json({
                message: "User does not exists",
            })
        }
        else{
            var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if (vnf_regex.test(newPhone) == false || vnf_regex.test(curPhone) == false ){

                req.session.errorPhone = 'Your input are not a phone number';
                return res.redirect('/user/account/profile');
            }   

            if (user.phone == curPhone){
                
                user.phone = newPhone;
                
                user.save();
                return res.redirect('/user/account/profile');
            }else{
                req.session.errorPhone = 'Wrong phone number';
                return res.redirect('/user/account/profile');
            }
            
        }

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

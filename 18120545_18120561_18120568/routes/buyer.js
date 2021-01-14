const express= require('express');
const { get } = require('mongoose');
const passport= require('passport');

var controllers = require('../controllers/buyer.controller');

var authorize = require("../middleware/auth");


const router = express.Router();


router.get('/login',authorize.noAuth, controllers.getLogin);
       
router.post('/login', passport.authenticate("localSignin", {
                    successRedirect: "/",
                    failureRedirect: "/buyer/login",
                    failureFlash: true
                }));

router.post('/signup', passport.authenticate('localSignup', {
            successRedirect: '/buyer/login',
            failureRedirect: '/buyer/signup',
            failureFlash: true,
            successFlash: 'Sign Up Success. Please confirm your account via gmail!'
        }));


router.get('/signup', authorize.noAuth, controllers.getRegister);


router.get('/confirm/:token',authorize.noAuth,  controllers.confirm);


router.route('/forgot')
        .get(authorize.noAuth, controllers.getForgot)
        .post(authorize.noAuth, controllers.postForgot);

router.route('/resetPassword/:token')
        .get(authorize.noAuth,  controllers.getResetPassword)
        .post(authorize.noAuth,  controllers.postResetPassword);



router.route('/checkforgot/:token')
    .get(authorize.noAuth, controllers.getCheckFogot)
    .post(authorize.noAuth, controllers.forgot);


router.post('/checkSignup', authorize.noAuth, controllers.checkSingup);



module.exports = router;




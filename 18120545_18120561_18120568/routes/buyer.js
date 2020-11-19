const express= require('express');
const { get } = require('mongoose');
const passport= require('passport');

var controllers = require('../controllers/buyer.controller');

var authorize = require("../middleware/auth");


const router = express.Router();


router.get('/login', controllers.getLogin);
       
router.post('/login', passport.authenticate("localSignin", {
                    successRedirect: "/",
                    failureRedirect: "/buyer/login",
                    failureFlash: true
                }));

router.post('/signup', passport.authenticate('localSignup', {
            successRedirect: '/',
            failureRedirect: '/buyer/signup',
            failureFlash: true
        }));


router.get('/signup', controllers.getRegister);


router.get('/confirm/:token', controllers.confirm);


router.route('/forgot')
        .get(controllers.getForgot)
        .post( controllers.postForgot);

router.route('/resetPassword/:token')
        .get( controllers.forgot)
        .post( controllers.postResetPassword);



router.route('/checkforgot/:token')
    .get(controllers.getCheckFogot)
    .post( controllers.checkFogot);






module.exports = router;




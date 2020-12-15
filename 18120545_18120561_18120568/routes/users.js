const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const authorize = require("../middleware/auth");

/* GET users listing. */
router.route('/account/profile')
    .get(authorize.auth, user.getOne)
    .post(authorize.auth, user.saveInfor);

router.get('/account/logout', authorize.auth, user.logout);


router.post('/account/changePassword', authorize.auth, user.changePassword );

router.post('/account/changePhone', authorize.auth, user.changeTel);


module.exports = router;

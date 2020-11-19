const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const authorize = require("../middleware/auth");

/* GET users listing. */
router.route('/account/profile')
    .get(authorize.auth, user.getOne)
    .post(authorize.auth, user.saveInfor);

router.get('/account/logout', user.logout);


router.post('/account/changePassword', user.changePassword );

router.post('/account/changePhone', user.changeTel);


module.exports = router;

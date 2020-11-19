var express = require('express');
var router = express.Router();

const user = require('../controllers/user.controller');
const authorize = require("../middleware/auth");

/* GET users listing. */
router.get('/account/profile',  authorize.auth, user.getOne);

router.get('/account/logout', user.logout);

module.exports = router;

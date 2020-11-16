var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController');
const productDetailsController = require('../controllers/productDetailsController');
const homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', homeController.index);
router.get('/index.html', homeController.index);
router.get('/404.html', function(req, res, next) {
  res.render('404', { layout: false });
});
router.get('/blog-single.html', function(req, res, next) {
  res.render('blog-single', { title: 'Blog Single' });
});
router.get('/blog.html', function(req, res, next) {
  res.render('blog', { title: 'Blog' });
});
router.get('/cart.html', function(req, res, next) {
  res.render('cart', { title: 'Cart' });
});
router.get('/checkout.html', function(req, res, next) {
  res.render('checkout', { title: 'Checkout' });
});
router.get('/contact-us.html', function(req, res, next) {
  res.render('contact-us', { title: 'Contact Us' });
});
router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
router.get('/product-details.html', productDetailsController.index);
router.get('/shop.html', shopController.index);
module.exports = router;

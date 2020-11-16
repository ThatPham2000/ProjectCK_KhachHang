var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TechShop' });
});
router.get('/404.html', function(req, res, next) {
  res.render('404', { layout: false });
});
router.get('/blog-single.html', function(req, res, next) {
  res.render('blog-single', { layout: false });
});
router.get('/blog.html', function(req, res, next) {
  res.render('blog', { layout: false });
});
router.get('/cart.html', function(req, res, next) {
  res.render('cart', { layout: false });
});
router.get('/checkout.html', function(req, res, next) {
  res.render('checkout', { layout: false });
});
router.get('/contact-us.html', function(req, res, next) {
  res.render('contact-us', { layout: false });
});
router.get('/login.html', function(req, res, next) {
  res.render('login', { layout: false });
});
router.get('/product-details.html', function(req, res, next) {
  res.render('product-details', { layout: false });
});
router.get('/shop.html', function(req, res, next) {
  res.render('shop', { layout: false });
});
module.exports = router;

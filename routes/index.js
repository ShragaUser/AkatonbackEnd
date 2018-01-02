var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'YES' });
//});
router.get('/', function (req, res) {
  res.sendFile('C:/xampp/htdocs/nodejslearning/public/javascripts/form.html' );
})


module.exports = router;
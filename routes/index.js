var express = require('express');
var router = express.Router();
var dbHandler = require('../handlers/DB/DBHandler');

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'YES' });
//});
router.get('/', function (req, res) {
  res.sendFile('C:/xampp/htdocs/nodejslearning/public/javascripts/form.html' );
})

router.get('/SoldierData', function (req, res) {
  if(req.query){
    dbHandler.getSoldierData(req.query.pnumber)
      .then(data => {
        res.status=200;
        res.send(data[0]);
       },err =>{res.status=500; res.send()});
  }
})


module.exports = router;
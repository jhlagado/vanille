var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash('success', 'Item has been created');
  console.log('****', req.flash());
  res.render('index', { title: 'Express', xmessages:{a:[1,2,3]} });
});

module.exports = router;

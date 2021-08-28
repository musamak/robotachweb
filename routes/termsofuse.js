var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('termsofuse', { title: 'Terms of use - Robotach', menuValue: 'termsofuse'  });
});

module.exports = router;

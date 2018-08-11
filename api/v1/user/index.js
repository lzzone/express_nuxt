var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.authUser = { username: 'demo' }
  res.send({a:'hello user'});
});

module.exports = router;
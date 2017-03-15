var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Endless UNIVERSE',
      wellcomeTitle: 'Endless Universe',
      wellcomeText: 'Wellcome to the star cluster'
  });
});

module.exports = router;

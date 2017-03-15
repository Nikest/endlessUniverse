var express = require('express');
var router = express.Router();

var astroSystem;

router.post('/', function(req, res, next) {
    astroSystem = JSON.stringify(req.body);
    res.send('success');
});

router.get('/', function(req, res, next) {
    res.send(astroSystem);
});

module.exports = router;
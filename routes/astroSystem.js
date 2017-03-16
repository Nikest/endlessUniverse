var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var file = './data/astroSystem.json';

router.post('/', function(req, res, next) {
    astroSystem = JSON.stringify(req.body);
    jsonfile.writeFileSync(file, req.body, {spaces: 2});
    res.send('System saved');
});

router.get('/', function(req, res, next) {
    jsonfile.readFile(file, function(err, obj) {
        res.send(obj);
    });
});

router.delete('/', function (req, res) {
    jsonfile.writeFileSync(file, null, {spaces: 2});
    res.send('System was deleted');
});

module.exports = router;
var router = require('express').Router();
var testf = require('../functions/testf.js');

router.get('/',function (req,res) {
    res.send(testf());
});
module.exports = router;

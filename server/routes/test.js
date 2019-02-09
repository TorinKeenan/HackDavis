var router = require('express').Router();
var helpers = require('../functions/index.js');
console.log("------Helpers----")
console.log(helpers);
router.get('/',function (req,res) {
    // console.log(helpers[testf].());
    // console.log(helpers[testf]());
    console.log(helpers.testf());
    // console.log(helpers.testf.());
    conso
    res.send(helpers['testf']());
});
module.exports = router;

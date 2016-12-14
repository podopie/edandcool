var express = require('express');
var router = express.Router();

/* POST form. */
router.get('/', function(req, res) {
    res.redirect('/een');
});

module.exports = router;

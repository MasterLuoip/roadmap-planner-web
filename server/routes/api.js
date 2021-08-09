var express = require('express');
var router = express.Router();

router.get('/roadmaps', (req, res, next) => {
  res.send('this is api get');
});

module.exports = router;

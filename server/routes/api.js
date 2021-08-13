var express = require('express');
var router = express.Router();

const db = require('../queries');
router.get('/roadmaps', db.getRoadmaps);

module.exports = router;

var express = require('express');
var router = express.Router();

const db = require('../queries/roadmapsTableQueries');
router.get('/roadmaps', db.getRoadmaps);
router.post('/roadmaps', db.addRoadmap);

module.exports = router;

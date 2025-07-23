const express = require('express');
const router = express.Router();

const resultController = require('../controllers/resultController');

router.post('/results', resultController.submitResult);
router.get('/results/:userId', resultController.getResultsByUser);

module.exports = router;

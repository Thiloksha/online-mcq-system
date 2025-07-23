const express = require('express');
const router = express.Router();

const resultController = require('../controllers/resultController');

router.post('/', resultController.submitResult);
router.get('/:userId', resultController.getResultsByUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/', examController.getAllExams);
router.post('/', examController.createExam);
router.get('/:id/questions', examController.getQuestionsByExamId);

module.exports = router;

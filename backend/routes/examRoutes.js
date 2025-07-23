const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/', examController.getAllExams);
router.post('/', examController.createExam);

router.get('/:id', examController.getExamById);

router.get('/:id/questions', examController.getQuestionsByExamId);
router.post('/:id/questions/batch', examController.addMultipleQuestionsToExam); 

module.exports = router;

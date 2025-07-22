const express = require('express');
const router = express.Router();

const Exam = require('../models/Exam');
const Question = require('../models/Question');

router.get('/exams', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/exams/:id/questions', async (req, res) => {
  try {
    const questions = await Question.find({ examId: req.params.id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExam = async (req, res) => {
  try {
    const newExam = new Exam({
      title: req.body.title,
      description: req.body.description
    });

    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getQuestionsByExamId = async (req, res) => {
  try {
    const questions = await Question.find({ examId: req.params.id });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

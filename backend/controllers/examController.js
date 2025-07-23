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

exports.addMultipleQuestionsToExam = async (req, res) => {
  const examId = req.params.id;
  const questions = req.body.questions;

  try {
    const questionDocs = questions.map(q => ({
      examId: examId,
      questionText: q.questionText,   
      options: q.options,
      correctOption: q.correctOption 
    }));

    const savedQuestions = await Question.insertMany(questionDocs);
    res.status(201).json(savedQuestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const mongoose = require('mongoose');
const Result = require('../models/Result');
const Answer = require('../models/Answer');

exports.submitResult = async (req, res) => {
  try {
    const { userId, examId, score, answers } = req.body;
    console.log('Request body:', req.body); // Log the incoming request body

    // Validate userId and examId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: 'Invalid examId' });
    }

    const result = new Result({ userId, examId, score });
    const savedResult = await result.save();
    console.log('Saved result:', savedResult); // Log the saved result

    const answerDocs = answers.map(ans => {
      if (!mongoose.Types.ObjectId.isValid(ans.questionId)) {
        throw new Error(`Invalid questionId: ${ans.questionId}`);
      }
      return {
        resultId: savedResult._id,
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect: ans.isCorrect,
      };
    });

    await Answer.insertMany(answerDocs);
    console.log('Saved answers:', answerDocs); // Log the saved answers

    res.status(201).json({ message: 'Result saved successfully', resultId: savedResult._id });
  } catch (err) {
    console.error('Error in submitResult:', err); // Log the full error
    res.status(500).json({ message: err.message });
  }
};

exports.getResultsByUser = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId }).populate('examId');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

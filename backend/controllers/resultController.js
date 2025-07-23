
const Result = require('../models/Result');
const Answer = require('../models/Answer');

exports.submitResult = async (req, res) => {
  try {
    const { userId, examId, score, answers } = req.body;

    const result = new Result({ userId, examId, score });
    const savedResult = await result.save();

    const answerDocs = answers.map(ans => ({
      resultId: savedResult._id,
      questionId: ans.questionId,
      selectedOption: ans.selectedOption,
      isCorrect: ans.isCorrect
    }));

    await Answer.insertMany(answerDocs);

    res.status(201).json({ message: 'Result saved successfully', resultId: savedResult._id });
  } catch (err) {
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

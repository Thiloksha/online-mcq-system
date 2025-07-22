const express = require('express');
const router = express.Router();

const Result = require('../models/Result');
const Answer = require('../models/Answer');

// Submit exam result and answers
router.post('/results', async (req, res) => {
  /*
    Expected req.body format:
    {
      userId: "userId",
      examId: "examId",
      score: number,
      answers: [
        { questionId: "...", selectedOption: "...", isCorrect: true/false },
        ...
      ]
    }
  */
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
});

router.get('/results/:userId', async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId }).populate('examId');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

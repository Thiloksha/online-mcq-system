const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  resultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  selectedOption: String,
  isCorrect: Boolean
});

module.exports = mongoose.model('Answer', answerSchema);

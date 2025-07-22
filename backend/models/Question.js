const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  },
  questionText: String,
  options: [String],
  correctOption: String
});

module.exports = mongoose.model('Question', questionSchema);
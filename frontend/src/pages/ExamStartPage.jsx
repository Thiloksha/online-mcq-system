import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ExamStartPage.css';

const ExamStartPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [examIndex, setExamIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const [allExamsRes, questionsRes] = await Promise.all([
          axios.get('/api/exams'),
          axios.get(`/api/exams/${id}/questions`)
        ]);

        const allExams = allExamsRes.data;
        const index = allExams.findIndex(exam => exam._id === id);
        if (index !== -1) {
          setExamIndex(index + 1);
        }

        setQuestions(questionsRes.data);
      } catch (err) {
        setError('Failed to load exam or questions');
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  const handleOptionChange = (qIndex, option) => {
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmitClick = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }
    setShowConfirm(true);
  };

  const handleFinalSubmit = async () => {
  setShowConfirm(false);
  setSubmitted(true);
  setShowSuccess(true);

  let userId = 'unknown-user';
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        userId = parsedUser._id || parsedUser.id || 'unknown-user';
      }
    }
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
  }

  let score = 0;
  const answersArray = questions.map((question, index) => {
    const selectedOption = answers[index];
    const isCorrect = selectedOption === question.correctOption; 
    if (isCorrect) score += 1;
    return {
      questionId: question._id,
      selectedOption,
      isCorrect
    };
  });

  try {
  const payload = {
    examId: id,
    userId,
    score,
    answers: answersArray
  };

  console.log("Submitting result payload:", payload);

  const response = await axios.post('/api/results', payload);
  console.log("Result saved:", response.data);
} catch (err) {
  console.error("Failed to save result:", err.response?.data || err.message);
}
};


  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="exam-container">
      <h2>Mock Paper {examIndex}</h2>

      {questions.map((q, index) => (
        <div key={q._id || index} className="question-block">
          <h4>Q{index + 1}. {q.questionText}</h4>
          {q.options.map(option => (
            <label
              key={option}
              className={`option-label ${submitted ? 'disabled' : ''}`}
            >
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                disabled={submitted}
                checked={answers[index] === option}
                onChange={() => handleOptionChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      {!submitted && (
        <button className="submit-button" onClick={handleSubmitClick}>
          Submit Answers
        </button>
      )}

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to submit your answers?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowConfirm(false)}>Return to Attempt</button>
              <button onClick={handleFinalSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal">
            <p>You have successfully finished the exam!🎉</p>
            <button onClick={() => navigate('/exams')}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamStartPage;

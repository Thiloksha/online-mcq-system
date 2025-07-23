import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResultsPage.css';

const ResultDetailPage = () => {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { examIndex } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsRes = await axios.get(`/api/exams/${examId}/questions`);
        setQuestions(questionsRes.data);

        const simulatedUserAnswers = {};
        questionsRes.data.forEach((q, i) => {
          simulatedUserAnswers[i] = Math.random() > 0.5 ? q.correctOption : 'Wrong Answer';
        });
        setUserAnswers(simulatedUserAnswers);
        setLoading(false);
      } catch {
        setError('Failed to load result data');
        setLoading(false);
      }
    };

    fetchData();
  }, [examId]);

  const calculateScore = () => {
    return questions.reduce((score, q, i) => {
      return userAnswers[i] === q.correctOption ? score + 1 : score;
    }, 0);
  };

  if (loading) return <p>Loading result details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="result-detail-container">
      <h2>Results of Paper {examIndex || ''}</h2>
      <div className="score">
        Total Score: {calculateScore()} / {questions.length}
      </div>

      <div className="questions-list">
        {questions.map((q, index) => {
          const isCorrect = userAnswers[index] === q.correctOption;
          return (
            <div
              key={q._id || index}
              className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}
            >
              <h4>Q{index + 1}. {q.questionText || q.question}</h4>
              <p>Your answer: <b>{userAnswers[index]}</b></p>
              <p>Correct answer: <b>{q.correctOption}</b></p>
            </div>
          );
        })}
      </div>

      <button className="back-button" onClick={() => navigate('/results')}>
        Back to Results
      </button>
    </div>
  );
};

export default ResultDetailPage;

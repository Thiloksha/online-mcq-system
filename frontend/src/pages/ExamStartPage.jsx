import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExamStartPage = () => {
  const { id } = useParams(); // exam ID from URL param
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // user answers keyed by question index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`/api/exams/${id}/questions`)
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load questions');
        setLoading(false);
      });
  }, [id]);

  const handleOptionChange = (qIndex, option) => {
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }
    setSubmitted(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return answers[index] === question.answer ? score + 1 : score;
    }, 0);
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h2>Mock Paper {id}</h2>

      {questions.map((q, index) => (
        <div key={q._id || index} style={{ marginBottom: '1.5rem' }}>
          <h4>Q{index + 1}. {q.question}</h4>
          {q.options.map(option => (
            <label key={option} style={{ display: 'block', marginBottom: '0.4rem', cursor: submitted ? 'default' : 'pointer' }}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                disabled={submitted}
                checked={answers[index] === option}
                onChange={() => handleOptionChange(index, option)}
                style={{ marginRight: '0.5rem' }}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.7rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Submit Answers
        </button>
      ) : (
        <div style={{ marginTop: '1.5rem', fontSize: '1.2rem' }}>
          <strong>Your Score: {calculateScore()} / {questions.length}</strong>
        </div>
      )}
    </div>
  );
};

export default ExamStartPage;

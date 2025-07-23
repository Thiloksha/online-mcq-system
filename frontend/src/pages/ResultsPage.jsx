import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ResultsPage.css';

const ResultsPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/exams')
      .then(res => {
        setExams(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load exams');
        setLoading(false);
      });
  }, []);

  const handleResultClick = (exam, index) => {
    navigate(`/results/${exam._id}`, { state: { examIndex: index + 1, examTitle: exam.title } });
  };

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="results-container">
      <h2>Results</h2>
      <div className="results-list">
        {exams.map((exam, index) => (
          <div
            key={exam._id}
            className="result-card"
            onClick={() => handleResultClick(exam, index)}
          >
            <h3>Results of Paper {index + 1}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;

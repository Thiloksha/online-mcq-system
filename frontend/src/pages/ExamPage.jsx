import { useEffect, useState } from 'react';
import axios from 'axios';
import ExamCard from '../components/ExamCard';
import { useNavigate } from 'react-router-dom';
import '../styles/ExamPage.css'

const ExamPage = () => {
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

  const handleExamClick = (exam) => {
    navigate(`/exams/${exam._id}`);
  };

  if (loading) return <p>Loading exams...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="exam-page">
    <h2>Available Exam Papers</h2>
    <div className="exam-list">
      {exams.map((exam) => (
        <ExamCard
          key={exam._id}
          title={exam.title}
          onClick={() => handleExamClick(exam)}
        />
      ))}
    </div>
  </div>
  );
};

export default ExamPage;

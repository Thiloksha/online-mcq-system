import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AttemptPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/exams/${examId}`)
      .then(res => {
        setExam(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load exam details');
        setLoading(false);
      });
  }, [examId]);

  const handleAttempt = () => {
    navigate(`/exams/${examId}/start`);
  };

  if (loading) return <p>Loading exam...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>{exam.title}</h2>
      <p>Are you ready to attempt this exam?</p>
      <button
        style={{
          padding: '0.7rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
        onClick={handleAttempt}
      >
        Attempt
      </button>
    </div>
  );
};

export default AttemptPage;

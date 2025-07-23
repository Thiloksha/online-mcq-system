import { getUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // <- Import the CSS file

const HomePage = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/exams');
  };

  return (
    <div className="home-container">
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <p>You are now logged in to the Online MCQ Exam System.</p>

      <div className="card" onClick={handleCardClick}>
        <h2>Exam Paper List</h2>
        <p>View and attempt available exams</p>
      </div>
    </div>
  );
};

export default HomePage;

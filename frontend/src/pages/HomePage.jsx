import { getUser, logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // <- Import the CSS file

const HomePage = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <p>You are now logged in to the Online MCQ Exam System.</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;

import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../services/auth';
import '../styles/NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">MCQ System</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/exams">Exams</Link></li>
        <li><Link to="/results">Results</Link></li>

        {isLoggedIn() ? (
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

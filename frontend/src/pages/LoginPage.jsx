import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = formData;

    if (email === 'student1@example.com' && password === 'student123@') {
      const fakeToken = 'dummy-token-123';
    const fakeUser = { email };

    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(fakeUser));
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/auth';

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

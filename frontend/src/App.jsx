import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
 
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

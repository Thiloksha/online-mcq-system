import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import ExamPage from './pages/ExamPage';
import AttemptPage from './pages/AttemptPage';
import ExamStartPage from './pages/ExamStartPage';
 
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/exams" element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />
        <Route path="/exams/:examId" element={
            <ProtectedRoute>
              <AttemptPage />
            </ProtectedRoute>
          }
        />
        <Route path="/exams/:id/start" element={
            <ProtectedRoute>
              <ExamStartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

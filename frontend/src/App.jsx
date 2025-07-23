import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import ExamPage from './pages/ExamPage';
import AttemptPage from './pages/AttemptPage';
import ExamStartPage from './pages/ExamStartPage';
import ResultsPage from './pages/ResultsPage'; 
import ResultDetailPage from './pages/ResultDetailPage';

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
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results/:examId" element={<ResultDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

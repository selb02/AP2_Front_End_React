import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import HomePage from './pages/Dashboard/Home';
import Sobre from './pages/Dashboard/Sobre';
import Moradores from './pages/Dashboard/Moradores';
import Apartamentos from './pages/Dashboard/Apartamentos';
import Contas from './pages/Dashboard/Contas';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Rota protegida principal com rotas aninhadas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            {/* Rotas filhas - serão renderizadas dentro do Dashboard */}
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="moradores" element={<Moradores />} />
            <Route path="apartamentos" element={<Apartamentos />} />
            <Route path="contas" element={<Contas />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
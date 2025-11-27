import './style.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bem-vindo, {user?.nome}!</h1>
        <button onClick={logout} className="logout-btn">Sair</button>
      </header>

      <nav className="dashboard-nav">
        <Link to="/dashboard/home" className="nav-link">Home</Link>
        <Link to="/dashboard/sobre" className="nav-link">Sobre a Empresa</Link>
        <Link to="/dashboard/moradores" className="nav-link">Moradores</Link>
        <Link to="/dashboard/apartamentos" className="nav-link">Apartamentos</Link>
        <Link to="/dashboard/contas" className="nav-link">Contas</Link>
        <Link to="/dashboard/funcionarios" className="nav-link">Funcionários</Link>
      </nav>

      <main className="dashboard-content">
        {/* Substitui Routes por Outlet para renderizar as rotas filhas */}
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
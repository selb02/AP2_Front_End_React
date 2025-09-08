import './Home.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <h2 className="hero-title">Bem-vindo à Nossa Plataforma</h2>
        <p className="hero-subtitle">
          Sua jornada digital começa aqui. Explore todas as possibilidades que oferecemos.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Performance</h3>
          <p>Sistema otimizado para máxima velocidade e eficiência em todas as operações.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Segurança</h3>
          <p>Seus dados protegidos com as mais avançadas tecnologias de criptografia.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Inovação</h3>
          <p>Recursos modernos e interface intuitiva para uma experiência excepcional.</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">10k+</span>
          <span className="stat-label">Usuários Ativos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">99.9%</span>
          <span className="stat-label">Disponibilidade</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Suporte</span>
        </div>
      </div>

      
    </div>
  );
}

export default HomePage;
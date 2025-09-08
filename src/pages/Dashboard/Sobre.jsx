import './Sobre.css'

function Sobre() {
  return (
    <div className="sobre-container">
      <div className="sobre-hero">
        <h2 className="sobre-title">Sobre Nossa Empresa</h2>
        <p className="sobre-subtitle">
          Transformando ideias em realidade desde 2020
        </p>
      </div>

      <div className="timeline-section">
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>2020 - Fundação</h3>
            <p>Nossa empresa foi fundada em 2020 para criar serviços de gerenciamento de condominíos.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>2021 - Expansão</h3>
            <p>Crescimento da equipe e desenvolvimento de nossa primeira suite completa de produtos para atender diferentes condominios.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>2023 - Inovação</h3>
            <p>Expansão da nossa rede de condominios assim atualizando nosso site e poder computacional.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>2024 - Presente</h3>
            <p>Continuamos evoluindo, sempre focados em entregar valor excepcional e superar as expectativas de nossos clientes.</p>
          </div>
        </div>
      </div>

      <div className="valores-section">
        <h3 className="section-title">Nossos Valores</h3>
        <div className="valores-grid">
          <div className="valor-card">
            <div className="valor-icon">💎</div>
            <h4>Qualidade</h4>
            <p>Comprometimento com a excelência em cada detalhe dos nossos produtos e serviços.</p>
          </div>
          
          <div className="valor-card">
            <div className="valor-icon">🚀</div>
            <h4>Inovação</h4>
            <p>Sempre na vanguarda da tecnologia, buscando soluções criativas e disruptivas.</p>
          </div>
          
          <div className="valor-card">
            <div className="valor-icon">⭐</div>
            <h4>Satisfação</h4>
            <p>O sucesso dos nossos clientes é nossa maior motivação e objetivo principal.</p>
          </div>
          
          <div className="valor-card">
            <div className="valor-icon">🤝</div>
            <h4>Confiança</h4>
            <p>Construímos relacionamentos duradouros baseados na transparência e integridade.</p>
          </div>
        </div>
      </div>

      <div className="missao-section">
        <div className="missao-grid">
          <div className="missao-item">
            <h4>Nossa Missão</h4>
            <p>Democratizar o acesso à tecnologia de qualidade, oferecendo soluções que realmente fazem a diferença na vida das pessoas e empresas.</p>
          </div>
          
          <div className="missao-item">
            <h4>Nossa Visão</h4>
            <p>Ser reconhecida como a empresa mais inovadora e confiável do setor, transformando desafios em oportunidades.</p>
          </div>
          
          <div className="missao-item">
            <h4>Nosso Compromisso</h4>
            <p>Entregar resultados excepcionais através de uma equipe apaixonada, processos eficientes e tecnologia de vanguarda.</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h3 className="section-title">Nossa Equipe</h3>
        <div className="team-stats">
          <div className="team-stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Profissionais</span>
          </div>
          <div className="team-stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Especialidades</span>
          </div>
          <div className="team-stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Dedicação</span>
          </div>
        </div>
      </div>

      <div className="cta-sobre">
        <h3>Quer saber mais sobre nós?</h3>
        <p>Entre em contato e descubra como podemos ajudar sua empresa a alcançar novos patamares.</p>
        <button className="btn-contato">Fale Conosco</button>
      </div>
    </div>
  );
}

export default Sobre;
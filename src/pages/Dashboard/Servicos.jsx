import { useState, useEffect } from 'react';
import './Servicos.css';

function Servicos() {
  // Estado para armazenar apartamentos
  const [apartamentos, setApartamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado do formulário de apartamento
  const [apartamentoForm, setApartamentoForm] = useState({
    Numero_AP: '',
    Ocupado: false,
    Alugado: false,
    Venda: false
  });

  // URL base da sua API (ajuste conforme necessário)
  const API_BASE_URL = 'https://frameworks-sistemadetransportadora.onrender.com/api'; // Ajuste para sua URL

  // Função para carregar apartamentos
  const carregarApartamentos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/apartamentos/apartamento`);
      if (!response.ok) {
        throw new Error('Erro ao carregar apartamentos');
      }
      const data = await response.json();
      setApartamentos(data);
    } catch (err) {
      setError('Erro ao carregar apartamentos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega apartamentos ao montar o componente
  useEffect(() => {
    carregarApartamentos();
  }, []);

  // Função para adicionar apartamento
  const adicionarApartamento = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/apartamentos/apartamento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apartamentoForm)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao adicionar apartamento');
      }

      const novoApartamento = await response.json();
      setApartamentos([...apartamentos, novoApartamento]);
      
      // Limpa o formulário
      setApartamentoForm({
        Numero_AP: '',
        Ocupado: false,
        Alugado: false,
        Venda: false
      });
      
      alert('Apartamento adicionado com sucesso!');
    } catch (err) {
      setError('Erro ao adicionar apartamento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar apartamento
  const atualizarApartamento = async (numeroAP, dadosAtualizados) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/apartamentos/apartamento/${numeroAP}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar apartamento');
      }

      // Recarrega a lista de apartamentos
      await carregarApartamentos();
      alert('Apartamento atualizado com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar apartamento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para remover apartamento (se você tiver endpoint de DELETE)
  const removerApartamento = async (numeroAP) => {
    if (!confirm('Tem certeza que deseja remover este apartamento?')) {
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/apartamentos/apartamento/${numeroAP}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao remover apartamento');
      }

      setApartamentos(apartamentos.filter(apt => apt.Numero_AP !== numeroAP));
      alert('Apartamento removido com sucesso!');
    } catch (err) {
      setError('Erro ao remover apartamento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApartamentoForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Função para alternar status do apartamento
  const alternarStatus = async (apartamento, campo) => {
    const dadosAtualizados = {
      Ocupado: apartamento.Ocupado,
      Alugado: apartamento.Alugado,
      Venda: apartamento.Venda,
      [campo]: !apartamento[campo]
    };
    
    await atualizarApartamento(apartamento.Numero_AP, dadosAtualizados);
  };

  return (
    <div className="servicos-container">
      <h2>Gerenciamento de Apartamentos</h2>
      
      {error && (
        <div className="error-message" style={{color: 'red', padding: '10px', margin: '10px 0'}}>
          {error}
        </div>
      )}

      {/* Formulário para adicionar apartamento */}
      <form onSubmit={adicionarApartamento} className="produto-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Número do Apartamento</label>
            <input
              type="text"
              name="Numero_AP"
              value={apartamentoForm.Numero_AP}
              onChange={handleChange}
              placeholder="Ex: 101"
              required
            />
          </div>
        </div>

        <div className="descricoes-grid">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="Ocupado"
                checked={apartamentoForm.Ocupado}
                onChange={handleChange}
              />
              Ocupado
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="Alugado"
                checked={apartamentoForm.Alugado}
                onChange={handleChange}
              />
              Alugado
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="Venda"
                checked={apartamentoForm.Venda}
                onChange={handleChange}
              />
              À Venda
            </label>
          </div>
        </div>

        <button type="submit" className="add-produto-btn" disabled={loading}>
          {loading ? '⏳ Adicionando...' : '➕ Adicionar Apartamento'}
        </button>
      </form>

      {/* Lista de apartamentos */}
      <div className="produtos-list">
        <h3>Apartamentos Cadastrados ({apartamentos.length})</h3>
        
        {loading && !error && (
          <p className="loading-message">⏳ Carregando apartamentos...</p>
        )}
        
        {apartamentos.length === 0 && !loading ? (
          <p className="empty-message">Nenhum apartamento cadastrado ainda.</p>
        ) : (
          <div className="produtos-grid">
            {apartamentos.map(apartamento => (
              <div key={apartamento.Numero_AP} className="produto-card">
                <div className="produto-header">
                  <h4>Apartamento {apartamento.Numero_AP}</h4>
                </div>

                <div className="produto-descricoes">
                  <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', margin: '10px 0'}}>
                    <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <input
                        type="checkbox"
                        checked={apartamento.Ocupado}
                        onChange={() => alternarStatus(apartamento, 'Ocupado')}
                        disabled={loading}
                      />
                      <span style={{color: apartamento.Ocupado ? 'red' : 'green'}}>
                        {apartamento.Ocupado ? '🔴 Ocupado' : '🟢 Disponível'}
                      </span>
                    </label>

                    <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <input
                        type="checkbox"
                        checked={apartamento.Alugado}
                        onChange={() => alternarStatus(apartamento, 'Alugado')}
                        disabled={loading}
                      />
                      <span style={{color: apartamento.Alugado ? 'blue' : 'gray'}}>
                        {apartamento.Alugado ? '🏠 Alugado' : '🏠 Não Alugado'}
                      </span>
                    </label>

                    <label style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <input
                        type="checkbox"
                        checked={apartamento.Venda}
                        onChange={() => alternarStatus(apartamento, 'Venda')}
                        disabled={loading}
                      />
                      <span style={{color: apartamento.Venda ? 'orange' : 'gray'}}>
                        {apartamento.Venda ? '💰 À Venda' : '💰 Não à Venda'}
                      </span>
                    </label>
                  </div>
                </div>

                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button 
                    onClick={() => removerApartamento(apartamento.Numero_AP)}
                    className="remove-produto-btn"
                    disabled={loading}
                    style={{flex: 1}}
                  >
                    🗑️ Remover
                  </button>
                  
                  <button 
                    onClick={() => carregarApartamentos()}
                    disabled={loading}
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Atualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Servicos;
import { useState, useEffect } from 'react';
import './Contas.css';

function Contas() {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    valor: '',
    pendente: true,
    morador_id: '',
    numero_AP: '',
  });

  const API_BASE_URL = 'https://frameworks-sistemadetransportadora.onrender.com/api/contas';

  const carregar = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Erro ao carregar contas');
      setContas(await response.json());
    } catch (err) {
      setError('Erro ao carregar contas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const adicionar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = {
        valor: form.valor,
        pendente: form.pendente,
        morador_id: form.morador_id,
        numero_AP: form.numero_AP
      };
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error((await response.json()).mensagem || 'Erro ao adicionar conta');
      const nova = await response.json();
      setContas([...contas, nova]);
      setForm({ valor: '', pendente: true, morador_id: '', numero_AP: '' });
    } catch (err) {
      setError('Erro ao adicionar conta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const atualizarPendente = async (id, pendente) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://frameworks-sistemadetransportadora.onrender.com/api/conta/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pendente: !pendente }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar conta');
      await carregar();
    } catch (err) {
      setError('Erro ao atualizar conta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const remover = async (id) => {
    if (!window.confirm('Deseja remover esta conta?')) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://frameworks-sistemadetransportadora.onrender.com/api/conta/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erro ao remover conta');
      setContas(contas.filter((c) => c.id !== id));
    } catch (err) {
      setError('Erro ao remover conta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="contas-container">
      <h2>Gerenciamento de Contas</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={adicionar} className="conta-form">
        <label>Valor (R$)</label>
        <input
          type="number"
          name="valor"
          step="0.01"
          min="0"
          value={form.valor}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="pendente"
            checked={form.pendente}
            onChange={handleChange}
          />
          Pendente
        </label>

        <label>ID do Morador</label>
        <input
          type="number"
          name="morador_id"
          value={form.morador_id}
          onChange={handleChange}
          required
        />

        <label>Número do Apartamento</label>
        <input
          type="text"
          name="numero_AP"
          value={form.numero_AP}
          onChange={handleChange}
          required
        />

        <button className="add-conta-btn" disabled={loading}>
          {loading ? '⏳ Salvando...' : '➕ Adicionar Conta'}
        </button>
      </form>

      <h3>Contas Cadastradas ({contas.length})</h3>
      {loading && <div className="loading-spin"><span>⏳ Carregando...</span></div>}

      <div className="conta-list">
        {contas.map((c) => (
          <div key={c.id} className={`conta-card ${c.pendente ? 'pendente' : 'quitada'}`}>
            <div className="conta-header">
              <span className="conta-id">#{c.id}</span>
              <span className="conta-status">{c.pendente ? "🔴 Pendente" : "🟢 Quitada"}</span>
            </div>
            <div className="conta-dados">
              <span className="conta-valor"><strong>Valor:</strong> R$ {parseFloat(c.valor).toFixed(2)}</span>
              <span className="conta-morador"><strong>Morador ID:</strong> {c.morador_id}</span>
              <span className="conta-apto"><strong>Apto:</strong> {c.numero_AP}</span>
            </div>
            <div className="conta-botoes">
              <button onClick={() => atualizarPendente(c.id, c.pendente)} className="conta-btn-troca">
                Marcar como {c.pendente ? 'Quitada' : 'Pendente'}
              </button>
              <button onClick={() => remover(c.id)} className="conta-btn-remover">
                🗑️ Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contas;

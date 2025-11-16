import { useState, useEffect } from 'react';
import './Moradores.css';

function Moradores() {
  const [moradores, setMoradores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nome: '', idade: '', apartamentos: [] });

  const API_BASE_URL = 'https://frameworks-sistemadetransportadora.onrender.com/api/moradores';

  const carregar = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Erro ao carregar moradores');
      setMoradores(await response.json());
    } catch (err) {
      setError('Erro ao carregar moradores: ' + err.message);
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
        nome: form.nome,
        idade: parseInt(form.idade, 10),
        apartamentos: form.apartamentos.map(Number),
      };
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error((await response.json()).mensagem || 'Erro ao adicionar morador');
      const novo = await response.json();
      setMoradores([...moradores, novo]);
      setForm({ nome: '', idade: '', apartamentos: [] });
    } catch (err) {
      setError('Erro ao adicionar morador: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const remover = async (id) => {
    if (!window.confirm('Deseja remover este morador?')) return;
    setLoading(true);
    try {
      const response = await fetch(`https://frameworks-sistemadetransportadora.onrender.com/api/morador/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao remover morador');
      setMoradores(moradores.filter((m) => m.id !== id));
    } catch (err) {
      setError('Erro ao remover morador: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApartamentos = (e) => {
    const value = e.target.value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v !== '')
      .map(Number)
      .filter((n) => !isNaN(n));
    setForm((prev) => ({ ...prev, apartamentos: value }));
  };

  return (
    <div className="moradores-container">
      <h2>Gerenciamento de Moradores</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={adicionar} className="morador-form">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome do morador"
          required
        />
        <input
          name="idade"
          type="number"
          min="0"
          value={form.idade}
          onChange={handleChange}
          placeholder="Idade"
          required
        />
        <input
          name="apartamentos"
          value={form.apartamentos.join(', ')}
          onChange={handleApartamentos}
          placeholder="Apartamentos (ex: 101, 102, 201)"
        />
        <button
          className="add-morador-btn"
          disabled={loading}
        >
          {loading ? '⏳ Salvando...' : '➕ Adicionar Morador'}
        </button>
      </form>

      <h3>Moradores cadastrados ({moradores.length})</h3>
      {loading && <div className="loading-spin"><span>⏳ Carregando...</span></div>}
      <div className="morador-list">
        {moradores.map((m) => (
          <div key={m.id} className="morador-card">
            <h4>{m.nome}</h4>
            <p><strong>Idade:</strong> {m.idade}</p>
            <p>
              <strong>Apartamentos:</strong>{' '}
              {m.apartamentos && m.apartamentos.length > 0
                ? m.apartamentos.join(', ')
                : 'Nenhum'}
            </p>
            <button onClick={() => remover(m.id)}>
              🗑️ Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Moradores;

import { useState, useEffect } from 'react';
import './Apartamentos.css';

function Apartamentos() {
  const [apartamentos, setApartamentos] = useState([]);
  const [moradores, setMoradores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('todos'); // 🔹 estado do filtro
  const [form, setForm] = useState({
    Numero_AP: '',
    Ocupado: false,
    Alugado: false,
    Venda: false,
  });

  const API_BASE_URL = 'https://frameworks-sistemadetransportadora.onrender.com/api';
  const APARTAMENTOS_URL = `${API_BASE_URL}/apartamento`;
  const MORADORES_URL = `${API_BASE_URL}/moradores`;

  const carregar = async () => {
    setLoading(true);
    setError('');
    try {
      const [resAptos, resMoradores] = await Promise.all([
        fetch(APARTAMENTOS_URL),
        fetch(MORADORES_URL),
      ]);

      if (!resAptos.ok || !resMoradores.ok)
        throw new Error('Erro ao carregar dados');

      const apartamentosData = await resAptos.json();
      const moradoresData = await resMoradores.json();

      setApartamentos(apartamentosData);
      setMoradores(moradoresData);
    } catch (err) {
      setError('Erro ao carregar dados: ' + err.message);
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
      const response = await fetch(APARTAMENTOS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok)
        throw new Error((await response.json()).mensagem || 'Erro ao adicionar apartamento');

      await carregar();
      setForm({ Numero_AP: '', Ocupado: false, Alugado: false, Venda: false });
    } catch (err) {
      setError('Erro ao adicionar apartamento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const atualizar = async (numero_AP, dados) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${APARTAMENTOS_URL}/${numero_AP}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      if (!response.ok)
        throw new Error((await response.json()).mensagem || 'Erro ao atualizar apartamento');
      await carregar();
    } catch (err) {
      setError('Erro ao atualizar apartamento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const remover = async (numero_AP) => {
    if (!window.confirm('Deseja remover este apartamento?')) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${APARTAMENTOS_URL}/${numero_AP}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao remover apartamento');
      setApartamentos(apartamentos.filter((a) => a.Numero_AP !== numero_AP));
    } catch (err) {
      setError('Erro ao remover apartamento: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const alternar = async (apartamento, campo) => {
    const atualizado = { ...apartamento, [campo]: !apartamento[campo] };
    await atualizar(apartamento.Numero_AP, atualizado);
  };

  // Retorna os moradores correspondentes ao apartamento
  const moradoresDoApartamento = (ids) => {
    return moradores.filter((m) => ids.includes(m.id));
  };

  // 🔹 Função que filtra os apartamentos conforme o filtro ativo
  const apartamentosFiltrados = apartamentos.filter((a) => {
    if (filtro === 'todos') return true;
    if (filtro === 'ocupado') return a.Ocupado;
    if (filtro === 'alugado') return a.Alugado;
    if (filtro === 'venda') return a.Venda;
    return true;
  });

  return (
    <div className="apartamentos-container">
      <h2>Gerenciamento de Apartamentos</h2>
      {error && <div className="error-message">{error}</div>}

      {/* 🔹 Seletor de filtro */}
      <div className="filtros-container">
        <button
          className={filtro === 'todos' ? 'ativo' : ''}
          onClick={() => setFiltro('todos')}
        >
          🏠 Todos
        </button>
        <button
          className={filtro === 'ocupado' ? 'ativo' : ''}
          onClick={() => setFiltro('ocupado')}
        >
          🔴 Ocupados
        </button>
        <button
          className={filtro === 'alugado' ? 'ativo' : ''}
          onClick={() => setFiltro('alugado')}
        >
          🟡 Alugados
        </button>
        <button
          className={filtro === 'venda' ? 'ativo' : ''}
          onClick={() => setFiltro('venda')}
        >
          🟢 À Venda
        </button>
      </div>

      <form onSubmit={adicionar} className="apartamento-form">
        <label htmlFor="Numero_AP">Número do Apartamento</label>
        <input
          id="Numero_AP"
          name="Numero_AP"
          type="text"
          value={form.Numero_AP}
          onChange={handleChange}
          required
        />
        <div className="checkbox-group">
          {['Ocupado', 'Alugado', 'Venda'].map((campo) => (
            <label key={campo}>
              <input
                type="checkbox"
                name={campo}
                checked={form[campo]}
                onChange={handleChange}
              />
              {campo}
            </label>
          ))}
        </div>
        <button className="add-apartamento-btn" disabled={loading}>
          {loading ? '⏳ Salvando...' : '➕ Adicionar Apartamento'}
        </button>
      </form>

      <h3>
        Apartamentos {filtro !== 'todos' ? `(${filtro})` : ''} — {apartamentosFiltrados.length}
      </h3>

      {loading && <div className="loading-spin"><span>⏳ Carregando...</span></div>}

      <div className="apartamento-list">
        {apartamentosFiltrados.map((a) => {
          const moradoresApto = moradoresDoApartamento(a.moradores || []);
          return (
            <div key={a.Numero_AP} className="apartamento-card">
              <h4>AP {a.Numero_AP}</h4>
              <div className="checkbox-group">
                {['Ocupado', 'Alugado', 'Venda'].map((campo) => (
                  <label key={campo}>
                    <input
                      type="checkbox"
                      checked={a[campo]}
                      onChange={() => alternar(a, campo)}
                    />
                    {campo}
                  </label>
                ))}
              </div>
              <button onClick={() => remover(a.Numero_AP)}>🗑️ Remover</button>

              {/* Moradores */}
              <div className="moradores-container-apto">
                <strong>Moradores:</strong>
                {moradoresApto.length > 0 ? (
                  <div className="morador-list-apto">
                    {moradoresApto.map((m) => (
                      <div className="morador-card-apto" key={m.id}>
                        <span className="morador-nome">{m.nome}</span>
                        <span className="morador-id">ID: {m.id}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="morador-sem">Nenhum morador</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Apartamentos;

import { useState, useEffect } from 'react';
import './Funcionarios.css';

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    cargo: '',
    salario: '',
    horario: ''
  });
  const [editId, setEditId] = useState(null);

  // sua API já expõe /api/funcionarios
  const API_BASE_URL = 'https://frameworks-sistemadetransportadora.onrender.com/api/funcionarios';

  const carregar = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Erro ao carregar funcionários');
      const data = await response.json();
      setFuncionarios(data);
    } catch (err) {
      setError('Erro ao carregar funcionários: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const adicionarOuAtualizar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const body = {
        nome: form.nome,
        idade: parseInt(form.idade, 10),
        cargo: form.cargo,
        salario: parseFloat(form.salario),
        horario: form.horario
      };

      let response;
      let data;

      if (editId) {
        // ATUALIZAR: rota /api/funcionarios/<id>
        response = await fetch(`${API_BASE_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        data = await response.json();
        if (!response.ok) throw new Error(data.mensagem || 'Erro ao atualizar funcionário');

        // como o backend retorna só mensagem, recarrega a lista
        await carregar();
        setEditId(null);
      } else {
        // CRIAR: rota /api/funcionarios
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        data = await response.json();
        if (!response.ok) throw new Error(data.mensagem || 'Erro ao adicionar funcionário');

        // backend retorna o funcionário criado, então adiciona no estado
        setFuncionarios((prev) => [...prev, data]);
      }

      setForm({ nome: '', idade: '', cargo: '', salario: '', horario: '' });
    } catch (err) {
      setError(
        (editId ? 'Erro ao atualizar funcionário: ' : 'Erro ao adicionar funcionário: ') +
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const remover = async (id) => {
    if (!window.confirm('Deseja remover este funcionário?')) return;
    setLoading(true);
    setError('');

    try {
      // DELETAR: rota /api/funcionarios/<id>
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.mensagem || 'Erro ao remover funcionário');
      }

      setFuncionarios((prev) => prev.filter((f) => f.id !== id));

      if (editId === id) {
        setEditId(null);
        setForm({ nome: '', idade: '', cargo: '', salario: '', horario: '' });
      }
    } catch (err) {
      setError('Erro ao remover funcionário: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const editar = (funcionario) => {
    setForm({
      nome: funcionario.nome,
      idade: funcionario.idade,
      cargo: funcionario.cargo,
      salario: funcionario.salario,
      horario: funcionario.horario
    });
    setEditId(funcionario.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="funcionarios-container">
      <h2>Gerenciamento de Funcionários</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={adicionarOuAtualizar} className="funcionario-form">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome do funcionário"
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
          name="cargo"
          value={form.cargo}
          onChange={handleChange}
          placeholder="Cargo (ex: PORTEIRO, ZELADOR, SINDICO)"
          required
        />
        <input
          name="salario"
          type="number"
          min="0"
          step="0.01"
          value={form.salario}
          onChange={handleChange}
          placeholder="Salário"
          required
        />
        <input
          name="horario"
          value={form.horario}
          onChange={handleChange}
          placeholder="Horário (ex: 07:00-19:00)"
          required
        />
        <button
          className="add-funcionario-btn"
          disabled={loading}
        >
          {loading
            ? (editId ? '⏳ Salvando edição...' : '⏳ Salvando...')
            : (editId ? '💾 Atualizar Funcionário' : '➕ Adicionar Funcionário')}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ nome: '', idade: '', cargo: '', salario: '', horario: '' });
            }}
            style={{
              marginTop: '0.5rem',
              background: '#818cf8',
              color: '#fff',
              borderRadius: '8px',
              padding: '0.7rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Cancelar edição
          </button>
        )}
      </form>

      <h3>Funcionários cadastrados ({funcionarios.length})</h3>
      {loading && <div className="loading-spin"><span>⏳ Carregando...</span></div>}

      <div className="funcionario-list">
        {funcionarios.map((f) => (
          <div key={f.id} className="funcionario-card">
            <h4>{f.nome}</h4>
            <p><strong>Idade:</strong> {f.idade}</p>
            <p><strong>Cargo:</strong> {f.cargo}</p>
            <p><strong>Salário:</strong> R$ {f.salario}</p>
            <p><strong>Horário:</strong> {f.horario}</p>
            <button onClick={() => remover(f.id)}>
              🗑️ Remover
            </button>
            <button
              style={{
                marginTop: '0.5rem',
                background: '#38bdf8',
                color: '#fff',
                borderRadius: '8px',
                padding: '0.7rem',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => editar(f)}
            >
              ✏️ Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Funcionarios;

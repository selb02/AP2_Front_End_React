<p align="center">
  <img src="https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Front--End-React-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Build-Vite-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-Open%20Source-lightgrey?style=for-the-badge"/>
</p>

---

# 🏢 **Projeto – Sistema Condominio**

Aplicação **frontend em React + Vite** desenvolvida para administrar e visualizar a **ocupação de apartamentos em um condomínio**, fazendo consumo de uma API externa que centraliza dados de unidades, moradores e reservas.

O foco do sistema é **simplicidade, visão rápida do status das unidades, usabilidade e integração real com o backend**.

---

## 🚀 **Objetivo do Projeto**

- Centralizar informações sobre ocupação de apartamentos
- Garantir clareza e transparência entre administração e moradores
- Prover uma interface moderna, responsiva e intuitiva
- Consumir uma API real com listagem, filtros e interações

---

## 🎯 **Público-Alvo**

| Persona | Perfil | Ações no Sistema |
|---------|---------|------------------|
| **Síndico** | Gestor do condomínio | Consultar, administrar ocupação e relatórios |
| **Equipe de portaria** | Operacional | Registrar ocupações e visualização rápida |
| **Moradores** | Usuários finais | Consulta de informações e solicitações |

---

## ⚙️ **Tecnologias Utilizadas**

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Frontend** | React (Vite) | Performance, modularidade e DX moderno |
| **Linguagem** | JavaScript (ES6+) | Padrão de mercado |
| **Rotas / Navegação** | React Router (se usado) | SPA fluida e organizada |
| **Estilização** | CSS (ou framework utilizado) | UI personalizada |
| **Comunicação com API** | Fetch / Axios | Facilidade e organização nas requisições |

---

## 📁 **Estrutura de Pastas (Resumo)**

AP2_Front_End_React/
├─ public/
│ └─ index.html
├─ src/
│ ├─ components/ # Componentes reutilizáveis
│ ├─ pages/ # Páginas principais do app
│ ├─ services/ # Integração com API, métodos de request
│ ├─ styles/ # Estilos e temas
│ ├─ App.jsx # Container principal do React
│ └─ main.jsx # Entry point do Vite + React
├─ .gitignore
├─ package.json
├─ vite.config.js
└─ README.md

yaml
Copiar código

---

## 🏗️ **Como Rodar o Projeto Localmente**

### 🔧 **Requisitos**

| Dependência | Versão Recomendada |
|-------------|-------------------|
| Node.js | 18+ |
| npm ou yarn | mais recente |
| Backend ativo | URL da API acessível |

---

### ▶️ **Passo a Passo**

1️⃣ Clone o repositório  
git clone https://github.com/selb02/AP2_Front_End_React.git
cd AP2_Front_End_React
2️⃣ Instale as dependências


Copiar código
npm install
# ou
yarn
3️⃣ Crie um arquivo .env na raiz do projeto

bash
Copiar código
VITE_API_URL=http://localhost:8000/api
4️⃣ Execute o projeto

bash
Copiar código
npm run dev
# ou
yarn dev
5️⃣ Acesse no navegador
👉 http://localhost:5173

🔗 Integração com API
A aplicação consome dados da API através de serviços centralizados, garantindo melhor organização e facilidade de manutenção.

Exemplo de requisição (modelo simplificado):

js
Copiar código
const response = await fetch(`${import.meta.env.VITE_API_URL}/apartamentos`);
const data = await response.json();
🧪 Testes (se aplicável)
Caso implementem testes futuramente, recomenda-se:

React Testing Library

Vitest ou Jest

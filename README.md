<p align="center">
  <img src="https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Build-Vite-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Projeto-Acadêmico-purple?style=for-the-badge"/>
</p>

---

# 🏢 **Sistema de Ocupação de Apartamentos — Frontend**

Aplicação web desenvolvida em **React + Vite** para gerenciamento de ocupação de apartamentos em um condomínio, permitindo interação com uma **API REST** para visualizar, consultar e registrar informações sobre unidades, moradores e status de ocupação.

---

## 🎯 **Propósito da Aplicação**

O projeto tem como objetivo **centralizar e facilitar a consulta de ocupação de apartamentos em um condomínio**, garantindo clareza e organização para administração e moradores.

De forma simples, prática e visual, o sistema possibilita que os usuários consultem rapidamente o status de cada apartamento e realizem interações definidas pela API, evitando conflitos e promovendo gestão eficiente.

---

## 💡 **Ideia Geral do Projeto**

A ideia nasce da necessidade operacional de condomínios que carecem de um sistema digital simples e eficiente para acompanhar a ocupação dos apartamentos.

A aplicação:

- Mostra quais unidades estão ocupadas ou disponíveis
- Realiza comunicação com backend real
- Fornece uma interface amigável, responsiva e moderna
- Facilita tomadas de decisão, evitando desencontro de informações

---

## 👥 **A quem se destina**

| Usuário | Perfil | Permissões e Benefícios |
|---------|---------|-------------------------|
| Síndico | Gestor do condomínio | Acompanhamento total e validação de registros |
| Equipe administrativa | Operacional e controle | Acesso rápido para registros e visualização |
| Moradores | Usuários do sistema | Consulta facilitada e transparência |

---

## 📌 **O que se pretende fazer a partir do projeto**

- Melhorar a comunicação interna sobre ocupações
- Transformar planilhas e processos manuais em automação
- Criar base para futuros módulos como:  
  ✔ reservas de áreas comuns  
  ✔ sistema de manutenção  
  ✔ notificações internas  
  ✔ módulo mobile  

---

## 🧰 **Stack & Tecnologias Utilizadas**

| Item | Tecnologia | Finalidade |
|------|------------|------------|
| Linguagem | JavaScript (ES6+) | Base do desenvolvimento |
| Framework SPA | React | Construção da interface e componentes |
| Bundler | Vite | Build rápido, leve e moderno |
| Comunicação com API | Fetch ou Axios | Integração com backend |
| Gerenciamento | npm ou yarn | Dependências e scripts |
| Controle de versão | Git + GitHub | Versionamento e colaboração |

---

## 🔌 Integração com API

A aplicação não utiliza dados mockados; ela **consome endpoints reais do backend**, utilizando variáveis de ambiente para configurar a URL base.

Exemplo básico de requisição:

```js
const response = await fetch(`${import.meta.env.VITE_API_URL}/apartamentos`);
const data = await response.json();
Observação: é necessário que o backend esteja rodando e acessível para funcionamento completo.

🖥️ Como rodar o projeto localmente
1️⃣ Clonar repositório
git clone https://github.com/selb02/AP2_Front_End_React.git
cd AP2_Front_End_React
2️⃣ Instalar dependências

npm install
# ou
yarn
3️⃣ Configurar variáveis de ambiente
Crie um arquivo .env na raiz e insira:


VITE_API_URL=http://localhost:8000/api
Ajuste conforme a URL real do backend

4️⃣ Executar o servidor de desenvolvimento

npm run dev
# ou
yarn dev
5️⃣ Acessar aplicação
arduino
Copiar código
http://localhost:5173

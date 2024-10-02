import React, { useState } from "react";
import axios from '../../server/axiosConfig';
import { useNavigate } from 'react-router-dom';
import "../../client/App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post('/api/login', { email });

      const userId = response.data.id;

      localStorage.setItem('userId', userId);

      navigate('/dashboard');
      alert("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (error.response) {
        alert(`Erro: ${error.response.data.message || "Erro ao fazer login."}`);
      } else if (error.request) {
        alert("Sem resposta do servidor. Verifique sua conexão.");
      } else {
        alert("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />  
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p>
        Não tem uma conta? <a href="/register">Cadastre-se aqui</a>
      </p>
      <button type="submit">Entrar</button>
      </form>
      
    </div>
  );
};

export default Login;

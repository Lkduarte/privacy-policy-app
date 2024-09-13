import React, { useState } from "react";
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import "./App.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (consent) {
      try {
        const response =  await axios.post("/api/register", { name, email });

        const userId = response.data.id;

        navigate(`/dashboard?id=${userId}`);
        alert("Registrado com sucesso!");
      } catch (error) {
        alert("Erro ao registrar");
      }
    } else {
      alert("Você deve concordar com os termos de privacidade");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
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
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          Eu li e concordo com os{" "}
          <a href="/termos-de-privacidade" target="_blank">
            Termos de Política de Privacidade
          </a>
          .
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;

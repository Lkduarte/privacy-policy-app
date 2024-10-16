import "../../../App.css";
import React, { useState } from "react";
import useAlert from "../../../utils/alerts";
import { useNavigate } from "react-router-dom";
import authController from "../../../services/controllers/authController";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      password,
      data: {
        name,
        lastName,
        email,
      },
      signedTerms: [{}],
    };

    alert.criarConfirmacao({
      html: "Deseja realmente cadastrar-se no sistema?",
      confirmAction: async () => {
        const result = await authController.register(data);
        alert.criarAlerta({
          html: result.error
            ? "Ocorreu um erro ao cadastrar-se."
            : "Cadastro realizado com sucesso!",
          confirmAction: () => {
            navigate("/login");
          },
        });
      },
    });
  };

  return (
    <div className="container">
      {" "}
      <div className="card">
        {" "}
        <h1>Cadastro</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p>
            Já tem uma conta? <a href="/login">Entrar</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

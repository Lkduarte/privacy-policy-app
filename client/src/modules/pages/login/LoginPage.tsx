import React, { useContext, useState } from "react";
import "../../../App.css";
import { AuthContext } from "../../../contexts/auth-context";
import useAlert from "../../../utils/alerts";

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      email == null ||
      email === "" ||
      email === " " ||
      password == null ||
      password === "" ||
      password === " "
    ) {
      alert.criarAlerta({
        title: "Opss...",
        html: "E-mail ou senha inválidos.",
      });
      return;
    }

    login(email, password);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email do usuário"
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
          <button type="submit">Entrar</button>
          <p>
            Não tem uma conta? <a href="/userRegister">Cadastre-se aqui</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

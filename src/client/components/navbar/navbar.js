import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Estilo da navbar (opcional)

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Painel do Usuário</Link>
        </li>
        <li>
          <Link to="/termo">Termo</Link>
        </li>
        <li>
          <Link to="/consent-history">Histórico de Consentimento</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

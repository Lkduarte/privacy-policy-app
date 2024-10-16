import React, { useState } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./headerStyles.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth-context";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseOver = () => {
    setShowDropdown(true);
  };

  const handleMouseOut = () => {
    setShowDropdown(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-text">The Store</span>
        </div>
        <nav className="nav-menu">
          <button>Produtos</button>
          <button>Sobre Nós</button>
          <button>Contato</button>
        </nav>
        <div className="rightSide">
          <div className="cart">
            <FaShoppingCart />
            <span className="tooltip">Carrinho</span>
          </div>
          <div
            className="user-icon"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <FaUser />
            {showDropdown && (
              <div className="user-dropdown">
                {authenticated ? (
                  <>
                    <button onClick={() => navigate("/userEdit")}>
                      Perfil
                    </button>
                    <button onClick={logout}>Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/login")}>Login</button>
                    {location.pathname !== "/userRegister" && (
                      <button onClick={() => navigate("/userRegister")}>
                        Registrar
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

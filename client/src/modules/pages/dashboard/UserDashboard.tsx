/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import { AuthContext } from "../../../contexts/auth-context";
import { IUser } from "../../../utils/interfaces";
import useAlert from "../../../utils/alerts";
import userController from "../../../services/controllers/userController";
import { api } from "../../../services/api";
import Swal from "sweetalert2";

const UserDashboard: React.FC = () => {
  const [userData, setUserData] = useState<IUser>({
    password: "",
    data: {
      name: "",
      lastName: "",
      email: "",
    },
    signedTerms: [
      {
        termId: "",
        isAccepted: false,
        date: new Date(),
        signedOptions: [],
        description: "",
      },
    ],
  });

  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      setUserData({
        ...userData,
        data: {
          name: user.data.name,
          lastName: user.data.lastName,
          email: user.data.email,
        },
      });
    }
  }, [user]);

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !userData.data.name ||
      !userData.data.lastName ||
      !userData.data.email ||
      !userData.password
    ) {
      return;
    }

    try {
      alert.criarConfirmacao({
        html: "Deseja realmente atualizar seus dados?",
        confirmAction: async () => {
          updateUser(userData);
          setIsEditing(false);
          alert.criarAlerta({
            html: "Dados atualizados com sucesso!",
          });
        },
      });
    } catch (error) {
      alert.criarAlerta({
        html: "Erro ao atualizar os dados.",
        icon: "error",
      });
      console.error("Erro ao atualizar os dados:", error);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação é irreversível. Você realmente deseja excluir sua conta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userController.deleteUser(user?._id ?? "");

          Swal.fire({
            title: "Conta excluída!",
            text: "Sua conta foi excluída com sucesso.",
            icon: "success",
            confirmButtonText: "OK",
          });

          localStorage.removeItem("user");
          api.defaults.headers.common["Cookie"] = null;
          updateUser(null);

          navigate("/");
        } catch (error) {
          Swal.fire({
            title: "Erro",
            text: "Ocorreu um erro ao tentar excluir a conta.",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error("Erro ao excluir a conta:", error);
        }
      }
    });
  };
  return (
    <div className="container">
      <div className="card">
        {isEditing ? (
          <form className="dashboard-form" onSubmit={handleEdit}>
            <h1>Painel do Usuário</h1>
            <label>
              Nome:
              <input
                type="text"
                value={userData.data.name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    data: {
                      ...userData.data,
                      name: e.target.value,
                    },
                  })
                }
                required
              />
            </label>
            <label>
              Sobrenome:
              <input
                type="text"
                value={userData.data.lastName}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    data: {
                      ...userData.data,
                      lastName: e.target.value,
                    },
                  })
                }
                required
              />
            </label>
            <label>
              Email:
              <input
                disabled
                type="email"
                value={userData.data.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    data: {
                      ...userData.data,
                      email: e.target.value,
                    },
                  })
                }
                required
              />
            </label>
            <label>
              Senha:
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
                required
              />
            </label>
            <button type="submit">Salvar Alterações</button>
          </form>
        ) : (
          <div className="dashboard-info">
            <h1>Painel do Usuário</h1>
            <p>
              <strong>Nome:</strong> {userData.data.name}
            </p>
            <p>
              <strong>Sobrenome:</strong> {userData.data.lastName}
            </p>
            <p>
              <strong>Email:</strong> {userData.data.email}
            </p>
            <a onClick={() => navigate("/editTerm")}>Termos de uso</a>
            <button onClick={() => setIsEditing(true)}>Editar Dados</button>
            <button onClick={handleDelete} className="delete-button">
              Excluir Conta
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

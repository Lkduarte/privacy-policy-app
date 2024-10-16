import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import useAlert from "../utils/alerts";
import authController from "../services/controllers/authController";
import { ISignedTerm, ITerm, IUser } from "../utils/interfaces";
import userController from "../services/controllers/userController";

interface AuthContextProps {
  authenticated: boolean;
  user: IUser | null;
  mustSignTerm: ITerm | null;
  login: (x: string, y: string) => void;
  logout: () => void;
  updateUser: (x: IUser | null) => void;
  signCurrentTerm: (x: ISignedTerm) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [term, setTerm] = useState<ITerm | null>(null);
  const alert = useAlert();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    let loginSuccess = null;
    try {
      const response = await authController.login(email, password);
      const loggedUser = response.data;
      api.defaults.headers.common["Cookie"] = document.cookie;

      localStorage.setItem("user", JSON.stringify(loggedUser));

      setUser(loggedUser);
      loginSuccess = loggedUser._id;
    } catch (e: any) {
      const responseMessage = e.response.data.message;
      let errorMessage;

      if (
        responseMessage.includes("User unauth") ||
        responseMessage.includes("user not found for this email")
      ) {
        errorMessage = "Email ou senha incorreto(a).";
      } else {
        errorMessage = responseMessage;
      }

      alert.criarAlerta({
        icon: "error",
        html: errorMessage,
      });
    }

    if (!loginSuccess) return;

    try {
      const response = await userController.hasSignedCurrentTerm(loginSuccess);

      if (response) {
        setTerm(response);
        navigate("/currentTerm");
      } else {
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    api.defaults.headers.common["Cookie"] = null;
    setUser(null);

    navigate("/login");
  };

  const signCurrentTerm = async (x: ISignedTerm) => {
    try {
      await userController.signCurrentTerm(user?._id ?? "", x);

      setTerm(null);

      navigate("/home");
    } catch (e) {
      alert.criarAlerta({
        icon: "error",
        html: "Ocorreu um erro ao assinar o termo, tente novamente.",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        mustSignTerm: term,
        login,
        logout,
        updateUser: setUser,
        signCurrentTerm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

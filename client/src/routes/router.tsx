import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/auth-context";
import Home from "../modules/pages/home/home";
import LoginPage from "../modules/pages/login/LoginPage";
import RegisterPage from "../modules/pages/register/RegisterPage";
import { TermPage } from "../modules/pages/term/termo";
import Header from "../modules/components/header/header";
import UserDashboard from "../modules/pages/dashboard/UserDashboard";
import { ActualTermPage } from "../modules/pages/term/actualTerm";
import { EditActualTermPage } from "../modules/pages/term/editActualTerm/editActualTerm";

export const Router = () => {
  const PrivateAuth = ({ children }: any) => {
    const { authenticated, mustSignTerm } = useContext(AuthContext);

    if (mustSignTerm) {
      return <Navigate to="/currentTerm" />;
    }

    if (authenticated) {
      return children;
    }

    return <Navigate to="/login" />;
  };

  const PrivateByTerm = ({ children }: any) => {
    const { mustSignTerm } = useContext(AuthContext);

    if (mustSignTerm) {
      return <Navigate to="/currentTerm" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userRegister" element={<RegisterPage />} />
          <Route path="/currentTerm" element={<TermPage />} />
          <Route
            path="/home"
            element={
              <PrivateByTerm>
                <Home />
              </PrivateByTerm>
            }
          />
          <Route
            path="/userEdit"
            element={
              <PrivateAuth>
                <UserDashboard />
              </PrivateAuth>
            }
          />
          <Route
            path="/editTerm"
            element={
              <PrivateAuth>
                <ActualTermPage />
              </PrivateAuth>
            }
          />
          <Route
            path="/editActualTerm"
            element={
              <PrivateAuth>
                <EditActualTermPage />
              </PrivateAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

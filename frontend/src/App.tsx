import { useState } from "react";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskManager from "./components/TaskManager";
import "./App.css";

// Inicializamos el estado leyendo directamente la cookie (si existe)
const getInitialToken = () => Cookies.get("auth_token") || null;

export default function App() {
  const [token, setToken] = useState<string | null>(getInitialToken);

  const handleLoginSuccess = (userToken: string) => {
    setToken(userToken);
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setToken(null);
  };

  return (
    <ProtectedRoute token={token} onLoginSuccess={handleLoginSuccess}>
      {}
      <TaskManager token={token!} onLogout={handleLogout} />
    </ProtectedRoute>
  );
}
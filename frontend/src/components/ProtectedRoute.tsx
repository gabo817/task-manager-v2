import { useState } from "react";
import Cookies from "js-cookie";
import Login from "./Login";
import Register from "./Register";

type ProtectedRouteProps = {
  children: React.ReactNode;
  token: string | null;
  onLoginSuccess: (token: string) => void;
};

export default function ProtectedRoute({ children, token, onLoginSuccess }: ProtectedRouteProps) {
  // Estado local para controlar si mostramos Login o Registro
  const [view, setView] = useState<"login" | "register">("login");
  
  const activeToken = token || Cookies.get("auth_token");

  // Si está autenticado, pasa directo a la aplicación (TaskManager)
  if (activeToken) {
    return <>{children}</>;
  }

  // Si no está autenticado, evaluamos qué formulario mostrar
  if (view === "register") {
    return <Register onBackToLogin={() => setView("login")} />;
  }

  return (
    <Login 
      onLoginSuccess={onLoginSuccess} 
      onNavigateToRegister={() => setView("register")} 
    />
  );
}
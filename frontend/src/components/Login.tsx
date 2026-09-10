import { useState } from "react";
import Cookies from "js-cookie";
import "../assets/styles/Login.css";

type LoginProps = {
  onLoginSuccess: (token: string) => void;
  onNavigateToRegister: () => void;
};

function Login({ onLoginSuccess, onNavigateToRegister }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const LOGIN_URL = `${API_URL}/login`;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Credenciales incorrectas");

      Cookies.set("auth_token", data.token, {
        expires: 1,
        secure: false,
        sameSite: "strict",
      });
      onLoginSuccess(data.token);
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-viewport">
      <div className="login-container">
        {/* Encabezado del Formulario (Logo + Título) */}
        <div className="login-header">
          <div className="login-logo-brand">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2>Bienvenido</h2>
          <p>Ingresa tus credenciales para acceder al panel</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {/* Mensaje de Error */}
          {loginError && (
            <div className="login-error-container">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          {/* Usuario */}
          <div className="auth-field-group">
            <div className="field-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <input
              type="text"
              className="auth-input"
              placeholder="Usuario o correo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/*  Contraseña */}
          <div className="auth-field-group">
            <div className="field-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <input
              type="password"
              className="auth-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Botón de Acción con Estado de Carga */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="auth-spinner"></div>
            ) : (
              <>
                <span>Ingresar al sistema</span>
                <svg
                  className="btn-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>

          {/* Boton registro */}
          <p className="switch-auth-mode">
            ¿No tienes cuenta?{" "}
            <span className="switch-link" onClick={onNavigateToRegister}>
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

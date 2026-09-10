import { useState } from "react";
import "../assets/styles/Register.css";

type RegisterProps = {
  onBackToLogin: () => void;
};

export default function Register({ onBackToLogin }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const REGISTER_URL = `${API_URL}/register`;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Error al registrar usuario");

      setSuccess("¡Cuenta creada con éxito! Redirigiendo...");

      setTimeout(() => {
        onBackToLogin();
      }, 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-viewport">
      <div className="login-container">
        {/* Encabezado del Formulario */}
        <div className="login-header">
          <div className="login-logo-brand register-variant">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <h2>Crear Cuenta</h2>
          <p>Regístrate para comenzar a gestionar tus tareas</p>
        </div>

        <form onSubmit={handleRegister} className="login-form">
          {/* Mensaje de Error*/}
          {error && (
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
              <span>{error}</span>
            </div>
          )}

          {/* Mensaje de Éxito */}
          {success && (
            <div className="login-success-overlay">
              <div className="success-pulse-ring">
                <svg
                  className="success-checkmark"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="success-title">¡Cuenta creada!</h3>
              <p className="success-description">{success}</p>

              {/* Barra de progreso de cuenta regresiva */}
              <div className="success-countdown-track">
                <div className="success-countdown-fill"></div>
              </div>
            </div>
          )}

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
              placeholder="Nuevo usuario o correo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading || !!success}
            />
          </div>

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
              placeholder="Contraseña (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading || !!success}
            />
          </div>
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading || !!success}
          >
            {isLoading ? (
              <div className="auth-spinner"></div>
            ) : (
              <>
                <span>Confirmar registro</span>
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

          <p className="switch-auth-mode">
            ¿Ya tienes cuenta?{" "}
            <span className="switch-link" onClick={onBackToLogin}>
              Inicia Sesión
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

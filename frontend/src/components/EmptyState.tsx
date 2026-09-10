import "../assets/styles/EmptyState.css";

function EmptyState() {
  return (
    <div className="premium-empty-state">
      {/* Contenedor del icono con aura de luz */}
      <div className="empty-icon-wrapper">
        <svg className="empty-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Mensaje estructurado */}
      <h3 className="empty-title">Bandeja despejada</h3>
      <p className="empty-subtitle">No hay tareas pendientes por el momento. Agrega una nueva para comenzar tu día.</p>
    </div>
  );
}

export default EmptyState;
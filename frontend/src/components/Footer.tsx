import "../assets/styles/Footer.css";

type FooterProps = {
  total: number;
  completed: number;
  pending: number;
};

function Footer(props: FooterProps) {
  // Cálculo de ratio de eficiencia diario
  const efficiencyRatio = props.total > 0 ? Math.round((props.completed / props.total) * 100) : 0;

  return (
    <footer className="telemetry-footer">
      {/* Módulo superior: Ratio de Productividad Avanzado */}
      <div className="efficiency-panel">
        <div className="efficiency-info">
          <span className="efficiency-title">Progeso de las tareas</span>
          <span className="efficiency-percentage">{efficiencyRatio}%</span>
        </div>
        <div className="efficiency-bar-track">
          <div 
            className="efficiency-bar-fill" 
            style={{ width: `${efficiencyRatio}%` }}
          ></div>
        </div>
      </div>

      {/* Grid de mini-tarjetas analíticas */}
      <div className="analytics-grid">
        <div className="metric-card">
          <span className="metric-card-label">Total</span>
          <span className="metric-card-number">{props.total}</span>
        </div>
        
        <div className="metric-card warning">
          <span className="metric-card-label">Pendientes</span>
          <span className="metric-card-number">{props.pending}</span>
        </div>
        
        <div className="metric-card success">
          <span className="metric-card-label">Completadas</span>
          <span className="metric-card-number">{props.completed}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div className="contenedor">
      <div className="tarjeta" style={{ backgroundColor: '#ebf8ff', borderColor: '#bee3f8' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#2b6cb0' }}>Bienvenido a UniMed Control</h1>
        <p style={{ margin: 0, color: '#4a5568' }}>
          Sistema institucional de gestión de pacientes, médicos y control de citas médicas.
        </p>
      </div>

      <h2 style={{ marginTop: '2rem' }}>Accesos Directos</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="tarjeta">
          <h3>Módulo de Pacientes</h3>
          <p>Administra el catálogo de pacientes de la clínica: altas, consultas y modificaciones.</p>
          <Link to="/pacientes" className="btn">Gestionar Pacientes</Link>
        </div>

        <div className="tarjeta">
          <h3>Módulo de Médicos</h3>
          <p>Controla el personal médico disponible y sus respectivas especialidades operativas.</p>
          <Link to="/medicos" className="btn">Gestionar Médicos</Link>
        </div>

        <div className="tarjeta">
          <h3>Control de Citas</h3>
          <p>Agenda nuevas citas médicas y visualiza el historial integrado de consultas en tiempo real.</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Link to="/agendar" className="btn">Agendar</Link>
            <Link to="/citas" className="btn btn-secondary">Ver Historial</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
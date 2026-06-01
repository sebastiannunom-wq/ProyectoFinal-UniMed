import { NavLink } from 'react-router-dom';

export default function BarraSuperior() {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6'
  };

  const menuStyle = {
    display: 'flex',
    gap: '1.5rem'
  };

  return (
    <nav style={navbarStyle}>
      <NavLink to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
        UniMed Control
      </NavLink>
      <div style={menuStyle}>
        <NavLink to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Inicio</NavLink>
        <NavLink to="/pacientes" style={{ textDecoration: 'none', color: '#007bff' }}>Pacientes</NavLink>
        <NavLink to="/medicos" style={{ textDecoration: 'none', color: '#007bff' }}>Médicos</NavLink>
        <NavLink to="/citas" style={{ textDecoration: 'none', color: '#007bff' }}>Ver Citas</NavLink>
        <NavLink to="/agendar" style={{ textDecoration: 'none', color: '#007bff' }}>Agendar Cita</NavLink>
      </div>
    </nav>
  );
}
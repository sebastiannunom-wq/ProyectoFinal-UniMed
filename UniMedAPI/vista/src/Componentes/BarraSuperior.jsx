import { NavLink } from 'react-router-dom';

export default function BarraSuperior() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">UniMed Control</NavLink>
      <div className="navbar-menu">
        <NavLink to="/" className="navbar-link">Inicio</NavLink>
        <NavLink to="/pacientes" className="navbar-link">Pacientes</NavLink>
        <NavLink to="/medicos" className="navbar-link">Médicos</NavLink>
        <NavLink to="/citas" className="navbar-link">Ver Citas</NavLink>
        <NavLink to="/agendar" className="navbar-link">Agendar Cita</NavLink>
      </div>
    </nav>
  );
}
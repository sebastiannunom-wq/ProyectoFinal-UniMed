import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarraSuperior from './componentes/BarraSuperior.jsx';
import Inicio from './paginas/Inicio.jsx';
import Pacientes from './paginas/Pacientes.jsx';
import Medicos from './paginas/Medicos.jsx';
import VerCitas from './paginas/VerCitas.jsx';
import AgendarCita from './paginas/AgendarCita.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <BarraSuperior />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/citas" element={<VerCitas />} />
          <Route path="/agendar" element={<AgendarCita />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
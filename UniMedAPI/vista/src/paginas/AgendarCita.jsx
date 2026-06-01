import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AgendarCita() {
  const URL_PACIENTES = 'http://localhost:5096/api/pacientes';
  const URL_MEDICOS = 'http://localhost:5096/api/medicos';
  const URL_CITAS = 'http://localhost:5096/api/citasmedicas';

  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    obtenerDatosFormulario();
  }, []);

  const obtenerDatosFormulario = async () => {
    try {
      const [resPacientes, resMedicos] = await Promise.all([
        axios.get(URL_PACIENTES),
        axios.get(URL_MEDICOS)
      ]);
      setPacientes(resPacientes.data);
      setMedicos(resMedicos.data);
    } catch (error) {
      console.error('Error al precargar los catálogos:', error);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensajeError('');

    if (!pacienteId || !medicoId) {
      setMensajeError('Por favor, seleccione un paciente y un médico válidos.');
      return;
    }

    const nuevaCita = {
      id: 0,
      fechaHora,
      diagnostico,
      tratamiento,
      pacienteId: Number(pacienteId),
      medicoId: Number(medicoId)
    };

    try {
      await axios.post(URL_CITAS, nuevaCita);
      navigate('/citas');
    } catch (error) {
      console.error('Error al crear la cita:', error);
      setMensajeError('Hubo un problema al registrar la cita médica. Verifique los campos.');
    }
  };

  return (
    <div className="contenedor" style={{ maxWidth: '600px' }}>
      <h2>Agendar Nueva Cita Médica</h2>
      
      <div className="tarjeta" style={{ marginTop: '1.5rem' }}>
        <h3>Formulario de Cita</h3>
        
        {mensajeError && (
          <div style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontWeight: '500' }}>
            {mensajeError}
          </div>
        )}

        <form onSubmit={manejarEnvio}>
          <div className="grupo-form">
            <label>Seleccionar Paciente:</label>
            <select className="control-form" value={pacienteId} onChange={(e) => setPacienteId(e.target.value)} required>
              <option value="">-- Elija un Paciente --</option>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div className="grupo-form">
            <label>Seleccionar Médico:</label>
            <select className="control-form" value={medicoId} onChange={(e) => setMedicoId(e.target.value)} required>
              <option value="">-- Elija un Médico ({medicos.length} disponibles) --</option>
              {medicos.map(m => (
                <option key={m.id} value={m.id}>{m.nombre} ({m.especialidad})</option>
              ))}
            </select>
          </div>

          <div className="grupo-form">
            <label>Fecha y Hora de la Cita:</label>
            <input type="datetime-local" className="control-form" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} required />
          </div>

          <div className="grupo-form">
            <label>Diagnóstico Preliminar / Motivo:</label>
            <textarea className="control-form" rows="3" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} required></textarea>
          </div>

          <div className="grupo-form">
            <label>Tratamiento / Indicaciones Iniciales:</label>
            <textarea className="control-form" rows="3" value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} required></textarea>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn">Agendar Cita</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
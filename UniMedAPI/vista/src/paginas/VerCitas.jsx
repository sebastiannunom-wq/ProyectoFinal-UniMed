import { useState, useEffect } from 'react';
import axios from 'axios';

export default function VerCitas() {
  const URL_API = 'http://localhost:5096/api/citasmedicas';
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const respuesta = await axios.get(URL_API);
      setCitas(respuesta.data);
    } catch (error) {
      console.error('Error al cargar las citas médicas:', error);
    }
  };

  const eliminarCita = async (idEliminar) => {
    if (window.confirm('¿Está seguro de que desea cancelar esta cita médica?')) {
      try {
        await axios.delete(`${URL_API}/${idEliminar}`);
        cargarCitas();
      } catch (error) {
        console.error('Error al eliminar la cita médica:', error);
      }
    }
  };

  const formatearFecha = (fechaCadena) => {
    const fecha = new Date(fechaCadena);
    return fecha.toLocaleString('es-MX', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <div className="contenedor">
      <h2>Historial y Control de Citas Médicas</h2>

      <div className="tarjeta" style={{ marginTop: '1.5rem' }}>
        <h3>Citas Programadas</h3>
        {citas.length === 0 ? (
          <p>No se han encontrado citas médicas registradas en el sistema.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Paciente</th>
                <th>Médico (Especialidad)</th>
                <th>Diagnóstico</th>
                <th>Tratamiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((c) => (
                <tr key={c.id}>
                  <td>{formatearFecha(c.fechaHora)}</td>
                  <td>{c.pacienteNombre}</td>
                  <td>{c.medicoNombre} <span style={{ color: '#64748b', fontSize: '0.9rem' }}>({c.medicoEspecialidad})</span></td>
                  <td>{c.diagnostico}</td>
                  <td>{c.tratamiento}</td>
                  <td>
                    <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }} onClick={() => eliminarCita(c.id)}>
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pacientes() {
  const URL_API = 'http://localhost:5096/api/pacientes';
  
  const [pacientes, setPacientes] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const respuesta = await axios.get(URL_API);
      setPacientes(respuesta.data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  const limpiarFormulario = () => {
    setId('');
    setNombre('');
    setTelefono('');
    setFechaNacimiento('');
    setEditando(false);
  };

  const guardarPaciente = async (e) => {
    e.preventDefault();
    const datosPaciente = {
      id: editando ? Number(id) : 0,
      nombre,
      telefono,
      fechaNacimiento
    };

    try {
      if (editando) {
        await axios.put(`${URL_API}/${id}`, datosPaciente);
      } else {
        await axios.post(URL_API, datosPaciente);
      }
      limpiarFormulario();
      cargarPacientes();
    } catch (error) {
      console.error('Error al guardar paciente:', error);
    }
  };

  const seleccionarPaciente = (paciente) => {
    setId(paciente.id);
    setNombre(paciente.nombre);
    setTelefono(paciente.telefono);
    setFechaNacimiento(paciente.fechaNacimiento.split('T')[0]);
    setEditando(true);
  };

  const eliminarPaciente = async (idEliminar) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      try {
        await axios.delete(`${URL_API}/${idEliminar}`);
        cargarPacientes();
      } catch (error) {
        console.error('Error al eliminar paciente:', error);
      }
    }
  };

  return (
    <div className="contenedor">
      <h2>Módulo de Pacientes</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
        
        <div className="tarjeta">
          <h3>{editando ? 'Editar Paciente' : 'Registrar Nuevo Paciente'}</h3>
          <form onSubmit={guardarPaciente}>
            <div className="grupo-form">
              <label>Nombre Completo:</label>
              <input type="text" className="control-form" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            
            <div className="grupo-form">
              <label>Teléfono:</label>
              <input type="text" className="control-form" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            </div>
            
            <div className="grupo-form">
              <label>Fecha de Nacimiento:</label>
              <input type="date" className="control-form" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn">{editando ? 'Actualizar' : 'Guardar'}</button>
              {editando && (
                <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>Cancelar</button>
              )}
            </div>
          </form>
        </div>

        <div className="tarjeta">
          <h3>Listado de Pacientes</h3>
          {pacientes.length === 0 ? (
            <p>No hay pacientes registrados en el sistema.</p>
          ) : (
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.telefono}</td>
                    <td>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem', fontSize: '0.85rem' }} onClick={() => seleccionarPaciente(p)}>Editar</button>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }} onClick={() => eliminarPaciente(p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
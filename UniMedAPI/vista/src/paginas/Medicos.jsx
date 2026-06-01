import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Medicos() {
  const URL_API = 'http://localhost:5096/api/medicos';
  
  const [medicos, setMedicos] = useState([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    cargarMedicos();
  }, []);

  const cargarMedicos = async () => {
    try {
      const respuesta = await axios.get(URL_API);
      setMedicos(respuesta.data);
    } catch (error) {
      console.error('Error al cargar médicos:', error);
    }
  };

  const limpiarFormulario = () => {
    setId('');
    setNombre('');
    setEspecialidad('');
    setTelefono('');
    setEditando(false);
  };

  const guardarMedico = async (e) => {
    e.preventDefault();
    const datosMedico = {
      id: editando ? Number(id) : 0,
      nombre,
      especialidad,
      telefono
    };

    try {
      if (editando) {
        await axios.put(`${URL_API}/${id}`, datosMedico);
      } else {
        await axios.post(URL_API, datosMedico);
      }
      limpiarFormulario();
      cargarMedicos();
    } catch (error) {
      console.error('Error al guardar médico:', error);
    }
  };

  const seleccionarMedico = (medico) => {
    setId(medico.id);
    setNombre(medico.nombre);
    setEspecialidad(medico.especialidad);
    setTelefono(medico.telefono);
    setEditando(true);
  };

  const eliminarMedico = async (idEliminar) => {
    if (window.confirm('¿Está seguro de eliminar este médico?')) {
      try {
        await axios.delete(`${URL_API}/${idEliminar}`);
        cargarMedicos();
      } catch (error) {
        console.error('Error al eliminar médico:', error);
      }
    }
  };

  return (
    <div className="contenedor">
      <h2>Módulo de Médicos</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
        
        <div className="tarjeta">
          <h3>{editando ? 'Editar Médico' : 'Registrar Nuevo Médico'}</h3>
          <form onSubmit={guardarMedico}>
            <div className="grupo-form">
              <label>Nombre Completo:</label>
              <input type="text" className="control-form" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            
            <div className="grupo-form">
              <label>Especialidad:</label>
              <input type="text" className="control-form" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required />
            </div>
            
            <div className="grupo-form">
              <label>Teléfono:</label>
              <input type="text" className="control-form" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
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
          <h3>Listado de Médicos</h3>
          {medicos.length === 0 ? (
            <p>No hay médicos registrados en el sistema.</p>
          ) : (
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medicos.map((m) => (
                  <tr key={m.id}>
                    <td>{m.nombre}</td>
                    <td>{m.especialidad}</td>
                    <td>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', marginRight: '0.5rem', fontSize: '0.85rem' }} onClick={() => seleccionarMedico(m)}>Editar</button>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }} onClick={() => eliminarMedico(m.id)}>Eliminar</button>
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
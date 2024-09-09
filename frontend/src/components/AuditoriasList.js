import React, { useState, useEffect } from "react";

function Auditorias() {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estado para mostrar auditorías

  useEffect(() => {
    // Llamada al backend para obtener las auditorías
    const fetchAuditorias = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auditorias"); // URL de tu API
        if (!response.ok) {
          throw new Error("Error al cargar las auditorías");
        }
        const data = await response.json();
        setAuditorias(data); // Asigna las auditorías al estado
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAuditorias();
  }, []);

  if (loading) return <p>Cargando auditorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Auditorías</h2>
      {auditorias.length === 0 ? (
        <p>No se encontraron auditorías.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del </th>
              <th>Responsable</th>
              <th>Acción</th>
              <th>Fecha</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {auditorias.map((auditoria) => (
              <tr key={auditoria.id}>
                <td>{auditoria.id_auditoria}</td>
                <td>{auditoria.nombre}</td>
                <td>{auditoria.apellido}</td>
                <td>{auditoria.accion}</td>
                <td>{new Date(auditoria.fecha).toLocaleString()}</td>
                <td>{auditoria.detalles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Auditorias;

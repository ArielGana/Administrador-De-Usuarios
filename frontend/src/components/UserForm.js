import React, { useState } from "react";

function UserForm({ addUser }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      nombre,
      apellido,
      email,
      contrasena,
      telefono,
      direccion,
      fecha_nacimiento: fechaNacimiento,
      fecha_registro: new Date().toISOString(), // Genera la fecha actual
      id_rol: rol,
      estado,
    };

    await addUser(newUser);

    // Limpiar el formulario
    setNombre("");
    setApellido("");
    setEmail("");
    setContrasena("");
    setTelefono("");
    setDireccion("");
    setFechaNacimiento("");
    setRol("");
    setEstado("");
  };

  return (
    <div>
      <h3>Agregar Usuario</h3>

      <form onSubmit={handleSubmit}>
        <div id="form1">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label>Apellido</label>
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <label>Teléfono</label>
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div id="form2">
          <label>Dirección</label>
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            placeholder="Nacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
          <label>Rol</label>
          <select
            name="rol"
            id="rol-select"
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="">--Selecciona una opción--</option>
            <option value="1">Administrador</option>
            <option value="2">Supervisor</option>
            <option value="3">Empleado</option>
            <option value="4">Gerente</option>
            <option value="5">Asistente</option>
            <option value="6">Analista</option>
            <option value="7">Auditor</option>
            <option value="8">Cliente</option>
            <option value="9">Analista</option>
            <option value="10">Desarrollador</option>
          </select>

          <label>Estado</label>
          <select
            name="estado"
            id="estado-select"
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">--Selecciona un estado--</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default UserForm;

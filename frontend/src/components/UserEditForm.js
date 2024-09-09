import React, { useState, useEffect } from "react";

function UserEditForm({ user, updateUser, onClose }) {
  const [nombre, setNombre] = useState(user ? user.nombre : "");
  const [apellido, setApellido] = useState(user ? user.apellido : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [pass, setPass] = useState(user ? user.contrasena : "");
  const [telefono, setTelefono] = useState(user ? user.telefono : "");
  const [direccion, setDireccion] = useState(user ? user.direccion : "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    user ? user.fecha_nacimiento : ""
  );
  const [rol, setRol] = useState(user ? user.id_rol : "");
  const [estado, setEstado] = useState(user ? user.estado : "");

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setApellido(user.apellido);
      setEmail(user.email);
      setPass(user.contrasena);
      setTelefono(user.telefono);
      setDireccion(user.direccion);
      setFechaNacimiento(user.fecha_nacimiento);
      setRol(user.id_rol);
      setEstado(user.estado);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      nombre,
      apellido,
      email,
      contrasena: pass,
      telefono,
      direccion,
      fecha_nacimiento: fechaNacimiento,
      id_rol: rol,
      estado,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      const result = await response.json();
      updateUser(result); // Actualiza el usuario en el estado del componente padre
      onClose(); // Cierra el formulario de edición
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return (
    <div>
      <form className="formedit" onSubmit={handleSubmit}>
        <h1>Editar Usuario</h1>

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            id="direccion"
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            id="fechaNacimiento"
            type="date"
            value={fechaNacimiento.split("T")[0]}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="">--Selecciona un rol--</option>
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
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">--Selecciona un estado--</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit">Actualizar</button>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </form>
    </div>
  );
}

export default UserEditForm;

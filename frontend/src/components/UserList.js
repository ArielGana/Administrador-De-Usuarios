import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserEditForm from "./UserEditForm";
import Auditorias from "./AuditoriasList";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userToEditId, setUserToEditId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para el usuario seleccionado
  const [showAuditorias, setShowAuditorias] = useState(false);
  useEffect(() => {
    fetchoUsers();
  }, []);

  const fetchoUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el usuario");
      }
      await fetchoUsers();
      setIsFormVisible(false); // Ocultar el formulario después de agregar
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      if (!updatedUser.id) {
        throw new Error("ID del usuario no definido");
      }

      const response = await fetch(
        `http://localhost:5000/api/users/${updatedUser.id}`,
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
      await fetchoUsers();
      setUserToEditId(null); // Cerrar el formulario después de actualizar
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUserId((prevId) => (prevId === userId ? null : userId));
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      await fetchoUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Lista de Usuarios</h3>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Cerrar Formulario" : "Agregar Usuario"}
      </button>
      {isFormVisible && <UserForm addUser={handleAddUser} />}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id_usuario}>
              <div>
                <span
                  onClick={() => handleUserClick(user.id_usuario)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  {user.nombre} {user.apellido}
                </span>

                {selectedUserId === user.id_usuario && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  >
                    <p>Email: {user.email}</p>
                    <p>Teléfono: {user.telefono}</p>
                    <p>Dirección: {user.direccion}</p>
                    <p>Fecha de Nacimiento: {user.fecha_nacimiento}</p>
                    <p>Fecha de Registro: {user.fecha_registro}</p>
                    <p>Rol: {user.nombre_rol}</p>
                    <button
                      id="editBtn"
                      onClick={() => setUserToEditId(user.id_usuario)}
                    >
                      Editar
                    </button>
                    <button
                      id="deleteBtn"
                      onClick={() => handleDeleteUser(user.id_usuario)}
                    >
                      Eliminar
                    </button>
                    {userToEditId === user.id_usuario && (
                      <UserEditForm
                        user={user}
                        updateUser={handleUpdateUser}
                        onClose={() => setUserToEditId(null)}
                      />
                    )}
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>No hay usuarios disponibles</p>
        )}
      </ul>
      <button onClick={() => setShowAuditorias(!showAuditorias)}>
        {showAuditorias ? "Ocultar Auditorías" : "Mostrar Auditorías"}
      </button>
      {showAuditorias && <Auditorias />}{" "}
    </div>
  );
}

export default UserList;

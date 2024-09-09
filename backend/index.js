const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Configurar conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Middleware para manejar JSON
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get("/api/users", (req, res) => {
  const sql = `
    SELECT u.*, r.nombre_rol
    FROM usuarios u
    JOIN roles r ON u.id_rol = r.id_rol
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    res.json(results);
  });
});
// Ruta para obtener todos las auditorias

// Ruta para obtener auditorías con el nombre y apellido de los usuarios
app.get("/api/auditorias", (req, res) => {
  const sql = `
    SELECT a.id_auditoria, u.nombre, u.apellido, a.accion, a.fecha, a.detalles
    FROM auditorias a
    JOIN usuarios u ON a.id_usuario = u.id_usuario
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Enviar los resultados con nombre y apellido del usuario
  });
});

app.post("/api/users", (req, res) => {
  const {
    nombre,
    apellido,
    email,
    contrasena,
    telefono,
    direccion,
    fecha_nacimiento,
    fecha_registro,
    id_rol,
    estado,
  } = req.body;

  const sql =
    "INSERT INTO usuarios (nombre, apellido, email, contrasena, telefono, direccion, fecha_nacimiento, fecha_registro, id_rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      nombre,
      apellido,
      email,
      contrasena,
      telefono,
      direccion,
      fecha_nacimiento,
      fecha_registro,
      id_rol,
      estado,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id_usuario: result.insertId, nombre, apellido, email });
    }
  );
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    email,
    contrasena,
    telefono,
    direccion,
    fecha_nacimiento,
    fecha_registro,
    id_rol,
    estado,
  } = req.body;

  const sql =
    "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, contrasena = ?, telefono = ?, direccion = ?, fecha_nacimiento = ?, fecha_registro = ?, id_rol = ?, estado = ? WHERE id_usuario = ?";

  db.query(
    sql,
    [
      nombre,
      apellido,
      email,
      contrasena,
      telefono,
      direccion,
      fecha_nacimiento,
      fecha_registro,
      id_rol,
      estado,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id_usuario: id, nombre, apellido, email });
    }
  );
});

// Ruta para eliminar un usuario
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Usuario eliminado" });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

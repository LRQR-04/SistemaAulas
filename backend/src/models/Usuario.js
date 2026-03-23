import { pool } from "../config/db.js";

export class Usuario {
  static async buscarPorEmail(correo) {
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, correo, tipo, reservaciones_disponibles, estatus FROM usuarios WHERE correo = ?",
      [correo],
    );
    return rows[0];
  }

  static async crear(usuario) {
    const { nombre, correo, contrasenia, tipo } = usuario;

    let numReservaciones;
    if (tipo === "estudiante") {
      numReservaciones = 3;
    } else if (tipo === "profesor") {
      numReservaciones = 5;
    } else {
      numReservaciones = 0;
    }

    const [result] = await pool.query(
      `INSERT INTO usuarios(nombre, correo, contrasenia, tipo, reservaciones_disponibles)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, correo, contrasenia, tipo, numReservaciones],
    );

    console.log(result);
    return result.insertId;
  }
}

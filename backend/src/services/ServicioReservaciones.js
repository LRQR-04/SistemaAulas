import { pool } from "../config/db.js";
import { ServicioReglas } from "./ServicioReglas.js";

export class ServicioReservacion {
  static async crear(usuario, data) {
    await ServicioReglas.validarReservacion(usuario, data);

    const [result] = await pool.query(
      `
      INSERT INTO reservaciones(id_usuario, id_espacio, fecha_uso, hora_inicio, hora_fin)
      VALUES (?, ?, ?, ?, ?)
    `,
      [
        usuario.id,
        data.id_espacio,
        data.fecha,
        data.hora_inicio,
        data.hora_fin,
      ],
    );

    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.query(
      "SELECT id_usuario, id_espacio, fecha_uso, hora_inicio, hora_fin, fecha_reservacion, estatus FROM reservations",
    );
    return rows;
  }

  static async cancelar(id) {
    await pool.query(
      'UPDATE reservaciones SET estatus = "cancelada" WHERE id_reservacion = ?',
      [id],
    );
  }
}

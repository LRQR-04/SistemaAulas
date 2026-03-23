import { pool } from "../config/db.js";

export class ServicioReglas {
  static async validarReservacion(usuario, data) {
    //
    const [rows] = await pool.query(
      `
      SELECT * FROM reservaciones
      WHERE id_espacio = ?
      AND fecha_uso = ?
      AND (
        hora_inicio < ? AND
        hora_fin > ?
      )
    `,
      [data.id_espacio, data.fecha, data.hora_fin, data.hora_inicio],
    );

    if (rows.length > 0) {
      throw new Error("El horario seleccionado no disponible");
    }

    // Límite de reservaciones por usuario (falta validar por semana y rol)
    const [count] = await pool.query(
      `
      SELECT COUNT(*) as total
      FROM reservaciones
      WHERE id_usuario = ?
      AND fecha = CURRENT_DATE
    `,
      [usuario.id],
    );

    if (usuario.tipo === "estudiante" && count[0].total >= 3) {
      throw new Error("Límite de reservaciones de estudiantes alcanzado");
    }

    if (usuario.tipo === "profesor" && count[0].total >= 5) {
      throw new Error("Límite de reservaciones de profesores alcanzado");
    }
  }
}

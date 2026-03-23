import { ServicioReservacion } from "../services/ServicioReservaciones.js";

export class ControladorReservacion {
  static async crear(req, res) {
    try {
      const id = await ServicioReservacion.crear(req.usuario, req.body);
      res.json({ id });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async getAll(req, res) {
    const data = await ServicioReservacion.getAll();
    res.json(data);
  }

  static async cancelar(req, res) {
    await ServicioReservacion.cancelar(req.params.id);
    res.json({ message: "La reservación ha sido cancelada" });
  }
}

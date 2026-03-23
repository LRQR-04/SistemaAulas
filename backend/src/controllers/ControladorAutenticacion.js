import { ServicioAutenticacion } from "../services/ServicioAutenticacion.js";

export class ControladorAutenticacion {
  static async login(req, res) {
    try {
      const { correo, contrasenia } = req.body;
      const data = await ServicioAutenticacion.login(correo, contrasenia);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async registro(req, res) {
    try {
      console.log(req.body);
      const id = await ServicioAutenticacion.registro(req.body);
      res.json({ id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

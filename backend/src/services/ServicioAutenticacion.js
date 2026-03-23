import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

export class ServicioAutenticacion {
  static async login(correo, contrasenia) {
    const usuario = await Usuario.buscarPorEmail(correo);

    if (!usuario) throw new Error("Usuario no encontrado");

    const valida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!valida) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: usuario.id_usuario, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      },
    );

    return { usuario, token };
  }

  static async registro(data) {
    const rolesPermitidos = ["estudiante", "profesor"];

    if (!rolesPermitidos.includes(data.tipo)) {
      throw new Error("Rol no permitido");
    }

    const hash = await bcrypt.hash(data.contrasenia, 10);

    const id = await Usuario.crear({
      nombre: data.nombre,
      correo: data.correo,
      contrasenia: hash,
      tipo: data.tipo,
    });

    return id;
  }
}

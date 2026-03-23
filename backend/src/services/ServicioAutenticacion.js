import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

export class ServicioAutenticacion {
  static async login(correo, contrasenia) {
    const usuario = await Usuario.buscarPorEmail(correo);

    const valida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!valida || !usuario) throw new Error("Credenciales incorrectas");

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
    const { nombre, correo, contrasenia, tipo } = data;

    // Limpieza de datos
    const nombreLimpio = nombre?.trim();
    const correoLimpio = correo?.trim().toLowerCase();

    // Validaciones básicas
    if (!nombreLimpio || !correoLimpio || !contrasenia || !tipo) {
      throw new Error("Todos los campos son obligatorios");
    }

    // Validar nombre
    if (nombreLimpio.length < 3 || nombreLimpio.length > 100) {
      throw new Error("El nombre debe tener entre 3 y 100 caracteres");
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correoLimpio)) {
      throw new Error("El correo ingresado no es válido");
    }

    // Validar contraseña segura
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!passwordRegex.test(contrasenia)) {
      throw new Error(
        "La contraseña debe tener mínimo 8 caracteres, mayúsculas, minúsculas, número y símbolo",
      );
    }

    // Verificar correo único
    const usuarioExistente = await Usuario.buscarPorEmail(correoLimpio);
    if (usuarioExistente) {
      throw new Error("El correo ya está registrado");
    }

    // Verficar roles permitidos
    const rolesPermitidos = ["estudiante", "profesor"];

    if (!rolesPermitidos.includes(tipo)) {
      throw new Error("El rol seleccionado no está permitido");
    }

    // Hash
    const hash = await bcrypt.hash(contrasenia, 10);

    const id = await Usuario.crear({
      nombre: nombreLimpio,
      correo: correoLimpio,
      contrasenia: hash,
      tipo: tipo,
    });

    return id;
  }
}

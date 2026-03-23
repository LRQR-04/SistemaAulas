export const middlewareRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (!rolesPermitidos.includes(usuario.tipo)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  };
};

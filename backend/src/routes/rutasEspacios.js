import { Router } from "express";
import { ControladorEspacios } from "../controllers/ControladorEspacios.js";
import { middlewareRoles } from "../middlewares/middlewareRoles.js";
import { middlewareAutenticacion } from "../middlewares/middlewareAutenticacion.js";

const router = Router();

router.post(
  "/",
  middlewareAutenticacion,
  middlewareRoles("admin"),
  ControladorEspacios.crear,
);

router.put(
  "/:id",
  middlewareAutenticacion,
  middlewareRoles("admin"),
  ControladorEspacios.actualizar,
);

router.delete(
  "/:id",
  middlewareAutenticacion,
  middlewareRoles("admin"),
  ControladorEspacios.eliminar,
);

export default router;

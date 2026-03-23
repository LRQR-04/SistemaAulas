import { Router } from "express";
import { ControladorReservacion } from "../controllers/ControladorReservacion.js";
import { middlewareAutenticacion } from "../middlewares/middlewareAutenticacion.js";
import { middlewareRoles } from "../middlewares/middlewareRoles.js";

const router = Router();

router.get("/", middlewareAutenticacion, ControladorReservacion.getAll);
router.post(
  "/",
  middlewareAutenticacion,
  middlewareRoles("estudiante", "profesor"),
  ControladorReservacion.crear,
);
router.delete(
  "/:id",
  middlewareAutenticacion,
  middlewareRoles("estudiante", "profesor", "admin"),
  ControladorReservacion.cancelar,
);

export default router;

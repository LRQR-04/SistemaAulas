import { Router } from "express";
import { ControladorReporte } from "../controllers/ControladorReporte.js";
import { middlewareRoles } from "../middlewares/middlewareRoles.js";
import { middlewareAutenticacion } from "../middlewares/middlewareAutenticacion.js";

const router = Router();

router.get(
  "/reportes",
  middlewareAutenticacion,
  middlewareRoles("admin"),
  ControladorReporte.getUsage,
);

export default router;

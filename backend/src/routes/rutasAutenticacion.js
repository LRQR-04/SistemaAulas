import { Router } from "express";
import { ControladorAutenticacion } from "../controllers/ControladorAutenticacion.js";

const router = Router();

router.post("/login", ControladorAutenticacion.login);
router.post("/registro", ControladorAutenticacion.registro);

export default router;

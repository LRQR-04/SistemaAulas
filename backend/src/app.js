import express from "express";
import cors from "cors";

import rutasAutenticacion from "./routes/rutasAutenticacion.js";
import rutasReservacion from "./routes/rutasReservacion.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", rutasAutenticacion);
app.use("/api/reservaciones", rutasReservacion);

export default app;

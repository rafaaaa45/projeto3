import mongo from "./src/configs/db.config.js";
import express from "express";
import { PORT } from "./src/utils/constants.js";
import CursoRoute from './src/routes/Curso.Route.js';

const app = express();

mongo.connect();

// Use User Routes
app.get('/cursos/media/:mediaRecebida', CursoRoute);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});

import mongo from "./src/configs/db.config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import { PORT } from "./src/utils/constants.js";
import CursoRoute from './src/routes/Curso.Route.js';
import CalculoMediaRoute from './src/routes/CalculoMedia.Route.js';

const app = express();

mongo.connect();

app.use(cors());

app.use(bodyParser.json());

app.get('/api/cursos/:mediaRecebida', CursoRoute);
app.post('/api/media', CalculoMediaRoute);
app.post('/api/cursoExame', CalculoMediaRoute);
app.post('/api/mediaCurso', CalculoMediaRoute);
app.post('/api/mediaPossivel', CalculoMediaRoute);

app.listen(PORT, () => {
  console.log(`App listening at https://localhost:${PORT}`)
});

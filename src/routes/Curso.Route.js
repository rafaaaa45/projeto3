import express from 'express';
import CursoController from '../controllers/Curso.Controller.js';

const CursoRoute = express.Router();

// Rota para obter cursos com média igual ou inferior à média recebida
CursoRoute.get('/cursos/media/:mediaRecebida', CursoController.getCursosPorMedia);

export default CursoRoute;

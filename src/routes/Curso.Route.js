import express from 'express';
import CursoController from '../controllers/controller';

const CursoRoute = express.Router();

// Rota para obter cursos com média igual ou inferior à média recebida
CursoRoute.get('/cursos/media/:media', CursoController.getCursosPorMedia);

export default CursoRoute;

import express from 'express';
import CalculoMediaController from '../controllers/CalculoMedia.Controller.js';

const CalculoMediaRoute = express.Router();

CalculoMediaRoute.post('/api/media', CalculoMediaController.calcularMedia);
CalculoMediaRoute.post('/api/cursoExame', CalculoMediaController.getCursosPorExame);
CalculoMediaRoute.post('/api/mediaCurso', CalculoMediaController.calcularMediaParaIngresso);
CalculoMediaRoute.post('/api/mediaPossivel', CalculoMediaController.calcularMediaPossivel);

export default CalculoMediaRoute;
import express from 'express';
import CalculoMediaController from '../controllers/CalculoMedia.Controller.js';

const CalculoMediaRoute = express.Router();

CalculoMediaRoute.post('/api/media', CalculoMediaController.calcularMedia);
CalculoMediaRoute.post('/api/percentagem', CalculoMediaController.getPercentagemExame);

export default CalculoMediaRoute;
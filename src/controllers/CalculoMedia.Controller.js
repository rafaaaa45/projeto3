import CalculoMediaService from '../services/CalculoMedia.Service.js';

class CalculoMediaController {
    async calcularMedia(req, res) {
        const { notas10, notas11, notas12, exames, percentagem} = req.body;

        try {
            const resultadoMedia = CalculoMediaService.calcularMedia(notas10, notas11, notas12, exames, percentagem);
            res.json(resultadoMedia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new CalculoMediaController();

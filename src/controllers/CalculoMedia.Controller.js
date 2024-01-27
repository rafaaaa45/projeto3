import CalculoMediaService from '../services/CalculoMedia.Service.js';

class CalculoMediaController {
    async calcularMedia(req, res) {
        const { notas10, notas11, notas12, exames} = req.body;

        try {
            const resultadoMedia = CalculoMediaService.calcularMedia(notas10, notas11, notas12, exames);
            res.json(resultadoMedia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPercentagemExame(req, res) {
        const { exameCandidato } = req.body;
        try {    
          const percentagem = await CalculoMediaService.getPercentagemExame(exameCandidato);
          return res.status(200).json({ percentagem });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Erro ao obter percentagem.' });
        }
      }
}

export default new CalculoMediaController();

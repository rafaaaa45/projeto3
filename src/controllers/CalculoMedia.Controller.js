import CalculoMediaService from '../services/CalculoMedia.Service.js';

class CalculoMediaController {
    async calcularMedia(req, res) {
        const { notas10, notas11, notas12} = req.body;

        try {
            const resultadoMedia = CalculoMediaService.calcularMedia(notas10, notas11, notas12);
            return res.status(200).json(resultadoMedia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCursosPorExame(req, res) {
        const { exameCandidato } = req.body;
        try {    
          const cursosPorExame = await CalculoMediaService.getCursosPorExame(exameCandidato);
          return res.status(200).json(cursosPorExame);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Erro ao obter cursosPorExame.' });
        }
    }

    async calcularMediaParaIngresso(req, res){
      const { exameCandidato, notaExameCandidato, mediaDisciplinas } = req.body;

      try{
        const mediaPorCurso = await CalculoMediaService.calcularMediaParaIngresso(exameCandidato, notaExameCandidato, mediaDisciplinas);
        return res.status(200).json(mediaPorCurso);
      }catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Erro ao calcular a média por curso.' });
      }
    }

    async calcularMediaPossivel(req, res){
      const { exameCandidato, notaExameCandidato, mediaDisciplinas } = req.body;

      try{
        const mediaPossivel = await CalculoMediaService.calcularMediaPossivel(exameCandidato, notaExameCandidato, mediaDisciplinas);
        return res.status(200).json(mediaPossivel);
      }catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Erro ao calcular a média possível.' });
      }
    }
}

export default new CalculoMediaController();

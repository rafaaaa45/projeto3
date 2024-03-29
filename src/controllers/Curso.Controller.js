import CursoService from '../services/Curso.Service.js';

class CursoController {
  async getCursosPorMedia(req, res) {
    try {
      const { mediaRecebida } = req.params;
      const mediaFloat = parseFloat(mediaRecebida);

      if (isNaN(mediaFloat)) {
        return res.status(400).json({ error: 'A média recebida deve ser um número válido.' });
      }

      const cursos = await CursoService.getCursosPorMedia(mediaFloat);
      return res.status(200).json({ cursos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao obter cursos por média.' });
    }
  }
}

export default new CursoController();
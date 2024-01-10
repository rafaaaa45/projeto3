// services/userService.js
import Curso from '../models/Curso.Model.js';

class CursoService {
  async getCursosPorMedia(mediaRecebida) {
    return Curso.find({ media: { $lte: mediaRecebida } });
  }
}

export default new CursoService();

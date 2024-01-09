// services/userService.js
import Curso from '../models/Curso.Model';

class CursoService {
  async getCursosPorMedia(media) {
    return Curso.find({ media: { $lte: media } });
  }
}

export default new CursoService();

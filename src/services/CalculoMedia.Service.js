import "../helpers/calcularMedia.js";
import Curso from '../models/Curso.Model.js';

class CalculoMediaService {
  calcularMedia(notas10, notas11, notas12, exames){
    const media = calcularMedia(notas10, notas11, notas12, exames);

    return media;
  }

  async getPercentagemExame(exameCandidato) {
    // Extrair todos os cursos com uma instancia dos exames preenchido pelo candidato
    const cursos = await Curso.find({cadeiraIngresso: {$in: exameCandidato}});

    if (!cursos) {
      throw new Error("Ocorreu um erro a  obter as informações do curso");
    }

    return cursos;
  }

}

export default new CalculoMediaService();

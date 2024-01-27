import calcularMedia from "../helpers/calcularMedia.js";
import Curso from '../models/Curso.Model.js';

class CalculoMediaService {
  calcularMedia(notas10, notas11, notas12, exames){
    const media = calcularMedia(notas10, notas11, notas12, exames);

    return media;
  }

  async getPercentagemExame(exameCandidato) {
    // Find documents in the database
    const cursos = await Curso.find({cadeiraIngresso: {$in: exameCandidato}});

    // Filter the results based on exameObrigatorio
    const result = cursos.filter(curso => {
        if (curso.exameObrigatorio) {
            // If exameObrigatorio is true, check if exameCandidato contains all exams in cadeiraIngresso
            return curso.cadeiraIngresso.every(exam => exameCandidato.includes(exam));
        } else {
            // If exameObrigatorio is false, include the document in the result
            return true;
        }
    });

    // Check if any documents were found
    if (result == null) {
        throw new Error('Nenhum  curso com o exame obrigatório encontrado');
    }

    return result;
  }

}

export default new CalculoMediaService();

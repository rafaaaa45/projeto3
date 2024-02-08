import {calcularMedia, calcularMediaPorCurso, calcularExamePossivel} from "../helpers/calcularMedia.js";
import Curso from '../models/Curso.Model.js';

class CalculoMediaService {
  // Calcular a média do candidato
  calcularMedia(notas10, notas11, notas12, exames){
    let media = calcularMedia(notas10, notas11, notas12, exames);

    return media;
  }

  async getCursosPorExame(exameCandidato) {
    // Extrair todos os cursos com uma instancia dos exames preenchido pelo candidato
    let cursos;
    if (exameCandidato.length > 0) {
      cursos = await Curso.find({cadeiraIngresso: {$in: exameCandidato}});
    } else {
      cursos = await Curso.find({});
    }

    if (cursos.length < 1) {
      throw new Error("Ocorreu um erro a obter as informações do curso");
    }

    return cursos;
  }

  async calcularMediaParaIngresso(exameCandidato, notaExameCandidato, mediaDisciplinas) {
    // Calcular a média de ingresso do candidato por curso
    let mediaPorCurso;
    
    let dadosCursos = await this.getCursosPorExame(exameCandidato);


    if (exameCandidato.length >= 3) {
        mediaPorCurso = calcularMediaPorCurso(dadosCursos, exameCandidato, notaExameCandidato, mediaDisciplinas);
    } else {
        throw new Error("Ocorreu um erro a calcular a média por curso. O candidato não tem exames suficientes.");
    }

    return mediaPorCurso;
  }


  async calcularMediaPossivel(exameCandidato, notaExameCandidato, mediaDisciplinas){
    // Calcular curso possiveis com nota dos exames necessário para ingressar
    let dadosCursos = await this.getCursosPorExame(exameCandidato);

    let mediaIngresso = calcularExamePossivel(dadosCursos, mediaDisciplinas, exameCandidato, notaExameCandidato)

    return mediaIngresso;
  }
}

export default new CalculoMediaService();

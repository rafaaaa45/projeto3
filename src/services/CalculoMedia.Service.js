import calcularMedia from "../helpers/calcularMedia.js";

class CalculoMediaService {
  calcularMedia(notas10, notas11, notas12, exames, percentagem){
    const media = calcularMedia(notas10, notas11, notas12, exames, percentagem);

    return media;
  }
}

export default new CalculoMediaService();

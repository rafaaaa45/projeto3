// Esta função calcula a média ponderada das notas de um aluno nos últimos três anos
function calcularMedia(notas10, notas11, notas12) {
    const validateYear = (notas, year) => {
        if (notas !== undefined && notas.length >= 9 && notas.every(nota => nota >= 9)) {
            return notas;
        } else {
            let errorMessage = `Ano ${year} inválido.`;
            if (notas !== undefined && notas.length < 9) {
                errorMessage += ' Deve ter pelo menos 9 disciplinas.';
            }
            if (notas !== undefined && !notas.every(nota => nota >= 9)) {
                errorMessage += ' Cada nota deve ser igual ou superior a 9.';
            }
            throw new Error(errorMessage);
        }
    };

    try {
        notas10 = validateYear(notas10, 10);
        notas11 = validateYear(notas11, 11);
        notas12 = validateYear(notas12, 12);
    } catch (error) {
        throw error;
    }

    if (
        (notas10.length === 0 && notas11.length > 0) ||
        (notas11.length === 0 && notas12.length > 0) ||
        (notas10.length === 0 && notas12.length > 0)
    ) {
        throw new Error('Não é possível calcular a média se anos anteriores estiverem vazios.');
    }

    const notas = [notas10, notas11, notas12].filter((nota) => nota.length > 0);
    if (!notas || notas.length === 0) {
        throw new Error('Notas inválidas ou ausentes.');
    }

    const soma = notas.reduce((acc, nota) => acc + nota.reduce((sum, value) => sum + value, 0), 0);
    const totalValues = notas.reduce((acc, nota) => acc + nota.length, 0);
    
    if (totalValues === 0) {
        throw new Error('Não há notas suficientes para calcular a média.');
    }

    const media = soma / totalValues;
    return media;
}

function calcularMediaPorCurso(dadosCursos, exameCandidato, notaExameCandidato, mediaDisciplinas){
    let dados = [];

    for(const curso of dadosCursos) {
        for(let i = 0; i < exameCandidato.length; i++) {

            let mediaTemp;
            let numcadeira;

            if(curso.cadeiraIngresso === exameCandidato[i]) {
                mediaTemp += notaExameCandidato[i];
                numcadeira += 1;
            }

            mediaTemp = mediaTemp / numcadeira;
            dados.push({
                name: curso.nome,
                nota: mediaTemp,
                percentagem: curso.percentagemExame
            });
        }
    }

    let dadosCursosCandidatos = [];

    for(const elementos of dados) {

        let mediaIngresso = calcularMediaIngresso(mediaDisciplinas,elementos.nota,elementos.percentagem)

        if (mediaIngresso >= 9.5){
            dadosCursosCandidatos.push({
                nome: elementos.name,
                notaFinal: mediaIngresso
            });   
        }
    }   
    
    return dadosCursosCandidatos
}

// Esta função calcula a média ponderada das notas dos exames de um aluno
function calcularMediaIngresso(mediaDisciplinas, mediaExame, percentageBD){
    let percentage = percentageBD * 0.01

    const mediaIngresso = mediaDisciplinas * (1 - percentage) + mediaExame * percentage;

    return mediaIngresso;
}

export default calcularMedia;

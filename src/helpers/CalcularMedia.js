// Disciplinas

// Esta função calcula a média ponderada das notas de um aluno nos últimos três anos
function calcularMedia(notas10, notas11, notas12) {
    const validateYear = (notas, year, expectedSubjects) => {
        if (
            notas !== undefined &&
            (notas.length === 0 || (notas.length >= expectedSubjects &&
              notas.every(nota => nota >= 9) &&
              notas.every(nota => nota <= 20))
            )
          ) {
            return notas;
          }
           else {
            let errorMessage = `Ano ${year} inválido.`;
            if (notas !== undefined && notas.length < expectedSubjects) {
                errorMessage += `Deve ter pelo menos ${expectedSubjects} disciplinas.`;
            }
            if (notas !== undefined && !notas.every(nota => nota >= 9) && !notas.every(nota => nota <= 20)) {
                errorMessage += ' Cada nota deve ser igual ou superior a 9 e igual ou inferior a 20.';
            }
            throw new Error(errorMessage);
        }
    };

    try {
        notas10 = validateYear(notas10, 10, 7);
        notas11 = validateYear(notas11, 11, 7);
        notas12 = validateYear(notas12, 12, 5);
    } catch (error) {
        throw error;
    }

    // Verificar se existe anos vazios antes do último ano preenchido
    if (
        (notas10.length === 0 && notas11.length > 0) ||
        (notas11.length === 0 && notas12.length > 0) ||
        (notas10.length === 0 && notas12.length > 0)
    ) {
        throw new Error('Não é possível calcular a média se anos anteriores estiverem vazios.');
    }

    // Filtrar os anos vazios
    const notas = [notas10, notas11, notas12].filter((nota) => nota.length > 0);
    if (!notas || notas.length === 0) {
        throw new Error('Notas inválidas ou ausentes.');
    }

    // Soma de todas as notas
    const soma = notas.reduce((acc, nota) => acc + nota.reduce((sum, value) => sum + value, 0), 0);
    // Número total de notas
    const totalValues = notas.reduce((acc, nota) => acc + nota.length, 0);
    
    if (totalValues === 0) {
        throw new Error('Não há notas suficientes para calcular a média.');
    }

    const media = soma / totalValues;

    if (media < 9.5 || media > 20){
        throw new Error('Média insuficiente para ingressar em um curso, ou excede a nota máxima possivel.');
    }

    return media;
}

// Exames, preenchido

// Esta função calcula a média de ingresso para cada curso 
function calcularMediaPorCurso(dadosCursos, exameCandidato, notaExameCandidato, mediaDisciplinas){

    // Garantir que os dados sejam sempre um array
    if (!Array.isArray(dadosCursos)) {
        dadosCursos = [dadosCursos];
        exameCandidato = [exameCandidato];
        notaExameCandidato = [notaExameCandidato];
    }

    let dados = calcularMediaExameCurso(dadosCursos, exameCandidato, notaExameCandidato);
    let dadosCursosCandidatos = [];

    // Calcular média final para entrar no curso, e anexar  à lista de cursos possiveis do candidato
    for(const elementos of dados) {
        let mediaIngresso = calcularMediaIngresso(mediaDisciplinas,elementos.nota,elementos.percentagem)

        if (mediaIngresso >= elementos.media){
            dadosCursosCandidatos.push({
                nome: elementos.name,
                notaFinal: mediaIngresso,
                url: elementos.url,
                media: elementos.media
            });
        }
    }   
    
    if (!dadosCursosCandidatos) {
        throw  new Error("Erro ao calcular a média por curso, nenhum resultado encontrado.");
    }

    return dadosCursosCandidatos;
}

// Esta função calcula a média ponderada das notas dos exames de um aluno
function calcularMediaIngresso(mediaDisciplinas, mediaExame, percentageBD){
    let percentage = percentageBD * 0.01

    if (percentage > 1){
        throw new Error(`Erro na percentagem extraida, deve ser menor que zero.`);
    }

    const mediaIngresso = mediaDisciplinas * (1 - percentage) + mediaExame * percentage;

    if (mediaIngresso < 9.5 || mediaIngresso > 20) {
        throw new Error(`A média de ingresso é insuficiente (${mediaDisciplinas}) ou muito alta.`);
    }

    return mediaIngresso.toFixed(1);
}

// Correr todos os cursos possiveis para o candidato e calcular a sua média de exame para esse curso    
function calcularMediaExameCurso(dadosCursos, exameCandidato, notaExameCandidato){
    let cursosPossiveis = []

    // Garantir que os dados sejam sempre um array
    if (!Array.isArray(dadosCursos)) {
        dadosCursos = [dadosCursos];
        exameCandidato = [exameCandidato];
        notaExameCandidato = [notaExameCandidato];
    }

    for(const curso of dadosCursos) {

        let mediaTemp = 0;
        let numcadeira = 0;
        let media = 0;

        if (curso.examesObrigatorio){
            // Caso seja obrigatório todos os exames, irá calcular a média normalmente
            for(let i = 0; i < exameCandidato.length; i++) {
                if(curso.cadeiraIngresso.includes(exameCandidato[i])) {
                    mediaTemp += notaExameCandidato[i];
                    numcadeira += 1;
                }
            }

            // Caso não inclua todos os exames, passa esse curso á frente
            if(numcadeira != curso.cadeiraIngresso.length) {
                continue;
            }

            media = mediaTemp / numcadeira;
        } else {
            // Caso não seja obrigatório todos os exames, vai procurar pelo maior valor entre as notas dos exames do candidato
            let maxNota = 0;

            for(let i = 0; i < exameCandidato.length; i++) {
                if(curso.cadeiraIngresso.includes(exameCandidato[i])) {
                    mediaTemp += notaExameCandidato[i];
                    numcadeira += 1;
                    maxNota = Math.max(maxNota, notaExameCandidato[i]);
                }
            }

            if (numcadeira <= 0){
                continue;
            }

            // Averiguar a maior nota, a média entre os exames ou de apenas um dos exames
            media = Math.max(mediaTemp / numcadeira, maxNota);
        }

        cursosPossiveis.push({
            name: curso.nome,
            nota: media,
            percentagem: curso.percentagemExame,
            media: curso.media,
            url: curso.url,
        });
    }

    return cursosPossiveis;
}

// Exames, não preenchidos

// Lista de exames possiveis e a respetiva nota minima a tirar no exame para ingressar
function calcularExamePossivel(listaCursos, mediaDisciplinas, exameCandidato, notaExameCandidato){
    let resultado = [];

    // Garantir que exameCandidato e notaExameCandidato seja sempre um array
    if (!Array.isArray(exameCandidato)) {
        exameCandidato = [exameCandidato];
        notaExameCandidato = [notaExameCandidato];
    }

    for(const curso of listaCursos) {

        let cadeirasRestantes = [];
        let percentage = curso.percentagemExame * 0.01;

        // Calcular a média Minima provisória
        let mediaExameMinimio = ((curso.media - mediaDisciplinas * (1 - percentage)) / percentage).toFixed(1);

        // Se preencher o campo de exames que o candidato já realizou
        if(exameCandidato){
            [cadeirasRestantes, mediaExameMinimio] = verificarExameRealizado(curso, exameCandidato, notaExameCandidato, mediaExameMinimio);
        }

        // Caso o candidato não consiga ingressar nesse curso
        if (mediaExameMinimio > 20){
            continue;
        }
        // Caso o minimo sugerido seja inferior ao aceite para ingressar
        if (mediaExameMinimio < 9.5){
            mediaExameMinimio = 9.5;
        }
        
        // Não se irá sugerir cursos que exijão nota do exame muito alta comparado com a media das disciplinas do candidato
        if ((mediaExameMinimio - mediaDisciplinas) > 4.5){
            continue;
        }
        
        // Guardar o nome, a nota minima para entrar no curso, as disciplinas para fazer exame, e caso seja obrigatório fazer todos os exames
        resultado.push({nomeCurso: curso.nome, mediaExameMinimo: mediaExameMinimio, cadeirasIngresso: cadeirasRestantes, examesObrigatorio: curso.examesObrigatorio, url: curso.url});
    }

    return resultado;
}

// Função responsavel por ajustar os dados apresentados caso o candidato tenha preenchido um exame
function verificarExameRealizado(curso, exameCandidato, notaExameCandidato, mediaExameMinimio){
    let cadeirasRestantes = [];
    // Caso seja obrigatório fazer todos os exames para ingressar neste curso
    if(curso.examesObrigatorio){
        // Caso o candidato tenha realizado algum dos exames para ingressar no curso
        if(curso.cadeiraIngresso.includes(exameCandidato)){
            let notaSomadaAtual;
            // Remover os exames que o candidato realizou da lista
            cadeirasRestantes = curso.cadeiraIngresso.filter(cadeira => !exameCandidato.includes(cadeira));
            
            // Caso se tenha removido todos os exames, irá se verificar os cursos que está admissivel
            if(!cadeirasRestantes){
                let mediaTemp = 0;
                let numcadeira = 0;

                for(let i = 0; i < exameCandidato.length; i++) {
                    if(curso.cadeiraIngresso.includes(exameCandidato[i])) {
                        mediaTemp += notaExameCandidato[i];
                        numcadeira += 1;
                    }
                }
                // Verificar se o candidato pode ingressar no curso com o exame já realizado
                if (mediaExameMinimio < (mediaTemp/numcadeira)){
                    cadeirasRestantes[0] = 'admissivel';
                }
            }
            
            for(const element of notaExameCandidato) {
                notaSomadaAtual += element
            }
            // Calcular média assumindo os exames que o candidato preencheu
            mediaExameMinimio = mediaExameMinimio * curso.cadeiraIngresso.length - notaSomadaAtual;
        } else {
            cadeirasRestantes = curso.cadeiraIngresso;
        }
    // Caso não seja obrigatório fazer todos os exames
    } else {
        // Caso o candidato tenha realizado algum dos exames para ingressar no curso
        if (curso.cadeiraIngresso.includes(exameCandidato)){
            let mediaTemp = 0;
            let numcadeira = 0;

            for(let i = 0; i < exameCandidato.length; i++) {
                if(curso.cadeiraIngresso.includes(exameCandidato[i])) {
                    mediaTemp += notaExameCandidato[i];
                    numcadeira += 1;
                }
            }

            // Verificar se o candidato pode ingressar no curso com o exame já realizado
            if (mediaExameMinimio < (mediaTemp/numcadeira)){
                cadeirasRestantes[0] = 'admissivel';
            } else {
                // Remover os exames que o candidato realizou da lista
                cadeirasRestantes = curso.cadeiraIngresso.filter(cadeira => !exameCandidato.includes(cadeira));
            }
        } else {
            cadeirasRestantes = curso.cadeiraIngresso;
        }
    }
    return [cadeirasRestantes, mediaExameMinimio];
}

export {calcularMedia, calcularMediaPorCurso, calcularExamePossivel};
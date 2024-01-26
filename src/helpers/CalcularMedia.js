function calcularMedia(notas10, notas11, notas12, exames, percentagem) {
    const validateYear = (notas, year) => {
        if (notas !== undefined && notas.length >= 9 && notas.every(nota => nota >= 10)) {
            return notas;
        } else {
            let errorMessage = `Ano ${year} inválido.`;
            if (notas !== undefined && notas.length < 9) {
                errorMessage += ' Deve ter pelo menos 9 valores.';
            }
            if (notas !== undefined && !notas.every(nota => nota >= 10)) {
                errorMessage += ' Cada nota deve ser igual ou superior a 10.';
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
    console.log(exames, percentagem)
    return media;
}

export default calcularMedia;

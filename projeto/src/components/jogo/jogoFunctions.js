export function checkIfColunaVazia(coluna, discMatrix) {
    for (let i = 0; i < 6; i++) {
        if (discMatrix[i][coluna] === null) {
            return true;
        }
    }
    return false;
}

export function numerosEspeciais() {
    const numeros = [];
    while (numeros.length < 5) {
        const num = Math.floor((Math.random() * 42));
        if (!numeros.includes(num)) 
            numeros.push(num);
    }
    return numeros;
}

export function checkIfVitoria(discMatrix) {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (discMatrix[row][col] !== null) {
                const player = discMatrix[row][col];
                if (col + 3 < 7 &&
                    player === discMatrix[row][col + 1] &&
                    player === discMatrix[row][col + 2] &&
                    player === discMatrix[row][col + 3])
                    return [row * 7 + col, row * 7 + col + 1, row * 7 + col + 2, row * 7 + col + 3];
                
                if (row + 3 < 6 &&
                    player === discMatrix[row + 1][col] &&
                    player === discMatrix[row + 2][col] &&
                    player === discMatrix[row + 3][col])
                    return [row * 7 + col, (row + 1) * 7 + col, (row + 2) * 7 + col, (row + 3) * 7 + col];
                
                if (row - 3 >= 0 && col + 3 < 7 &&
                    player === discMatrix[row - 1][col + 1] &&
                    player === discMatrix[row - 2][col + 2] &&
                    player === discMatrix[row - 3][col + 3])
                    return [row * 7 + col, (row - 1) * 7 + col + 1, (row - 2) * 7 + col + 2, (row - 3) * 7 + col + 3];

                if (row + 3 < 6 && col + 3 < 7 &&
                    player === discMatrix[row + 1][col + 1] &&
                    player === discMatrix[row + 2][col + 2] &&
                    player === discMatrix[row + 3][col + 3])
                    return [row * 7 + col, (row + 1) * 7 + col + 1, (row + 2) * 7 + col + 2, (row + 3) * 7 + col + 3];
            }
        }
    }
}
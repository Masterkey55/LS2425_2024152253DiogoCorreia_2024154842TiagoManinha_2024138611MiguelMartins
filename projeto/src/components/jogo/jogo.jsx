import React, { useState } from "react";
import "./jogo.css";
import Slot from "./slot/slot.jsx";
import imagemTabuleiro from "../../assets/img/tabuleiro.png";

function checkIfColunaVazia(coluna, discMatrix) {
    for (let i = 0; i < 6; i++) {
        if (discMatrix[i][coluna] === null) {
            return true;
        }
    }
    return false;
}

function Jogo(props) {
    const [hoveredIndex, setHoveredIndex] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState("vermelho");
    const [gameOver, setGameOver] = useState(false);
    const [discMatrix, setDiscMatrix] = useState(
                Array.from({ length: 6 }, () => Array(7).fill(null))
            );

    const handleClick = (coluna) => {
        if (checkIfColunaVazia(coluna, discMatrix)) {
            const newDiscMatrix = [...discMatrix];
            for (let i = 5; i >= 0; i--) {
                if (newDiscMatrix[i][coluna] === null) {
                    newDiscMatrix[i][coluna] = currentPlayer;
                    break;
                }
            }
            setDiscMatrix(newDiscMatrix);
            setCurrentPlayer(currentPlayer === "vermelho" ? "amarelo" : "vermelho");
        }
    }

    const handleHover = (coluna) => {
        const indices = [];
        for (let i = 0; i < 6; i++) {
            indices.push(i * 7 + coluna);
        }
        setHoveredIndex(indices);
    };

    return (
        <div className="container-jogo">
            <div className="arrow-container"></div>
            <div className="container-tabuleiro">
                <img src={imagemTabuleiro} alt="Tabuleiro" className="tabuleiro" />
                <div className="slots-container">
                    {Array.from({ length: 6 }).map((_, row) => // linhas
                        Array.from({ length: 7 }).map((_, col) => { // colunas
                            const index = row * 7 + col;
                            return (
                                <Slot
                                    key={index}
                                    isHovered={hoveredIndex.includes(index)}
                                    value={discMatrix[row][col]}
                                    row={row}
                                    col={col}
                                />
                            );
                        })
                    )}
                </div>
                <div class = "colunas">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="coluna" onClick={() => handleClick(i)} onMouseEnter={() => handleHover(i)} onMouseLeave={() => setHoveredIndex([])}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Jogo;
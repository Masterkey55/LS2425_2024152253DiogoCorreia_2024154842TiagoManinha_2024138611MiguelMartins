import React, { useState } from "react";
import "./jogo.css";
import Slot from "./slot/slot.jsx";
import imagemTabuleiro from "../../assets/img/tabuleiro.png";
import MenuPlayer from "./menu-player/menu-player.jsx";
import Menuendgame from "./end-game/end-game.jsx";

function checkIfColunaVazia(coluna, discMatrix) {
    for (let i = 0; i < 6; i++) {
        if (discMatrix[i][coluna] === null) {
            return true;
        }
    }
    return false;
}

function checkIfVitoria(discMatrix) {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (discMatrix[row][col] !== null) {
                if (col + 3 < 7 &&
                    discMatrix[row][col] === discMatrix[row][col + 1] &&
                    discMatrix[row][col] === discMatrix[row][col + 2] &&
                    discMatrix[row][col] === discMatrix[row][col + 3]) {
                    return true;
                }

                if (row + 3 < 6 &&
                    discMatrix[row][col] === discMatrix[row + 1][col] &&
                    discMatrix[row][col] === discMatrix[row + 2][col] &&
                    discMatrix[row][col] === discMatrix[row + 3][col]) {
                    return true;
                }
                // diagonal /
                if (row - 3 >= 0 && col + 3 < 7 &&
                    discMatrix[row][col] === discMatrix[row - 1][col + 1] &&
                    discMatrix[row][col] === discMatrix[row - 2][col + 2] &&
                    discMatrix[row][col] === discMatrix[row - 3][col + 3]) {
                    return true;
                }
                // diagonal \
                if (row + 3 < 6 && col + 3 < 7 &&
                    discMatrix[row][col] === discMatrix[row + 1][col + 1] &&
                    discMatrix[row][col] === discMatrix[row + 2][col + 2] &&
                    discMatrix[row][col] === discMatrix[row + 3][col + 3]) {
                    return true;
                }
            }
        }
    }
}

function Jogo(props) {
    const { onMenuChange, jogadores } = props;
    let randomPlayer = Math.random() < 0.5 ? 0 : 1;
    const [hoveredIndex, setHoveredIndex] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(jogadores[randomPlayer].cor);
    const [gameOver, setGameOver] = useState(false);
    const [topDisc, setTopDisc] = useState(0)
    const [discMatrix, setDiscMatrix] = useState(
                Array.from({ length: 6 }, () => Array(7).fill(null))
            );
            

    const handleClick = (coluna) => {
        if (checkIfColunaVazia(coluna, discMatrix) && !gameOver) {
            const newDiscMatrix = [...discMatrix];
            for (let i = 5; i >= 0; i--) {
                if (newDiscMatrix[i][coluna] === null) {
                    newDiscMatrix[i][coluna] = currentPlayer;
                    break;
                }
            }
            setDiscMatrix(newDiscMatrix);

            if (checkIfVitoria(discMatrix) == true) {
                setHoveredIndex([]);
                setGameOver(true);
            }

            setCurrentPlayer(currentPlayer === jogadores[0].cor ? jogadores[1].cor : jogadores[0].cor);
        }
    }

    const handleHover = (coluna) => {
        const indices = [];
        for (let i = 0; i < 6; i++) {
            indices.push(i * 7 + coluna);
        }
        setTopDisc(coluna)
        setHoveredIndex(indices);
    };

    const restartgame = ()=> {
            setDiscMatrix(Array.from({ length: 6 }, () => Array(7).fill(null)));
            setGameOver(false);
    }

    return (
        <div className={"container-jogo"}>
            <MenuPlayer jogador = {jogadores[0]}/>
            <div className="container-tabuleiro">
                { !gameOver && 
                    <div className="disc-container">
                        <div className = {currentPlayer} 
                            style={{
                            left: `${topDisc * 14.05}%`
                        }}
                        ></div>
                    </div>
                }
                <div className="tabuleiro">
                    <img src={imagemTabuleiro} alt="Tabuleiro" className="tabuleiro-image" />
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
                    <div className = "colunas">
                        {!gameOver && Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="coluna" onClick={() => handleClick(i)} onMouseEnter={() => handleHover(i)} onMouseLeave={() => setHoveredIndex([])}></div>
                        ))}
                    </div>
                </div>
            </div>
            <MenuPlayer jogador = {jogadores[1]}/>
                        
            {gameOver &&
                <Menuendgame vencedor = {currentPlayer === jogadores[0].cor ? jogadores[1].cor : jogadores[0].cor} restart = {restartgame} inicio = {onMenuChange}/>
            }

        </div>
    );
}

export default Jogo;
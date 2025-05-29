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

function numerosEspeciais() {
    const numeros = [];
    while (numeros.length < 5) {
        const num = Math.floor((Math.random() * 42));
        if (!numeros.includes(num)) 
            numeros.push(num);
    }
    return numeros;
}

function checkIfVitoria(discMatrix) {
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

function Jogo(props) {
    const { onMenuChange, jogadores } = props;
    let randomPlayer = Math.random() < 0.5 ? 0 : 1;
    const [hoveredIndex, setHoveredIndex] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(jogadores[randomPlayer]);
    const [showGameover, setShowGameover] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [topDisc, setTopDisc] = useState(0)
    const [tab_random5, setTab_random5] = useState(numerosEspeciais);
    const [winningSlots, setWinningSlots] = useState([]);
    const [discMatrix, setDiscMatrix] = useState(
        Array.from({ length: 6 }, () => Array(7).fill(null))
    );

    const handleGameOver = (bool) => {
        setGameOver(bool);
        if (bool) {
            setTimeout(() => {
                setShowGameover(true);
            }, 6000);
        } else {
            setWinningSlots([]);
            setShowGameover(false);
        }
    };

    const handleClick = (coluna) => {
        if (checkIfColunaVazia(coluna, discMatrix) && !gameOver) {
            const newDiscMatrix = [...discMatrix];
            let rowjogada = -1;
            for (let i = 5; i >= 0; i--) {
                if (newDiscMatrix[i][coluna] === null) {
                    newDiscMatrix[i][coluna] = currentPlayer.id;
                    rowjogada = i;
                    break;
                }
            }
            setDiscMatrix(newDiscMatrix);

            const result = checkIfVitoria(newDiscMatrix);
            if (result) {
                setWinningSlots(result);
                setHoveredIndex([]);
                handleGameOver(true);
                return
            }

            const indiceslot = rowjogada * 7 + coluna;
            const cainaespecial = tab_random5.includes(indiceslot);

            if(!cainaespecial){
                setCurrentPlayer(currentPlayer.id === jogadores[0].id ? jogadores[1] : jogadores[0]);
            } else {
                alert("Jogou num slot especial, Jogue de novo!");
            }
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
        let randomPlayer = Math.random() < 0.5 ? 0 : 1;

        setDiscMatrix(Array.from({ length: 6 }, () => Array(7).fill(null)));
        setCurrentPlayer(jogadores[randomPlayer]);
        handleGameOver(false);
        setTab_random5(numerosEspeciais());
    }

    return (
        <div className={"container-jogo"}>{/*style={{ backgroundColor: currentPlayer.cor2 + "8A" }}*/}
            <MenuPlayer jogador = {jogadores[0]}/>
            <div className="container-tabuleiro">
                { !gameOver && 
                    <div className="disc-container">
                        <div style={{
                            left: `${topDisc * 14.05}%`, 
                            backgroundColor: currentPlayer.cor,
                            backgroundImage: `url(${currentPlayer.image})`,
                            backgroundPosition: "100%",
                            backgroundSize: "100% 75%",
                        }}>
                        </div>
                    </div>
                }
                <div className="tabuleiro">
                    <img src={imagemTabuleiro} alt="Tabuleiro" className="tabuleiro-image" />
                    <div className="slots-container">
                        {Array.from({ length: 6 }).map((_, row) =>
                            Array.from({ length: 7 }).map((_, col) => {
                                const index = row * 7 + col;
                                const value = discMatrix[row][col];
                                const especial = tab_random5.includes(index);

                                return (
                                    <Slot
                                        key={index}
                                        isHovered={hoveredIndex.includes(index)}
                                        value={value}
                                        isWinner={winningSlots.includes(index)}
                                        row={row}
                                        col={col}
                                        cor={value ? jogadores.find(j => j.id === value)?.cor : undefined}
                                        image={value ? jogadores.find(j => j.id === value)?.image : undefined}
                                        slotEspecial={especial}
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
                        
            {showGameover &&
                <Menuendgame vencedor = {currentPlayer.id === jogadores[0].id ? jogadores[1].nome : jogadores[0].nome} restart = {restartgame} inicio = {onMenuChange}/>
            }

        </div>
    );
}

export default Jogo;
import React, { useEffect, useState } from "react";
import "./jogo.css";
import Slot from "./slot/slot.jsx";
import imagemTabuleiro from "../../assets/icons/tabuleiro.png";
import MenuPlayer from "./menu-player/menu-player.jsx";
import Menuendgame from "./end-game/end-game.jsx";
import ToggleEspeciais from "./toggleEspeciais/toggleEspeciais.jsx";
import { checkIfColunaVazia, checkIfVitoria, numerosEspeciais, verificaTabuleiroCheio, getRandomPlayer } from "./jogoFunctions.js";
import Icons from "./icons/icons.jsx";
import IPClogo from '../../assets/logos/IPC-branco.png';

function Jogo(props) {
    const { onMenuChange, jogadores, type } = props;
    const [hoveredIndex, setHoveredIndex] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(getRandomPlayer(jogadores));
    const [showGameover, setShowGameover] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [topDisc, setTopDisc] = useState(0)
    const [waitJogada, setWaitJogada] = useState(false);
    const [tab_random5, setTab_random5] = useState(numerosEspeciais());
    const [winningSlots, setWinningSlots] = useState([]);
    const [message, setMessage] = useState("");
    const [toggleEspeciais, setToggleEspeciais] = useState(false); 
    const [discMatrix, setDiscMatrix] = useState(
        Array.from({ length: 6 }, () => Array(7).fill(null))
    );

    useEffect(() => {
        if (type === "computador" && currentPlayer.id === jogadores[1].id && !verificaTabuleiroCheio(discMatrix) && !gameOver) {
            setTimeout(() => botPlay(discMatrix), 1500);
        }
    
    }, [currentPlayer])

    const sendMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const botPlay = (matrix) => {
        const validCols = [];
        for (let col = 0; col < 7; col++) {
            if (checkIfColunaVazia(col, matrix)) validCols.push(col);
        }
        if (validCols.length === 0) return;
        const col = validCols[Math.floor(Math.random() * validCols.length)];
        handleClick(col, true); 
    };

    const handleGameOver = (bool) => {
        setGameOver(bool);
        if (bool) {
            setTimeout(() => {
                setShowGameover(true);
            }, 3200);
        } else {
            setWinningSlots([]);
            setShowGameover(false);
        }
    };

    const handleToggleEspeciais = (bool) => {
        setToggleEspeciais(bool)
    }

    const handleClick = (coluna, isBot = false) => {
        if (type === "computador" && isBot && currentPlayer.id != jogadores[1].id) return;
        if (type === "computador" && !isBot && currentPlayer.id != jogadores[0].id) return;

        if (checkIfColunaVazia(coluna, discMatrix) && !gameOver) {
            const newDiscMatrix = [...discMatrix];
            let rowjogada = -1;
            setWaitJogada(true);
            for (let i = 5; i >= 0; i--) {
                if (newDiscMatrix[i][coluna] === null) {
                    newDiscMatrix[i][coluna] = currentPlayer.id;
                    rowjogada = i;
                    break;
                }
            }
            setTimeout(() => {
                setWaitJogada(false);
            }, 1000);

            setDiscMatrix(newDiscMatrix);

            const result = checkIfVitoria(newDiscMatrix);
            if (result) {
                setWinningSlots(result);
                setHoveredIndex([]);
                handleGameOver(true);
                return
            }

            const checkEmpate = verificaTabuleiroCheio(discMatrix)

            if (checkEmpate) {
                handleGameOver(true);
                return;
            }

            const indiceslot = rowjogada * 7 + coluna;
            const cainaespecial = tab_random5.includes(indiceslot);

            if(!cainaespecial){
                const nextPlayer = currentPlayer.id === jogadores[0].id ? jogadores[1] : jogadores[0];
                setCurrentPlayer(nextPlayer);
            } else {
                if (type === "computador" && currentPlayer.id === jogadores[1].id) {
                    setTimeout(() => botPlay(newDiscMatrix), 1500);
                }
                sendMessage("Jogou num slot especial, jogue de novo!");
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
        setDiscMatrix(Array.from({ length: 6 }, () => Array(7).fill(null)));
        setCurrentPlayer(getRandomPlayer(jogadores));
        handleGameOver(false);
        setTab_random5(numerosEspeciais());
    }

    const passarProximoJogador = () => {
        const nextPlayer = currentPlayer.id === jogadores[0].id ? jogadores[1] : jogadores[0];
        setCurrentPlayer(nextPlayer);
        sendMessage("Deixaste passar o tempo, é a vez do outro jogador!");
    }

    return (
        <div className={"container-jogo"}>
            <ToggleEspeciais setToggleEspeciais={handleToggleEspeciais} toggleEspeciais= {toggleEspeciais}/>
            <h1 className = "message">{message}</h1>
            <MenuPlayer discMatrix={discMatrix} gameOver={gameOver} passarJogador = {passarProximoJogador} jogador = {jogadores[0]} currentPlayer={currentPlayer} waitJogada = {waitJogada}/>
            <div className="container-tabuleiro">
                { !gameOver && !waitJogada && ((type != "computador") || (type === "computador" && currentPlayer.id === jogadores[0].id)) &&
                    <div className="disc-container">
                        <div style={{
                            left: `${topDisc * 14.05}%`, 
                            backgroundColor: currentPlayer.cor,
                            backgroundImage: `url(${IPClogo})`,
                            backgroundPosition: "center center",
                            backgroundSize: "80% 77%",
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
                                        showEspecial= {toggleEspeciais}
                                    />
                                );
                            })
                        )}
                    </div>
                    <div className = "colunas">
                        {!gameOver && Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="coluna" onClick={() => !waitJogada && handleClick(i)} onMouseEnter={() => handleHover(i)} onMouseLeave={() => setHoveredIndex([])}></div>
                        ))}
                    </div>
                </div>
            </div>

            <Icons restart = {restartgame} inicio = {onMenuChange} fimJogo={gameOver}/>

            <MenuPlayer discMatrix={discMatrix} gameOver={gameOver} passarJogador = {passarProximoJogador} jogador = {jogadores[1]} type = {type} currentPlayer={currentPlayer} waitJogada = {waitJogada}/> 
                        
            {showGameover &&
                <Menuendgame isVitoria={checkIfVitoria(discMatrix)} ultimoPlayer = {currentPlayer.nome} restart = {restartgame} inicio = {onMenuChange}/>
            }

        </div>
    );
}

export default Jogo;
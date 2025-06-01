import React, { useEffect, useState } from 'react';
import './menu-player.css';
import IPClogo from '../../../assets/logos/IPC-branco.png';

export default function MenuPlayer(props) {
    const { jogador, currentPlayer, passarJogador, type, gameOver, discMatrix, waitJogada } = props;
    const { nome, cor, image, escola } = jogador;
    const [timer, setTimer] = useState(0);
    
    useEffect(() => {
        const isMatrixEmpty = discMatrix.every(row => row.every(cell => cell === null));
        if (isMatrixEmpty || jogador.id == currentPlayer.id) {
            setTimer(0);
        }
    }, [discMatrix]);

    useEffect(() => {
        if (jogador.id != currentPlayer.id) {
            setTimer(0);
        }
    }, [currentPlayer.id, jogador.id]);

    useEffect(() => {
        if (jogador.id === currentPlayer.id && timer < 10 && !gameOver) {
            const interval = setInterval(() => setTimer(t => t + 1), 1000);
            return () => clearInterval(interval);
        } 

        if (jogador.id === currentPlayer.id && timer === 10 && !gameOver) {
            passarJogador();
        }
    }, [timer, jogador.id, currentPlayer.id]);

    const timerColor =
        timer < 8 ? "green" :
        "red";

    return (
        <div className="menu-player" style={currentPlayer.id == jogador.id && !waitJogada && !gameOver ? {boxShadow: `0px 0px 25px 3px ${currentPlayer.cor}`} : undefined}>
            <div className="color-container">
                <div className="color" style={{ backgroundColor: cor }}>
                    <img src={IPClogo} alt={escola} />
                    <span>{escola}</span>
                </div>
            </div>
            <div className="player-info">
                <span className="player-name" style={{ color: cor }}>{nome}</span>
                    {type != "computador" && 
                        <div className="time-container">
                                <div>
                                    <span style={{ color: timerColor }}>{timer}</span>s
                                </div>
                        </div>
                    }
            </div>
        </div>
    );
}
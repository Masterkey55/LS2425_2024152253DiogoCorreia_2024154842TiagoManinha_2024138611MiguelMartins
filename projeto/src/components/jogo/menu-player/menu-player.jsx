import React, { useEffect, useState } from 'react';
import './menu-player.css';
import IPClogo from '../../../assets/logos/IPC-branco.png';

export default function MenuPlayer(props) {
    const { jogador, currentPlayer, passarJogador, type, gameOver, discMatrix } = props;
    const { nome, cor, image, escola } = jogador;
    const [timer, setTimer] = useState(10);
    const isMatrixEmpty = discMatrix.every(row => row.every(cell => cell === null));

    useEffect(() => {
        if (isMatrixEmpty) {
            setTimer(10);
        }
    }, [isMatrixEmpty]);

    useEffect(() => {
        if (jogador.id != currentPlayer.id) {
            setTimer(10);
        }
    }, [currentPlayer.id, jogador.id]);

    useEffect(() => {
        if (jogador.id === currentPlayer.id && timer > 0 && !gameOver) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        } 

        if (jogador.id === currentPlayer.id && timer === 0 && !gameOver) {
            passarJogador();
        }
    }, [timer, jogador.id, currentPlayer.id]);

    const timerColor =
        timer > 7 ? "green" :
        timer > 5 ? "yellow" :
        timer > 3 ? "orange" :
        "red";

    return (
        <div className="menu-player">
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
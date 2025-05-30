import React from 'react';
import './menu-player.css';

export default function MenuPlayer(props) {
    const { currentPlayer, gameOver, jogador } = props;
    const { nome, cor, image, escola } = jogador;
    return (
        <div className = "menu-player">
            <div className = "color-container">
                <div className="color" style = {{backgroundColor:cor}}>
                    <img src={image} />
                    <span>{escola}</span>
                </div>
            </div>
            <div className = "player-info">
                <span className="player-name" style={{color:cor}}>{nome}</span>
                <div className = "time-container">
                    <div><span>10</span>s</div>
                </div>
            </div>

    
        </div>
    );
}
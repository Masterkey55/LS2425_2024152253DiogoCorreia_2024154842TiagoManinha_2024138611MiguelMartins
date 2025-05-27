import React from 'react';
import './menu-player.css';

export default function MenuPlayer(props) {
    const { currentPlayer, gameOver } = props;
    return (
        <div class = "menu-player">
            <div class = "color-container">
                <div className={`color ${currentPlayer}`}></div>
            </div>
            <div class = "player-info">
                <span className="player-name">Tiago</span>
                <div className = "time-container">
                    <div><span>10</span>s</div>
                </div>
            </div>

    
        </div>
    );
}
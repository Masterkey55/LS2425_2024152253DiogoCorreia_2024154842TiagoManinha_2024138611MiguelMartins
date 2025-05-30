import "./end-game.css";
import React, { useState } from "react";

function Menuendgame(props){
    const {ultimoPlayer, restart, inicio} = props

    return(
        <div className="cinzento">
            <div className="container-endgame">
                <div className="container-inf">
                    <p className="playerwin">
                        {ultimoPlayer}
                    </p>
                    <p className="ganha">🏆 Ganhou o jogo! 🏆</p>
                    <div className="linha"></div>
                    <button onClick={()=>restart()}>
                        Jogar outra vez
                        <img src=""/>
                    </button>
                    <button onClick={()=>inicio("inicio")}>
                        Voltar ao Início
                        <img src=""/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Menuendgame;
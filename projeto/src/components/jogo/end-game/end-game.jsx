import "./end-game.css";
import React, { useState } from "react";

function Menuendgame(props){
    const {ultimoPlayer, restart, inicio, isVitoria} = props

    return(
        <div className="cinzento">
            <div className="container-endgame">
                <div className="container-inf">
                    {isVitoria && 
                        (<p className="playerwin">
                            {ultimoPlayer}
                        </p>)
                    }
                    <p className="ganha">{isVitoria ? "🏆 Ganhou o jogo! 🏆" : "Empate!"}</p>
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
import "./end-game.css";
import React, { useState } from "react";

function Menuendgame(props){



    const {vencedor, restart, inicio} = props

    return(
        <div className="cinzento">
            <div className="container-endgame">
                <div className="container-inf">
                    <p className="playerwin">
                        {vencedor}
                    </p>
                    <p className="ganha">
                        GANHA!!!
                    </p>
                    <div className="linha">
                        
                    </div>
                    <button onClick={()=>restart()}>
                        Jogar outra vez
                        <img src=""/>
                    </button>
                    <button onClick={()=>inicio("inicio")}>
                        voltar ao Inínio
                        <img src=""/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Menuendgame;
import React from "react";
import "../inicio.css";

function Botao(props) {  
    return (
        <button key={props.nome} onClick={() => props.onMenuChange(props.nome)} className={`botao ${props.cor}`}>
            <img src={props.imagem}/>
            <div>{props.nome === "computador" ? "Jogar contra computador" : "Jogar com 2 jogadores"}</div>
        </button>
    );
}

export default Botao;
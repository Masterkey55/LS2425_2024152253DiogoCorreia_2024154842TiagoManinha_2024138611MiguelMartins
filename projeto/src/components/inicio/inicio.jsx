import React from "react";
import Botao from "./botao/botao.jsx";
import "./inicio.css";
import imagemComputador from "../../assets/logos/computador.svg";
import imagemJogador from "../../assets/logos/jogador.svg";

function Inicio(props) {  
    let modosDeJogo = [
        { nome: "computador", cor: "amarelo", imagem: imagemComputador },
        { nome: "jogador", cor: "vermelho", imagem: imagemJogador }
    ];

    return (
        <div className="container-menu">
            <h1 className="titulo">4 EM LINHA</h1>
            <div className="container-botoes">
                {modosDeJogo.map((modo) => (
                    <Botao key={modo.nome} nome={modo.nome} cor={modo.cor} imagem={modo.imagem} onMenuChange={props.onMenuChange}/>
                ))}
            </div>
        </div>
    );
}

export default Inicio;
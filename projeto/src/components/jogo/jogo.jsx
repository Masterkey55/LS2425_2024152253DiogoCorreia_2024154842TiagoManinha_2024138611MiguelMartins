import React from "react";
import "./jogo.css";
import imagemTabuleiro from "../../assets/img/tabuleiro.png";

function Jogo(props) {  
    return (
        <div className="container-jogo">
            <div className="container-tabuleiro">
                <img src={imagemTabuleiro} alt="Tabuleiro" className="tabuleiro" />
                <div class = "slots-container">
                    {Array.from({ length: 42 }).map((_, i) => (
                        <div key={i} className="slot"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Jogo;
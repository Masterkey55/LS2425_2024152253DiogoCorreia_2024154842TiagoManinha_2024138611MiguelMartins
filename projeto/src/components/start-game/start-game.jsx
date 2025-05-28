import React, { useState } from "react";
import "./start-game.css";
import Jogadorops from "./jogador-ops/jogador-ops.jsx";
import VsImage from "../../assets/img/vs.png";


function Startgame({ onMenuChange }) {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: "", equipa: "" },
    { id: 2, nome: "", equipa: "" },
  ]);

  function mudarValor(id, campo, valor) {
      const novaLista = jogadores.map((jogador) => {
          if (jogador.id === id) {
              return {
              ...jogador,
              [campo]: valor,
              };
          } else {
              return jogador;
          }
      });

    setJogadores(novaLista);
  }

  function handleSubmit(e) {
      e.preventDefault();

      let algumEmBranco = false;
      for (let i = 0; i < jogadores.length; i++) {
          if (jogadores[i].nome.trim() === "" || jogadores[i].cor === "") {
              algumEmBranco = true;
              break;
          }
      }

      if (algumEmBranco) {
        alert("Todos os jogadores devem preencher nome e escolher uma cor.");
        return;
      }

      onMenuChange("jogo", jogadores);
  }

  const coresEscolhidas = {};
  jogadores.forEach((j) => {
    if (j.cor) {
      coresEscolhidas[j.id] = j.cor;
    }
  });

  return ( 
    <div className="container-opcoes">
      <form onSubmit={handleSubmit}>
        <div className = "formulario">
          <Jogadorops jogador={jogadores[0]} coresEscolhidas={coresEscolhidas} onChange={mudarValor} />
          <span className = "versus">VS</span>
          <Jogadorops jogador={jogadores[1]} coresEscolhidas={coresEscolhidas} onChange={mudarValor} />
        </div>
        <button type="submit">JOGAR!</button>
      </form>
    </div>
  );
}

export default Startgame;

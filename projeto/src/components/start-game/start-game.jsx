import React, { useState } from "react";
import "./start-game.css";
import Jogadorops from "./jogador-ops/jogador-ops.jsx";


function Startgame({ onMenuChange }) {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: "", equipa: "" },
    { id: 2, nome: "", equipa: "" },
  ]);

  function mudarValor(id, campo, valor, equipa) {
    const novaLista = jogadores.map((jogador) => {
      if (jogador.id === id) {
        let novosDados = { ...jogador, [campo]: valor };
        if (equipa) {
          const { id: _, ...restoEquipa } = equipa;
          novosDados = { ...novosDados, ...restoEquipa };
        }
        return novosDados;
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
          if (jogadores[i].nome.trim() === "" || jogadores[i].equipa === "") {
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
    if (j.equipa != "") {
      coresEscolhidas[j.id] = j.equipa;
    }
  });

  return ( 
    <div className="container-opcoes">
      <form onSubmit={handleSubmit}>
        <div className = "formulario">
         {jogadores.map(jogador => (
          <Jogadorops key={jogador.id} jogador={jogador} coresEscolhidas={coresEscolhidas} onChange={mudarValor} />
        ))}
        </div>
        <button type="submit">JOGAR</button>
      </form>
    </div>
  );
}

export default Startgame;

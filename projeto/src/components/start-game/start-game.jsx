import React, { useState } from "react";
import "./start-game.css";
import Jogadorops from "./jogador-ops/jogador-ops.jsx";

function Startgame({ onMenuChange }) {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: "", cor: "" },
    { id: 2, nome: "", cor: "" },
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

    const algumEmBranco = jogadores.some(
        (j) => j.nome.trim() === "" || j.cor === ""
    );

    if (algumEmBranco) {
    alert("Todos os jogadores devem preencher nome e escolher uma cor.");
    return;
    }

    alert("Jogo iniciado!");
    onMenuChange("jogo");
}


  const coresEscolhidas = {};
  jogadores.forEach((j) => {
    if (j.cor) {
      coresEscolhidas[j.id] = j.cor;
    }
  });

  return (
    <div className="container-start-game">
      <div className="container-opcoes">
        <form onSubmit={handleSubmit}>
          {jogadores.map((jogador) => (
            <Jogadorops
              key={jogador.id}
              jogador={jogador}
              coresEscolhidas={coresEscolhidas}
              onChange={mudarValor}
            />
          ))}

          <button type="submit">Começar Jogo</button>

        </form>
      </div>
    </div>
  );
}

export default Startgame;

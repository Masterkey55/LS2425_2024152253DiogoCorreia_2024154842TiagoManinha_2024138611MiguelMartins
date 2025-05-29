import React, { useState } from "react";
import "./start-game.css";
import Jogadorops from "./jogador-ops/jogador-ops.jsx";
import ISEC from "../../assets/img/ISEC.png";
import ESEC from "../../assets/img/ESEC.png";
import ESAC from "../../assets/img/ESAC.png";
import ISCAC from "../../assets/img/ISCAC.png";
import ESTGOH from "../../assets/img/ESTGOH.png";
import ESTeSC from "../../assets/img/ESTESC.png";

const equipas = [
  { id: 1, escola: "ISEC", cor: "#887e7b", cor2: "#9c0b0f", image: ISEC },
  { id: 2, escola: "ESEC", cor: "#1b4165", cor2: "#ff5100", image: ESEC },
  { id: 3, escola: "ESAC", cor: "#772c18", cor2: "#01bd70", image: ESAC },
  { id: 4, escola: "ISCAC", cor: "#003567", cor2: "#e0251b", image: ISCAC },
  { id: 5, escola: "ESTGOH", cor: "#a39a98", cor2: "#5d5dfe", image: ESTGOH },
  { id: 6, escola: "ESTeSC", cor: "#ffff00", cor2: "#3db5e6", image: ESTeSC },
];

function Startgame({ onMenuChange }) {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: "", equipa: "", aleatoria: false },
    { id: 2, nome: "", equipa: "", aleatoria: false },
  ]);

  function mudarValor(id, campo, valor, equipa) {
    const novaLista = jogadores.map((jogador) => {
      if (jogador.id === id) {
        let novosDados = { ...jogador, [campo]: valor };
        if (equipa) {
          const { id: _, ...restoEquipa } = equipa;
          novosDados = { ...novosDados, ...restoEquipa };
        }

        if (campo === "aleatoria") {
          novosDados.equipa = "";
        }
        return novosDados;
      } else {
        return jogador;
      }
    });

    if (campo === "aleatoria") {
      coresEscolhidas[id] = "";
    }

    setJogadores(novaLista);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const getEquipasOcupadas = (idJogador) => {
      return jogadores.filter((_, id) => id !== idJogador).map(j => j.equipa).filter(e => e !== "");
    };
    
    let algumEmBranco = false;
    for (let i = 0; i < jogadores.length; i++) {
      if (jogadores[i].aleatoria) {
        const ocupadas = getEquipasOcupadas(i);
        const disponiveis = equipas.filter(eq => !ocupadas.includes(eq.id));
        if (disponiveis.length === 0) {
          algumEmBranco = true;
          break;
        }

        if (!disponiveis.some(eq => eq.id === jogadores[i].equipa)) {
          const equipaRandom = disponiveis[Math.floor(Math.random() * disponiveis.length)];
          jogadores[i] = { ...jogadores[i], equipa: equipaRandom.id, ...equipaRandom };
        }
      } else if (jogadores[i].nome.trim() === "" || jogadores[i].equipa === "") {
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
          <Jogadorops key={jogador.id} equipas = {equipas} jogador={jogador} coresEscolhidas={coresEscolhidas} onChange={mudarValor} />
        ))}
        </div>
        <button type="submit">JOGAR</button>
      </form>
    </div>
  );
}

export default Startgame;

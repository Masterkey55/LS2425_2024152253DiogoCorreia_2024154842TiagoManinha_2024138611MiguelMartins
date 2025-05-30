import React, { useState } from "react";
import "./start-game.css";
import Jogadorops from "./jogador-ops/jogador-ops.jsx";
import IPClogo from '../../assets/logos/IPC-branco.png';


const logo = IPClogo;
const equipas = [
  { id: 1, escola: "ISEC", cor: "#9d0b0e", image: logo },
  { id: 2, escola: "ESEC", cor: "#ff5300", image: logo },
  { id: 3, escola: "ESAC", cor: "#00c381", image: logo },
  { id: 4, escola: "ISCAC", cor: "#da291c", image: logo },
  { id: 5, escola: "ESTGOH", cor: "#525ea6", image: logo },
  { id: 6, escola: "ESTeSC", cor: "#3cb4e6", image: logo },
];

function Startgame({ onMenuChange, type }) {
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

    if (type === "computador") {
      jogadores[1].aleatoria = true;
      jogadores[1].nome = "BOT";
    }

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

    onMenuChange("jogo", jogadores, type);
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
        {type === "computador"
          ? <Jogadorops
              key={jogadores[0].id}
              equipas={equipas}
              jogador={jogadores[0]}
              coresEscolhidas={coresEscolhidas}
              onChange={mudarValor}
              type = {type}
            />
          : jogadores.map(jogador => (
              <Jogadorops
                key={jogador.id}
                equipas={equipas}
                jogador={jogador}
                coresEscolhidas={coresEscolhidas}
                onChange={mudarValor}
              />
            ))
        }
        </div>
        <button type="submit">JOGAR</button>
      </form>
    </div>
  );
}

export default Startgame;

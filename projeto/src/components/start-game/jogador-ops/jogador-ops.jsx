import React from "react";
import "./jogador-ops.css";
import ISEC from "../../../assets/img/ISEC.png";
import ESEC from "../../../assets/img/ESEC.png";
import ESAC from "../../../assets/img/ESAC.png";
import ISCAC from "../../../assets/img/ISCAC.png";
import ESTGOH from "../../../assets/img/ESTGOH.png";
import ESTeSC from "../../../assets/img/ESTESC.png";


const equipas = [
  { id: 1, nome: "ISEC", cor: "#887e7b", cor2: "#9c0b0f", image: ISEC },
  { id: 2, nome: "ESEC", cor: "#1b4165", cor2: "#ff5100", image: ESEC },
  { id: 3, nome: "ESAC", cor: "#772c18", cor2: "#01bd70", image: ESAC },
  { id: 4, nome: "ISCAC", cor: "#003567", cor2: "#e0251b", image: ISCAC },
  { id: 5, nome: "ESTGOH", cor: "#a39a98", cor2: "#5d5dfe", image: ESTGOH },
  { id: 6, nome: "ESTeSC", cor: "#ffff00", cor2: "#3db5e6", image: ESTeSC },
];

function Jogadorops({ jogador, coresEscolhidas, onChange }) {
  return (
    <div className="container-jogador">
      <h1>JOGADOR {jogador.id}</h1>
      <div className="aleatoria-opcao">
        <h2>EQUIPA ALEATÓRIA</h2>
        <label className="switch">
          <input type="checkbox" id="equipaAleatoria"/>
          <span className="slider"></span>
        </label>
      </div>
      <h2>ESCOLHA A EQUIPA DO IPC</h2>
      <div className = "team-container">
        {equipas.map((equipa) => {
          const corJaEscolhida = Object.values(coresEscolhidas).includes(equipa.nome) && jogador.equipa !== equipa.nome;

          console.log(Object.values(coresEscolhidas).includes(equipa.nome) && jogador.equipa !== equipa.nome)
          return (
            <div key={equipa.id} className={`team${jogador.nome === equipa.nome ? " selected" : ""}`} 
            onClick={() => {
              if (!corJaEscolhida) onChange(jogador.id, "equipa", equipa.nome);
            }}
            style={{
              backgroundColor: equipa.cor,
              cursor: corJaEscolhida ? "not-allowed" : "pointer",
              opacity: corJaEscolhida ? 0.5 : 1
            }}>
              <img src={equipa.image} alt={equipa.nome} />
              <span className={"team-name"} style={{color: equipa.cor2}}>{equipa.nome}</span>
            </div>
          )
        })}
      </div>
      <input maxLength={15} type="text" className="nome-jogador" placeholder="Nome do jogador" value={jogador.nome} onChange={(e) => onChange(jogador.id, "nome", e.target.value)}/>
    </div>
  );
}

export default Jogadorops;

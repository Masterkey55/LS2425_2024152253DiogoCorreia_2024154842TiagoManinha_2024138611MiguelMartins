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
      <h1>Jogador {jogador.id}</h1>
      <h2>EQUIPA ALEATÓRIA</h2>
      <div className="aleatoria-opcao">
        <label>
          <input type="radio" name={`aleatoria-${jogador.id}`} value="sim" checked={jogador.aleatoria === true} onChange={() => onChange(jogador.id, "aleatoria", true)}/>
          Sim
        </label>
        <label>
          <input type="radio" name={`aleatoria-${jogador.id}`} value="nao" checked={jogador.aleatoria === false} onChange={() => onChange(jogador.id, "aleatoria", false)}/>
          Não
        </label>
      </div>
      <h2>ESCOLHER EQUIPA</h2>
      <div className = "team-container">
        {equipas.map((equipa) => (
          <div key={equipa.id} className="team" onClick={() => onChange(jogador.id, "nome", equipa.nome)} style={{ backgroundColor: equipa.cor }}>
            <img src={equipa.image} alt={equipa.nome} />
            <span className={"team-name"} style={{color: equipa.cor2}}>{equipa.nome}</span>
          </div>
        ))}
      </div>
      <h2>ESCOLHER NOME</h2>
      <input maxLength={15} type="text" className="nome-jogador" placeholder="Nome do jogador" value={jogador.nome} onChange={(e) => onChange(jogador.id, "nome", e.target.value)}/>
    </div>
  );
}

export default Jogadorops;

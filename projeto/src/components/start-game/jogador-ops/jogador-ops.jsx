import React, { useState, useEffect } from "react";
import "./jogador-ops.css";

function Jogadorops({ jogador, coresEscolhidas, onChange, equipas, type }) {
  const [aleatoria, setAleatoria] = useState(false);

  useEffect(() => { 
    onChange(jogador.id, "aleatoria", aleatoria);
  }, [aleatoria]);

  return (
    <div className="container-jogador" style = { (type === "computador") ? { marginLeft: "auto"} : undefined}>
      <h1>JOGADOR {jogador.id}</h1>
      <div className="aleatoria-opcao">
        <h2>EQUIPA ALEATÓRIA</h2>
        <label className="switch">
          <input type="checkbox" id={`equipaAleatoria${jogador.id}`} checked={aleatoria} onChange={e => setAleatoria(e.target.checked)}/>
          <span className="slider"></span>
        </label>
      </div>
      <h2>ESCOLHA A EQUIPA DO IPC</h2>
      <div className = "team-container">
        {equipas.map((equipa) => {
          const corJaEscolhida = Object.values(coresEscolhidas).includes(equipa.id) && jogador.equipa !== equipa.id;
          const bloqueada = (corJaEscolhida || aleatoria);

          return (
            <div key={equipa.id} className={`team${!bloqueada && jogador.equipa === equipa.id ? " selected" : ""}`} 
            onClick={() => {
              if (!bloqueada) onChange(jogador.id, "equipa", equipa.id, equipas.find(e => e.id === equipa.id), aleatoria);
            }}
            style={{
              backgroundColor: equipa.cor,
              cursor: bloqueada ? "not-allowed" : "pointer",
              opacity: bloqueada ? 0.5 : 1
            }}>
              <img src={equipa.image} alt={equipa.escola} />
              <span className={"team-name"}>{equipa.escola}</span>
            </div>
          )
        })}
      </div>
      <input maxLength={15} type="text" className="nome-jogador" placeholder="Nome do jogador" value={jogador.nome} onChange={(e) => onChange(jogador.id, "nome", e.target.value)}/>
    </div>
  );
}

export default Jogadorops;

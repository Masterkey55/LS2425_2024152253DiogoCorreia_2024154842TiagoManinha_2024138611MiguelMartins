import React from "react";
import "./jogador-ops.css";

const cores = ["vermelho", "amarelo", "verde", "cor-de-rosa"];

function Jogadorops({ jogador, coresEscolhidas, onChange }) {
  return (
    <div className="container-jogador">
      <h1>Jogador {jogador.id}</h1>

      <input
        type="text"
        className="nome-jogador"
        placeholder="Nome do jogador"
        value={jogador.nome}
        onChange={(e) => onChange(jogador.id, "nome", e.target.value)}
      />

      <p>Escolha a cor com o qual deseja jogar</p>

      <div className="cor">
        {cores.map((cor) => {
          const corBloqueada =
            Object.values(coresEscolhidas).includes(cor) &&
            jogador.cor !== cor;

            return (
                <>
                    <label key={cor} className={"radio " + cor + "-texto"}>
                        {cor}
                    </label>
                    <input
                        type="radio"
                        name={`cor-${jogador.id}`}
                        checked={jogador.cor === cor}
                        disabled={corBloqueada}
                        onChange={() => onChange(jogador.id, "cor", cor)}
                    />
                </>
            )
            
        })}
      </div>
    </div>
  );
}

export default Jogadorops;

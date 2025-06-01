import React, { useState } from "react";
import Inicio from "./components/inicio/inicio.jsx"
import Jogo from "./components/jogo/jogo.jsx"
import Startgame from "./components/start-game/start-game.jsx";
import Menuendgame from "./components/jogo/end-game/end-game.jsx";
import "./index.css";

function App() {
  const [currentMenu, setCurrentMenu] = useState("inicio");
  const [jogoProps, setJogoProps] = useState({});
  const [jogoType, setJogoType] = useState("");

  const handleMenuChange = (menu, objeto, jogoType) => {
    if (menu === "jogo") {
      setJogoProps(objeto || {});
      setJogoType(jogoType || "");
    } else if (menu === "computado") {
      setJogoType("computador");
    }
    
    setCurrentMenu(menu);
  };
  
  const renderMenu = () => {
    switch (currentMenu) {
      case "inicio":
        return <Inicio onMenuChange={handleMenuChange} />;
      case "jogador":
        return <Startgame onMenuChange={handleMenuChange} />;
      case "computador":
        return <Startgame type = "computador" onMenuChange={handleMenuChange} />;
      case "jogo":
         return <Jogo onMenuChange={handleMenuChange} jogadores={jogoProps} type={jogoType} />;
      default:
        return <Inicio onMenuChange={handleMenuChange} />;
    }
  };

  return (
    <div className="container-principal">
      {renderMenu()}
    </div>
  );
}

export default App;
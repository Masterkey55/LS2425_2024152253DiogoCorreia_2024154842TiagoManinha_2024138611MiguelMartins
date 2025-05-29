import React, { useState } from "react";
import Inicio from "./components/inicio/inicio.jsx"
import Jogo from "./components/jogo/jogo.jsx"
import Startgame from "./components/start-game/start-game.jsx";
import Menuendgame from "./components/jogo/end-game/end-game.jsx";
import "./index.css";

function App() {
  const [currentMenu, setCurrentMenu] = useState("inicio");
  const [jogoProps, setJogoProps] = useState({});

  const handleMenuChange = (menu, objeto) => {
    if (menu === "jogo") {
      setJogoProps(objeto || {});
    }
    setCurrentMenu(menu);
  };

  const renderMenu = () => {
    switch (currentMenu) {
      case "inicio":
        return <Inicio onMenuChange={handleMenuChange} />;
      case "jogador":
        return <Startgame onMenuChange={handleMenuChange} />;
      case "jogo":
        return <Jogo onMenuChange={handleMenuChange} jogadores={jogoProps} />;
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
import React, { useState } from "react";
import Inicio from "./components/inicio/inicio.jsx"
import Jogo from "./components/jogo/jogo.jsx"
import "./index.css";

function App() {
  let [currentMenu, setCurrentMenu] = useState("inicio");

  let handleMenuChange = (menu) => {
    setCurrentMenu(menu);
  }
  
  let renderMenu = () => {
    switch (currentMenu) {
      case "inicio":
        return <Inicio onMenuChange={handleMenuChange} />;
      case "ranking":
        // return <Ranking onMenuChange={handleMenuChange} />;
      case "jogador":
        return <Jogo onMenuChange={handleMenuChange} />;
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
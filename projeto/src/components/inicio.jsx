import React from "react";
import "./inicio.css";
import Menu from "./menu/menu.jsx";

function Inicio() {
    return (
        <div class="container-principal">
            <Menu />
            <img src="assets/images/tabuleiro.png" />
        </div>
    );
}

export default Inicio;